module.exports = function (bundler) {
  bundler.addAssetType('vue', require.resolve('./VueCompactAsset.js'));
};
