node-buffer-utils
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

```
var buffer = new Buffer([0xab, 0xcd, 0xef]);

buffer_utils.readHexString(buffer);
// -> 'abcdef'
```

### readIntBE(buffer)
Return integer value from buffer as big endian.

```
var buffer = new Buffer([0x00, 0x00, 0x10]);

buffer_utils.readIntBE(buffer);
// -> 16
```

### createIntBE(val, len)

Create buffer from integer value as big endian.
"len" is buffer size(byte).

```
var val = 16;
var len = 3;

buffer_utils.createIntBE(val, len);
// -> <Buffer 00 00 10>
```


### createFromHexString(str)

Create buffer from string as big endian.

```
var str = 'abcdef';

buffer_utils.createFromHexString(str);
// -> <Buffer ab cd ef>
```

