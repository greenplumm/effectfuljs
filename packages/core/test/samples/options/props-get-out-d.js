var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  tuza: [1, "1:9-1:13"]
}, null, 0],
    $s$2 = [{
  av: [1, "2:6-2:8"],
  tuzb: [2, "4:11-4:15"]
}, $s$1, 1],
    $s$3 = [{
  b: [1, "5:8-5:9"],
  mv: [2, "6:6-6:8"],
  v: [3, "12:10-12:11"]
}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-24:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
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
}, null, null, 0, [[0, "1:0-23:1", $s$1], [16, "24:0-24:0", $s$1], [16, "24:0-24:0", $s$1]]),
    $m$1 = $M.fun("m$1", "tuza", null, $m$0, [], 0, 3, "1:0-23:1", 0, function tuza($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $m$2($);
      $.goto = 1;
      $brk("2:2-2:13");
      $.state = 1;

    case 1:
      $l[1] = 1;
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
}, null, null, 1, [[4, "2:2-2:13", $s$2], [0, "2:6-2:12", $s$2], [16, "23:1-23:1", $s$2], [16, "23:1-23:1", $s$2]]),
    $m$2 = $M.fun("m$2", "tuzb", null, $m$1, [], 3, 6, "4:2-22:3", 0, function tuzb($, $l, $p) {
  var $3, $2, $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("5:4-6:13");
      $.state = 1;

    case 1:
      $l[1] = 2;
      $l[2] = 3;
      $.goto = 2;
      $brk("7:4-7:20");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($context.call = $l[1])();
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = che)($l[0][1] = $p);
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("11:4-11:9");
      $.state = 5;

    case 5:
      $.goto = 6;
      ($context.call = me)();
      $.state = 6;

    case 6:
      $.goto = 7;
      $brk("12:4-12:31");
      $.state = 7;

    case 7:
      $1 = c.b;
      $2 = $1.a;
      $1.a = $2 + 1;
      $1 = $l[1].a.d;
      $l[3] = $1[$2] = $1[$2] - 1;
      $.goto = 8;
      $brk("13:4-13:10");
      $.state = 8;

    case 8:
      c = $l[3];
      $.goto = 9;
      $brk("14:4-14:9");
      $.state = 9;

    case 9:
      $.goto = 10;
      ($context.call = be)();
      $.state = 10;

    case 10:
      $.goto = 11;
      $brk("15:4-18:12");
      $.state = 11;

    case 11:
      if (process === 1000) {
        $.goto = 19;
        $p = ($context.call = c_fun)("a");
        continue;
      } else {
        $l[4] = 2;
        $.state = 12;
      }

    case 12:
      c = $l[4];
      $.goto = 13;
      $brk("19:4-19:34");
      $.state = 13;

    case 13:
      $2 = $l[0][1].m;
      $1 = $l[1].a;
      $3 = $1[$2];
      $1[$2] = $3 + 1;

      if ($3) {
        $.goto = 18;
        $brk("19:21-19:34");
        continue;
      } else {
        $.state = 14;
      }

    case 14:
      $.goto = 15;
      $brk("21:4-21:42");
      $.state = 15;

    case 15:
      $.goto = 16;
      $p = ($context.call = $l[1])();
      $.state = 16;

    case 16:
      $l[4] = $p;
      $.goto = 17;
      $p = ($context.call = $l[0][1])();
      $.state = 17;

    case 17:
      delete $l[4][$p + delete $l[0][1].z[2 + 2]];
      $.goto = 26;
      continue;

    case 18:
      delete $l[1][$l[0][1]];
      $.goto = 14;
      continue;

    case 19:
      $.goto = 20;
      $p = $mcall($p, process, "b");
      $.state = 20;

    case 20:
      $l[4] = $p;
      $.goto = 21;
      $p = ($context.call = d_fun)("c");
      $.state = 21;

    case 21:
      $l[5] = $p;
      $.goto = 22;
      $p = new ($context.call = process.D)("e");
      $.state = 22;

    case 22:
      $.goto = 23;
      $p = ($context.call = $l[4])($l[5], "d", $p);
      $.state = 23;

    case 23:
      $.goto = 24;
      $p = ($context.call = a_fun)($p);
      $.state = 24;

    case 24:
      $l[4] = $p;
      $.goto = 12;
      continue;

    case 25:
      $.goto = 26;
      return $unhandled($.error);

    case 26:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "5:4-6:13", $s$3], [4, "7:4-7:20", $s$3], [2, "7:14-7:17", $s$3], [2, "7:4-7:19", $s$3], [4, "11:4-11:9", $s$3], [2, "11:4-11:8", $s$3], [4, "12:4-12:31", $s$3], [4, "13:4-13:10", $s$3], [4, "14:4-14:9", $s$3], [2, "14:4-14:8", $s$3], [4, "15:4-18:12", $s$3], [2, "17:24-17:34", $s$3], [4, "19:4-19:34", $s$3], [4, "19:21-19:34", $s$3], [4, "21:4-21:42", $s$3], [2, "21:11-21:14", $s$3], [2, "21:15-21:19", $s$3], [0, "21:4-21:41", $s$3], [0, "19:21-19:33", $s$3], [2, "17:16-17:40", $s$3], [2, "17:41-17:51", $s$3], [2, "17:58-17:76", $s$3], [2, "17:16-17:77", $s$3], [2, "17:10-17:78", $s$3], [0, null, $s$3], [16, "22:3-22:3", $s$3], [16, "22:3-22:3", $s$3]]);

$M.moduleExports();