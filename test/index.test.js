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

    describe('createIntLE', function() {
        var val = 256,
            len = 2,
            res1 = buffer_utils.createIntLE(val, len);

        it('should return Buffer instance.', function() {
            res1.should.be.an.instanceof(Buffer);
        });

        it('should return correct value and length.', function() {
            res1.length.should.be.equal(2);
            res1[0].should.be.equal(0);
            res1[1].should.be.equal(1);
        });

        it('should throw error if overflow buffer size.', function() {
            (function() {
                buffer_utils.createIntLE(256, 1);
            }).should.throw();
        });

    });

    describe('createFromString', function() {
        describe('argument is string', function() {
            var str = 'sashimi',
                res = buffer_utils.createFromString(str);
            it('should return Buffer instance.', function() {
                res.should.be.instanceof(Buffer);
            });
            it('should return collect one and length.', function() {
                var i;
                res.length.should.be.equal(str.length);
                for(i=0;i<str.length;i++) {
                    res[i].should.be.equal(str.charCodeAt(i));
                }
            });
        });
    });

    describe('createFromHexString', function() {
        describe('argument is string', function() {
            var str = '123456789abcdef1',
                res = buffer_utils.createFromHexString(str);

            it('should return Buffer instance', function() {
                res.should.be.instanceof(Buffer);
            });

            it('should return correct value and length.', function() {
                var str_len = Math.ceil(str.length/2);
                res.length.should.be.equal(str_len);
                res[0].should.be.equal(parseInt(12, 16));
                res[res.length-1].should.be.equal(parseInt('f1', 16));
            });

            it('should throw error if argument is not hex string.', function() {
                (function() {
                    var invalid_str = 'zzz';
                    buffer_utils.createFromHexString(invalid_str);
                }).should.throw();
            });

        });

        describe('argument is integer', function() {
            var str = 5,
                res = buffer_utils.createFromHexString(str);

            it('should return correct value and length.', function() {
                res.length.should.equal(1);
                res[0].should.equal(5);
            });
        });

    });

    describe('readHexString', function() {
        var b = new Buffer(4), res;
        b[0] = parseInt('00', 16);
        b[1] = parseInt('34', 16);
        b[2] = parseInt('ab', 16);
        b[3] = parseInt('cd', 16);

        res = buffer_utils.readHexString(b);

        it('should return hex string', function() {
            res[0] = '1';
            res[7] = 'd';
        });
    });

});
