#!/usr/bin/env node

var WaitForAny = require('../index').WaitForAny,
    Delay = require('./delay');

var delays = [
    new Delay(200),
    new Delay(400),
    new Delay(1400)
];

// First delay will fire before timeout.
var any = new WaitForAny({
    timeout: 300,
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
