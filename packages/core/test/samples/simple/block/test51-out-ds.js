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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-12:0", 32, function file_js($, $l, $p) {
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
}, null, null, 0, [[0, "1:0-11:1", $s$1], [16, "12:0-12:0", $s$1], [16, "12:0-12:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "1:0-11:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:10");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff1)(1);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("3:2-3:4");
      $.state = 3;

    case 3:
      $l[0][1];
      $.goto = 4;
      $brk("4:2-9:16");
      $.state = 4;

    case 4:
      if (test) {
        $.goto = 8;
        $brk("5:4-5:6");
        continue;
      } else {
        $.goto = 5;
        $brk("9:9-9:16");
        $.state = 5;
      }

    case 5:
      $.goto = 6;
      ($context.call = eff)(5);
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("10:2-10:9");
      $.state = 7;

    case 7:
      $.goto = 14;
      ($context.call = eff)(6);
      continue;

    case 8:
      b;
      $.goto = 9;
      $brk("6:4-6:11");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = eff)(3);
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("7:4-7:6");
      $.state = 11;

    case 11:
      c;
      $.goto = 12;
      $brk("8:4-8:11");
      $.state = 12;

    case 12:
      $.goto = 6;
      ($context.call = eff)(4);
      continue;

    case 13:
      $.goto = 14;
      return $unhandled($.error);

    case 14:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:10", $s$2], [2, "2:2-2:9", $s$2], [4, "3:2-3:4", $s$2], [4, "4:2-9:16", $s$2], [4, "5:4-5:6", $s$2], [2, "9:9-9:15", $s$2], [4, "10:2-10:9", $s$2], [2, "10:2-10:8", $s$2], [4, "6:4-6:11", $s$2], [2, "6:4-6:10", $s$2], [4, "7:4-7:6", $s$2], [4, "8:4-8:11", $s$2], [2, "8:4-8:10", $s$2], [16, "11:1-11:1", $s$2], [16, "11:1-11:1", $s$2]]);

$M.moduleExports();