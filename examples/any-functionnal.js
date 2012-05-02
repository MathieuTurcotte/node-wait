#!/usr/bin/env node

var ewait = require('../index'),
    Delay = require('./delay');

var delays = [
    new Delay(200),
    new Delay(400),
    new Delay(1400)
];

ewait.waitForAny(delays, function(err) {
    if (err != null) {
        console.log('Timeout!');
    } else {
        console.log('Done!');
    }
}, 'done', 300);

delays.forEach(function(delay) {
    delay.start();
});

console.log('Waiting...');
