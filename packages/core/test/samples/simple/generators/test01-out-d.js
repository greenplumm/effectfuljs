var $M = require("@effectful/debugger/api"),
    $iterator = $M.iterator,
    $yld = $M.yld,
    $awt = $M.awt,
    $iterErr = $M.iterErr,
    $iterFin = $M.iterFin,
    $iterNext = $M.iterNext,
    $context = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $retG = $M.retG,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $unhandledG = $M.unhandledG,
    $raise = $M.raise,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  d: [1, "3:10-3:11"],
  a4: [2, "14:10-14:12"],
  a5: [3, "29:10-29:12"],
  cfb1: [4, "33:10-33:14"],
  c: [5, "50:10-50:11"],
  v: [6, "54:6-54:7"],
  obj: [7, "56:6-56:9"],
  A: [8, "68:6-68:7"]
}, null, 0],
    $s$2 = [{
  i: [1, "3:12-3:13"],
  j: [2, "4:6-4:7"]
}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{
  e: [1, "19:11-19:12"]
}, $s$3, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{
  i: [1, "30:13-30:14"]
}, $s$5, 1],
    $s$7 = [{}, $s$1, 1],
    $s$8 = [{
  i: [1, "34:11-34:12"]
}, $s$7, 1],
    $s$9 = [{
  e: [2, "43:13-43:14"]
}, $s$8, 1],
    $s$10 = [{}, $s$1, 1],
    $s$11 = [{
  v: [1, "54:16-54:17"]
}, $s$1, 1],
    $s$12 = [{}, $s$1, 1],
    $s$13 = [{
  a: [1, "60:21-60:22"]
}, $s$1, 1],
    $s$14 = [{
  a: [1, "63:11-63:12"],
  b: [2, "63:14-63:15"]
}, $s$1, 1],
    $s$15 = [{
  A: [1, null],
  _proto: [2, null]
}, $s$1, 1],
    $s$16 = [{}, $s$15, 2],
    $s$17 = [{
  b: [1, "69:17-69:18"]
}, $s$15, 2],
    $s$18 = [{
  a: [1, "72:10-72:11"]
}, $s$15, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 9, "1:0-76:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $.goto = 1;
      $brk("1:0-1:16");
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("profile", M, "es");
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("54:0-54:29");
      $.state = 3;

    case 3:
      $l[6] = $m$6($);
      $.goto = 4;
      $brk("56:0-66:2");
      $.state = 4;

    case 4:
      $l[7] = {
        a1: $m$7($),
        a2: $m$8($),
        a3: $m$9($)
      };
      $.goto = 5;
      $brk("68:6-74:16");
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = /*#__PURE__*/($context.call = $m$10($))();
      $.state = 6;

    case 6:
      $l[8] = $p;
      $.goto = 8;
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-1:16", $s$1], [2, "1:0-1:15", $s$1], [4, "54:0-54:29", $s$1], [4, "56:0-66:2", $s$1], [4, "68:6-74:16", $s$1], [2, null, $s$1], [0, null, $s$1], [16, "76:0-76:0", $s$1], [16, "76:0-76:0", $s$1]]),
    $m$1 = $M.fun("m$1", "d", null, $m$0, ["i"], 1, 8, "3:0-12:1", 2, function d($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("4:2-4:12");
      $.state = 1;

    case 1:
      $l[2] = 0;
      $.goto = 2;
      $brk("5:2-5:25");
      $.state = 2;

    case 2:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 3;
      return $yld($1);

    case 3:
      $1 = $l[2];
      $l[2] = $1 + 1;
      $.goto = 4;
      return $yld($1);

    case 4:
      $.goto = 5;
      $brk("6:2-10:3");
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($context.call = some)($l[1] = $l[1] + 2, $l[2]);
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
      $p = $iterNext($l[5], $l[6]);
      $.state = 9;

    case 9:
      $l[6] = $p;
      $.state = 10;

    case 10:
      if ($l[6].done) {
        $.state = 11;
      } else {
        $.goto = 30;
        return $yld($l[6].value);
      }

    case 11:
      $l[7] = $l[6].value;
      $.goto = 12;
      return $yld($l[7]);

    case 12:
      if ($p) {
        $.goto = 17;
        $brk("7:4-7:27");
        continue;
      } else {
        $.goto = 13;
        $brk("8:9-10:3");
        $.state = 13;
      }

    case 13:
      if ($l[2]) {
        $.goto = 16;
        $brk("9:4-9:13");
        continue;
      } else {
        $.state = 14;
      }

    case 14:
      $.goto = 15;
      $brk("11:2-11:10");
      $.state = 15;

    case 15:
      $.goto = 38;
      return $yld(2);

    case 16:
      $.result = $l[1];
      $.goto = 38;
      continue;

    case 17:
      $.goto = 18;
      $p = $iterator($l[1] = $l[1] + 3);
      $.state = 18;

    case 18:
      $l[5] = $p;
      $.state = 19;

    case 19:
      $.goto = 20;
      $p = $iterNext($l[5], $l[7]);
      $.state = 20;

    case 20:
      $l[7] = $p;
      $.state = 21;

    case 21:
      if ($l[7].done) {
        $.state = 22;
      } else {
        $.goto = 23;
        return $yld($l[7].value);
      }

    case 22:
      $.result = $l[7].value;
      $.goto = 38;
      continue;

    case 23:
      $l[7] = $p;
      $.goto = 19;
      continue;

    case 24:
      if ($l[5].throw) {
        $.state = 25;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 37;
        $.goto = 27;
        continue;
      }

    case 25:
      $.goto = 26;
      $p = $iterErr($l[5], $.error);
      $.state = 26;

    case 26:
      $l[7] = $p;
      $.goto = 21;
      continue;

    case 27:
      $.goto = 28;
      $p = $iterFin($l[5], $.result);
      $.state = 28;

    case 28:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 29;
        return $yld($p.value);
      }

    case 29:
      $l[7] = $p;
      $.goto = 19;
      continue;

    case 30:
      $l[6] = $p;
      $.goto = 8;
      continue;

    case 31:
      if ($l[5].throw) {
        $.state = 32;
      } else {
        $.error = $M.iterErrUndef();
        $l[3] = 37;
        $.goto = 34;
        continue;
      }

    case 32:
      $.goto = 33;
      $p = $iterErr($l[5], $.error);
      $.state = 33;

    case 33:
      $l[6] = $p;
      $.goto = 10;
      continue;

    case 34:
      $.goto = 35;
      $p = $iterFin($l[5], $.result);
      $.state = 35;

    case 35:
      if ($p.done) {
        $.goto = $l[3];
        continue;
      } else {
        $.goto = 36;
        return $yld($p.value);
      }

    case 36:
      $l[6] = $p;
      $.goto = 8;
      continue;

    case 37:
      $.goto = 38;
      return $unhandledG($.error);

    case 38:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 30:
    case 10:
      $.goto = 31;
      break;

    case 23:
    case 21:
      $.goto = 24;
      break;

    case 31:
    case 9:
    case 8:
      $l[3] = 37;
      $.goto = 34;
      break;

    case 24:
    case 20:
    case 19:
      $l[4] = 37;
      $.goto = 27;
      break;

    default:
      $.goto = 37;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 31:
    case 30:
    case 10:
    case 9:
    case 8:
      $l[3] = 38;
      $.goto = 34;
      break;

    case 24:
    case 23:
    case 21:
    case 20:
    case 19:
      $l[4] = 38;
      $.goto = 27;
      break;

    default:
      $.goto = 38;
      break;
  }
}, 1, [[4, "4:2-4:12", $s$2], [4, "5:2-5:25", $s$2], [2, "5:9-5:18", $s$2], [2, "5:2-5:24", $s$2], [4, "6:2-10:3", $s$2], [2, "6:19-6:36", $s$2], [2, "6:12-6:40", $s$2], [0, null, $s$2], [1, "6:12-6:40", $s$2], [1, null, $s$2], [1, null, $s$2], [2, "6:6-6:40", $s$2], [4, "7:4-7:27", $s$2], [4, "9:4-9:13", $s$2], [4, "11:2-11:10", $s$2], [2, "11:2-11:9", $s$2], [0, null, $s$2], [2, "7:11-7:26", $s$2], [0, null, $s$2], [1, "7:11-7:26", $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [0, null, $s$2], [16, "12:1-12:1", $s$2], [16, "12:1-12:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a4", null, $m$0, [], 0, 8, "14:0-27:1", 2, function a4($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("15:2-15:10");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $yld(1);

    case 2:
      $.goto = 3;
      $brk("16:2-25:3");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("17:4-17:12");
      $.state = 4;

    case 4:
      $.goto = 5;
      return $yld(2);

    case 5:
      $.goto = 6;
      $brk("18:4-18:12");
      $.state = 6;

    case 6:
      $l[2] = 16;
      $.goto = 11;
      return $yld(3);

    case 7:
      $l[1] = $.error;
      $.error = void 0;
      $.goto = 8;
      $brk("20:4-20:18");
      $.state = 8;

    case 8:
      $.goto = 9;
      return $yld("excep");

    case 9:
      $.goto = 10;
      $brk("21:4-21:12");
      $.state = 10;

    case 10:
      $l[2] = 16;
      $.goto = 11;
      return $yld($l[1]);

    case 11:
      $.goto = 12;
      $brk("23:4-23:14");
      $.state = 12;

    case 12:
      $.goto = 13;
      return $yld("f");

    case 13:
      $.goto = 14;
      $brk("24:4-24:14");
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
      $brk("26:2-26:20");
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
      $l[5] = $p;
      $.state = 20;

    case 20:
      $.goto = 21;
      $p = $iterNext($l[5], $l[6]);
      $.state = 21;

    case 21:
      $l[6] = $p;
      $.state = 22;

    case 22:
      if ($l[6].done) {
        $.state = 23;
      } else {
        $.goto = 24;
        return $yld($l[6].value);
      }

    case 23:
      $l[7] = $l[6].value;
      $.goto = 32;
      return $yld($l[7]);

    case 24:
      $l[6] = $p;
      $.goto = 20;
      continue;

    case 25:
      if ($l[5].throw) {
        $.state = 26;
      } else {
        $.error = $M.iterErrUndef();
        $l[4] = 31;
        $.goto = 28;
        continue;
      }

    case 26:
      $.goto = 27;
      $p = $iterErr($l[5], $.error);
      $.state = 27;

    case 27:
      $l[6] = $p;
      $.goto = 22;
      continue;

    case 28:
      $.goto = 29;
      $p = $iterFin($l[5], $.result);
      $.state = 29;

    case 29:
      if ($p.done) {
        $.goto = $l[4];
        continue;
      } else {
        $.goto = 30;
        return $yld($p.value);
      }

    case 30:
      $l[6] = $p;
      $.goto = 20;
      continue;

    case 31:
      $.goto = 32;
      return $unhandledG($.error);

    case 32:
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

    case 24:
    case 22:
      $.goto = 25;
      break;

    case 25:
    case 21:
    case 20:
      $l[4] = 31;
      $.goto = 28;
      break;

    case 10:
    case 9:
    case 8:
    case 7:
      $l[3] = $.error;
      $l[2] = 31;
      $.goto = 11;
      break;

    default:
      $.goto = 31;
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
      $l[2] = 32;
      $.goto = 11;
      break;

    case 25:
    case 24:
    case 22:
    case 21:
    case 20:
      $l[4] = 32;
      $.goto = 28;
      break;

    default:
      $.goto = 32;
      break;
  }
}, 1, [[4, "15:2-15:10", $s$3], [2, "15:2-15:9", $s$3], [4, "16:2-25:3", $s$3], [5, "17:4-17:12", $s$3], [3, "17:4-17:11", $s$3], [5, "18:4-18:12", $s$3], [3, "18:4-18:11", $s$3], [5, "20:4-20:18", $s$4], [3, "20:4-20:17", $s$4], [5, "21:4-21:12", $s$4], [3, "21:4-21:11", $s$4], [4, "23:4-23:14", $s$3], [2, "23:4-23:13", $s$3], [4, "24:4-24:14", $s$3], [2, "24:4-24:13", $s$3], [0, null, $s$3], [4, "26:2-26:20", $s$3], [2, "26:15-26:19", $s$3], [2, "26:8-26:19", $s$3], [0, null, $s$3], [1, "26:8-26:19", $s$3], [1, null, $s$3], [1, null, $s$3], [2, "26:2-26:19", $s$3], [1, null, $s$3], [1, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [0, null, $s$3], [16, "27:1-27:1", $s$3], [16, "27:1-27:1", $s$3]]),
    $m$3 = $M.fun("m$3", "a5", null, $m$0, [], 0, 4, "29:0-31:1", 2, function a5($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("30:2-30:32");
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($context.call = $l[0][2])();
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $iterator($p);
      $.state = 3;

    case 3:
      $l[3] = $p;
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
        $l[1] = $p.value;
        $.goto = 7;
        $brk("30:24-30:32");
        continue;
      }

    case 6:
      $.goto = 11;
      continue;

    case 7:
      $.goto = 4;
      return $yld($l[1]);

    case 8:
      $.goto = 9;
      $iterFin($l[3]);
      $.state = 9;

    case 9:
      $.goto = $l[2];
      continue;

    case 10:
      $.goto = 11;
      return $unhandledG($.error);

    case 11:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 7:
    case 5:
    case 4:
      $l[2] = 10;
      $.goto = 8;
      break;

    default:
      $.goto = 10;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 7:
    case 5:
    case 4:
      $l[2] = 11;
      $.goto = 8;
      break;

    default:
      $.goto = 11;
      break;
  }
}, 1, [[4, "30:2-30:32", $s$5], [2, "30:18-30:22", $s$6], [0, null, $s$5], [0, null, $s$5], [1, "30:13-30:14", $s$5], [5, "30:24-30:32", $s$6], [0, null, $s$5], [3, "30:24-30:31", $s$6], [0, null, $s$5], [0, null, $s$5], [16, "31:1-31:1", $s$5], [16, "31:1-31:1", $s$5]]),
    $m$4 = $M.fun("m$4", "cfb1", null, $m$0, [], 1, 5, "33:0-49:1", 2, function cfb1($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("34:2-48:3");
      $.state = 1;

    case 1:
      $l[1] = 0;
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("35:4-47:5");
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk("36:6-41:7");
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("37:8-37:62");
      $.state = 5;

    case 5:
      $.goto = 6;
      return $yld($l[1] === 3);

    case 6:
      if ($p) {
        $.goto = 9;
        $brk("37:27-37:62");
        continue;
      } else {
        $.state = 7;
      }

    case 7:
      $.goto = 8;
      $brk("38:8-38:22");
      $.state = 8;

    case 8:
      $l[3] = 14;
      $.goto = 11;
      return $yld(`a${$l[1]}`);

    case 9:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 10;
      $p = new ($context.call = Error)(`AAAAAAAAA${$1}`);
      $.state = 10;

    case 10:
      $.goto = 7;
      return $raise($p);

    case 11:
      $.goto = 12;
      $brk("40:8-40:25");
      $.state = 12;

    case 12:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 13;
      return $yld(`f1${$1}`);

    case 13:
      $.error = $l[4];
      $.goto = $l[3];
      continue;

    case 14:
      $.goto = 15;
      $brk("42:6-42:22");
      $.state = 15;

    case 15:
      $1 = $l[1];
      $l[1] = $1 + 1;
      $.goto = 16;
      return $yld(`b${$1}`);

    case 16:
      $l[1] = $l[1] + 1;
      $.goto = 2;
      continue;

    case 17:
      $l[2] = $.error;
      $.error = void 0;
      $.goto = 18;
      $brk("44:6-44:20");
      $.state = 18;

    case 18:
      $.goto = 19;
      return $yld(`e${$l[1]}`);

    case 19:
      $.goto = 20;
      $brk("45:6-45:14");
      $.state = 20;

    case 20:
      $.goto = 21;
      return $yld($l[2]);

    case 21:
      $.goto = 22;
      $brk("46:6-46:15");
      $.state = 22;

    case 22:
      $.result = $l[1];
      $.goto = 24;
      continue;

    case 23:
      $.goto = 24;
      return $unhandledG($.error);

    case 24:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 3:
      $.goto = 17;
      break;

    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[4] = $.error;
      $l[3] = 17;
      $.goto = 11;
      break;

    default:
      $.goto = 23;
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
      $l[3] = 24;
      $.goto = 11;
      break;

    default:
      $.goto = 24;
      break;
  }
}, 1, [[4, "34:2-48:3", $s$7], [0, "34:11-34:16", $s$8], [4, "35:4-47:5", $s$8], [5, "36:6-41:7", $s$8], [5, "37:8-37:62", $s$8], [3, "37:12-37:25", $s$8], [5, "37:27-37:62", $s$8], [5, "38:8-38:22", $s$8], [3, "38:8-38:21", $s$8], [3, "37:33-37:61", $s$8], [1, null, $s$7], [5, "40:8-40:25", $s$8], [3, "40:8-40:24", $s$8], [1, null, $s$7], [5, "42:6-42:22", $s$8], [3, "42:6-42:21", $s$8], [0, "34:20-34:23", $s$8], [4, "44:6-44:20", $s$9], [2, "44:6-44:19", $s$9], [4, "45:6-45:14", $s$9], [2, "45:6-45:13", $s$9], [4, "46:6-46:15", $s$9], [0, null, $s$7], [16, "49:1-49:1", $s$7], [16, "49:1-49:1", $s$7]]),
    $m$5 = $M.fun("m$5", "c", null, $m$0, [], 0, 1, "50:0-52:1", 2, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("51:2-51:10");
      $.state = 1;

    case 1:
      $.goto = 3;
      return $yld(1);

    case 2:
      $.goto = 3;
      return $unhandledG($.error);

    case 3:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "51:2-51:10", $s$10], [2, "51:2-51:9", $s$10], [16, "52:1-52:1", $s$10], [16, "52:1-52:1", $s$10]]),
    $m$6 = $M.fun("m$6", null, null, $m$0, ["v"], 0, 2, "54:10-54:28", 5, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("54:21-54:28");
      $.state = 1;

    case 1:
      $.goto = 2;
      return $awt($l[1]);

    case 2:
      $.result = $p;
      $.goto = 4;
      continue;

    case 3:
      $.goto = 4;
      return $unhandledA($.error);

    case 4:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "54:21-54:28", $s$11], [2, "54:21-54:28", $s$11], [0, null, $s$11], [16, "54:28-54:28", $s$11], [16, "54:28-54:28", $s$11]]),
    $m$7 = $M.fun("m$7", null, null, $m$0, [], 0, 1, "57:6-59:3", 2, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("58:4-58:12");
      $.state = 1;

    case 1:
      $.goto = 3;
      return $yld(1);

    case 2:
      $.goto = 3;
      return $unhandledG($.error);

    case 3:
      return $retG($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "58:4-58:12", $s$12], [2, "58:4-58:11", $s$12], [16, "59:3-59:3", $s$12], [16, "59:3-59:3", $s$12]]),
    $m$8 = $M.fun("m$8", null, null, $m$0, ["a"], 0, 2, "60:6-62:3", 1, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("61:4-61:12");
      $.state = 1;

    case 1:
      $.goto = 3;
      return $awt($l[1]);

    case 2:
      $.goto = 3;
      return $unhandledA($.error);

    case 3:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "61:4-61:12", $s$13], [2, "61:4-61:11", $s$13], [16, "62:3-62:3", $s$13], [16, "62:3-62:3", $s$13]]),
    $m$9 = $M.fun("m$9", null, null, $m$0, ["a", "b"], 0, 3, null, 1, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("64:4-64:12");
      $.state = 1;

    case 1:
      $.goto = 3;
      return $awt($l[1]);

    case 2:
      $.goto = 3;
      return $unhandledA($.error);

    case 3:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "64:4-64:12", $s$14], [2, "64:4-64:11", $s$14], [16, null, $s$14], [16, null, $s$14]]),
    $m$10 = $M.fun("m$10", null, null, $m$0, [], 0, 3, null, 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$11($);
      $.goto = 1;
      $brk("69:2-71:16");
      $.state = 1;

    case 1:
      $l[1].a = $m$12($);
      $l[2] = $l[1].prototype;
      $.goto = 2;
      $brk("72:2-74:9");
      $.state = 2;

    case 2:
      $l[2].b = $m$13($);
      $.result = $l[1];
      $.goto = 4;
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "69:2-71:16", $s$15], [4, "72:2-74:9", $s$15], [0, null, $s$15], [16, null, $s$15], [16, null, $s$15]]),
    $m$11 = $M.fun("m$11", "A", null, $m$10, [], 0, 1, null, 0, function A($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
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
}, null, null, 2, [[0, null, $s$16], [16, null, $s$16], [16, null, $s$16]]),
    $m$12 = $M.fun("m$12", "a", null, $m$10, ["b"], 0, 2, "69:2-71:3", 1, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("70:4-70:12");
      $.state = 1;

    case 1:
      $.goto = 3;
      return $awt($l[1]);

    case 2:
      $.goto = 3;
      return $unhandledA($.error);

    case 3:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "70:4-70:12", $s$17], [2, "70:4-70:11", $s$17], [16, "71:3-71:3", $s$17], [16, "71:3-71:3", $s$17]]),
    $m$13 = $M.fun("m$13", "b", null, $m$10, ["a"], 0, 2, "72:2-74:3", 1, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("73:4-73:12");
      $.state = 1;

    case 1:
      $.goto = 3;
      return $awt($l[1]);

    case 2:
      $.goto = 3;
      return $unhandledA($.error);

    case 3:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "73:4-73:12", $s$18], [2, "73:4-73:11", $s$18], [16, "74:3-74:3", $s$18], [16, "74:3-74:3", $s$18]]);

$M.moduleExports();