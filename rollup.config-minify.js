import { terser } from "rollup-plugin-terser";

export default {
  input: 'js/src/fluid-dom.js',
  output: {
    name: 'fluid'
  },
  plugins: [terser()]
};