module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/TouchStone': {
        target: 'http://opsstatic.dpandora.cn:30184', // SIT
        // target: 'http://opsstatic.dpandora.cn:30164', // UAT
        changeOrigin: true,
        wx: true
      }
    }
  }
}
