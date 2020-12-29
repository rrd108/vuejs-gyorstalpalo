module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      exclude: ["robots.txt"]
    }
  }
};
