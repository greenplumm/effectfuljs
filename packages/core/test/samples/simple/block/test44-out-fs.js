import * as M from "@effectful/core";

function a() {
  return M.chain(eff1(), _1);

  function _1() {
    if (a) {
      return eff5(5);
    } else {
      return M.chain(eff6(), _2);
    }
  }

  function _2() {
    var r;
    return r;
  }
}