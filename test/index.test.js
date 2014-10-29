var buffer_utils = require('../index');

describe('buffer_utils', function() {
    it('should be object', function() {
        buffer_utils.should.be.type('object');
    });

    describe('readUIntBE', function() {
        var buffer = new Buffer(6), res;
        buffer.fill(0);
        buffer[5] = 255;
        res1 = buffer_utils.readUIntBE(buffer);

        buffer.fill(0);
        buffer[4] = 1;
        res2 = buffer_utils.readUIntBE(buffer);

        it('should read correct integer value.', function() {
            res1.should.equal(255);
            res2.should.equal(256);
        });
    });

    describe('createIntBE', function() {
        var val = 256,
            len = 2,
            res1 = buffer_utils.createIntBE(val, len);

        it('should return Buffer instance.', function() {
            res1.should.be.an.instanceof(Buffer);
        });

        it('should return correct value and length.', function() {
            res1.length.should.be.equal(2);
            res1[0].should.be.equal(1);
        });

        it('should throw error if overflow buffer size.', function() {
            (function() {
                buffer_utils.createIntBE(256, 1);
            }).should.throw();
        });

    });

    describe('createFromHexString', function() {
        var str = '123456789abcdef',
            res = buffer_utils.createFromHexString(str);

        it('should return Buffer instance', function() {
            res.should.be.instanceof(Buffer);
        });

        it('should return correct value and length.', function() {
            var str_len = Math.ceil(str.length/2);
            res.length.should.be.equal(str_len);
            res[0].should.be.equal(parseInt(12, 16));
        });

        it('should throw error if argument is not hex string.', function() {
            (function() {
                var invalid_str = 'zzz';
                buffer_utils.createFromHexString(invalid_str);
            }).should.throw();
        });

    });

});
