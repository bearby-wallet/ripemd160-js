'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function join32(msg, start, end) {
    const len = end - start;
    if (len % 4 !== 0) {
        throw new RangeError('the remainder of the division of len should be zero.');
    }
    const res = new Array(len / 4);
    for (let i = 0, k = start; i < res.length; i++, k += 4) {
        const w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
        res[i] = w >>> 0;
    }
    return res;
}
function sum32(a, b) {
    return (a + b) >>> 0;
}
function rotl32(w, b) {
    return (w << b) | (w >>> (32 - b));
}
function sum32By4(a, b, c, d) {
    return (a + b + c + d) >>> 0;
}
function sum32By3(a, b, c) {
    return (a + b + c) >>> 0;
}
function split32(msg) {
    const res = new Array(msg.length * 4);
    for (let i = 0, k = 0; i < msg.length; i++, k += 4) {
        const m = msg[i];
        res[k + 3] = m >>> 24;
        res[k + 2] = (m >>> 16) & 0xff;
        res[k + 1] = (m >>> 8) & 0xff;
        res[k] = m & 0xff;
    }
    return res;
}
function toArray(msg) {
    if (Array.isArray(msg)) {
        return Array.from(msg).slice();
    }
    if (!msg) {
        return [];
    }
    const res = [];
    for (let i = 0; i < msg.length; i++) {
        res[i] = msg[i] | 0;
    }
    return res;
}

var _Ripemd160_instances, _Ripemd160_pending, _Ripemd160_blockSize, _Ripemd160_padLength, _Ripemd160_pendingTotal, _Ripemd160_delta8, _Ripemd160_delta32, _Ripemd160_h, _Ripemd160_update, _Ripemd160_digest, _Ripemd160_pad;
const r = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
    1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];
const rh = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
    6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
    8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];
const s = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
    7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
    11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];
const sh = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
    9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
    15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];
function Kh(j) {
    if (j <= 15)
        return 0x50a28be6;
    else if (j <= 31)
        return 0x5c4dd124;
    else if (j <= 47)
        return 0x6d703ef3;
    else if (j <= 63)
        return 0x7a6d76e9;
    else
        return 0x00000000;
}
function K(j) {
    if (j <= 15)
        return 0x00000000;
    else if (j <= 31)
        return 0x5a827999;
    else if (j <= 47)
        return 0x6ed9eba1;
    else if (j <= 63)
        return 0x8f1bbcdc;
    else
        return 0xa953fd4e;
}
function f(j, x, y, z) {
    if (j <= 15)
        return x ^ y ^ z;
    else if (j <= 31)
        return (x & y) | ((~x) & z);
    else if (j <= 47)
        return (x | (~y)) ^ z;
    else if (j <= 63)
        return (x & z) | (y & (~z));
    else
        return x ^ (y | (~z));
}
class Ripemd160 {
    constructor() {
        _Ripemd160_instances.add(this);
        _Ripemd160_pending.set(this, void 0);
        _Ripemd160_blockSize.set(this, 512);
        _Ripemd160_padLength.set(this, 8);
        _Ripemd160_pendingTotal.set(this, 0);
        _Ripemd160_delta8.set(this, __classPrivateFieldGet(this, _Ripemd160_blockSize, "f") / 8);
        _Ripemd160_delta32.set(this, __classPrivateFieldGet(this, _Ripemd160_blockSize, "f") / 32);
        _Ripemd160_h.set(this, [
            0x67452301,
            0xefcdab89,
            0x98badcfe,
            0x10325476,
            0xc3d2e1f0
        ]);
    }
    get blockSize() {
        return __classPrivateFieldGet(this, _Ripemd160_blockSize, "f");
    }
    digest() {
        this.update(__classPrivateFieldGet(this, _Ripemd160_instances, "m", _Ripemd160_pad).call(this));
        if (__classPrivateFieldGet(this, _Ripemd160_pending, "f") === null) {
            throw new Error('pending cannot be null');
        }
        return __classPrivateFieldGet(this, _Ripemd160_instances, "m", _Ripemd160_digest).call(this);
    }
    update(msg) {
        msg = toArray(msg);
        if (!__classPrivateFieldGet(this, _Ripemd160_pending, "f")) {
            __classPrivateFieldSet(this, _Ripemd160_pending, msg, "f");
        }
        else {
            __classPrivateFieldSet(this, _Ripemd160_pending, __classPrivateFieldGet(this, _Ripemd160_pending, "f").concat(msg), "f");
        }
        __classPrivateFieldSet(this, _Ripemd160_pendingTotal, __classPrivateFieldGet(this, _Ripemd160_pendingTotal, "f") + msg.length, "f");
        if (__classPrivateFieldGet(this, _Ripemd160_pending, "f").length >= __classPrivateFieldGet(this, _Ripemd160_delta8, "f")) {
            msg = __classPrivateFieldGet(this, _Ripemd160_pending, "f");
            const r = msg.length % __classPrivateFieldGet(this, _Ripemd160_delta8, "f");
            __classPrivateFieldSet(this, _Ripemd160_pending, msg.slice(msg.length - r, msg.length), "f");
            if (__classPrivateFieldGet(this, _Ripemd160_pending, "f").length === 0) {
                __classPrivateFieldSet(this, _Ripemd160_pending, undefined, "f");
            }
            msg = join32(msg, 0, msg.length - r);
            for (let i = 0; i < msg.length; i += __classPrivateFieldGet(this, _Ripemd160_delta32, "f")) {
                __classPrivateFieldGet(this, _Ripemd160_instances, "m", _Ripemd160_update).call(this, Array.from(msg), i);
            }
        }
        return this;
    }
}
_Ripemd160_pending = new WeakMap(), _Ripemd160_blockSize = new WeakMap(), _Ripemd160_padLength = new WeakMap(), _Ripemd160_pendingTotal = new WeakMap(), _Ripemd160_delta8 = new WeakMap(), _Ripemd160_delta32 = new WeakMap(), _Ripemd160_h = new WeakMap(), _Ripemd160_instances = new WeakSet(), _Ripemd160_update = function _Ripemd160_update(msg, start) {
    let A = __classPrivateFieldGet(this, _Ripemd160_h, "f")[0];
    let B = __classPrivateFieldGet(this, _Ripemd160_h, "f")[1];
    let C = __classPrivateFieldGet(this, _Ripemd160_h, "f")[2];
    let D = __classPrivateFieldGet(this, _Ripemd160_h, "f")[3];
    let E = __classPrivateFieldGet(this, _Ripemd160_h, "f")[4];
    let Ah = A;
    let Bh = B;
    let Ch = C;
    let Dh = D;
    let Eh = E;
    for (let j = 0; j < 80; j++) {
        var T = sum32(rotl32(sum32By4(A, f(j, B, C, D), msg[r[j] + start], K(j)), s[j]), E);
        A = E;
        E = D;
        D = rotl32(C, 10);
        C = B;
        B = T;
        T = sum32(rotl32(sum32By4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)), sh[j]), Eh);
        Ah = Eh;
        Eh = Dh;
        Dh = rotl32(Ch, 10);
        Ch = Bh;
        Bh = T;
    }
    T = sum32By3(__classPrivateFieldGet(this, _Ripemd160_h, "f")[1], C, Dh);
    __classPrivateFieldGet(this, _Ripemd160_h, "f")[1] = sum32By3(__classPrivateFieldGet(this, _Ripemd160_h, "f")[2], D, Eh);
    __classPrivateFieldGet(this, _Ripemd160_h, "f")[2] = sum32By3(__classPrivateFieldGet(this, _Ripemd160_h, "f")[3], E, Ah);
    __classPrivateFieldGet(this, _Ripemd160_h, "f")[3] = sum32By3(__classPrivateFieldGet(this, _Ripemd160_h, "f")[4], A, Bh);
    __classPrivateFieldGet(this, _Ripemd160_h, "f")[4] = sum32By3(__classPrivateFieldGet(this, _Ripemd160_h, "f")[0], B, Ch);
    __classPrivateFieldGet(this, _Ripemd160_h, "f")[0] = T;
}, _Ripemd160_digest = function _Ripemd160_digest() {
    return split32(__classPrivateFieldGet(this, _Ripemd160_h, "f"));
}, _Ripemd160_pad = function _Ripemd160_pad() {
    let len = __classPrivateFieldGet(this, _Ripemd160_pendingTotal, "f");
    const bytes = __classPrivateFieldGet(this, _Ripemd160_delta8, "f");
    const k = bytes - ((len + __classPrivateFieldGet(this, _Ripemd160_padLength, "f")) % bytes);
    let res = new Array(k + __classPrivateFieldGet(this, _Ripemd160_padLength, "f"));
    res[0] = 0x80;
    for (var i = 1; i < k; i++) {
        res[i] = 0;
    }
    // Append length
    len <<= 3;
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    for (let t = 8; t < __classPrivateFieldGet(this, _Ripemd160_padLength, "f"); t++) {
        res[i++] = 0;
    }
    return res;
};

exports.Ripemd160 = Ripemd160;
exports.join32 = join32;
exports.rotl32 = rotl32;
exports.split32 = split32;
exports.sum32 = sum32;
exports.sum32By3 = sum32By3;
exports.sum32By4 = sum32By4;
exports.toArray = toArray;
//# sourceMappingURL=index.js.map
