#!/usr/bin/env node

var Delay = require('./delay');
var ewait = require('../index');

var delays = [
    new Delay(200),
    new Delay(400),
    new Delay(1400)
];

// Only two delays will fire before timeout.
var all = new ewait.WaitForAll({
    timeout: 800,
    event: 'done'
});

all.add(delays);

all.once('done', function() {
    console.log('Done!');
});

all.once('timeout', function() {
    console.log('Timeout!');
});

all.wait();

delays.forEach(function(delay) {
    delay.start();
});

console.log('Waiting...');
