var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{
  i: [1, "2:6-2:7"],
  j: [2, "2:9-2:10"],
  len: [3, "2:12-2:15"],
  ref: [4, "2:17-2:20"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-13:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("1:0-12:3");
      $.state = 1;

    case 1:
      $m$1($);
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-12:3", $s$1], [0, null, $s$1], [16, "13:0-13:0", $s$1], [16, "13:0-13:0", $s$1]]),
    $m$1 = $M.fun("m$1", null, null, $m$0, [], 0, 5, "1:1-12:1", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:21");
      $.state = 1;

    case 1:
      $.goto = 2;
      $brk("3:2-3:18");
      $.state = 2;

    case 2:
      $l[4] = [1, 2, 3];
      $.goto = 3;
      $brk("4:2-11:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("4:7-11:3");
      $.state = 4;

    case 4:
      $l[1] = 0;
      $.state = 5;

    case 5:
      if ($l[1] < 3) {
        $.goto = 7;
        $brk("5:4-5:11");
        continue;
      } else {
        $.state = 6;
      }

    case 6:
      $.goto = 20;
      continue;

    case 7:
      $.goto = 8;
      ($context.call = eff)($l[1]);
      $.state = 8;

    case 8:
      $.goto = 9;
      $brk("6:4-10:5");
      $.state = 9;

    case 9:
      $l[2] = 0;
      $l[3] = $l[4].length;
      $.state = 10;

    case 10:
      if ($l[2] < $l[3]) {
        $.goto = 12;
        $brk("7:6-7:17");
        continue;
      } else {
        $.state = 11;
      }

    case 11:
      $l[1] = $l[1] + 1;
      $.goto = 5;
      continue;

    case 12:
      d = $l[4][$l[2]];
      $.goto = 13;
      $brk("8:6-8:24");
      $.state = 13;

    case 13:
      $.goto = 14;
      $p = ($context.call = eff)(d);
      $.state = 14;

    case 14:
      if ($p) {
        $.goto = 11;
        $brk("8:18-8:24");
        continue;
      } else {
        $.state = 15;
      }

    case 15:
      $.goto = 16;
      $brk("9:6-9:28");
      $.state = 16;

    case 16:
      $.goto = 17;
      $p = ($context.call = eff)(2);
      $.state = 17;

    case 17:
      if ($p) {
        $.goto = 6;
        $brk("9:18-9:28");
        continue;
      } else {
        $.state = 18;
      }

    case 18:
      $l[2] = $l[2] + 1;
      $.goto = 10;
      continue;

    case 19:
      $.goto = 20;
      return $unhandled($.error);

    case 20:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:21", $s$2], [4, "3:2-3:18", $s$2], [4, "4:2-11:3", $s$2], [4, "4:7-11:3", $s$2], [0, "4:12-4:17", $s$2], [4, "5:4-5:11", $s$2], [0, null, $s$2], [2, "5:4-5:10", $s$2], [4, "6:4-10:5", $s$2], [0, "6:9-6:14", $s$2], [4, "7:6-7:17", $s$2], [0, "4:26-4:29", $s$2], [4, "8:6-8:24", $s$2], [2, "8:10-8:16", $s$2], [4, "8:18-8:24", $s$2], [4, "9:6-9:28", $s$2], [2, "9:10-9:16", $s$2], [4, "9:18-9:28", $s$2], [0, "6:43-6:46", $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]);

$M.moduleExports();