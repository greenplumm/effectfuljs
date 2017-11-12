// *- should inject forPar
function a() {
  var a = M.context();
  return M.scope(a_1, a_8);
}

function a_1(a) {
  return M.chain(eff1(), a_2, a_8);
}

function a_2(a) {
  return M.chain(eff2(), a_3, a_8);
}

function a_3(a, b) {
  a._i = b;
  return M.jump(a_4, a_8);
}

function a_4(a) {
  if (a._i < 10) {
    return M.chain(eff3(a._i), a_5, a_8);
  } else {
    return M.chain(eff7(a._i), a_7, a_8);
  }
}

function a_5(a, b) {
  var c;
  a._j = b;
  c = a._j++;
  return M.chain(eff4(c), a_6, a_8);
}

function a_6(a) {
  a._i++;
  return M.repeat(a_4, a_8);
}

function a_7(a, b) {
  console.log(b);
  return M.pure();
}

function a_8(a, e) {
  return M.raise(e);
}