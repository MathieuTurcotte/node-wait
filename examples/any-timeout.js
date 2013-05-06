#!/usr/bin/env node

var Delay = require('./delay');
var ewait = require('../index');

var delays = [
    new Delay(200),
    new Delay(400),
    new Delay(1400)
];

// No delay will fire before timeout.
var any = new ewait.WaitForAny({
    timeout: 100,
    event: 'done'
});

any.add(delays);

any.once('done', function() {
    console.log('Done!');
});

any.once('timeout', function() {
    console.log('Timeout!');
});

any.wait();

delays.forEach(function(delay) {
    delay.start();
});

console.log('Waiting...');
