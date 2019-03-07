module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    devtool: 'none'
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/TouchStone': {
        target: 'http://opsstatic.dpandora.cn:30184', // SIT
        // target: 'http://opsstatic.dpandora.cn:30164', // UAT
        changeOrigin: true,
        wx: true
      },
      '/TouchStoneService': {
        target: 'http://47.100.38.237:8088/d',
        changeOrigin: true,
        wx: true
      },
      '/TouchStoneServiceNew': {
        target: 'http://47.100.38.237:8088/h',
        changeOrigin: true,
        wx: true
      }
    }
  }
}
