import { join32, rotl32, split32, sum32, sum32By3, sum32By4, toArray } from './utils';


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

function Kh(j: number) {
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

function K(j: number) {
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

function f(j: number, x: number, y: number, z: number) {
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


export class Ripemd160 {
  #pending?: number[];

  #blockSize = 512;
  #padLength = 8;
  #pendingTotal = 0;

  #delta8 = this.#blockSize / 8;
  #delta32 = this.#blockSize / 32;

  #h = [
    0x67452301,
    0xefcdab89,
    0x98badcfe,
    0x10325476,
    0xc3d2e1f0
  ];

  get blockSize() {
    return this.#blockSize;
  }

  digest() {
    this.update(this.#pad());

    if (this.#pending === null) {
      throw new Error('pending cannot be null');
    }

    return this.#digest();
  }

  update(msg: Uint8Array | number[]) {
    msg = toArray(msg);

    if (!this.#pending) {
      this.#pending = msg;
    } else {
      this.#pending = this.#pending.concat(msg);
    }

    this.#pendingTotal += msg.length;

    if (this.#pending.length >= this.#delta8) {
      msg = this.#pending;
  
      const r = msg.length % this.#delta8;

      this.#pending = msg.slice(msg.length - r, msg.length);

      if (this.#pending.length === 0) {
        this.#pending = undefined;
      }
  
      msg = join32(msg, 0, msg.length - r);

      for (let i = 0; i < msg.length; i += this.#delta32) {
        this.#update(Array.from(msg), i);
      }
    }

    return this;
  }

  #update(msg: number[], start: number) {
    let A = this.#h[0];
    let B = this.#h[1];
    let C = this.#h[2];
    let D = this.#h[3];
    let E = this.#h[4];
    let Ah = A;
    let Bh = B;
    let Ch = C;
    let Dh = D;
    let Eh = E;

    for (let j = 0; j < 80; j++) {
      var T = sum32(
        rotl32(
          sum32By4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
          s[j]),
        E);
      A = E;
      E = D;
      D = rotl32(C, 10);
      C = B;
      B = T;
      T = sum32(
        rotl32(
          sum32By4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
          sh[j]),
        Eh);
      Ah = Eh;
      Eh = Dh;
      Dh = rotl32(Ch, 10);
      Ch = Bh;
      Bh = T;
    }
    T = sum32By3(this.#h[1], C, Dh);
    this.#h[1] = sum32By3(this.#h[2], D, Eh);
    this.#h[2] = sum32By3(this.#h[3], E, Ah);
    this.#h[3] = sum32By3(this.#h[4], A, Bh);
    this.#h[4] = sum32By3(this.#h[0], B, Ch);
    this.#h[0] = T;
  }

  #digest() {
    return split32(this.#h);
  }

  #pad(): number[] {
    let len = this.#pendingTotal;
    const bytes = this.#delta8;
    const k = bytes - ((len + this.#padLength) % bytes);
    let res = new Array(k + this.#padLength);

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

    for (let t = 8; t < this.#padLength; t++) {
      res[i++] = 0;
    }

    return res;
  }
}
