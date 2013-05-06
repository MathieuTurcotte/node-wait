/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var WaitForAll = require('./lib/all');
var WaitForAny = require('./lib/any');
var waitFn = require('./lib/waitfn');

module.exports = {
    WaitForAny: WaitForAny,
    WaitForAll: WaitForAll,
    waitForAny: waitFn(WaitForAny),
    waitForAll: waitFn(WaitForAll)
};

