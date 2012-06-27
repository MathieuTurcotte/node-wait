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

WaitForAll.prototype.handleDone = function() {
    this.subjects.pop();

    if (this.subjects.length === 0) {
        this.emit('done');
        this.clear();
    }
};

module.exports = WaitForAll;
