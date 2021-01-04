console.warn('bgsync.js')


/*self.addEventListener("sync", async event => {
  const clients = await event.currentTarget.clients.matchAll({
    type: "window"
  });
  for (const client of clients) {
    client.postMessage("Jaya Radhe Syama");
  }
});*/

const myPlugin = {
  cacheWillUpdate: async ({request, response, event, state}) => {
    // Return `response`, a different `Response` object, or `null`.
    console.warn('cacheWillUpdate', {request, response, event, state});
    return response;
  },
  cacheDidUpdate: async ({cacheName, request, oldResponse, newResponse, event, state}) => {
    // No return expected
    // Note: `newResponse.bodyUsed` is `true` when this is called,
    // meaning the body has already been read. If you need access to
    // the body of the fresh response, use a technique like:
    // const freshResponse = await caches.match(request, {cacheName});
    console.warn('cacheDidUpdate', {cacheName, request, oldResponse, newResponse, event, state});
  },
  fetchDidSucceed: async ({request, response, event, state}) => {
    // Return `response` to use the network response as-is,
    // or alternatively create and return a new `Response` object.
    console.warn('fetchDidSucceed', {request, response, event, state});
    return response;
  },
  handlerWillRespond: async ({request, response, event, state}) => {
    // Return `response` or a different `Response` object.
    console.warn('handlerWillRespond', {request, response, event, state});
    return response;
  },
  handlerDidRespond: async ({request, response, event, state}) => {
    // No return expected.
    // Can record final response details here.
    console.warn('handlerDidRespond', {request, response, event, state});
  },
  handlerDidComplete: async ({request, response, error, event, state}) => {
    // No return expected.
    // Can report any data here.
    console.warn('handlerDidComplete', {request, response, error, event, state});
  }
};

const myStrategy = new workbox.strategies.NetworkOnly({
  plugins: [
    new workbox.backgroundSync.Plugin(),
    myPlugin,
  ],
});

console.warn(myPlugin)

workbox.routing.registerRoute(
    "https://tasks.webmania.cc/api/", 
    new workbox.strategies.NetworkOnly(
        {
            plugins: [
                new workbox.backgroundSync.Plugin("new-tasks-queue", { maxRetentionTime: 1440 }),
                myPlugin,
                rrd
            ]
        }
    ),
'POST'
);


