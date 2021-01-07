module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: './src/sw.js',
      exclude: ["robots.txt", /\.map$/],
    }
  }
};
