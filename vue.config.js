module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/TouchStone': {
        target: 'http://47.100.38.237:8888',
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
