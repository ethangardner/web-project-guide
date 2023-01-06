const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');

module.exports = {
  plugins: [
    postcssImport(),
    postcssJitProps(OpenProps),
    postcssPresetEnv(),
    cssnano(),
  ],
};
