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

const replayRequestsMessage = async function() {
  console.warn('replayRequestsMessage called')
  let entry;
  while (entry = await this.shiftRequest()) {
    try {
      // the original function call does not do anything with the response
      fetch(entry.request.clone())
        .then(response => response.json())
        .then(data => console.log(data))

      if (process.env.NODE_ENV !== 'production') {
        logger.log(`Request for '${getFriendlyURL(entry.request.url)}'` +
            `has been replayed in queue '${this._name}'`);
      }
    } catch (error) {
      await this.unshiftRequest(entry);

      if (process.env.NODE_ENV !== 'production') {
        logger.log(`Request for '${getFriendlyURL(entry.request.url)}'` +
            `failed to replay, putting it back in queue '${this._name}'`);
      }
      throw new WorkboxError('queue-replay-failed', {name: this._name});
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    logger.log(`All requests in queue '${this.name}' have successfully ` +
        `replayed; the queue is now empty!`);
  }
}

class BackgroundSyncMessagePlugin extends workbox.backgroundSync.Plugin {

  constructor(...queueArgs) {
    // we should add a custom onSync function to modify replayRequests()
    let args = { ...queueArgs}
    console.info('...queueArgs', args[0], { ...args[1], onSync: replayRequestsMessage })
    super(args[0], { ...args[1], onSync: replayRequestsMessage })
    //super(...queueArgs)
    console.warn('BackgroundSyncMessagePlugin', this)

    // fetchDidSucceed callback is not called in this version of backgroundSync
    //this.fetchDidSucceed = this.fetchDidSucceed.bind(this)
  }

  fetchDidFail({ request }) {
    super.fetchDidFail({ request });
    console.warn('fetchDidFail', { request })
  }

  /*fetchDidSucceed({request, response, event, state}) {
    console.warn('fetchDidSucceed', {request, response, event, state})
    return response
  }*/
  /*All lifecycle callbacks starting with handler are new in Workbox v6.

  handlerWillRespond({request, response, event, state}) {
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