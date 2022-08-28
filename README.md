# pure javascript ripemd160

## Install
```bash
npm install @hicaru/ripemd160.js
yarn add @hicaru/ripemd160.js
```

## Example

As the main idea is to use only external modules, so that all operations take place in `Uint8Array`!

```javascript
import { Ripemd160 } from '@hicaru/ripemd160.js';

const msg = crypto.randomBytes(256);
const hashBytes = ripemd.update(msg).digest();
```


## LICENSE

MIT

