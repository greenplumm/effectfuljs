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
  a: [1, "1:9-1:10"],
  b: [2, "7:9-7:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-16:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
      $lset($l, 2,
      /*b*/
      $m$2($));
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
}, null, null, 0, [[0, "1:0-5:1", $s$1], [16, "16:0-16:0", $s$1], [16, "16:0-16:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-5:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-3:9");
      $.state = 1;

    case 1:
      if (true) {
        $.goto = 5;
        $brk("2:12-2:14");
        continue;
      } else {
        $.goto = 2;
        $brk("3:7-3:9");
        $.state = 2;
      }

    case 2:
      3;
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:2-4:11");
      $.state = 4;

    case 4:
      $.result = 1;
      $.goto = 7;
      continue;

    case 5:
      2;
      $.goto = 3;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-3:9", $s$2], [4, "2:12-2:14", $s$2], [0, "3:7-3:8", $s$2], [4, "4:2-4:11", $s$2], [0, "4:9-4:10", $s$2], [0, "2:12-2:13", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "7:0-15:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("8:2-14:3");
      $.state = 1;

    case 1:
      if (true) {
        $.goto = 6;
        $brk("9:4-9:21");
        continue;
      } else {
        $.goto = 2;
        $brk("12:4-12:21");
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $mcall("log", console, "c");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("13:4-13:21");
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("log", console, "d");
      $.state = 5;

    case 5:
      $.goto = 10;
      continue;

    case 6:
      $.goto = 7;
      $mcall("log", console, "a");
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk("10:4-10:21");
      $.state = 8;

    case 8:
      $.goto = 5;
      $mcall("log", console, "b");
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "8:2-14:3", $s$3], [4, "9:4-9:21", $s$3], [2, "12:4-12:20", $s$3], [4, "13:4-13:21", $s$3], [2, "13:4-13:20", $s$3], [0, null, $s$3], [2, "9:4-9:20", $s$3], [4, "10:4-10:21", $s$3], [2, "10:4-10:20", $s$3], [16, "15:1-15:1", $s$3], [16, "15:1-15:1", $s$3]]);

$M.moduleExports();