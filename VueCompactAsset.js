const VueAsset = require('parcel-bundler/src/assets/VueAsset');
const localRequire = require('parcel-bundler/src/utils/localRequire');

const { EOL } = require('os');
const regex = /(?<=\n|^)(pug|coffee|stylus)(.*\n)([\s\S]*?)(\n(?=\S)|$)/g;
const types = {
  pug: 'template',
  coffee: 'script',
  stylus: 'style'
};
let inject;

class VueCompactAsset extends VueAsset {
  async parse(code) {
    this.vueTemplateCompiler = await localRequire('vue-template-compiler', this.name);
    this.vue = await localRequire('@vue/component-compiler-utils', this.name);

    // see if we need to inject stylus (this just runs once)
    if (inject === undefined) {
      let pkg = await this.getPackage();
      inject = pkg && pkg.vueCompact && pkg.vueCompact.stylusInject || null;
    }

    // expand compact form
    code = code.replace(regex, function (skip, lang, misc, body) {
      if (lang === 'stylus' && inject) {
        body = inject + EOL + body;
      }
      misc = misc.includes('scoped') ? ' scoped' : '';
      return `<${types[lang]} lang='${lang}'${misc}>\n${body}</${types[lang]}>\n`;
    })

    return this.vue.parse({
      source: code,
      needMap: this.options.sourceMaps,
      filename: this.relativeName, // Used for sourcemaps
      sourceRoot: '', // Used for sourcemaps. Override so it doesn't use cwd
      compiler: this.vueTemplateCompiler
    });
  }
}

module.exports = VueCompactAsset;
