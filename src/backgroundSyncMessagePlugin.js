//import BackgroundSyncPlugin from 'workbox-background-sync'

class BackgroundSyncMessagePlugin extends BackgroundSyncPlugin {

  /*constructor(...queueArgs) {
    this._queue = new Queue(...queueArgs)
    this.fetchDidFail = this.fetchDidFail.bind(this)
  }*/

  /* fetchDidFail(request) {
    this._queue.pushRequest(request)
  } */

  fetchDidSucceed({request, response, event, state}) {
    console.warn('fetchDidSucceed', {request, response, event, state})
    return response
  }
  handlerWillRespond({request, response, event, state}) {
    console.warn('handlerWillRespond', {request, response, event, state})
    return response
  }
  handlerDidRespond({request, response, event, state}) {
    console.warn('handlerDidRespond', {request, response, event, state})
  }
  handlerDidComplete({request, response, error, event, state}) {
    console.warn('handlerDidComplete', {request, response, error, event, state})
  }
}

//export {BackgroundSyncMessagePlugin}
