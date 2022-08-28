import swc from 'rollup-plugin-swc';


export default {
  input: 'index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
  },
  plugins: [
    swc({
      rollup: {
        exclude: 'node_modules',
      },
      jsc: {
        parser: {
          syntax: 'typescript',
        },
        target: 'es2018',
      },
    }),
  ],
};
