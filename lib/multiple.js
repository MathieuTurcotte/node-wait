/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events');
var util = require('util');

function WaitForMultiple(opts) {
    events.EventEmitter.call(this);
    this.setMaxListeners(0);

    var options = opts || {};

    this.subjects = [];

    this.eventName = options.event || WaitForMultiple.EVENT_NAME;

    this.timeoutDelay = options.timeout;
    this.timeoutID = -1;

    this.registeredHandlers = [];

    this.handlers = {
        done: this.handleDone.bind(this),
        timeout: this.handleTimeout.bind(this)
    };
}
util.inherits(WaitForMultiple, events.EventEmitter);

/**
 * Timeout values too big to fit into a signed 32-bit integer will
 * overflow resulting in the timeout being scheduled immediately.
 */
WaitForMultiple.MAX_TIMEOUT = 2147483647;

WaitForMultiple.EVENT_NAME = 'done';

WaitForMultiple.prototype.add = function(arg) {
    if (Array.isArray(arg)) {
        this.subjects = this.subjects.concat(arg);
    } else {
        this.subjects.push(arg);
    }
};

WaitForMultiple.prototype.wait = function() {
    this.startListening();

    if (this.timeoutDelay >= 0 &&
        this.timeoutDelay <= WaitForMultiple.MAX_TIMEOUT) {
        this.timeoutID = setTimeout(this.handlers.timeout, this.timeoutDelay);
    }
};

WaitForMultiple.prototype.startListening = function() {
    for (var i = 0; i < this.subjects.length; i++) {
        var subject = this.subjects[i];
        var handler = this.handlers.done.bind(this.handlers.done, i);
        subject.once(this.eventName, handler);
        this.registeredHandlers[i] = handler;
    }
};

WaitForMultiple.prototype.stopListening = function() {
    for (var i = 0; i < this.subjects.length; i++) {
        var subject = this.subjects[i];
        var registeredHandler = this.registeredHandlers[i];
        subject.removeListener(this.eventName, registeredHandler);
    }
};

WaitForMultiple.prototype.clear = function() {
    clearTimeout(this.timeoutID);
    this.removeAllListeners();
    this.subjects = [];
};

WaitForMultiple.prototype.handleTimeout = function() {
    this.stopListening();
    this.emit('timeout');
    this.clear();
};

WaitForMultiple.prototype.handleDone = function() {
    throw new Error('Not implemented!');
};

module.exports = WaitForMultiple;
