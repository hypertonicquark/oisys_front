const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: ["./src/main.js"],
      template: "./public/index.html",
      fileName: "index.html",     
    },
    login: {
      entry: ["./src/login.js"],
      template: "./public/login.html",
      fileName: "login.html",    
    },

  }

})
