/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    sinon = require('sinon'),
    util = require('util');

var WaitForMultiple = require('../lib/multiple');

function WaitForNothing(options) {
    WaitForMultiple.call(this, options);
    this.done = 0;
}
util.inherits(WaitForNothing, WaitForMultiple);

WaitForNothing.prototype.handleDone = function() {
    this.done++;
};

exports["WaitForMultiple"] = {
    setUp: function(callback) {
        this.clock = sinon.useFakeTimers();
        callback();
    },

    tearDown: function(callback) {
        this.clock.restore();
        callback();
    },

    "'handleDone' should be called for each subject": function(test) {
        var e1 = new events.EventEmitter();
        var e2 = new events.EventEmitter();
        var e3 = new events.EventEmitter();

        var waiter = new WaitForNothing();
        waiter.add([e1, e2, e3]);
        waiter.wait();

        e1.emit('done');
        e2.emit('done');
        e3.emit('done');

        test.equal(waiter.done, 3);
        test.done();
    },

    "the 'timeout' event should be emitted on timeout": function(test) {
        var hasTimedOut = false;

        var waiter = new WaitForNothing({
            timeout: 5000
        });
        waiter.once('timeout', function() {
            hasTimedOut = true;
        });
        waiter.wait();

        this.clock.tick(4999);  // Before timeout.
        test.ok(!hasTimedOut);

        this.clock.tick(1);     // Timeout.
        test.ok(hasTimedOut);

        test.done();
    },

    "listeners should be removed on 'timeout'": function(test) {
        var e1 = new events.EventEmitter();
        var e2 = new events.EventEmitter();
        var e3 = new events.EventEmitter();
        var waiter = new WaitForNothing({
            timeout: 5000
        });
        waiter.add([e1, e2, e3]);
        waiter.wait();

        this.clock.tick(5000);  // Timeout.

        test.equal(e1.listeners('done').length, 0);
        test.equal(e2.listeners('done').length, 0);
        test.equal(e3.listeners('done').length, 0);
        test.done();
    },

    "wait should listen for the provided event": function(test) {
        var e1 = new events.EventEmitter();
        var e2 = new events.EventEmitter();
        var e3 = new events.EventEmitter();
        var waiter = new WaitForNothing({
            event: 'logged' // Custom event.
        });
        waiter.add([e1, e2, e3]);
        waiter.wait();

        test.equal(e1.listeners('logged').length, 1);
        test.equal(e2.listeners('logged').length, 1);
        test.equal(e3.listeners('logged').length, 1);
        test.done();
    }
};
