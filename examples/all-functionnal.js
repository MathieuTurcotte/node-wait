#!/usr/bin/env node

var ewait = require('../index'),
    Delay = require('./delay');

var delays = [
    new Delay(200),
    new Delay(400),
    new Delay(1400)
];

ewait.waitForAll(delays, function(err) {
    if (err != null) {
        console.log('Timeout!');
    } else {
        console.log('Done!');
    }
}, 2000, 'done');

delays.forEach(function(delay) {
    delay.start();
});

console.log('Waiting...');
