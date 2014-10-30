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

### readHexString(buffer)
Return hex string from buffer.

### readIntBE(buffer)
Return integer value from buffer as big endian.

### createIntBE(val, len)

Create buffer from integer value as big endian.
"len" is buffer size(byte).


### createFromHexString(str)

Create buffer from string as big endian.
