# WaitForAll and WaitForAny for Node.js EventEmitter [![Build Status](https://secure.travis-ci.org/MathieuTurcotte/node-wait.png)](http://travis-ci.org/MathieuTurcotte/node-wait)

WaitForAll and WaitForAny on EventEmitter instances.

## Installation

```
npm install ewait
```
## Usage

`WaitForAny` will wait until one of the specified `EventEmitter` is done.
By contrast, `WaitForAll` will wait until all of the specified `EventEmitter`
are done.

Upon successful completion, they will both emit a `done` event. On timeout,
a `timeout` event will be emitted.

By default, `WaitForAny` and `WaitForAll` listen for the `done` event.
This behavior can be altered by specifying a custom event type.

## Example

### Object-Oriented style

``` js
var all = new WaitForAll({
    timeout: 2000,      // Wait for 2000ms max.
    event: 'flushed'    // Wait for a custom event.
});

all.add([toilet1, toilet2, toilet3]);

all.once('done', function() {
    console.log('All done!');
});

all.once('timeout', function() {
    console.log('Timeout!');
});

all.wait();
```

### Functional style

``` js
var toilets = [toilet1, toilet2, toilet3];

ewait.waitForAll(toilets, function(err) {
    if (err) {
        console.log('Timeout!');
    } else {
        console.log('Done!');
    }
}, 2000, 'flushed');
```

## API

### Class WaitForAll

#### new WaitForAll([options])

Construct a new wait object with an 'AND' semantic.

`options` is an object with the following defaults:

```js
options = {
    timeout: undefined, // No timeout.
    event: 'done'       // Listen for 'done' event.
};
```

#### wait.add(emitters)

- emitters: an array of `EventEmitter`

Add `EventEmitter` instances to wait on. Shouldn't be called after `wait`.

#### wait.wait()

Start waiting on `EventEmitter` instances.

#### Event: 'done'

Emitted when the waiting criterion has been satisfied before timeout.

#### Event: 'timeout'

Emitted when timeout expires before waiting criterion is satisfied.

### Class WaitForAny

#### new WaitForAny([options])

Construct a new wait object with an 'OR' semantic.

`options` is an object with the following defaults:

```js
options = {
    timeout: undefined, // No timeout.
    event: 'done'       // Listen for 'done' event.
};
```

#### wait.add(emitters)

- emitters: an array of `EventEmitter`

Add `EventEmitter` instances to wait on. Shouldn't be called after `wait`.

#### wait.wait()

Start waiting on `EventEmitter` instances.

#### Event: 'done'

Emitted when the waiting criterion has been satisfied before timeout.

#### Event: 'timeout'

Emitted when timeout expires before waiting criterion is satisfied.

### ewait.waitForAll(emitters, callback, [event, timeout])

- emitters: an array of `EventEmitter`
- callback: continuation callback
- event: the event name
- timeout: the timeout delay

`event` defaults to `done` and `timeout` defaults to undefined.

The callback gets one argument (err) which is null on successful wait and
contains an error on timeout.

Behavior is the same as `WaitForAll`.

### ewait.waitForAny(emitters, callback, [event, timeout])

See `ewait.waitForAll` for arguments.

Behavior is the same as `WaitForAny`.

## License

This code is free to use under the terms of the [MIT license](http://mturcotte.mit-license.org/).

