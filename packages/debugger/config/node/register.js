const config = require("../defaults");
const package = require("../../package.json");
const Persist = require("../../persist");
const path = require("path");
const babel = require("@babel/core");
const deepClone = require("lodash/cloneDeep");
const Debug = require("../../engine");
const registerCache = require("@babel/register/lib/cache");
const fs = require("fs");
const preset = require("../babel/preset-zero-config");
const cacheId = require("../cacheId");
const { normalizeDrive } = require("../../state");

global.Debug = Debug;
global.WebSocket = require("ws");

const Module = module.constructor;

const Mp = Module.prototype;

const savedCompile = Mp._compile;

const builtIn = Module.builtinModules.filter(i => {
  switch (i) {
    case "sys":
      return false;
  }
  if (/^(?:v8|node-inspect)\//g.test(i)) return false;
  return true;
});

let cache;

if (config.cache) {
  registerCache.load();
  cache = registerCache.get();
}

let babelOpts = config.babelOpts || {};

babelOpts = {
  ...babelOpts,
  caller: {
    name: "@effectful/debugger",
    ...(babelOpts.caller || {})
  }
};

function mtime(filename) {
  return +fs.statSync(filename).mtime;
}

for (const i of builtIn) {
  Persist.regModule(require(i), `node#{i}`);
}

let disabled = false;

const root = path.resolve(config.srcRoot);

const nodeModules = path.join(config.srcRoot, "node_modules");

// const knownConfigs = new WeakSet();

require.extensions[".ts"] = require.extensions[".tsx"] = require.extensions[
  ".jsx"
] = require.extensions[".js"];

const rootPath = normalizeDrive(fs.realpathSync(root));

const debuggerPath = normalizeDrive(
  fs.realpathSync(path.join(__dirname, "../.."))
);

const requirePath =
  path.sep === "\\"
    ? function requirePath(backend) {
        return path.join(debuggerPath, "backends", backend).replace(/\\/g, "/");
      }
    : function requirePath(backend) {
        return path.join(debuggerPath, "backends", backend);
      };

Mp._compile = function _compile(content, filename) {
  if (
    disabled ||
    (filename = normalizeDrive(filename)).startsWith(debuggerPath) ||
    !(filename.startsWith(nodeModules) || filename.startsWith(rootPath))
  )
    return savedCompile.call(this, content, filename);
  const blackbox = filename.startsWith(nodeModules);
  const moduleConfig = require("../defaults");
  const importRT = requirePath(moduleConfig.backend);
  if (config.verbose) {
    let msg = `DEBUGGER: compiling ${filename}, disabled:${disabled}, filename:${filename}, rt:${importRT}`;
    if (config.verbose > 1) msg += ` content:${JSON.stringify(content)}`;
  }
  disabled = true;
  let result;
  try {
    const opts = new babel.OptionManager().init(
      config.babelZeroConfig
        ? {
            presets: [
              [
                preset,
                {
                  blackbox,
                  timeTravel: config.timeTravel,
                  importRT,
                  staticBundler: false
                }
              ]
            ],
            babelrc: false,
            configFile: false,
            ...babelOpts,
            filename
          }
        : {
            sourceRoot: path.dirname(filename),
            ...deepClone(babelOpts),
            filename
          }
    );

    let cacheKey = `${JSON.stringify(opts)}@${cacheId}`;
    const env = babel.getEnv(false);
    if (env) cacheKey += `@${env}`;
    let cached = cache && cache[cacheKey];
    let curMtime = mtime(filename);
    if (!cached || cached.mtime !== curMtime) {
      if (config.verbose) console.error("DEBUGGER: Rebuilding");
      cached = babel.transformSync(content, opts);
      if (cache) {
        cache[cacheKey] = cached;
        cached.mtime = mtime(filename);
      }
    } else {
      if (config.verbose) console.error("DEBUGGER: Using the cached version");
    }
    if (config.hot) {
      let reloading = 0;
      if (config.verbose)
        console.error(`DEBUGGER: enabling hot swapping for ${filename}`);
      fs.watch(filename, { persistent: false, encoding: "utf-8" }, type => {
        const nextMtime = mtime(filename);
        if (config.verbose)
          console.error(
            `DEBUGGER: updating ${filename}`,
            type,
            curMtime,
            nextMtime
          );
        if (type !== "change" || curMtime === nextMtime) return;
        curMtime = nextMtime;
        if (reloading) clearTimeout(reloading);
        reloading = setTimeout(() => {
          reloading = 0;
          if (config.verbose) console.error(`DEBUGGER: Reloading ${filename}`);
          try {
            disabled = true;
            content = fs.readFileSync(filename, "utf-8");
            cached = babel.transformSync(content, opts);
            if (cache) {
              cache[cacheKey] = cached;
              cached.mtime = curMtime;
            }
            const run = new Function(
              "exports",
              "require",
              "module",
              "__filename",
              "__dirname",
              cached.code
            );
            run(
              this.exports,
              this.__effectful_js_require,
              this,
              filename,
              path.dirname(filename)
            );
          } catch (e) {
            console.error(`DEBUGGER: Error on building:${filename}`, e);
          } finally {
            disabled = false;
          }
        }, 500);
      });
    }
    if (config.verbose > 1)
      console.error(
        `DEBUGGER:compiled ${filename}: ${JSON.stringify(cached.code)}`
      );
    result = savedCompile.call(this, cached.code, filename);
  } finally {
    disabled = false;
  }
  return result;
};