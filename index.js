var buffer_utils = {

    // e.g., <Buffer 00 00 0f> -> '00000f'
    readHexString: function(buffer) {
        var i, res = '', tmp;

        for(i=0;i<buffer.length;i++) {
            tmp = buffer[i].toString(16);
            if(tmp.length == 1) {
                tmp = '0'+tmp;
            }
            res += tmp;
        }

        return res;
    },

    // e.g., <Buffer 00 00 0f> -> 15
    readUIntBE: function(buffer) {
        var len = buffer.length, i,
            res = 0;

        for(i=0;i<len;i++) {
            res += Math.pow(256, i) * buffer[len-1-i];
        }

        return res;
    },

    // e.g., <Buffer 00 01> -> 256
    readUIntLE: function(buffer) {
        var len = buffer.length, i,
            res = 0;

        for(i=0;i<len;i++) {
            res += Math.pow(256, i) * buffer[i];
        }

        return res;
    },

    // e.g., 0x010f -> <Buffer 01 0f>
    createIntBE: function(val, len) {
        var b = new Buffer(len), i, tmp = val, overflow = true;

        b.fill(0);

        for(i=0;i<len;i++) {
            if(tmp < 256) {
                b[len-1-i] = tmp;
                overflow = false;
                break;
            } else {
                b[len-1-i] = tmp % 256;
                tmp = parseInt(tmp/256,10);
            }
        }

        if(overflow) { throw new Error('overflow buffer size.'); }

        return b;
    },

    // e.g., 0x010f -> <Buffer 0f 01>
    createIntLE: function(val, len) {
        var b = new Buffer(len), i, tmp = val, overflow = true;

        b.fill(0);

        for(i=0;i<len;i++) {
            if(tmp < 256) {
                b[i] = tmp;
                overflow = false;
                break;
            } else {
                b[i] = tmp % 256;
                tmp = parseInt(tmp/256,10);
            }
        }

        if(overflow) { throw new Error('overflow buffer size.'); }

        return b;
    },

    // e.g., 'abcd' -> <Buffer 61 62 63 64>
    createFromString: function(_str) {
        var res = new Buffer(_str.length), i;
        for(i=0;i<_str.length;i++) {
            res[i] = _str.charCodeAt(i);
        }
        return res;
    },

    // e.g., '010f' -> <Buffer 01 0f>
    createFromHexString: function(_str) {
        var str = _str.toString(),
            i, len = Math.ceil(str.length/2),
            res = new Buffer(len), tmp;

        res.fill(0);

        if(str.length%2==1) {
            str = '0' + str;
        }

        for(i=0;i<len;i++) {
            tmp = parseInt(str[i*2], 16)*16;
            if(Number.isNaN(tmp)) {
                throw new Error('Invalid argument. It\'s not hex string.');
            }
            if(str[i*2+1]) {
                tmp += parseInt(str[i*2+1], 16);
            }
            res[i] = tmp;
        }

        return res;
    }

};

module.exports = buffer_utils;

if(module.parent === null) {
    /* error */
    console.log(buffer_utils.createIntBE(256, 2));
}
