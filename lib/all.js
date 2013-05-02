/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util'),
    events = require('events');

var WaitForMultiple = require('./multiple');

function WaitForAll(options) {
    WaitForMultiple.call(this, options);
}
util.inherits(WaitForAll, WaitForMultiple);

WaitForAll.prototype.handleDone = function () {
    
    this.subjects.pop();

    if (this.subjects.length === 0) {
        var args = Array.prototype.slice.call(arguments, 0);
        // prepend 'done' to args
        args.unshift('done');
        this.emit.apply(this, args);
        this.clear();
    }
};

module.exports = WaitForAll;
