var $M = require("@effectful/debugger/api"),
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-5:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
      $.goto = 2;
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[0, "1:0-4:1", $s$1], [16, "5:0-5:0", $s$1], [16, "5:0-5:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-4:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:18");
      $.state = 1;

    case 1:
      if (true) {
        $.goto = 5;
        $brk("2:12-2:18");
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $brk("3:2-3:18");
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $mcall("pure", M);
      $.state = 4;

    case 4:
      $.result = $p;
      $.goto = 7;
      continue;

    case 5:
      1 + 1;
      $.goto = 2;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:18", $s$2], [4, "2:12-2:18", $s$2], [4, "3:2-3:18", $s$2], [2, "3:9-3:17", $s$2], [0, null, $s$2], [0, "2:12-2:17", $s$2], [16, "4:1-4:1", $s$2], [16, "4:1-4:1", $s$2]]);

$M.moduleExports();