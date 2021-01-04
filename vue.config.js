module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      exclude: ["robots.txt", /\.map$/],
      importScripts: ['/backgroundSyncMessagePlugin.js', '/fallback-on-error-plugin.js'],
      runtimeCaching: [
        {
          urlPattern: process.env.VUE_APP_API_URL,
          handler: "NetworkFirst",
          options: {
            cacheName: "api"
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "google-fonts-stylesheets"
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-webfonts",
            cacheableResponse: {
              statuses: [0, 200]
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 5
            }
          }
        },
        {
          urlPattern: process.env.VUE_APP_API_URL,
          method: 'POST',
          handler: "NetworkOnly",
          options: {
            backgroundSync: {
              name: 'new-tasks-queue',
              options: {
                maxRetentionTime: 24 * 60,    // minutes
              },
            },
          },
        },
      ]
    }
  }
};
