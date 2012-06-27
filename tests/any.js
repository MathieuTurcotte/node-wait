/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var events = require('events'),
    sinon = require('sinon');

var WaitForAny = require('../lib/any');

exports["WaitForAny"] = {
    setUp: function(callback) {
        this.clock = sinon.useFakeTimers();
        callback();
    },

    tearDown: function(callback) {
        this.clock.restore();
        callback();
    },

    "'done' should be emitted when first emitter is done": function(test) {
        var isDone = false;

        var e1 = new events.EventEmitter();
        var e2 = new events.EventEmitter();
        var e3 = new events.EventEmitter();

        var waiter = new WaitForAny();
        waiter.once('done', function() {
            isDone = true;
        });
        waiter.add([e1, e2, e3]);
        waiter.wait();

        e2.emit('done');
        test.ok(isDone);

        test.done();
    },

    "'timeout' should not be emitted after the 'done' event": function(test) {
        var hasTimedOut = false;
        var isDone = false;

        var e1 = new events.EventEmitter();
        var e2 = new events.EventEmitter();
        var e3 = new events.EventEmitter();

        var waiter = new WaitForAny({
            timeout: 100
        });
        waiter.once('done', function() {
            isDone = true;
        });
        waiter.once('timeout', function() {
            hasTimedOut = true;
        });
        waiter.add([e1, e2, e3]);
        waiter.wait();

        e2.emit('done');

        this.clock.tick(1000);  // Timeout.
        test.ok(!hasTimedOut);

        test.done();
    },

    "no more listeners should remain after 'done' is emitted": function(test) {
        var e1 = new events.EventEmitter();
        var e2 = new events.EventEmitter();
        var e3 = new events.EventEmitter();
        var waiter = new WaitForAny({
            timeout: 5000
        });
        waiter.add([e1, e2, e3]);
        waiter.wait();

        e3.emit('done');

        test.equal(e1.listeners('done').length, 0);
        test.equal(e2.listeners('done').length, 0);
        test.equal(e3.listeners('done').length, 0);
        test.done();
    }
};
