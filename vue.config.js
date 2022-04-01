const { defineConfig } = require('@vue/cli-service')
const registerRouter = require('./backend/router')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        //全局引入变量和mixin
        additionalData:`
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  //在本地利用express起一个node server
  devServer: {
    onBeforeSetupMiddleware: function(devServer){
      registerRouter(devServer.app)
    }
  }

})
