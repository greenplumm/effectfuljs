function d(i) {
  var j, r;
  return M.scope(_1, _7);

  function _1() {
    var a;
    j = 0;
    a = i++;
    return M.yld(a, _2, _7);
  }

  function _2(a) {
    var b;
    b = j++;
    return M.yld((a, b), _3, _7);
  }

  function _3() {
    return M.yldStar(some(i += 2, j) + j, _4, _7);
  }

  function _4(a) {
    return M.yld(a, _5, _7);
  }

  function _5(a) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStar(b, _6, _7);
    } else {
      return M.pure(i);
    }
  }

  function _6(r) {
    return M.pure(r);
  }

  function _7(e) {
    return M.raise(e);
  }
}

function a4() {
  var e, ex, a, fc, err;
  return M.scope(_1, _12);

  function _1() {
    return M.yld(1, _2, _14);
  }

  function _2() {
    return M.yld(2, _3, _14);
  }

  function _3() {
    fc = _8;
    return M.yld(3, _6, _12);
  }

  function _4() {
    e = ex;
    return M.yld('excep', _5, _15);
  }

  function _5() {
    fc = _8;
    return M.yld(e, _6, _12);
  }

  function _6() {
    return M.yld('f', _7, _12);
  }

  function _7() {
    return M.yld('e', fc);
  }

  function _8() {
    var a;
    a = a2();
    return M.yldStar(a, _9, _12);
  }

  function _9(c) {
    var b;
    a = c;
    b = a3();
    return M.yldStar(b, _10, _12);
  }

  function _10(c) {
    var b;
    b = a1(a, c);
    return M.yld(b, _11, _12);
  }

  function _11() {
    return M.pure();
  }

  function _12(e) {
    return M.raise(e);
  }

  function _13() {
    return M.raise(err);
  }

  function _14(a) {
    ex = a;
    return M.jump(_4, _15);
  }

  function _15(a) {
    fc = _13, err = a;
    return M.jump(_6, _12);
  }
}

function a5() {
  var i, loop, e, ex;
  return M.scope(_1, _5);

  function _1() {
    loop = M.iterator(a4());
    return M.jump(_2, _5);
  }

  function _2() {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_3, _6);
    } else {
      return M.pure();
    }
  }

  function _3() {
    return M.repeat(i, _2, _5);
  }

  function _4() {
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _5(e) {
    return M.raise(e);
  }

  function _6(a) {
    ex = a;
    return M.jump(_4, _5);
  }
}