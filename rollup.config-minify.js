import { terser } from "rollup-plugin-terser";

export default {
  input: 'js/fluid-dom.js',
  output: {
    name: 'fluid'
  },
  plugins: [terser()]
};