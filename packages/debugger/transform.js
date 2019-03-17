module.exports = require("@effectful/core").babelPlugin(
  (opts, { Tag, Kit, Transform: T, Policy: P, presets }) => {
    return {
      options: {
        ...presets.defunct,
        name: "@effectful/debugger",
        importRT: "@effectful/debugger",
        contextBy: "this",
        par: false,
        topLevel: true,
        topIIFE: true,
        contextState: true,
        inlinePureJumps: "tail",
        inlineJsExceptions: true,
        modules: "commonjs",
        wrapFunction: "fun",
        injectModuleDescr: "module",
        defunctHandlerInProto: true,
        before: {
          finalize: injectScopeDescr
        },
        ...opts
      },
      main(input) {
        const s = Kit.auto(input);
        const stmtbrk = Kit.sysId("stmt");
        const debbrk = Kit.sysId("debugger");
        const callBrk = Kit.sysId("call");
        const objWrap = Kit.sysId("constr");
        T.run(insertBreaks(P.propagateOpts(configure())));
        function insertBreaks(si) {
          const s = Kit.auto(si);
          return _insertBreaks();
          function* _insertBreaks() {
            for (const i of s.sub()) {
              if (i.enter && s.opts.transform) {
                switch (i.type) {
                  case Tag.ReturnStatement:
                  case Tag.BreakStatement:
                  case Tag.ContinueStatement:
                  case Tag.IfStatement:
                  case Tag.SwitchStatement:
                  case Tag.ThrowStatement:
                  case Tag.TryStatement:
                  case Tag.WhileStatement:
                  case Tag.DoWhileStatement:
                  case Tag.ForStatement:
                  case Tag.VariableDeclaration:
                  case Tag.ExpressionStatement:
                  case Tag.WithStatement:
                    const lab = s.label();
                    if (i.pos !== Tag.push) {
                      yield s.enter(i.pos, Tag.BlockStatement);
                      yield s.enter(Tag.body, Tag.Array);
                    }
                    yield* brkStmt(i, stmtbrk);
                    yield s.peel(Kit.setPos(i, Tag.push));
                    if (!i.leave) yield* _insertBreaks();
                    yield* lab();
                    continue;
                  case Tag.DebuggerStatement:
                    yield* brkStmt(i, debbrk);
                    s.close(i);
                    continue;
                  case Tag.CallExpression:
                    yield* wrap(i, true, callBrk);
                    continue;
                  case Tag.ObjectExpression:
                  case Tag.ArrayExpression:
                  case Tag.NewExpression:
                    yield* wrap(i, false, objWrap);
                    continue;
                }
              }
              yield i;
            }
          }
          function* brkStmt(i, sym) {
            yield s.enter(i.pos, Tag.ExpressionStatement);
            yield* s.template(Tag.expression, "=$I($E)", { bind: true }, sym);
            yield* position(i.value.node.loc);
            yield* s.leave();
            yield* s.leave();
          }
          function* wrap(i, bind, sym) {
            yield* s.template(i.pos, "=$I($E)", { bind }, sym);
            yield s.peel(Kit.setPos(i, Tag.push));
            yield* _insertBreaks();
            yield* s.leave();
            yield* position(i.value.node.loc);
            yield* s.leave();
          }
        }
        function* configure() {
          for (const i of s) {
            if (i.enter) {
              switch (i.type) {
                case Tag.ClassMethod:
                case Tag.ClassPrivateMethod:
                  i.value.optsAssign = {
                    transform: i.value.node.kind === "method"
                  };
                  break;
                case Tag.FunctionDeclaration:
                case Tag.File:
                case Tag.FunctionExpression:
                case Tag.ArrowFunctionExpression:
                case Tag.ObjectMethod:
                  i.value.optsAssign = {
                    transform: !i.value.node.async && !i.value.node.generator
                  };
                  break;
              }
            }
            yield i;
          }
        }
      }
    };
    function* position(loc) {
      const { start: f, end: l } = loc;
      const value = `${f.line}:${f.column}-${l.line}:${l.column}`;
      yield Kit.tok(Tag.push, Tag.StringLiteral, { node: { value } });
    }
    function* injectScopeDescr(si) {
      const s = Kit.auto(si);
      const buf = [];
      for (const i of s) {
        yield i;
        if (i.enter && i.pos === Tag.body) break;
      }
      const inner = Kit.toArray(_inject());
      if (buf.length) {
        yield s.enter(Tag.push, Tag.VariableDeclaration, {
          node: { kind: "var" }
        });
        yield s.enter(Tag.declarations, Tag.Array);
        yield* buf;
        yield* s.leave();
        yield* s.leave();
      }
      yield* inner;
      yield* s;
      function* _inject() {
        for (const i of s.sub()) {
          if (
            i.enter &&
            i.value.wrapId &&
            i.value.scopeDecls &&
            i.value.scopeDecls.size
          ) {
            const sym = Kit.scope.newSym(`scope$${i.value.wrapId.orig}`);
            const args = i.value.wrapArgs || (i.value.wrapArgs = []);
            args.push(s.tok(Tag.push, Tag.Identifier, { sym }));
            const lab = s.label();
            buf.push(
              s.enter(Tag.push, Tag.VariableDeclarator),
              s.tok(Tag.id, Tag.Identifier, { sym }),
              s.enter(Tag.init, Tag.ObjectExpression),
              s.enter(Tag.properties, Tag.Array)
            );
            const flab = s.label();
            for (const j of i.value.scopeDecls) {
              if (!j.decl || !j.decl.value.node.loc || !j.fieldName) continue;
              let block = j.declRange;
              if (!block || !block.node.loc) continue;
              buf.push(
                s.enter(Tag.push, Tag.ObjectProperty),
                s.tok(Tag.key, Tag.Identifier, { node: { name: j.fieldName } }),
                s.enter(Tag.value, Tag.ArrayExpression),
                s.enter(Tag.elements, Tag.Array),
                s.tok(Tag.push, Tag.StringLiteral, {
                  node: { value: j.orig }
                }),
                ...position(j.decl.value.node.loc),
                ...position(block.node.loc),
                ...flab()
              );
            }
            buf.push(...lab());
          }
          yield i;
        }
      }
    }
  }
);
