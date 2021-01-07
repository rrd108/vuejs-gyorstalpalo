importScripts(
  "/backgroundSyncMessagePlugin.js"
);

workbox.core.setCacheNameDetails({prefix: "task-manager"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute("https://tasks.webmania.cc/api/", new workbox.strategies.NetworkFirst({ "cacheName":"api", plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com\//, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"google-fonts-stylesheets", plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com\//, new workbox.strategies.CacheFirst({ "cacheName":"google-fonts-webfonts", plugins: [new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] }), new workbox.expiration.Plugin({ maxAgeSeconds: 31536000, maxEntries: 5, purgeOnQuotaError: false })] }), 'GET');

workbox.routing.registerRoute(
    "https://tasks.webmania.cc/api/", 
    new workbox.strategies.NetworkOnly({ 
        plugins: [
            new BackgroundSyncMessagePlugin("new-tasks-queue", { maxRetentionTime: 1440 })
        ]
    }), 
    'POST'
);
