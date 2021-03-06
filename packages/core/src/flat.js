/**
 * Constructing and interpreting flat frames representation
 * The representation is similar to
 * [ANF](https://en.wikipedia.org/wiki/A-normal_form)
 */
import * as Kit from "./kit";
import { Tag, invariant } from "./kit";
import * as Block from "./block";
import * as Ctrl from "./control";
import * as Coerce from "./coerce";
import * as Loop from "./loops";
import * as Bind from "./bind";
import * as State from "./state";
import { ifDefunct } from "./options";
import * as Except from "./exceptions";
import * as Policy from "./policy";
import * as Defunct from "./defunct";
import * as Gens from "./generators";
import * as Inline from "./inline";
import * as Par from "./par";
import * as Opt from "./optimization";

function byNumFst(a, b) {
  return a[0].num - b[0].num;
}

const emptyArr = [];

/** temporal marker of all frames inside finally block */
const finallyBlock = Kit.symbol("finally.block");
/** temporal marker of all frames inside catchBlock */
const catchBlock = Kit.symbol("catch.block");
/** temporal marker delimiting handler block for both catch and finally */
const handleBlock = Kit.symbol("try.handle");

const scopeSym = Kit.sysId("scope");

function unboundTempVar(root, name) {
  const res = Bind.tempVarSym(root, name);
  res.bound = false;
  return res;
}

function addArg(args, lhs, rhs) {
  for (const [l, r] of args) {
    if (r === lhs) {
      args.set(l, rhs);
      return;
    }
  }
  args.set(lhs, rhs);
}

/**
 * convers to a flat stracture (without nested frames)
 *     type ExitVal = JumpVal | LetStmtVal
 *     type ExitVal = ExitVal & {
 *               ref: FrameVal,
 *               goto?: FrameVal
 *               }
 */
export const convert = Kit.pipe(
  /**
   * removes redundant lets to simplify next step
   * this pass is actually workaround of not very nice output
   * from the former passes, they were designed for now abandoned nested mode
   */
  function convertPrepare(si) {
    const s = Kit.auto(si);
    const root = s.first.value;
    root.rootName =
      ((!s.opts.shortFrameNames || s.opts.topLevel) &&
        root.funcId &&
        root.funcId.name) ||
      "";
    function* walk() {
      let res = false;
      for (const i of s.sub()) {
        if (i.enter) {
          switch (i.type) {
            case Tag.ReturnStatement:
              const cur = s.curLev();
              if (cur && cur.value.eff) {
                cur.value.result = true;
                yield* Kit.reposOne(s.sub(), i.pos);
              } else if (cur || s.opts.keepLastPure) {
                yield s.enter(i.pos, Block.pure, { result: true });
                yield* Kit.reposOne(s.sub(), Tag.push);
                yield* s.leave();
              }
              s.close(i);
              continue;
            case Loop.repeat:
            case Ctrl.jump:
            case Block.choice:
            case Block.frame:
              res = true;
              break;
            case Block.letStmt:
              i.value.result =
                i.value.sym && i.value.sym.bound && i.value.sym.result;
              if (i.value.eff) {
                res = true;
                const inner = [];
                if (Kit.result(walk(), inner)) {
                  yield* Kit.reposOneArr(inner, i.pos);
                  s.close(i);
                } else {
                  yield i;
                  yield* inner;
                  yield s.close(i);
                }
                continue;
              }
              if (i.value.result) {
                /** last not-eff letStmt must be turned into explicit return */
                yield s.enter(i.pos, Block.pure);
                if (s.curLev()) yield* Kit.reposOne(s.sub(), Tag.push);
                yield* s.leave();
                s.close(i);
                continue;
              }
              break;
          }
        }
        yield i;
      }
      return res;
    }
    return walk();
  },
  function* convert(si) {
    const s = Kit.auto(si);
    const needNextErrCont = !s.opts.defunct && !s.opts.inlineErrorContAssign;
    const needNextResCont =
      !s.opts.defunct &&
      !s.opts.inlineResultContAssign &&
      s.opts.storeResultCont;
    const frames = [];
    function setGoto(jumps, value) {
      for (const i of jumps) if (i.goto == null) i.goto = value;
    }
    function* _convert(sw, cur, chain) {
      for (const i of sw) {
        if (i.enter) {
          switch (i.type) {
            case Tag.IfStatement:
              yield i;
              yield* s.one();
              invariant(!cur.length);
              cur.push(...(yield* _convert(s.one(), [], chain)));
              if (s.curLev() != null)
                cur.push(...(yield* _convert(s.one(), [], chain)));
              yield s.close(i);
              continue;
            case Block.chain:
              {
                const fl = frames.length;
                const lab = s.label();
                if (i.pos !== Tag.push || i.value.directives) {
                  yield s.enter(i.pos, Tag.BlockStatement);
                  if (i.value.directives) yield* i.value.directives;
                  yield s.enter(Tag.body, Tag.Array);
                }
                cur = yield* _convert(s.sub(), cur, i.value);
                const goto = frames.length > fl ? frames[fl][0].value : null;
                yield s.tok(Tag.push, Ctrl.jump, { goto });
                yield* lab();
                if (i.value.brkRefs)
                  for (const j of i.value.brkRefs) {
                    cur.push(j);
                  }
                s.close(i);
              }
              continue;
            case Block.frame:
              setGoto(cur, i.value);
              i.value.repeat = [];
              /** the frame should be present in final output */
              i.value.noInline = false;
              i.value.chain = chain;
              i.value.declSym = Kit.scope.newSym("_");
              const inner = [i];
              frames.push(inner);
              cur = Kit.result(
                Kit.repos(_convert(s.sub(), [], chain), Tag.push),
                inner
              );
              if (!i.value.eff && inner[inner.length - 1].type !== Ctrl.jump) {
                const j = s.tok(Tag.push, Ctrl.jump);
                inner.push(j);
                cur.push(j.value);
              }
              inner.push(s.close(i));
              continue;
            case Block.app:
              if (i.value.eff) {
                invariant(!cur.length);
                let fl = frames.length;
                const bodyJumps = yield* _convert(s.one(), cur, chain);
                const j = s.curLev();
                let params;
                if (j.pos === Tag.params) {
                  const j = s.take();
                  params = [...s.one()];
                  s.close(j);
                }
                const hl = frames.length;
                const hjumps = Kit.skip(_convert(s.one(), [], chain));
                const bodyOpen = frames[fl][0].value;
                const bodyClose = frames[hl - 1][0].value;
                const handle = frames[hl][0].value;
                const onOpen = bodyOpen.onOpen || (bodyOpen.onOpen = []);
                const onClose = bodyClose.onClose || (bodyClose.onClose = []);
                handle.tryBody = frames[fl][0].value;
                switch (i.value.sym) {
                  case Except.handleId:
                    const errSym = params.length && params[0].value.sym;
                    onOpen.unshift(
                      s.enter(Tag.push, catchBlock, { handle: handle, errSym })
                    );
                    onClose.push(...s.leave());
                    cur = bodyJumps.concat(hjumps);
                    break;
                  case Except.finallyId:
                    const finJump = {
                      declSym: unboundTempVar(s.first.value, "fc"),
                      catchContRedir: needNextErrCont && {
                        declSym: unboundTempVar(s.first.value, "fe")
                      },
                      resultContRedir: needNextResCont && {
                        declSym: unboundTempVar(s.first.value, "fr")
                      },
                      dynamicJump: true,
                      instances: new Set(),
                      handle,
                      defaultJumps: bodyJumps
                    };
                    handle.contArg = finJump;
                    onOpen.unshift(s.enter(Tag.push, finallyBlock, { handle }));
                    onClose.push(...s.leave());
                    setGoto(hjumps, finJump);
                    cur = bodyJumps;
                    break;
                  default:
                    throw s.error(`unsupported "app" ${i.value.node.name}`);
                }
                s.close(i);
                const handleClose = frames[frames.length - 1][0].value;
                (handle.onOpen || (handle.onOpen = [])).unshift(
                  s.enter(Tag.push, handleBlock, {})
                );
                (handleClose.onClose || (handleClose.onClose = [])).push(
                  ...s.leave()
                );
                cur.push((handle.frameAfterTry = { close: handleClose }));
                continue;
              }
              break;
            case Block.pure:
              const pj = s.enter(i.pos, Ctrl.jump, { result: i.value.result });
              yield pj;
              if (!i.leave) {
                yield* s.sub();
                s.close(i);
              }
              cur.push(pj.value);
              yield* s.leave();
              continue;
            case Block.letStmt:
              const j = s.curLev();
              if (
                j != null &&
                j.type === Block.pure &&
                (!i.value.bindName || i.value.bindName === s.opts.bindName)
              ) {
                s.take();
                i.value.eff = false;
                i.value.bindName = i.value.opSym = void 0;
                yield s.enter(i.pos, Ctrl.jump, i.value);
                if (!j.leave) yield* s.sub();
                yield* s.leave();
                s.close(j);
                s.close(i);
                cur.push(i.value);
                continue;
              }
              yield* s.copy(i);
              if (i.value.eff) cur.push(i.value);
              continue;
            case Loop.repeat:
              const fl = frames.length;
              const ncur = yield* _convert(s.sub(), cur, chain);
              const nfl = frames.length;
              if (nfl > fl) {
                const k = frames[fl][0].value;
                for (const l of ncur) if (l.goto == null) l.goto = k;
              }
              cur = [];
              s.close(i);
              continue;
          }
        }
        yield i;
      }
      return cur;
    }
    for (const i of s) {
      switch (i.type) {
        case Block.chain:
          if (i.enter) {
            yield Kit.setPos(i, Tag.body);
            yield* _convert(s.sub(), [], i.value);
            for (const j of frames) {
              const v = j[0].value;
              if (v.onOpen) {
                yield* v.onOpen;
                v.onOpen = null;
              }
              yield* j;
              if (v.onClose) {
                yield* v.onClose;
                v.onClose = null;
              }
            }
            yield Kit.setPos(s.close(i), Tag.body);
            continue;
          }
          break;
        default:
          yield i;
      }
    }
  },
  Policy.stage("rawConvert"),
  Kit.toArray,
  // sets a few useful fields
  function postproc(sa) {
    const s = Kit.auto(sa);
    const bindName = s.opts.bindName || "chain";
    _postproc();
    return sa;
    function _postproc() {
      for (const i of s.sub()) {
        if (i.enter) {
          switch (i.type) {
            case Block.frame:
              for (const j of s.sub()) {
                if (j.enter) {
                  switch (j.type) {
                    case Block.bindPat:
                      break;
                    case Block.letStmt:
                      if (!j.value.eff) {
                        j.value.ref = i.value;
                        break;
                      }
                      if (j.value.bindName == null) j.value.bindName = bindName;
                      j.value.suspending = j.value.bindName !== bindName;
                    case Ctrl.jump:
                      const bindJump = j.type === Block.letStmt;
                      j.value.bindJump = bindJump;
                      // avoiding inlining of some frame after for-of
                      j.value.ref = i.value;
                  }
                }
              }
          }
        }
      }
    }
  },
  /** wraps chain with extra frames for exiting the function */
  function* wrapChain(sa) {
    const s = Kit.auto(sa);
    const root = s.first.value;
    root.pureExitFrame = {
      declSym: s.opts.defunct ? Defunct.pureFrameSym : root.pureId,
      last: true,
      enters: new Set(),
      exits: new Set(),
      frameParamsClos: new Set()
    };
    let first = sa.find(i => i.type === Block.frame);
    if (!first) return s;
    first = first.value;
    let chain;
    for (const i of s) {
      yield i;
      if (i.enter && i.type === Block.chain) {
        chain = i.value;
        break;
      }
    }
    const j = s.cur();
    function* ctrlFrames() {
      const sym = (root.resSym = unboundTempVar(root, "r"));
      sym.optional = true;
      const psym = Kit.scope.newSym("r");
      const fr = s.enter(Tag.push, Block.frame, {
        declSym: Kit.scope.newSym("retv"),
        root,
        errSym: psym,
        last: true
      });
      /** # a frame returning its argument */
      root.resFrameRedir = fr.value;
      yield fr;
      yield s.enter(j.pos, Block.app, { sym: root.pureId, insideCtx: true });
      yield s.tok(Tag.push, Tag.Identifier, { sym: psym });
      yield* s.leave();
      yield* s.leave();
      const esym = Kit.scope.newSym("e"); // Bind.tempVarSym(root)
      const er = s.enter(Tag.push, Block.frame, {
        declSym: Kit.scope.newSym("errv"),
        root,
        errSym: esym
      });
      yield er;
      root.errFrameRedir = er.value;
      yield s.enter(j.pos, Block.app, { sym: root.raiseId, insideCtx: true });
      yield s.tok(Tag.push, Tag.Identifier, { sym: esym });
      yield* s.leave();
      yield* s.leave();
      /** a frame returning `resSym` */
      const f = s.enter(Tag.push, Block.frame, {
        declSym: Kit.scope.newSym("ret"),
        root,
        last: true,
        chain
      });
      f.value.resultRedir = { errSym: psym, redir: fr.value };
      root.resFrame = f.value;
      yield f;
      yield s.enter(Tag.push, Ctrl.jump, {
        goto: fr.value,
        ref: f.value,
        eff: true,
        op: null,
        opSym: null,
        bindJump: false,
        init: false
      });
      yield s.tok(Tag.push, Tag.Identifier, {
        sym,
        lhs: false,
        rhs: true,
        decl: false
      });
      yield* s.leave();
      yield* s.leave();
      return [sym, f.value, fr.value, er.value];
    }
    const frame = s.enter(Tag.push, Block.frame, {
      declSym: Kit.scope.newSym("_"),
      root,
      result: false
    });
    yield frame;
    if (root.opts.scopePrefix) {
      const name = root.opts.scopePrefix.substr
        ? root.opts.scopePrefix
        : "scope";
      yield s.enter(Tag.push, Block.letStmt, {
        goto: first,
        ref: frame.value,
        eff: true,
        op: null,
        opSym: Kit.sysId(name),
        bindName: name,
        bindJump: true,
        init: true
      });
    } else {
      yield s.enter(Tag.push, Ctrl.jump, {
        goto: first,
        ref: frame.value,
        eff: true,
        op: null,
        opSym: scopeSym,
        bindJump: false,
        init: true
      });
    }
    yield* s.leave();
    yield* s.leave();
    const resFrameCont = Kit.toArray(ctrlFrames());
    yield* s.sub();
    // needs to be in the end so `cleanup` pass can remove them if needed
    yield* resFrameCont;
    yield* s;
  },
  /**
   * for each frame and jump adds
   *   finally continuations:
   *   - preCompose: FrameVal[]
   *   catch continuations for frames:
   *   - catchCont - {
   *       // finally frames to execute on exit
   *       preCompose:FrameVal[],
   *       errSym:Sym,
   *       // handler
   *       goto:FrameVal,
   *       // stack of `catch`/`finally` handlers for this frame
   *       stack: FrameVal[]
   *       // stack of `catch`/`finally` handler frames
   *       hstack: FrameVal[]
   *       }
   */
  Kit.toArray,
  function preComposeTryCatch(si) {
    const s = Kit.auto(si);
    const root = s.first.value;
    const { resFrame } = root;
    const preCompose = root.preCompose || [];
    preCompose.unshift(resFrame);
    const errPreCompose = [];
    const errSym = unboundTempVar(root, "err");
    return Kit.toArray(
      walk({ goto: null, errSym, preCompose: [], stack: [], hstack: [] })
    );
    function* walk(cc) {
      for (const i of s.sub()) {
        if (i.enter) {
          switch (i.type) {
            case finallyBlock:
              const cont = i.value.handle.contArg;
              preCompose.unshift(i.value.handle);
              errPreCompose.unshift(i.value.handle);
              const errSym = unboundTempVar(root, "err");
              yield* walk({
                goto: cc.goto,
                errSym,
                preCompose: [...errPreCompose],
                stack: [...cc.stack, i.value.handle],
                hstack: cc.hstack
              });
              preCompose.shift();
              errPreCompose.shift();
              s.close(i);
              const fh = s.take();
              invariant(fh.type === handleBlock);
              const args = cont.args || (cont.args = new Map());
              addArg(args, cc.errSym, errSym);
              yield* walk({
                goto: cc.goto,
                errSym: cc.errSym,
                preCompose: cc.preCompose,
                stack: cc.stack,
                hstack: [...cc.hstack, i.value.handle]
              });
              s.close(fh);
              continue;
            case catchBlock:
              yield* walk({
                goto: i.value.handle,
                errSym: i.value.errSym,
                preCompose: [...cc.preCompose],
                stack: [...cc.stack, i.value.handle],
                hstack: cc.hstack
              });
              s.close(i);
              const ch = s.take();
              invariant(ch.type === handleBlock);
              yield* walk({
                goto: cc.goto,
                errSym: cc.errSym,
                preCompose: cc.preCompose,
                stack: cc.stack,
                hstack: [...cc.hstack, i.value.handle]
              });
              s.close(ch);
              continue;
            case Block.letStmt:
              if (!i.value.eff) break;
            case Ctrl.jump:
              if (i.value.goto) {
                if (i.value.goto.handle)
                  i.value.goto.preCompose = i.value.goto.handle.preCompose;
              }
              i.value.preCompose = [...preCompose];
              break;
            case Block.frame:
              i.value.catchCont = cc;
              /** collects chain of finally blocks to be executed here */
              i.value.preCompose = [...preCompose];
              i.value.errPreCompose = [...errPreCompose];
              break;
          }
        }
        yield i;
      }
    }
  },
  Kit.toArray,
  /**
   * for try-finally (without catch) statements generates a frame for throwing
   * catched exception again
   */
  function* addReThrowFrames(si) {
    const s = Kit.auto(si);
    const root = s.first.value;
    const termFrames = [];
    const errFrames = new Map();
    function* makeErrFrame(catchCont) {
      const lab = s.label();
      const sym = catchCont.errSym;
      const res = s.enter(Tag.push, Block.frame, {
        declSym: Kit.scope.newSym("throw_"),
        root,
        eff: true,
        throwSym: sym,
        insideCtx: true
      });
      yield res;
      yield s.enter(Tag.push, Block.app, {
        sym: root.raiseId,
        insideCtx: true,
        last: true
      });
      yield s.tok(Tag.push, Tag.Identifier, {
        sym,
        lhs: false,
        rhs: true,
        decl: false
      });
      yield* lab();
      return res.value;
    }
    for (const i of s) {
      yield i;
      if (i.type === Block.chain) break;
    }
    for (const i of s.sub()) {
      yield i;
      if (i.enter && i.type === Block.frame) {
        const { catchCont } = i.value;
        if (!catchCont.goto) {
          let frame = errFrames.get(catchCont.errSym);
          if (!frame) {
            const content = Kit.toArray(makeErrFrame(catchCont));
            frame = content[0].value;
            termFrames.push(...content);
            errFrames.set(catchCont.errSym, frame);
          }
          catchCont.goto = frame;
        }
      }
    }
    yield* termFrames;
    yield* s;
  },
  /**
   * emits auxiliary frames if there are jumps through several finally blocks
   */
  function* composeFinallyBlocks(si) {
    const s = Kit.auto(si);
    const root = s.first.value;
    const { resFrame, resSym, errFrameRedir } = root;
    const storeResultCont = root.opts.storeResultCont || root.opts.defunct;
    const redirFrames = [];
    for (const i of s) {
      yield i;
      if (i.type === Block.chain) break;
    }
    for (const i of s.sub()) {
      if (i.enter && i.type === Block.frame) {
        yield* frame(i);
        continue;
      }
      yield i;
    }
    yield* redirFrames;
    yield* s;
    function cutChain(jump, dstChain) {
      let res = jump.preCompose || emptyArr;
      if (!res.length) return res;
      res = [...res];
      const dst = jump.goto;
      if (!dst) return res;
      if (!dstChain) return res;
      for (const i of Kit.reverse(dstChain)) {
        if (i === res[res.length - 1]) res.pop();
        else break;
      }
      return res;
    }
    function preComposeFrame(jump, chain) {
      const len = chain.length;
      jump.preCompose = null;
      if (len) {
        const indirJumps = (jump.indirJumps = new Map());
        for (let i = 0; ; ) {
          const step = chain[i++];
          const cont = step.contArg;
          if (i < len) {
            const next = chain[i];
            indirJumps.set(next, cont);
            cont.instances.add(next);
          } else {
            if (jump.goto) {
              if (cont) {
                indirJumps.set(jump.goto, cont);
                cont.instances.add(jump.goto);
              }
            } else {
              if (jump.result) {
                resSym.bound = true;
                (jump.frameArgs || (jump.frameArgs = new Map())).set(
                  resSym,
                  Block.argSym
                );
              }
            }
            break;
          }
        }
        jump.indirGoto = jump.goto;
        jump.goto = chain[0];
      }
    }
    function* makeRedir(cont) {
      if (cont.goto && cont.goto.throwSym) {
        cont.redir = errFrameRedir;
        return;
      }
      const sym = Kit.scope.newSym();
      const redir = s.enter(Tag.push, Block.frame, {
        declSym: Kit.scope.newSym("ce_"),
        root,
        errSym: sym,
        savedDecls: new Map()
      });
      cont.redir = redir.value;
      yield redir;
      const args = new Map(cont.frameArgs);
      yield s.tok(Tag.push, Ctrl.jump, {
        goto: cont.goto,
        ref: redir.value,
        indirJumps: cont.indirJumps,
        frameArgs: args
      });
      if (cont.errSym) {
        cont.errSym.bound = true;
        args.set(cont.errSym, sym);
      }
      yield* s.leave();
    }
    function* frame(i) {
      const frame = i.value;
      let { catchCont } = i.value;
      function getResCont() {
        if (frame.resultCont) return frame.resultCont;
        const result = (frame.preCompose && frame.preCompose[0]) || resFrame;
        if (result.resultRedir) return (frame.resultCont = result.resultRedir);
        const resCont = (frame.resultCont = result.resultRedir = {
          errSym: resSym
        });
        preComposeFrame(resCont, frame.preCompose);
        redirFrames.push(...makeRedir(resCont));
        if (resCont.goto) resCont.goto.noInline = true;
        return resCont;
      }
      if (catchCont) {
        if (!catchCont.composed) {
          const chain = cutChain(
            catchCont,
            catchCont.goto && catchCont.goto.errPreCompose
          );
          preComposeFrame(catchCont, chain);
          redirFrames.push(...makeRedir(catchCont));
          catchCont.composed = true;
        }
        i.value.catchContRedir = catchCont.redir;
        if (catchCont.goto) catchCont.goto.noInline = true;
      } else i.value.catchContRedir = errFrameRedir;
      yield i;
      if (catchCont && !catchCont.goto) catchCont = null;
      if (!frame.savedDecls) frame.savedDecls = new Map();
      for (const j of s.sub()) {
        if (j.enter) {
          if (storeResultCont) getResCont();
          switch (j.type) {
            case Block.letStmt:
              if (!j.value.eff) break;
            case Ctrl.jump:
              if (frame === resFrame) break;
              preComposeFrame(
                j.value,
                cutChain(
                  j.value,
                  (j.value.goto && j.value.goto.preCompose) || emptyArr
                )
              );
              if (
                j.type === Block.letStmt &&
                j.value.goto === resFrame &&
                j.value.result
              ) {
                const resultCont = getResCont();
                j.value.goto = resultCont.goto;
                j.value.sym = resultCont.errSym;
              }
              break;
          }
        }
        yield j;
      }
      if (frame.resultCont) frame.resultContRedir = frame.resultCont.redir;
      yield s.close(i);
    }
  },
  Inline.throwStatements,
  Kit.toArray,
  function cfgPostProc(sa) {
    const root = sa[0].value;
    Ctrl.convolveFrames(sa);
    let cfg = root.cfg;
    cfg = Opt.removeUnreachable(cfg);
    Ctrl.instantiateJumps(cfg);
    Ctrl.resetEnters(cfg);
    for (const i of cfg) {
      if (i.throwSym) i.throwSym.bound = true;
      for (const j of i.exits) jumpArgs(j);
      if (i.catchCont) jumpArgs(i.catchCont);
    }
    return Block.cleanup(sa);
  },
  Opt.removeSingleJumps,
  Kit.toArray
);

/** converts indirect jumps into symbol arguments */
function jumpArgs(j) {
  if (j.indirJumps) {
    const args = j.frameArgs || (j.frameArgs = new Map());
    for (const [dest, cont] of j.indirJumps) {
      if (!cont.reachable) continue;
      args.set(cont.declSym, dest.declSym);
      cont.declSym.bound = true;
      if (cont.resultContRedir && dest.resultContRedir) {
        args.set(cont.resultContRedir.declSym, dest.resultContRedir.declSym);
        cont.resultContRedir.declSym.bound = true;
        dest.resultContRedir.required = true;
        cont.resultContRedir.required = true;
      }
      if (cont.catchContRedir && dest.catchContRedir) {
        args.set(cont.catchContRedir.declSym, dest.catchContRedir.declSym);
        cont.catchContRedir.required = true;
        dest.catchContRedir.required = true;
        cont.catchContRedir.declSym.bound = true;
      }
    }
  }
}

/** generates local copies of variables used in each frame */
function* copyFrameVars(si) {
  const s = Kit.auto(si);
  const frame = yield* s.till(i => i.enter && i.type === Block.frame);
  const root = s.first.value;
  if (!root.savedDecls) root.savedDecls = new Map();
  const reuseTemps = s.opts.reuseTempVars !== false;
  const commonPatSym = root.commonPatSym;
  yield* frameContent(frame.value);
  for (const i of s) {
    yield i;
    if (i.enter && i.type === Block.frame) yield* frameContent(i.value);
  }
  function isRef(sym) {
    return sym.interpr === Bind.ctxField || sym.interpr === Bind.closureVar;
  }
  function* frameContent(frame) {
    const first = frame === root.first;
    const decls = frame.savedDecls;
    const sw = frame.stateVars;
    const vars = new Set();
    if (sw) {
      sw.w.forEach(vars.add, vars);
      sw.r.forEach(vars.add, vars);
    }
    const patSym = frame.errSym || frame.patSym;
    let patCopy;
    /** optimizing expressions like `v = await e` */
    if (patSym && isRef(patSym) && patSym.extBind) {
      patCopy = commonPatSym || Kit.scope.newSym();
      yield s.enter(Tag.push, Tag.AssignmentExpression, {
        node: { operator: "=" }
      });
      let patOrig = patSym;
      if (patSym.assignedAt) {
        const { assignPat } = patSym.assignedAt;
        if (!assignPat.parCopy && assignPat.interpr) {
          patOrig = assignPat;
          patSym.removed = patSym.assignedAt.removed = true;
        }
      }
      yield s.tok(Tag.left, Tag.Identifier, { sym: patOrig });
      yield s.tok(Tag.right, Tag.Identifier, { sym: patCopy });
      yield* s.leave();
    } else if (commonPatSym) {
      patCopy = commonPatSym;
    }
    if (patCopy) {
      if (frame.errSym) {
        // for (const i of frame.enters)
        //  if (i.sym === frame.errSym) i.sym = patCopy;
        frame.errSym = patCopy;
      } else frame.patSym = patCopy;
    }
    const tempVars = [];
    const substPatSym =
      commonPatSym && patSym
        ? function*() {
            for (const i of s.sub()) {
              if (
                i.enter &&
                (i.type === Block.bindPat || i.type === Tag.Identifier) &&
                i.value.sym === patSym
              )
                i.value.sym = commonPatSym;
              yield i;
            }
          }
        : function() {
            return s.sub();
          };
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Block.bindPat:
          case Tag.Identifier:
            const { sym } = i.value;
            if (sym) {
              if (commonPatSym && sym === patSym) i.value.sym = commonPatSym;
              else if (sym.interpr === Bind.ctxField)
                i.value.insideCtx = !frame.first;
            }
            break;
          case Tag.AssignmentExpression:
            if (i.value.removed) {
              Kit.skip(s.copy(i));
              continue;
            }
            break;
          case Block.letStmt:
            if (!i.value.eff) break;
          case Ctrl.jump:
            if (!i.value.gotoDests.length) break;
            const { goto } = i.value;
            let gotoSym, catchContSym, resultContSym;
            if (goto) {
              const { catchContRedir: cc, resultContRedir: rc } = goto;
              gotoSym = goto && goto.declSym;
              catchContSym = cc && !cc.removed && cc.declSym;
              resultContSym = rc && !rc.removed && rc.declSym;
            }
            const del = new Set();
            const args = i.value.frameArgs;
            let assignArg;
            const assign = [];
            if (args) {
              for (let [left, right] of args) {
                if (isRef(left)) {
                  if (right === Block.argSym) assignArg = left;
                  else {
                    if (commonPatSym && patSym && right === patSym)
                      right = commonPatSym;
                    assign.push([
                      left,
                      [s.tok(Tag.right, Tag.Identifier, { sym: right })]
                    ]);
                  }
                }
              }
            }
            if (!first && !i.value.reflected && s.opts.cleanupFrameVars) {
              const nextList = [];
              for (const j of i.value.gotoDests)
                nextList.push(...j.frameParamsClos);
              const next = new Set(nextList);
              for (const i of vars) {
                if (i.removed) continue;
                if (!next.has(i) && !i.closCapt && isRef(i)) del.add(i);
              }
            }
            assign.sort(byNumFst);
            let inner = i.leave ? null : Kit.toArray(substPatSym());
            if (assignArg && inner && inner.length) {
              assign.push([assignArg, Kit.reposOneArr(inner, Tag.right)]);
              inner = null;
            }
            if (del.size) {
              const delList = [];
              const subst = new Map();
              let tmpVarNum = 0;
              function getCopy(sym) {
                let copy = subst.get(sym);
                if (!copy) {
                  if (!reuseTemps || !(copy = tempVars[tmpVarNum++])) {
                    copy = Kit.scope.newSym();
                    if (reuseTemps) tempVars.push(copy);
                    decls.set(copy, { raw: null });
                  }
                  assign.push([
                    copy,
                    [s.tok(Tag.right, Tag.Identifier, { sym })]
                  ]);
                  subst.set(sym, copy);
                }
                return copy;
              }
              if (inner) {
                for (const j of inner) {
                  let sym;
                  if (j.enter) {
                    switch (j.type) {
                      case Block.bindPat:
                        if (commonPatSym && patSym && j.value.sym === patSym) {
                          j.value.sym = commonPatSym;
                          break;
                        }
                      case Tag.Identifier:
                        if ((sym = j.value.sym) && del.has(sym))
                          j.value.sym = getCopy(sym);
                    }
                  }
                }
              }
              if (gotoSym && del.has(gotoSym)) gotoSym = getCopy(gotoSym);
              if (catchContSym && del.has(catchContSym))
                catchContSym = getCopy(catchContSym);
              if (resultContSym && del.has(resultContSym))
                resultContSym = getCopy(resultContSym);
              for (const i of del)
                delList.push([i, [s.tok(Tag.right, Tag.NullLiteral)]]);
              delList.sort(byNumFst);
              assign.push(...delList);
            }
            const lab = s.label();
            invariant(i.pos === Tag.push);
            i.value.gotoSym = gotoSym;
            i.value.catchContSym = catchContSym;
            i.value.resultContSym = resultContSym;
            if (assign.length) {
              yield s.enter(Tag.push, Tag.SequenceExpression);
              yield s.enter(Tag.expressions, Tag.Array);
              for (const [sym, init] of assign) {
                yield s.enter(Tag.push, Tag.AssignmentExpression, {
                  node: { operator: "=" }
                });
                yield s.tok(Tag.left, Tag.Identifier, { sym });
                yield* init;
                yield* s.leave();
              }
              yield* lab();
            }
            yield s.peel(i);
            if (inner && inner.length) yield* Kit.reposOneArr(inner, Tag.push);
            yield* lab();
            continue;
        }
      }
      yield i;
    }
  }
}

export function interpretFrames(si) {
  const s = Kit.auto(si);
  const root = s.first.value;
  const rootName = root.rootName;
  const top = !!s.opts.topLevel;
  if (top) root.module.hasTop = true;
  let paramPrefix = function*() {};
  const ctxSym = s.first.value.contextSym;
  if (ctxSym && ctxSym.bound && s.opts.contextBy === "parameter") {
    paramPrefix = function*() {
      yield s.tok(Tag.push, Tag.Identifier, { sym: ctxSym });
    };
  }
  const byThis = ctxSym && s.opts.contextBy === "this";
  let num = 0;
  function* walk() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Block.chain:
            yield s.enter(i.pos, Tag.BlockStatement);
            if (i.value.directives) yield* i.value.directives;
            yield s.enter(Tag.body, Tag.Array);
            yield* walk();
            yield* s.leave();
            yield* s.leave();
            s.close(i);
            continue;
          case Block.bindPat:
            yield s.tok(i.pos, Tag.Identifier, i.value);
            s.close(i);
            continue;
          case Block.frame:
            const fn = num++;
            i.value.moveToTop = top;
            const flab = s.label();
            if (fn !== 0) {
              i.value.declSym.orig = `${rootName}_${fn}`;
              if (byThis)
                (i.value.savedDecls || (i.value.savedDecls = new Map())).set(
                  ctxSym,
                  { raw: null, init: [s.tok(Tag.init, Tag.ThisExpression)] }
                );
              i.value.func = true;
              yield s.enter(Tag.push, Tag.FunctionDeclaration, i.value);
              yield s.tok(Tag.id, Tag.Identifier, {
                sym: i.value.declSym,
                decl: true
              });
              const paramLab = s.label();
              yield s.enter(Tag.params, Tag.Array);
              yield* paramPrefix(i.value);
              if (i.value.ctrlParam)
                yield s.tok(Tag.push, Tag.Identifier, {
                  sym: i.value.ctrlParam
                });
              const patSym = i.value.errSym || i.value.patSym;
              if (patSym && !patSym.dummy)
                yield s.tok(Tag.push, Tag.Identifier, { sym: patSym });
              yield* paramLab();
              yield s.enter(Tag.body, Tag.BlockStatement);
              yield s.enter(Tag.body, Tag.Array);
            } else {
              // first frame is erased, so copying its vars here
              const { savedDecls } = root;
              for (const [j, v] of i.value.savedDecls)
                if (!savedDecls.has(j)) savedDecls.set(j, v);
            }
            yield* walk();
            yield* flab();
            s.close(i);
            continue;
        }
      }
      yield i;
    }
  }
  return walk();
}

/** converts `letStmt` and `jump` into JS expressions*/

export function interpretJumps(si) {
  const s = Kit.auto(si);
  const { bindName, pureBindName } = s.opts;
  const root = s.first.value;
  const passCont = !s.opts.inlineContAssign;
  const passCatchCont = !s.opts.defunct && !s.opts.inlineErrorContAssign;
  const passResultCont = !s.opts.defunct && !s.opts.inlineResultContAssign;
  const { markRepeat, keepLastPure } = s.opts;
  return _interpretJumps();
  function* _interpretJumps() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Block.letStmt:
            if (!i.value.eff) break;
          case Ctrl.jump:
            const frame = i.value.ref;
            const pure = i.type === Ctrl.jump;
            const insideCtx = !frame.first;
            const lab = s.label();
            const { goto, gotoDests, delegateCtx } = i.value;
            let rec = pure && markRepeat && i.value.rec;
            const pos = i.pos;
            const defaultName = pure ? pureBindName : bindName;
            let name = i.value.bindName || defaultName;
            const st = s.opts.static || !s.opts.methodOps[name];
            if (
              (!gotoDests.length && name === defaultName) ||
              (!keepLastPure && pure && goto === root.pureExitFrame)
            ) {
              yield pure
                ? s.enter(pos, Block.app, {
                    sym: root.pureId,
                    insideCtx,
                    delegateCtx,
                    reflected: i.value.reflected,
                    tmpVar: i.value.tmpVar
                  })
                : s.enter(pos, Block.effExpr, {
                    reflected: i.value.reflected,
                    tmpVar: i.value.tmpVar
                  });
              if (!i.leave) yield* _interpretJumps();
            } else {
              let catchCont, resCont;
              if (goto) {
                if (passCatchCont && i.value.catchContSym)
                  catchCont = i.value.catchContSym;
                if (passResultCont && i.value.resultContSym)
                  resCont = i.value.resultContSym;
              }
              const appVal = {
                fam: Kit.sysId(name),
                static: st,
                insideCtx: !i.value.ref.first,
                delegateCtx,
                passCont,
                goto: i.value.gotoSym,
                result: name === "scope",
                reflected: i.value.reflected,
                tmpVar: i.value.tmpVar,
                cloneCtx: i.value.cloneCtx
              };
              if (s.curLev()) {
                if (s.opts.markBindValue !== false) name += "B";
                appVal.hasBindVal = true;
              } else if (
                i.type === Ctrl.jump &&
                s.opts.markBindValue === false
              ) {
                appVal.hasBindVal = true;
              }
              if (rec) {
                name += "R";
                appVal.noInline = true;
              }
              if (catchCont && passCatchCont) {
                if (s.opts.markErrorCont !== false) name += "H";
                appVal.hasErrorCont = true;
              }
              if (resCont && passResultCont) {
                if (s.opts.markResultCont !== false) name += "F";
                appVal.hasResultCont = true;
              }
              appVal.sym = Kit.sysId(name);
              if (passCont) appVal.hasCont = true;
              yield s.enter(pos, Block.app, appVal);
              invariant(goto);
              if (s.curLev()) yield* _interpretJumps();
              else if (appVal.hasBindVal)
                yield s.tok(Tag.push, Tag.Identifier, {
                  sym: Kit.scope.undefinedSym
                });
              if (passCont)
                yield s.tok(Tag.push, Tag.Identifier, { sym: i.value.gotoSym });
              if (catchCont && passCatchCont)
                yield s.tok(Tag.push, Tag.Identifier, { sym: catchCont });
              if (resCont && passResultCont)
                yield s.tok(Tag.push, Tag.Identifier, { sym: resCont });
              if (i.value.params)
                for (const sym of i.value.params)
                  yield s.tok(Tag.push, Tag.Identifier, { sym });
            }
            yield* lab();
            s.close(i);
            continue;
        }
      }
      yield i;
    }
  }
}

/** calculates `patSym` field */
function calcPatSym(cfg) {
  for (const i of cfg) {
    if (!i.errSym && !(i.patSym && !i.patSym.dummy)) {
      const { enters } = i;
      if (enters && enters.size > 0) {
        [{ sym: i.patSym }] = enters;
      }
    }
  }
}

/**
 * calculate inter-frame dependecies
 *  - `frameLocals: Set<Symbol>`: used or written by the frame but not read:
 *  - `frameParams: Set<Symbol>`: needed by the frame
 *  - `framePat: Set<Symbol>`: received from bound effectful value
 *  - `frameParamsClos: Set<Symbol>`: needed by the frame or some next frame
 */
function calcVarDeps(si) {
  let sa = Kit.toArray(si);
  const root = sa[0].value;
  Ctrl.convolveFrames(sa);
  sa = Kit.toArray(cleanup(sa));
  State.calcFlatCfg(root.cfg, sa);
  // if (!root.opts.keep
  return sa;
}

/**
 * For all symbols which are still in the programm setting `bound: true`
 */
function markBound(si) {
  const sa = Kit.toArray(si);
  for (const i of sa) {
    if (
      i.enter &&
      (i.type === Tag.Identifier || i.type === Block.bindPat) &&
      i.value.sym &&
      !i.value.sym.optional
    ) {
      i.value.sym.bound = true;
    }
  }
  return sa;
}

/**
 * if bind variable is used only in the frame where it is bound
 * we can avoid tracking it, also calculates `assignedAt` and `assignPat`
 * fields for each assignment expression with bindPat RHS
 */
function localizeBinds(sa) {
  let s = Kit.auto(sa);
  const forseBind = s.opts.markBindValue === false || s.opts.defunct;
  const rootDecls = s.first.value.savedDecls;
  const bindVars = new Set();
  if (s.opts.optBindAssign !== false) {
    for (const i of s) {
      switch (i.type) {
        case Tag.AssignmentExpression:
          if (
            i.value.node.operator === "=" &&
            s.cur().type === Tag.Identifier
          ) {
            i.value.assignPat = s.cur().value.sym;
            Kit.skip(s.one());
            if (s.cur().type === Block.bindPat)
              s.cur().value.sym.assignedAt = i.value;
          }
          break;
      }
    }
    s = Kit.auto(sa);
  }
  const bindExprs = [];
  for (const i of s) {
    if (i.enter && i.type === Block.frame) {
      if (i.value.patSym && !i.value.patSym.dummy) {
        i.value.patSym.boundAt = i.value;
        bindVars.add(i.value.patSym);
        i.value.patSym.extBind = false;
      }
      for (const j of s.sub()) {
        if (j.enter) {
          switch (j.type) {
            case Block.letStmt:
              if (!j.value.eff) {
                if (j.value.sym) {
                  j.value.sym.boundAt = i.value;
                  bindVars.add(j.value.sym);
                  j.value.sym.extBind = false;
                }
                break;
              }
            case Ctrl.jump:
              if (forseBind && j.value.gotoDests) {
                for (const k of j.value.gotoDests) {
                  if (!k.patSym && !k.errSym) {
                    const sym = Kit.scope.newSym();
                    sym.dummy = true;
                    k.patSym = sym;
                  }
                }
              }
              break;
            case Block.bindPat:
              j.value.ref = i.value;
              bindExprs.push(j.value);
              break;
          }
        }
      }
    }
  }
  for (const i of bindExprs) {
    if (i.sym.boundAt !== i.ref) {
      i.sym.extBind = true;
    }
  }
  for (const i of bindVars) {
    if (!i.extBind) {
      i.interpr = null;
      rootDecls.delete(i);
      if (i.bound && i.boundAt.patSym !== i)
        i.boundAt.savedDecls.set(i, { raw: null });
    }
  }
}

/**
 * removes a few useless items from resulting code
 *  - result/exception frames if they are not used
 *  - not bound identifiers
 */
function cleanup(si) {
  const sa = Kit.toArray(si);
  localizeBinds(sa);
  const s = Kit.auto(sa);
  const root = s.first.value;
  const {
    resFrame,
    resFrameRedir,
    errFrameRedir,
    resSym,
    savedDecls,
    contextSym
  } = root;
  const needResultCont = s.opts.keepLastPure || s.opts.storeResultCont;
  const needErrorCont = s.opts.keepLastRaise || s.opts.storeErrorCont;
  if (contextSym.bound === false) root.contextSym = null;
  const ns = s.opts.contextMethodOps && root.contextSym;
  for (const i of savedDecls.keys())
    if (i.bound === false) savedDecls.delete(i);
  const res = Kit.toArray(walk());
  for (const i of root.cfg) i.removed = true;
  root.cfg[0].removed = false;
  for (const i of root.cfg) {
    if (i.required) i.removed = false;
    for (const j of i.exits) markGoto(j);
    markGoto(i.catchCont);
    markGoto(i.resultCont);
    if (i.catchContRedir) i.catchContRedir.removed = false;
    if (i.resultContRedir) i.resultContRedir.removed = false;
  }
  return Block.cleanup(res);

  function markGoto(value) {
    if (!value) return;
    if (value.frameArgs) {
      for (const i of value.frameArgs.keys()) {
        if (!i.bound) value.frameArgs.delete(i);
      }
    }
    if (value.goto) {
      value.goto.removed = false;
      if (value.goto.dynamicJump) {
        for (const i of value.goto.instances) i.removed = false;
      }
    }
    if (value.indirJumps) {
      for (const i of value.indirJumps.keys()) i.removed = false;
    }
    if (value.redir) value.redir.removed = false;
  }
  function* writeResult(j) {
    yield s.enter(j.pos, Block.app, {
      sym: root.pureId,
      insideCtx: !j.value.ref.first
    });
    const args = j.value.frameArgs;
    let sym;
    if ((sym = args && args.get(resSym))) {
      if (sym === Block.argSym) yield* inner();
      else
        yield s.tok(Tag.push, Tag.Identifier, {
          sym,
          lhs: false,
          rhs: true,
          decl: false
        });
    } else if (s.curLev()) {
      yield* inner();
    } else if (resSym.bound)
      yield s.tok(Tag.push, Tag.Identifier, {
        sym: resSym,
        lhs: false,
        rhs: true,
        decl: false
      });
    yield* s.leave();
    s.close(j);
  }
  function* writeError(j) {
    const lab = s.label();
    const errSym = j.value.goto.throwSym;
    const sym =
      (errSym && j.value.frameArgs && j.value.frameArgs.get(errSym)) || errSym;
    yield s.enter(j.pos, Tag.CallExpression, { result: true });
    yield s.tok(Tag.callee, Tag.Identifier, { sym: root.raiseId, ns });
    yield s.enter(Tag.arguments, Tag.Array);
    yield s.tok(Tag.push, Tag.Identifier, {
      sym,
      lhs: false,
      rhs: true,
      decl: false
    });
    yield* lab();
    s.close(j);
  }
  function* inner() {
    for (const i of s.sub()) {
      if (
        i.enter &&
        i.type === Tag.Identifier &&
        i.value.sym &&
        i.value.sym.bound === false
      ) {
        Kit.skip(s.copy(i));
      } else yield i;
    }
  }
  function* walk() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Tag.ThrowStatement:
            if (i.pos === Tag.push) {
              yield i;
              if (!i.leave) {
                yield* inner();
                yield s.close(i);
              }
              Kit.skip(s.sub());
              continue;
            }
            break;
          case Block.frame:
            if (i.value.patSym && i.value.patSym.bound === false)
              i.value.patSym = null;
            if (i.value.errSym && i.value.errSym.bound === false)
              i.value.errSym = null;
            if (
              i.value.patSym &&
              i.value.patSym.interpr &&
              !i.value.patSym.bound
            ) {
              i.value.patSym.interpr = null;
              i.value.patSym.dummy = true;
            }
            if (i.value.catchContRedir) {
              if (
                i.value.catchContRedir === errFrameRedir &&
                !needErrorCont &&
                !(
                  i.value.catchCont &&
                  i.value.catchCont.indirJumps &&
                  i.value.catchCont.indirJumps.size
                )
              ) {
                i.value.catchContRedir = null;
                i.value.catchCont = null;
              }
            }
            if (i.value.resultContRedir) {
              if (!needResultCont) {
                i.value.resultContRedir = null;
                i.value.resultCont = null;
              }
            }
            if (i.value === resFrame) {
              yield i;
              for (const i of s.sub()) {
                if (
                  (i.type === Tag.Identifier || i.type === Block.bindPat) &&
                  i.value.sym &&
                  !i.value.sym.bound
                )
                  continue;
                yield i;
              }
              continue;
            }
            break;
          case Block.letStmt:
            if (i.value.sym && !i.value.sym.bound) i.value.sym = null;
            if (!i.value.eff) break;
          case Ctrl.jump:
            const args = i.value.frameArgs;
            if (args) {
              for (const j of args.keys())
                if (j.bound === false) args.delete(j);
            }
            if (i.value.goto === resFrameRedir && !needResultCont) {
              yield s.enter(i.pos, Block.effExpr, { result: i.value.result });
              yield* inner();
              yield* s.leave();
              s.close(i);
              continue;
            }
            if (i.value.goto === resFrame) {
              if (i.type === Ctrl.jump) {
                const [exit] = resFrame.exits;
                i.value.goto = exit && exit.goto;
                yield* writeResult(i);
                resFrame.enters.delete(i.value);
                continue;
              }
            } else if (i.value.goto && i.value.goto.throwSym) {
              if (i.type === Ctrl.jump) {
                const [exit] = i.value.goto.exits;
                yield* writeError(i);
                i.value.goto.enters.delete(i.value);
                i.value.goto = exit && exit.goto;
                continue;
              }
            }
        }
      }
      yield i;
    }
  }
}

/**
 * calcualtes transitive closure of frames' control flow graph if needed
 *
 *    type RootVal = RootVal & { cfg: FrameVal[] }
 *
 *    type FrameVal = FrameVal & {
 *      -- frames after this frame in control flow
 *      framesAfter: Set<FrameVal>,
 *      framesBefore: Set<FrameVal>
 *    }
 *
 *    type JumpLetVal = JumpLetVal & {
 *      // the jump is recursive
 *      rec: boolean
 *    }
 *
 * assumes the frames are topologically sorted
 */
function prepareCfg(sa) {
  const root = sa[0].value;
  const opts = root.opts;
  Ctrl.convolveFrames(sa);
  const cfg = root.cfg;
  calcPatSym(cfg);
  const needsTransClos = opts.par;
  const needsRec = opts.par || opts.markRepeat;
  root.pureExitFrame.framesAfter = new Map();
  if (!needsRec) return sa;
  if (needsRec) for (const i of cfg) i.calcBranchesVisited = false;
  if (needsTransClos)
    for (const i of cfg) {
      i.framesAfter = new Set();
      i.framesBefore = new Set();
    }
  if (needsRec)
    for (const i of cfg) {
      i.calcBranchesVisited = true;
      for (const j of i.exits) {
        const goto = j.indirGoto || j.goto;
        if (goto.calcBranchesVisited) {
          j.rec = true;
        }
      }
    }
  return sa;
}

/** conferts flat structure to JS expressions */
export const interpret = Kit.pipe(
  Inline.markSimpleRedir,
  markBound,
  prepareCfg,
  Par.convert,
  Policy.stage("flat-interpret-opt"),
  Opt.removeSingleJumps,
  Opt.inlineFrames,
  Policy.stage("flat-interpret-vars"),
  calcVarDeps,
  ifDefunct(Defunct.init),
  Par.postproc,
  Opt.inlinePureCont,
  Inline.storeContinuations,
  ifDefunct(Defunct.prepare),
  Gens.functionSentAssign,
  Bind.interpretPureLet,
  copyFrameVars,
  Policy.stage("interpretFrames"),
  ifDefunct(Defunct.convert),
  Policy.stage("clean-jumps"),
  Coerce.cleanPureJumps,
  Policy.stage("defunctFrames"),
  Inline.jumps,
  interpretJumps,
  Policy.stage("flat-interpret-3"),
  Inline.control,
  interpretFrames,
  Kit.toArray,
  ifDefunct(Defunct.substSymConsts)
);
