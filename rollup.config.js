import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';


const production = !process.env.ROLLUP_WATCH;


export default {
  input: 'index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
		name: 'ripemd',
    sourcemap: true
  },
  plugins: [
    resolve({
			jsnext: true,   
			main: true,
			brower: true,
			preferBuiltins: false
		}),
    typescript({
			sourceMap: true,
			inlineSources: true
		}),
    production && terser({
			format: {
				comments: false
			},
			compress: true
		})
  ],
};
