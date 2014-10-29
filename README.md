node-buffere-utils
==================

Extended Buffer Class for Node.js

Example
-------------------
```
var buffer_utils = require('node-buffer-utils');

var val = 256, len = 2, res = buffer-utils.createIntBE(val, len);

console.log(res);
// <Buffer 01 00>
```

Methods
-------------------

### createIntBE

Create buffer from integer value with big endian.


### createFromHexString

Create buffer from string with big endian.
