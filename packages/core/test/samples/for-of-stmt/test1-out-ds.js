var $M = require("@effectful/debugger/api"),
    $iterator = $M.iterator,
    $iterFin = $M.iterFin,
    $context = $M.context,
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
  b: [2, "7:9-7:10"],
  c: [3, "14:9-14:10"],
  d: [4, "23:9-23:10"],
  p: [5, "30:9-30:10"]
}, null, 0],
    $s$2 = [{
  i: [1, "2:11-2:12"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{
  i: [1, "8:11-8:12"]
}, $s$1, 1],
    $s$5 = [{}, $s$4, 2],
    $s$6 = [{
  i: [1, "15:11-15:12"],
  j: [2, "16:13-16:14"]
}, $s$1, 1],
    $s$7 = [{}, $s$6, 2],
    $s$8 = [{}, $s$7, 3],
    $s$9 = [{
  i: [1, "24:11-24:12"]
}, $s$1, 1],
    $s$10 = [{}, $s$9, 2],
    $s$11 = [{
  i: [1, "31:11-31:12"]
}, $s$1, 1],
    $s$12 = [{}, $s$11, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-36:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*a*/
      $m$1($));
      $lset($l, 2,
      /*b*/
      $m$2($));
      $lset($l, 3,
      /*c*/
      $m$3($));
      $lset($l, 4,
      /*d*/
      $m$4($));
      $lset($l, 5,
      /*p*/
      $m$5($));
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
}, null, null, 0, [[0, "1:0-6:1", $s$1], [16, "36:0-36:0", $s$1], [16, "36:0-36:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 3, "1:0-6:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-4:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $l = $.$ = $l.slice();
      $.state = 4;

    case 4:
      $context.call = $l[2].next;
      $.goto = 5;
      $p = $l[2].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $lset($l[0], 1,
        /*i*/
        $p.value);
        $.goto = 7;
        $brk("3:4-3:11");
        continue;
      }

    case 6:
      $l[0][2] = 12;
      $.goto = 11;
      continue;

    case 7:
      $.goto = 8;
      ($context.call = eff)(1);
      $.state = 8;

    case 8:
      $l = $.$ = $l.slice();
      $.goto = 4;
      continue;

    case 9:
      $.goto = 10;
      $iterFin($l[2]);
      $.state = 10;

    case 10:
      $.goto = $l[1];
      continue;

    case 11:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 12:
      $.goto = 13;
      $brk("5:2-5:9");
      $.state = 13;

    case 13:
      $.goto = 15;
      ($context.call = eff)(2);
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
    case 6:
    case 3:
      $l[0][2] = 14;
      $.goto = 11;
      break;

    case 8:
    case 7:
    case 5:
    case 4:
      $l[1] = 11;
      $l[0][2] = 14;
      $.goto = 9;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 6:
    case 3:
      $l[0][2] = 15;
      $.goto = 11;
      break;

    case 8:
    case 7:
    case 5:
    case 4:
      $l[1] = 11;
      $l[0][2] = 15;
      $.goto = 9;
      break;

    default:
      $.goto = 15;
      break;
  }
}, 1, [[4, "2:2-4:3", $s$2], [0, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, "2:11-2:12", $s$2], [5, "3:4-3:11", $s$3], [1, null, $s$2], [3, "3:4-3:10", $s$3], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [4, "5:2-5:9", $s$2], [2, "5:2-5:8", $s$2], [16, "6:1-6:1", $s$2], [16, "6:1-6:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 3, "7:0-12:1", 0, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("8:2-10:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 2;
      $p = ($context.call = eff)("d");
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $iterator($p);
      $.state = 3;

    case 3:
      $l[2] = $p;
      $.state = 4;

    case 4:
      $l = $.$ = $l.slice();
      $.state = 5;

    case 5:
      $context.call = $l[2].next;
      $.goto = 6;
      $p = $l[2].next();
      $.state = 6;

    case 6:
      if ($p.done) {
        $.state = 7;
      } else {
        $lset($l[0], 1,
        /*i*/
        $p.value);
        $.goto = 8;
        $brk("9:4-9:11");
        continue;
      }

    case 7:
      $l[0][2] = 13;
      $.goto = 12;
      continue;

    case 8:
      $.goto = 9;
      ($context.call = eff)($l[0][1]);
      $.state = 9;

    case 9:
      $l = $.$ = $l.slice();
      $.goto = 5;
      continue;

    case 10:
      $.goto = 11;
      $iterFin($l[2]);
      $.state = 11;

    case 11:
      $.goto = $l[1];
      continue;

    case 12:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 13:
      $.goto = 14;
      $brk("11:2-11:9");
      $.state = 14;

    case 14:
      $.goto = 16;
      ($context.call = eff)($l[1]);
      continue;

    case 15:
      $.goto = 16;
      return $unhandled($.error);

    case 16:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 11:
    case 10:
    case 7:
    case 4:
      $l[0][2] = 15;
      $.goto = 12;
      break;

    case 9:
    case 8:
    case 6:
    case 5:
      $l[1] = 12;
      $l[0][2] = 15;
      $.goto = 10;
      break;

    default:
      $.goto = 15;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 11:
    case 10:
    case 7:
    case 4:
      $l[0][2] = 16;
      $.goto = 12;
      break;

    case 9:
    case 8:
    case 6:
    case 5:
      $l[1] = 12;
      $l[0][2] = 16;
      $.goto = 10;
      break;

    default:
      $.goto = 16;
      break;
  }
}, 1, [[4, "8:2-10:3", $s$4], [2, "8:16-8:24", $s$5], [0, null, $s$4], [0, null, $s$4], [1, null, $s$4], [1, "8:11-8:12", $s$4], [5, "9:4-9:11", $s$5], [1, null, $s$4], [3, "9:4-9:10", $s$5], [1, null, $s$4], [1, null, $s$4], [1, null, $s$4], [0, null, $s$4], [4, "11:2-11:9", $s$4], [2, "11:2-11:8", $s$4], [16, "12:1-12:1", $s$4], [16, "12:1-12:1", $s$4]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 4, "14:0-21:1", 0, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("15:2-19:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[3] = $p;
      $.state = 3;

    case 3:
      $l = $.$ = $l.slice();
      $.state = 4;

    case 4:
      $context.call = $l[3].next;
      $.goto = 5;
      $p = $l[3].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $lset($l[0], 1,
        /*i*/
        $p.value);
        $.goto = 7;
        $brk("16:4-18:5");
        continue;
      }

    case 6:
      $l[0][3] = 22;
      $.goto = 21;
      continue;

    case 7:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 8;
      $p = $iterator(other);
      $.state = 8;

    case 8:
      $l[2] = $p;
      $.state = 9;

    case 9:
      $l = $.$ = $l.slice();
      $.state = 10;

    case 10:
      $context.call = $l[2].next;
      $.goto = 11;
      $p = $l[2].next();
      $.state = 11;

    case 11:
      if ($p.done) {
        $.state = 12;
      } else {
        $lset($l[0][0], 2,
        /*j*/
        $p.value);
        $.goto = 13;
        $brk("17:6-17:16");
        continue;
      }

    case 12:
      $l[0][2] = 18;
      $.goto = 17;
      continue;

    case 13:
      $.goto = 14;
      ($context.call = eff)($l[0][0][1], $l[0][0][2]);
      $.state = 14;

    case 14:
      $l = $.$ = $l.slice();
      $.goto = 10;
      continue;

    case 15:
      $.goto = 16;
      $iterFin($l[2]);
      $.state = 16;

    case 16:
      $.goto = $l[1];
      continue;

    case 17:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 18:
      $l = $.$ = $l.slice();
      $.goto = 4;
      continue;

    case 19:
      $.goto = 20;
      $iterFin($l[3]);
      $.state = 20;

    case 20:
      $.goto = $l[1];
      continue;

    case 21:
      $l = $.$ = $l[0];
      $.goto = $l[3];
      continue;

    case 22:
      $.goto = 23;
      $brk("20:2-20:12");
      $.state = 23;

    case 23:
      $.goto = 25;
      ($context.call = eff)($l[1], $l[2]);
      continue;

    case 24:
      $.goto = 25;
      return $unhandled($.error);

    case 25:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 20:
    case 19:
    case 6:
    case 3:
      $l[0][3] = 24;
      $.goto = 21;
      break;

    case 18:
    case 17:
    case 5:
    case 4:
      $l[1] = 21;
      $l[0][3] = 24;
      $.goto = 19;
      break;

    case 16:
    case 15:
    case 12:
    case 9:
      $l[0][2] = 19;
      $l[0][1] = 21;
      $l[0][0][3] = 24;
      $.goto = 17;
      break;

    case 14:
    case 13:
    case 11:
    case 10:
      $l[1] = 17;
      $l[0][2] = 19;
      $l[0][1] = 21;
      $l[0][0][3] = 24;
      $.goto = 15;
      break;

    case 8:
    case 7:
      $l[0][1] = 21;
      $l[0][0][3] = 24;
      $.goto = 19;
      break;

    default:
      $.goto = 24;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 20:
    case 19:
    case 6:
    case 3:
      $l[0][3] = 25;
      $.goto = 21;
      break;

    case 18:
    case 17:
    case 8:
    case 7:
    case 5:
    case 4:
      $l[1] = 21;
      $l[0][3] = 25;
      $.goto = 19;
      break;

    case 16:
    case 15:
    case 12:
    case 9:
      $l[0][2] = 19;
      $l[0][1] = 21;
      $l[0][0][3] = 25;
      $.goto = 17;
      break;

    case 14:
    case 13:
    case 11:
    case 10:
      $l[1] = 17;
      $l[0][2] = 19;
      $l[0][1] = 21;
      $l[0][0][3] = 25;
      $.goto = 15;
      break;

    default:
      $.goto = 25;
      break;
  }
}, 1, [[4, "15:2-19:3", $s$6], [0, null, $s$6], [0, null, $s$6], [1, null, $s$6], [1, "15:11-15:12", $s$6], [5, "16:4-18:5", $s$7], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, "16:13-16:14", $s$6], [5, "17:6-17:16", $s$8], [1, null, $s$6], [3, "17:6-17:15", $s$8], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [1, null, $s$6], [0, null, $s$6], [4, "20:2-20:12", $s$6], [2, "20:2-20:11", $s$6], [16, "21:1-21:1", $s$6], [16, "21:1-21:1", $s$6]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 3, "23:0-28:1", 0, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("24:2-26:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $l = $.$ = $l.slice();
      $.state = 4;

    case 4:
      $context.call = $l[2].next;
      $.goto = 5;
      $p = $l[2].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $lset($l[0], 1,
        /*i*/
        $p.value);
        $.goto = 7;
        $brk("25:4-25:11");
        continue;
      }

    case 6:
      $l[0][2] = 12;
      $.goto = 11;
      continue;

    case 7:
      $.goto = 8;
      ($context.call = eff)(1);
      $.state = 8;

    case 8:
      $l = $.$ = $l.slice();
      $.goto = 4;
      continue;

    case 9:
      $.goto = 10;
      $iterFin($l[2]);
      $.state = 10;

    case 10:
      $.goto = $l[1];
      continue;

    case 11:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 12:
      $.goto = 13;
      $brk("27:2-27:9");
      $.state = 13;

    case 13:
      $.goto = 15;
      ($context.call = eff)(2);
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
    case 6:
    case 3:
      $l[0][2] = 14;
      $.goto = 11;
      break;

    case 8:
    case 7:
    case 5:
    case 4:
      $l[1] = 11;
      $l[0][2] = 14;
      $.goto = 9;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 6:
    case 3:
      $l[0][2] = 15;
      $.goto = 11;
      break;

    case 8:
    case 7:
    case 5:
    case 4:
      $l[1] = 11;
      $l[0][2] = 15;
      $.goto = 9;
      break;

    default:
      $.goto = 15;
      break;
  }
}, 1, [[4, "24:2-26:3", $s$9], [0, null, $s$9], [0, null, $s$9], [1, null, $s$9], [1, "24:11-24:12", $s$9], [5, "25:4-25:11", $s$10], [1, null, $s$9], [3, "25:4-25:10", $s$10], [1, null, $s$9], [1, null, $s$9], [1, null, $s$9], [0, null, $s$9], [4, "27:2-27:9", $s$9], [2, "27:2-27:8", $s$9], [16, "28:1-28:1", $s$9], [16, "28:1-28:1", $s$9]]),
    $m$5 = $M.fun("m$5", "p", null, $m$0, [], 0, 3, "30:0-35:1", 0, function p($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("31:2-33:3");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0];
      $.goto = 2;
      $p = $iterator(some);
      $.state = 2;

    case 2:
      $l[2] = $p;
      $.state = 3;

    case 3:
      $l = $.$ = $l.slice();
      $.state = 4;

    case 4:
      $context.call = $l[2].next;
      $.goto = 5;
      $p = $l[2].next();
      $.state = 5;

    case 5:
      if ($p.done) {
        $.state = 6;
      } else {
        $lset($l[0], 1,
        /*i*/
        $p.value);
        $.goto = 7;
        $brk("32:4-32:19");
        continue;
      }

    case 6:
      $l[0][2] = 12;
      $.goto = 11;
      continue;

    case 7:
      $.goto = 8;
      $mcall("log", console, 1);
      $.state = 8;

    case 8:
      $l = $.$ = $l.slice();
      $.goto = 4;
      continue;

    case 9:
      $.goto = 10;
      $iterFin($l[2]);
      $.state = 10;

    case 10:
      $.goto = $l[1];
      continue;

    case 11:
      $l = $.$ = $l[0];
      $.goto = $l[2];
      continue;

    case 12:
      $.goto = 13;
      $brk("34:2-34:17");
      $.state = 13;

    case 13:
      $.goto = 15;
      $mcall("log", console, 2);
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
    case 6:
    case 3:
      $l[0][2] = 14;
      $.goto = 11;
      break;

    case 8:
    case 7:
    case 5:
    case 4:
      $l[1] = 11;
      $l[0][2] = 14;
      $.goto = 9;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 10:
    case 9:
    case 6:
    case 3:
      $l[0][2] = 15;
      $.goto = 11;
      break;

    case 8:
    case 7:
    case 5:
    case 4:
      $l[1] = 11;
      $l[0][2] = 15;
      $.goto = 9;
      break;

    default:
      $.goto = 15;
      break;
  }
}, 1, [[4, "31:2-33:3", $s$11], [0, null, $s$11], [0, null, $s$11], [1, null, $s$11], [1, "31:11-31:12", $s$11], [5, "32:4-32:19", $s$12], [1, null, $s$11], [3, "32:4-32:18", $s$12], [1, null, $s$11], [1, null, $s$11], [1, null, $s$11], [0, null, $s$11], [4, "34:2-34:17", $s$11], [2, "34:2-34:16", $s$11], [16, "35:1-35:1", $s$11], [16, "35:1-35:1", $s$11]]);

$M.moduleExports();