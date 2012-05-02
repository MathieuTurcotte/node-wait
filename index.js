/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var waitFn = require('./lib/waitfn'),
    WaitForAny = require('./lib/any'),
    WaitForAll = require('./lib/all');

module.exports = {
    WaitForAny: WaitForAny,
    WaitForAll: WaitForAll,
    waitForAny: waitFn(WaitForAny),
    waitForAll: waitFn(WaitForAll)
};

