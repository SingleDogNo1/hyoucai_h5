module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/TouchStone': {
        target: 'http://opsstatic.dpandora.cn:30174', // SIT
        // target: 'http://opsstatic.dpandora.cn:30162', // UAT
        changeOrigin: true,
        wx: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.VUE_APP_RUNTIME_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
}
