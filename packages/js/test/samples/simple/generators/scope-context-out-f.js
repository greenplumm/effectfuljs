function d(i) {
  var j,
      d = M.generator(),
      r;
  return M.scope(_1, _7);

  function _1(d) {
    var a;
    j = 0;
    a = i++;
    return M.yldStar(M.yld(a), _2, _7);
  }

  function _2(d, a) {
    var b;
    b = j++;
    return M.yldStar(M.yld((a, b)), _3, _7);
  }

  function _3(d) {
    return M.yldStar(M.yldStar(some(i += 2, j) + j), _4, _7);
  }

  function _4(d, a) {
    return M.yldStar(M.yld(a), _5, _7);
  }

  function _5(d, a) {
    var b;

    if (a) {
      b = i += 3;
      return M.yldStar(M.yldStar(b), _6, _7);
    } else {
      return M.pure(i);
    }
  }

  function _6(d, r) {
    return M.pure(r);
  }

  function _7(d, e) {
    return M.raise(e);
  }
}

function a4() {
  var e,
      a4 = M.generator(),
      ex,
      a,
      fc,
      err;
  return M.scope(_1, _12);

  function _1(a4) {
    return M.yldStar(M.yld(1), _2, _14);
  }

  function _2(a4) {
    return M.yldStar(M.yld(2), _3, _14);
  }

  function _3(a4) {
    fc = _8;
    return M.yldStar(M.yld(3), _6, _12);
  }

  function _4(a4) {
    e = ex;
    return M.yldStar(M.yld('excep'), _5, _15);
  }

  function _5(a4) {
    fc = _8;
    return M.yldStar(M.yld(e), _6, _12);
  }

  function _6(a4) {
    return M.yldStar(M.yld('f'), _7, _12);
  }

  function _7(a4) {
    return M.yldStar(M.yld('e'), fc);
  }

  function _8(a4) {
    var a;
    a = a2();
    return M.yldStar(M.yldStar(a), _9, _12);
  }

  function _9(a4, c) {
    var b;
    a = c;
    b = a3();
    return M.yldStar(M.yldStar(b), _10, _12);
  }

  function _10(a4, c) {
    var b;
    b = a1(a, c);
    return M.yldStar(M.yld(b), _11, _12);
  }

  function _11(a4) {
    return M.pure();
  }

  function _12(a4, e) {
    return M.raise(e);
  }

  function _13(a4) {
    return M.raise(err);
  }

  function _14(a4, a) {
    ex = a;
    return M.jump(_4, _15);
  }

  function _15(a4, a) {
    fc = _13, err = a;
    return M.jump(_6, _12);
  }
}

function a5() {
  var i,
      a5 = M.generator(),
      loop,
      e,
      ex;
  return M.scope(_1, _5);

  function _1(a5) {
    loop = M.iterator(a4());
    return M.jump(_2, _5);
  }

  function _2(a5) {
    if (!(loop = loop.step()).done) {
      i = loop.value;
      return M.jump(_3, _6);
    } else {
      return M.pure();
    }
  }

  function _3(a5) {
    return M.repeat(M.yld(i), _2, _5);
  }

  function _4(a5) {
    e = ex;

    if (loop.exit) {
      loop.exit();
    }

    throw e;
  }

  function _5(a5, e) {
    return M.raise(e);
  }

  function _6(a5, a) {
    ex = a;
    return M.jump(_4, _5);
  }
}