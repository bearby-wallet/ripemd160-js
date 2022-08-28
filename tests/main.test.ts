import { Ripemd160 } from '../lib/ripemd';
import { sum32, rotl32, sum32By4, sum32By3 } from '../lib/utils';


test('test utils', () => {
  expect(sum32(1, 2)).toBe(3);
  expect(rotl32(22, 33)).toBe(44);
  expect(sum32By4(23, 15, 66, 255)).toBe(359);
  expect(sum32By3(11, 63, 255)).toBe(329);
});


test('test hashing', () => {
  const RIPEMD160 = require('ripemd160');
  const crypto = require('crypto');

  for (let index = 0; index < 100; index++) {
    const ripemd = new Ripemd160();
    const msg = crypto.randomBytes(256);
    const res0 = ripemd.update(msg).digest();
    const res1 = new RIPEMD160().update(msg).digest('hex');


    expect(Buffer.from(res0).toString('hex')).toBe(res1);
  }
});
