/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util');

var WaitForMultiple = require('./multiple');

function WaitForAny(options) {
    WaitForMultiple.call(this, options);
}
util.inherits(WaitForAny, WaitForMultiple);

WaitForAny.prototype.handleDone = function(index) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.unshift('done', index);
    this.stopListening();
    this.emit.apply(this, args);
    this.clear();
};

module.exports = WaitForAny;
