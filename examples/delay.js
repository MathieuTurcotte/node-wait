var util = require('util'),
    events = require('events');

function Delay(delay) {
    events.EventEmitter.call(this);
    this.delay = delay;
    this.onDone = this.handleDone.bind(this);
}
util.inherits(Delay, events.EventEmitter);

Delay.prototype.start = function() {
    setTimeout(this.onDone, this.delay);
};

Delay.prototype.handleDone = function() {
    this.emit('done');
};

module.exports = Delay;
