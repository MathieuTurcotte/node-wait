/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util'),
    events = require('events');

var WaitForMultiple = require('./multiple');

function WaitForAny(options) {
    WaitForMultiple.call(this, options);
}
util.inherits(WaitForAny, WaitForMultiple);

WaitForAny.prototype.handleDone = function() {
    this.stopListening();

    var args = Array.prototype.slice.call(arguments, 0);
    // prepend 'done' to args
    args.unshift('done');
    this.emit.apply(this, args);

    this.clear();
};

module.exports = WaitForAny;
