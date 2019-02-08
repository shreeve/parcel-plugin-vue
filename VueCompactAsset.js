const VueAsset = require('parcel-bundler/lib/assets/VueAsset');
const localRequire = require('parcel-bundler/src/utils/localRequire');

const regex = /(?<=\n|^)(pug|coffee|stylus)(?:.*\n)([\s\S]*?)(\n(?=\S)|$)/g;
const types = {
  pug: 'template',
  coffee: 'script',
  stylus: 'style'
};

class VueCompactAsset extends VueAsset {
  async parse(code) {
    this.vueTemplateCompiler = await localRequire('vue-template-compiler', this.name);
    this.vue = await localRequire('@vue/component-compiler-utils', this.name);

    return this.vue.parse({
      source: code.replace(regex, function (...match) {
        return `<${types[match[1]]} lang='${match[1]}'>\n${match[2]}</${types[match[1]]}>\n`;
      }),
      needMap: this.options.sourceMaps,
      filename: this.relativeName, // Used for sourcemaps
      sourceRoot: '', // Used for sourcemaps. Override so it doesn't use cwd
      compiler: this.vueTemplateCompiler
    });
  }
}

module.exports = VueCompactAsset;
