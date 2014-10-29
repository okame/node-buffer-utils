var buffer_utils = {

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

    createFromHexString: function(str) {
        var i, len = Math.ceil(str.length/2),
            res = new Buffer(len), tmp;

        res.fill(0);
        for(i=0;i<len;i++) {
            tmp = parseInt(str[i*2], 16)*16;
            if(Number.isNaN(tmp)) {
                throw new Error('Invalid argument. It\'s not hex string.');
            }
            tmp += parseInt(str[i*2+1], 16);
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