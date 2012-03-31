# WaitForAll and WaitForAny for Node.js EventEmitter [![Build Status](https://secure.travis-ci.org/MathieuTurcotte/node-wait.png)](http://travis-ci.org/MathieuTurcotte/node-wait)

WaitForAll and WaitForAny on EventEmitter instances.

## Installation

```
npm install ewait
```
## Usage

`WaitForAny` and `WaitForAll` wait until one or all of the specified
`EventEmitter` are done or the timeout interval elapses.

Upon successful completion, a `done` event is emitted by the `WaitForAll` or
`WaitForAny` instance. On timeout, a `timeout` event is emitted.

By default, `WaitForAny` and `WaitForAll` will listen for the `done` event.
This behavior can be altered by specifying a custom event type.

## Example

``` js
var all = new WaitForAll({
    timeout: 2000,      // Wait for 2000ms max.
    event: 'flushed'    // Wait for a custom event.
});

all.add([toilet1, toilet2, toilet2]);

all.once('done', function() {
    console.log('All done!');
});

all.once('timeout', function() {
    console.log('Timeout!');
});

all.wait();
```

