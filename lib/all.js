/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util'),
    events = require('events');

var WaitForMultiple = require('./multiple');

function WaitForAll(options) {
    WaitForMultiple.call(this, options);
    this.emittedArguments = [];
}
util.inherits(WaitForAll, WaitForMultiple);

WaitForAll.prototype.handleDone = function(index) {
    this.subjects.pop();

    var args = Array.prototype.slice.call(arguments, 1);
    this.emittedArguments[index] = args;

    if (this.subjects.length === 0) {
        this.emit('done', this.emittedArguments);
        this.clear();
    }
};

module.exports = WaitForAll;
