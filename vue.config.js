const { defineConfig } = require("@vue/cli-service");
const path = require("path"); // <-- Add this line

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
