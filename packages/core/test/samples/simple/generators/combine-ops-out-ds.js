var $M = require("@effectful/debugger/api"),
    $iterator = $M.iterator,
    $yld = $M.yld,
    $iterErr = $M.iterErr,
    $iterFin = $M.iterFin,
    $iterNext = $M.iterNext,
    $context = $M.context,
    $ret = $M.ret,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledG = $M.unhandledG,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  d: [1, "4:10-4:11"],
  a4: [2, "15:10-15:12"],
  a5: [3, "30:10-30:12"]
}, null, 0],
    $s$2 = [{
  i: [1, "4:12-4:13"],
  j: [2, "5:6-5:7"]
}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{
  e: [1, "20:11-20:12"]
}, $s$3, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{
  i: [1, "31:13-31:14"]
}, $s$5, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 4, "1:0-33:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*d*/
      $m$1($));
      $lset($l, 2,
      /*a4*/
      $m$2($));
      $lset($l, 3,
      /*a5*/
      $m$3($));
      $.goto = 1;
      $brk("1:0-1:24");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("profile", M, "generators");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("2:0-2:72");
      $.state = 3;

    case 3:
      $.goto = 5;
      $mcall("option", M, {
        combineOps: true,
        scopePrefix: false,
        scopeContext: false
      });
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-1:24", $s$1], [2, "1:0-1:23", $s$1], [4, "2:0-2:72", $s$1], [2, "2:0-2:71", $s$1], [16, "33:0-33:0", $s$1], [16, "33:0-33:0", $s$1]]),
    $m$1 = $M.fun("m$1", "d", null, $m$0, ["i"], 1, 12, "4:0-13:1", 2, function d($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("5:2-5:12");
      $.state = 1;

    case 1:
      $lset($l, 2,
      /*j*/
      0);
      $.goto = 2;
      $brk("6:2-6:25");
      $.state = 2;

    case 2:
      $1 = $l[1];
      $lset($l, 1,
      /*i*/
      $1 + 1);
      $.goto = 3;
      return $yld($1);

    case 3:
      $1 = $l[2];
      $lset($l, 2,
      /*j*/
      $1 + 1);
      $.goto = 4;
      return $yld($1);

    case 4:
      $.goto = 5;
      $brk("7:2-11:3");
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = some)($lset($l, 1,
      /*i*/
      $l[1] + 2), $l[2]);
      $.state = 6;

    case 6:
      $.goto = 7;
      $p = $iterator($p + $l[2]);
      $.state = 7;

    case 7:
      $l[5] = $p;
      $.state = 8;

    case 8:
      $.goto = 9;
      $p = $iterNext($l[5], $l[8]);
      $.state = 9;

    case 9:
      $l[6] = $p;
      $.state = 10;

    case 10:
      if ($l[6].done) {
        $.state = 11;
      } else {
        $.goto = 27;
        return $yld($l[6].value);
      }

    case 11:
      $l[7] = $l[6].value;
      $.goto = 12;
      return $yld($l[7]);

    case 12:
      if ($p) {
        $.goto = 14;
        $brk("8:4-8:27");
        continue;
      } else {
        $.goto = 13;
        $brk("10:4-10:13");
        $.state = 13;
      }

    case 13:
      $.result = $l[1];
      $.goto = 35;
      continue;

    case 14:
      $.goto = 15;
      $p = $iterator($lset($l, 1,
      /*i*/
      $l[1] + 3));
      $.state = 15;

    case 15:
      $l[9] = $p;
      $.state = 16;

    case 16:
      $.goto = 17;
      $p = $iterNext($l[9], $l[11]);
      $.state = 17;

    case 17:
      $l[10] = $p;
      $.state = 18;

    case 18:
      if ($l[10].done) {
        $.state = 19;
      } else {
        $.goto = 20;
        return $yld($l[10].value);
      }

    case 19:
      $.result = $l[10].value;
      $.goto = 35;
      continue;

    case 20:
      $l[11] = $p;
      $.goto = 16;
      continue;

    case 21:
      if ($l[9].throw) {
        $.state = 22;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 34;
        $.goto = 24;
        continue;
      }

    case 22:
      $.goto = 23;
      $p = $iterErr($l[9], $.error);
      $.state = 23;

    case 23:
      $l[10] = $p;
      $.goto = 18;
      continue;

    case 24:
      $.goto = 25;
      $p = $iterFin($l[9], $.result);
      $.state = 25;

    case 25:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 26;
        return $yld($p.value);
      }

    case 26:
      $l[11] = $p;
      $.goto = 16;
      continue;

    case 27:
      $l[8] = $p;
      $.goto = 8;
      continue;

    case 28:
      if ($l[5].throw) {
        $.state = 29;
      } else {
        $.error = $M.iterErrUndef();
        $l[3] = 34;
        $.goto = 31;
        continue;
      }

    case 29:
      $.goto = 30;
      $p = $iterErr($l[5], $.error);
      $.state = 30;

    case 30:
      $l[6] = $p;
      $.goto = 10;
      continue;

    case 31:
      $.goto = 32;
      $p = $iterFin($l[5], $.result);
      $.state = 32;

    case 32:
      if ($p.done) {
        $.goto = $l[3];
        continue;
      } else {
        $.goto = 33;
        return $yld($p.value);
      }

    case 33:
      $l[8] = $p;
      $.goto = 8;
      continue;

    case 34:
      $.goto = 35;
      return $unhandledG($.error);

    case 35:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 27:
    case 10:
      $.goto = 28;
      break;

    case 20:
    case 18:
      $.goto = 21;
      break;

    case 28:
    case 9:
    case 8:
      $l[3] = 34;
      $.goto = 31;
      break;

    case 21:
    case 17:
    case 16:
      $l[4] = 34;
      $.goto = 24;
      break;

    default:
      $.goto = 34;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 28:
    case 27:
    case 10:
    case 9:
    case 8:
      $l[3] = 35;
      $.goto = 31;
      break;

    case 21:
    case 20:
    case 18:
    case 17:
    case 16:
      $l[4] = 35;
      $.goto = 24;
      break;

    default:
      $.goto = 35;
      break;
  }
}, 1, [[4, "5:2-5:12", $s$2], [4, "6:2-6:25", $s$2], [2, "6:9-6:18", $s$2], [2, "6:2-6:24", $s$2], [4, "7:2-11:3", $s$2], [2, "7:19-7:36", $s$2], [2, "7:12-7:40", $s$2], [0, null, $s$2], [1, "7:12-7:40", $s$2], [1, null, $s$2], [1, null, $s$2], [2, "7:6-7:40", $s$2], [4, "8:4-8:27", $s$2], [0, null, $s$2], [2, "8:11-8:26", $s$2], [0, null, $s$2], [1, "8:11-8:26", $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, "13:1-13:1", $s$2], [16, "13:1-13:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a4", null, $m$0, [], 0, 14, "15:0-28:1", 2, function a4($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("16:2-16:10");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

    case 2:
      $.goto = 3;
      $brk("17:2-26:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("18:4-18:12");
      $.state = 4;

    case 4:
      $.goto = 5;
      return $yld(2);

    case 5:
      $.goto = 6;
      $brk("19:4-19:12");
      $.state = 6;

    case 6:
      $l[2] = 16;
      $.goto = 11;
      return $yld(3);

    case 7:
      $lset($l, 1,
      /*e*/
      $.error);
      $.error = void 0;
      $.goto = 8;
      $brk("21:4-21:18");
      $.state = 8;

    case 8:
      $.goto = 9;
      return $yld("excep");

    case 9:
      $.goto = 10;
      $brk("22:4-22:12");
      $.state = 10;

    case 10:
      $l[2] = 16;
      $.goto = 11;
      return $yld($l[1]);

    case 11:
      $.goto = 12;
      $brk("24:4-24:14");
      $.state = 12;

    case 12:
      $.goto = 13;
      return $yld("f");

    case 13:
      $.goto = 14;
      $brk("25:4-25:14");
      $.state = 14;

    case 14:
      $.goto = 15;
      return $yld("e");

    case 15:
      $.error = $l[3];
      $.goto = $l[2];
      continue;

    case 16:
      $.goto = 17;
      $brk("27:2-27:37");
      $.state = 17;

    case 17:
      $.goto = 18;
      $p = ($context.call = a2)();
      $.state = 18;

    case 18:
      $.goto = 19;
      $p = $iterator($p);
      $.state = 19;

    case 19:
      $l[6] = $p;
      $.state = 20;

    case 20:
      $.goto = 21;
      $p = $iterNext($l[6], $l[9]);
      $.state = 21;

    case 21:
      $l[7] = $p;
      $.state = 22;

    case 22:
      if ($l[7].done) {
        $.state = 23;
      } else {
        $.goto = 38;
        return $yld($l[7].value);
      }

    case 23:
      $l[8] = $l[7].value;
      $.goto = 24;
      $p = ($context.call = a3)();
      $.state = 24;

    case 24:
      $.goto = 25;
      $p = $iterator($p);
      $.state = 25;

    case 25:
      $l[10] = $p;
      $.state = 26;

    case 26:
      $.goto = 27;
      $p = $iterNext($l[10], $l[13]);
      $.state = 27;

    case 27:
      $l[11] = $p;
      $.state = 28;

    case 28:
      if ($l[11].done) {
        $.state = 29;
      } else {
        $.goto = 31;
        return $yld($l[11].value);
      }

    case 29:
      $l[12] = $l[11].value;
      $.goto = 30;
      $p = ($context.call = a1)($l[8], $l[12]);
      $.state = 30;

    case 30:
      $.goto = 46;
      return $yld($p);

    case 31:
      $l[13] = $p;
      $.goto = 26;
      continue;

    case 32:
      if ($l[10].throw) {
        $.state = 33;
      } else {
        $.error = $M.iterErrUndef();
        $l[5] = 45;
        $.goto = 35;
        continue;
      }

    case 33:
      $.goto = 34;
      $p = $iterErr($l[10], $.error);
      $.state = 34;

    case 34:
      $l[11] = $p;
      $.goto = 28;
      continue;

    case 35:
      $.goto = 36;
      $p = $iterFin($l[10], $.result);
      $.state = 36;

    case 36:
      if ($p.done) {
        $.goto = $l[5];
        continue;
      } else {
        $.goto = 37;
        return $yld($p.value);
      }

    case 37:
      $l[13] = $p;
      $.goto = 26;
      continue;

    case 38:
      $l[9] = $p;
      $.goto = 20;
      continue;

    case 39:
      if ($l[6].throw) {
        $.state = 40;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 45;
        $.goto = 42;
        continue;
      }

    case 40:
      $.goto = 41;
      $p = $iterErr($l[6], $.error);
      $.state = 41;

    case 41:
      $l[7] = $p;
      $.goto = 22;
      continue;

    case 42:
      $.goto = 43;
      $p = $iterFin($l[6], $.result);
      $.state = 43;

    case 43:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 44;
        return $yld($p.value);
      }

    case 44:
      $l[9] = $p;
      $.goto = 20;
      continue;

    case 45:
      $.goto = 46;
      return $unhandledG($.error);

    case 46:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 6:
    case 5:
    case 4:
    case 3:
      $.goto = 7;
      break;

    case 38:
    case 22:
      $.goto = 39;
      break;

    case 31:
    case 28:
      $.goto = 32;
      break;

    case 39:
    case 21:
    case 20:
      $l[4] = 45;
      $.goto = 42;
      break;

    case 32:
    case 27:
    case 26:
      $l[5] = 45;
      $.goto = 35;
      break;

    case 10:
    case 9:
    case 8:
    case 7:
      $l[3] = $.error;
      $l[2] = 45;
      $.goto = 11;
      break;

    default:
      $.goto = 45;
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
    case 3:
      $l[2] = 46;
      $.goto = 11;
      break;

    case 39:
    case 38:
    case 22:
    case 21:
    case 20:
      $l[4] = 46;
      $.goto = 42;
      break;

    case 32:
    case 31:
    case 28:
    case 27:
    case 26:
      $l[5] = 46;
      $.goto = 35;
      break;

    default:
      $.goto = 46;
      break;
  }
}, 1, [[4, "16:2-16:10", $s$3], [2, "16:2-16:9", $s$3], [4, "17:2-26:3", $s$3], [5, "18:4-18:12", $s$3], [3, "18:4-18:11", $s$3], [5, "19:4-19:12", $s$3], [3, "19:4-19:11", $s$3], [5, "21:4-21:18", $s$4], [3, "21:4-21:17", $s$4], [5, "22:4-22:12", $s$4], [3, "22:4-22:11", $s$4], [4, "24:4-24:14", $s$3], [2, "24:4-24:13", $s$3], [4, "25:4-25:14", $s$3], [2, "25:4-25:13", $s$3], [0, null, $s$3], [4, "27:2-27:37", $s$3], [2, "27:18-27:22", $s$3], [2, "27:11-27:22", $s$3], [0, null, $s$3], [1, "27:11-27:22", $s$3], [1, null, $s$3], [1, null, $s$3], [2, "27:31-27:35", $s$3], [2, "27:24-27:35", $s$3], [0, null, $s$3], [1, "27:24-27:35", $s$3], [1, null, $s$3], [1, null, $s$3], [2, "27:8-27:36", $s$3], [2, "27:2-27:36", $s$3], [1, null, $s$3], [1, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [1, null, $s$3], [1, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, "28:1-28:1", $s$3], [16, "28:1-28:1", $s$3]]),
    $m$3 = $M.fun("m$3", "a5", null, $m$0, [], 0, 2, "30:0-32:1", 2, function a5($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("31:2-31:32");
      $.state = 1;

    case 1:
      $l = $.$ = [$l, void 0, void 0, void 0, void 0, void 0];
      $.goto = 2;
      $p = ($context.call = $l[0][0][2])();
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $iterator($p);
      $.state = 3;

    case 3:
      $l[3] = $p;
      $.state = 4;

    case 4:
      $l = $.$ = $l.slice();
      $.state = 5;

    case 5:
      $context.call = $l[3].next;
      $.goto = 6;
      $p = $l[3].next();
      $.state = 6;

    case 6:
      if ($p.done) {
        $.state = 7;
      } else {
        $lset($l, 1,
        /*i*/
        $p.value);
        $.goto = 8;
        $brk("31:24-31:32");
        continue;
      }

    case 7:
      $l[0][1] = 13;
      $.goto = 12;
      continue;

    case 8:
      $.goto = 9;
      return $yld($l[1]);

    case 9:
      $l = $.$ = $l.slice();
      $.goto = 5;
      continue;

    case 10:
      $.goto = 11;
      $iterFin($l[3]);
      $.state = 11;

    case 11:
      $.goto = $l[2];
      continue;

    case 12:
      $l = $.$ = $l[0];
      $.goto = $l[1];
      continue;

    case 13:
      $.goto = 15;
      continue;

    case 14:
      $.goto = 15;
      return $unhandledG($.error);

    case 15:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 11:
    case 10:
    case 7:
    case 4:
      $l[0][1] = 14;
      $.goto = 12;
      break;

    case 9:
    case 8:
    case 6:
    case 5:
      $l[2] = 12;
      $l[0][1] = 14;
      $.goto = 10;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 11:
    case 10:
    case 7:
    case 4:
      $l[0][1] = 15;
      $.goto = 12;
      break;

    case 9:
    case 8:
    case 6:
    case 5:
      $l[2] = 12;
      $l[0][1] = 15;
      $.goto = 10;
      break;

    default:
      $.goto = 15;
      break;
  }
}, 1, [[4, "31:2-31:32", $s$5], [2, "31:18-31:22", $s$6], [0, null, $s$5], [0, null, $s$5], [1, null, $s$5], [1, "31:13-31:14", $s$5], [5, "31:24-31:32", $s$6], [1, null, $s$5], [3, "31:24-31:31", $s$6], [1, null, $s$5], [1, null, $s$5], [1, null, $s$5], [0, null, $s$5], [0, null, $s$5], [16, "32:1-32:1", $s$5], [16, "32:1-32:1", $s$5]]);

$M.moduleExports();