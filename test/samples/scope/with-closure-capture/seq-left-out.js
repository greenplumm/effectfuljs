function ai() {
    var i;
    i += 1;
    return M(eff1(i)).mbind(function () {
        return function (i) {
            i += 2;
            return eff2(i);
        }(i);
    });
}
function aij() {
    var i, j, y;
    i++;
    return M(eff(i)).mbind(function () {
        return function (i, j) {
            j = 2;
            i++;
            return M(eff(j)).mbind(function () {
                return M(eff(i, j)).mbind(function () {
                    return eff(j);
                });
            });
        }(i, j);
    });
}
function aij1() {
    var i, j, y;
    return M(eff(1)).mbind(function () {
        return function (i) {
            i += j;
            return M(eff(i)).mbind(function () {
                return function (i, j) {
                    j = 2;
                    i++;
                    return M(eff(j)).mbind(function () {
                        return M(eff(i, j)).mbind(function () {
                            return eff(j);
                        });
                    });
                }(i, j);
            });
        }(i);
    });
}
function aij2() {
    var i, j, y;
    return M(eff(1)).mbind(function () {
        return function (i) {
            i += 2;
            return M(eff(i)).mbind(function () {
                return function (i, j) {
                    j = 2;
                    i++;
                    return M(eff(j)).mbind(function () {
                        return M(eff(i, j)).mbind(function () {
                            return eff(j);
                        });
                    });
                }(i, j);
            });
        }(i);
    });
}
function aij3() {
    var i, j, y;
    j = 0;
    i++;
    return M(eff(i)).mbind(function () {
        return function (i, j) {
            j = 2;
            i++;
            return M(eff(j)).mbind(function () {
                return M(eff(i, j)).mbind(function () {
                    return eff(j);
                });
            });
        }(i, j);
    });
}
function ar() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return M(eff(i)).mbind(function () {
            return function (i) {
                i++;
                return M(eff(i)).mbind(function () {
                    return M(eff(i)).mbind(function () {
                        return function (i) {
                            i++;
                            return M(eff(i)).mbind(function () {
                                return function (i, j) {
                                    j = 2;
                                    i += 1;
                                    return M(eff(i)).mbind(function () {
                                        return M(eff(3)).mbind(function () {
                                            return function (i) {
                                                i++;
                                                return M(eff(j)).mbind(function () {
                                                    return M(eff(3)).mbind(function () {
                                                        return function (j) {
                                                            j = 1;
                                                            return M(eff(i)).mbind(function () {
                                                                return eff(i, j);
                                                            });
                                                        }(j);
                                                    });
                                                });
                                            }(i);
                                        });
                                    });
                                }(i, j);
                            });
                        }(i);
                    });
                });
            }(i);
        });
    });
}
function a() {
    var i, j;
    i++;
    return M(eff(i)).mbind(function () {
        return M(eff(i)).mbind(function () {
            return function (i) {
                i++;
                return M(eff(i)).mbind(function () {
                    return M(eff(i)).mbind(function () {
                        return function (i) {
                            i++;
                            return M(eff(i)).mbind(function () {
                                return function (i, j) {
                                    j = 2;
                                    i += 1;
                                    return M(eff(i)).mbind(function () {
                                        return M(eff(i)).mbind(function () {
                                            return M(eff(3)).mbind(function () {
                                                return function (i) {
                                                    i++;
                                                    return M(eff(j)).mbind(function () {
                                                        return M(eff(3)).mbind(function () {
                                                            return function (j) {
                                                                j = 1;
                                                                return M(eff(i)).mbind(function () {
                                                                    return eff(j);
                                                                });
                                                            }(j);
                                                        });
                                                    });
                                                }(i);
                                            });
                                        });
                                    });
                                }(i, j);
                            });
                        }(i);
                    });
                });
            }(i);
        });
    });
}
function al() {
    var i, j;
    i += 2;
    return M(eff1(i)).mbind(function () {
        return M(eff1(i)).mbind(function () {
            return function (i) {
                i++;
                return M(eff2(i)).mbind(function () {
                    return M(eff2(i)).mbind(function () {
                        return function (i) {
                            i += 3;
                            return M(eff3(i)).mbind(function () {
                                return M(eff4(i)).mbind(function () {
                                    return function (i) {
                                        i++;
                                        return eff5(i);
                                    }(i);
                                });
                            });
                        }(i);
                    });
                });
            }(i);
        });
    });
}
function b() {
    var i;
    i = new Something();
    return M(i.next()).mbind(function (b) {
        return function (i) {
            i = b;
            return M(i.next()).mbind(function (b1) {
                return function (i) {
                    i = b1;
                    return M(i.next()).mapply(function (b2) {
                        return function (i) {
                            i = b2;
                        }(i);
                    });
                }(i);
            });
        }(i);
    });
}