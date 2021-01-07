/*
workbox.routing.registerRoute(
    "https://tasks.webmania.cc/api/",
    new workbox.strategies.NetworkOnly({
        plugins: [
            new BackgroundSyncMessagePlugin("new-tasks-queue", { maxRetentionTime: 1440 })
        ]
    }),
    'POST'
);
*/

class BackgroundSyncMessagePlugin extends workbox.backgroundSync.Plugin {

  constructor(...queueArgs) {
    console.info('...queueArgs', ...queueArgs)
    super(...queueArgs)
    console.warn('BackgroundSyncMessagePlugin', this)
    this.fetchDidSucceed = this.fetchDidSucceed.bind(this)
  }

  fetchDidFail({ request }) {
    super.fetchDidFail({ request });
    console.warn('fetchDidFail', { request })
  }

  fetchDidSucceed({request, response, event, state}) {
    console.warn('fetchDidSucceed', {request, response, event, state})
    return response
  }
  /*handlerWillRespond({request, response, event, state}) {
    console.warn('handlerWillRespond', {request, response, event, state})
    return response
  }
  handlerDidRespond({request, response, event, state}) {
    console.warn('handlerDidRespond', {request, response, event, state})
  }
  handlerDidComplete({request, response, error, event, state}) {
    console.warn('handlerDidComplete', {request, response, error, event, state})
  }*/
}

//export {BackgroundSyncMessagePlugin}
