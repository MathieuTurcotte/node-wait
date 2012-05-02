/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var WaitForMultiple = require('./multiple');

function makeWaitFunction(Waiter) {
    return function(emitters, callback) {
        var extraArgs = Array.prototype.slice.call(arguments);
        var parsedArgs = parseTimeoutAndEventName(extraArgs);

        var waiter = new Waiter(parsedArgs);

        waiter.once('done', function() {
            callback(null);
        });

        waiter.once('timeout', function() {
            callback(new Error('Timeout.'));
        });

        waiter.add(emitters);
        waiter.wait();
    };
};

function parseTimeoutAndEventName(args) {
    var parsedArgs = {
        timeout: undefined,
        event: WaitForMultiple.EVENT_NAME
    };

    args.slice(2, 4).forEach(function(arg) {
        if (typeof arg == "string") {
            parsedArgs.event = arg;
        } else if (typeof arg == "number") {
            parsedArgs.timeout = arg;
        }
    });

    return parsedArgs;
};

module.exports = makeWaitFunction;
