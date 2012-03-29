#!/usr/bin/env node

var WaitForAll = require('../index').WaitForAll,
    Delay = require('./delay');

var delays = [
    new Delay(200),
    new Delay(400),
    new Delay(1400)
];

// All delays will fire before timeout.
var all = new WaitForAll({
    timeout: 2000,
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
