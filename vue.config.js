process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/mock': {
        target: 'https://easy-mock.com',
        changeOrigin: true
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        common: '@/common',
        images: '@/common/images',
        sass: '@/common/sass'
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/common/sass/variable.scss";'
      }
    }
  }
}
