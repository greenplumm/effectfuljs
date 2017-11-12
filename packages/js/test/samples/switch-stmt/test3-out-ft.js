function a() {
  var a = M.context();
  return M.scope(a_1, a_4);
}

function a_1(a) {
  return M.chain(eff(1), a_2, a_4);
}

function a_2(a, b) {
  switch (b) {
    case 1:
      return M.chain(effB(1), a_3, a_4);

    case 2:
      return M.chain(effB(2), a_3, a_4);

    default:
      return M.chain(effB(3), a_3, a_4);
  }
}

function a_3(a) {
  return M.pure();
}

function a_4(a, e) {
  return M.raise(e);
}