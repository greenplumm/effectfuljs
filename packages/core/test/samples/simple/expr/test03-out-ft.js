import * as M from '@effectful/core';

function a() {
  var a = M.context();
  return M.scope(a_1);
}

function a_1(a) {
  return M.chain(eff(3), a_2);
}

function a_2(a, c) {
  var b;
  b = console.log(2 + c);
  1 + b + 4;
}