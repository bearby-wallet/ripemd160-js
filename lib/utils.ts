export function join32(msg: number[], start: number, end: number) {
  const len = end - start;

  if (len % 4 !== 0) {
    throw new RangeError('the remainder of the division of len should be zero.');
  }

  const res = new Array<number>(len / 4);

  for (let i = 0, k = start; i < res.length; i++, k += 4) {
    const w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }

  return res;
}

export function sum32(a: number, b: number) {
  return (a + b) >>> 0;
}

export function rotl32(w: number, b: number) {
  return (w << b) | (w >>> (32 - b));
}

export function sum32By4(a: number, b: number, c: number, d: number) {
  return (a + b + c + d) >>> 0;
}

export function sum32By3(a: number, b: number, c: number) {
  return (a + b + c) >>> 0;
}

export function split32(msg: number[]) {
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

export function toArray(msg: Uint8Array | number[]): number[] {
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
