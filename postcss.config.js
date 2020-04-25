module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7', 'Firefox >= 20', 'ie >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 20,
      propList: ['*'],
      minPixelValue: 4
    }
  }
}
