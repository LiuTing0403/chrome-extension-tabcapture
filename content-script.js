var port = chrome.runtime.connect()

var MESSAGE = {
    START_RECORDING: 'start-recording',
    STOP_RECORDING: 'stop-recording',
    STREAM_ID: 'stream-id',
    USER_CANCELED: 'user-canceled',
    CHECK_STATUS: 'check-extension-ready'
}

window.onmessage = function(e) {
    if (e.data === MESSAGE.START_RECORDING) {
        port.postMessage({message: MESSAGE.START_RECORDING})
    }
    else if (e.data === MESSAGE.STOP_RECORDING) {
    }
    else if (e.data === MESSAGE.CHECK_STATUS) {
        window.postMessage('extension-is-installed', window.location.origin)
    }
}

port.onMessage.addListener(function(message) {
    if (message.message === MESSAGE.STREAM_ID) {
        var streamId = message.streamId
        var opts = message.opts
        window.postMessage({streamId: streamId, opts: opts, message: MESSAGE.STREAM_ID}, window.location.origin)
    }
    if (message.message === MESSAGE.USER_CANCELED) {
        window.postMessage(MESSAGE.USER_CANCELED, window.location.origin)
    }
})
