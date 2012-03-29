/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util'),
    events = require('events');

function WaitForMultiple(options) {
    events.EventEmitter.call(this);
    this.setMaxListeners(0);

    var options = options || {};

    this.subjects = [];

    this.eventName = options.event || 'done';

    this.timeoutDelay = options.timeout;
    this.timeoutID = -1;

    this.handlers = {
        done: this.handleDone.bind(this),
        timeout: this.handleTimeout.bind(this)
    };
}
util.inherits(WaitForMultiple, events.EventEmitter);

WaitForMultiple.prototype.add = function(arg) {
    if (Array.isArray(arg)) {
        this.subjects = this.subjects.concat(arg);
    } else {
        this.subjects.push(arg);
    }
};

WaitForMultiple.prototype.wait = function() {
    this.subjects.forEach(function(subject) {
        subject.once(this.eventName, this.handlers.done);
    }, this);

    if (this.timeoutDelay) {
        this.timeoutID = setTimeout(this.handlers.timeout, this.timeoutDelay);
    }
};

WaitForMultiple.prototype.stopListening = function() {
    this.subjects.forEach(function(subject) {
        subject.removeListener(this.eventName, this.handlers.done);
    }, this);
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
