var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-9:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-8:1", $s$1], [16, "9:0-9:0", $s$1], [16, "9:0-9:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "1:0-8:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:9");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff1)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("3:2-6:3");
      $.state = 3;

    case 3:
      $l = $.$ = [$l];
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = eff2)();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = eff)(3);
      $.state = 6;

    case 6:
      if ($p) {
        $.goto = 7;
        $brk("4:4-4:11");
        $.state = 7;
      } else {
        $l[0][1] = 12;
        $.goto = 11;
        continue;
      }

    case 7:
      $.goto = 8;
      ($context.call = eff5)();
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("5:4-5:11");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = eff6)();
      $.state = 10;

    case 10:
      $l = $.$ = $l.slice();
      $.goto = 5;
      ($context.call = eff4)();
      continue;

    case 11:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 12:
      $.goto = 13;
      $brk("7:2-7:9");
      $.state = 13;

    case 13:
      $.goto = 15;
      ($context.call = eff7)();
      continue;

    case 14:
      $.goto = 15;
      return $unhandled($.error);

    case 15:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][1] = 14;
      $.goto = 11;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][1] = 15;
      $.goto = 11;
      break;

    default:
      $.goto = 15;
      break;
  }
}, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-6:3", $s$2], [0, null, $s$2], [3, "3:7-3:13", $s$3], [3, "3:15-3:21", $s$3], [5, "4:4-4:11", $s$3], [3, "4:4-4:10", $s$3], [5, "5:4-5:11", $s$3], [3, "5:4-5:10", $s$3], [3, "3:23-3:29", $s$3], [0, null, $s$2], [4, "7:2-7:9", $s$2], [2, "7:2-7:8", $s$2], [16, "8:1-8:1", $s$2], [16, "8:1-8:1", $s$2]]);

$M.moduleExports();