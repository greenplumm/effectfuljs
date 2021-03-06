import * as S from "@effectful/serialization";
import * as Persist from "./persist";
import * as Engine from "./engine";
import * as Async from "./async";
import * as State from "./state";
import * as RT from "./rt";
import * as Instr from "./instr/rt";
import * as Modules from "./modules";
import * as Api from "./api";
import * as ApiMin from "./apiMin";

import * as TimeTravel from "./timeTravel/main";
import * as TimeTravelCore from "./timeTravel/core";
import * as TimeTravelDom from "./timeTravel/dom";
import * as SerializationDom from "@effectful/serialization/dom";
import * as ES from "./timeTravel/es";

S.regOpaqueObject(State.context, "@effectful/context", { props: false });
Persist.regConstructor(State.ForInIterator, { name: "@effectful/forIn" });
Persist.regModule(RT, "@effectful/debugger/rt");
Persist.regModule(S, "@effectful/debugger/serialization");
Persist.regModule(Instr, "@effectful/debugger/instr/rt");
Persist.regModule(ES, "@effectful/debugger/es");
Persist.regModule(Engine, "@effectful/debugger/engine");
Persist.regModule(Modules, "@effectful/debugger/modules");
Persist.regModule(State, "@effectful/debugger/state");
Persist.regModule(Persist, "@effectful/debugger/persist");
Persist.regModule(Async, "@effectful/debugger/async");
Persist.regModule(TimeTravelCore, "@effectful/debugger/timeTravel/core");
Persist.regModule(TimeTravelDom, "@effectful/debugger/timeTravel/dom");
Persist.regModule(TimeTravel, "@effectful/debugger/trace/main");
Persist.regModule(Api, "@effectful/debugger/api");
Persist.regModule(ApiMin, "@effectful/debugger/apiMin");

for (const i of Object.values(RT)) {
  const meta = i && (<any>i)[State.dataSymbol];
  if (meta) meta.canSkip = true;
}
const Serialization: any = { ...S, ...Persist };
export { Serialization };
S.regOpaquePrim(State.dataSymbol, "@effectful/debugger/data");
S.regOpaquePrim(State.thunkSymbol, "@effectful/debugger/thunk");
S.regOpaqueObject(Symbol.for, "Symbol.for");
S.regOpaqueObject(Symbol.keyFor, "Symbol.keyFor");
S.regOpaquePrim(Symbol.iterator, "SymbolStatic.iterator");
S.regOpaquePrim(Symbol.asyncIterator, "SymbolStatic.asyncIterator");
S.regOpaquePrim(Symbol.toStringTag, "SymbolStatic.asyncIterator");
S.regOpaqueObject(Serialization, "@effectful/debugger/serialization");
S.regOpaqueObject(SerializationDom, "@effectful/debugger/serialization/dom");

export { thunkSymbol } from "./state";
export * from "./api";

export { TimeTravel, Engine };
import config from "./config";

export { config };

S.regOpaqueObject(exports, "@effectful/debugger/main");

if (config.persistState) SerializationDom.track();
