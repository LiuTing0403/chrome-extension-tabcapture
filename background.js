var MESSAGE = {
    START_RECORDING: 'start-recording',
    STOP_RECORDING: 'stop-recording',
    STREAM_ID: 'stream-id',
    USER_CANCELED: 'user-canceled'
}

var screenOptions = ['tab', 'audio']

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
        if (message.message === MESSAGE.START_RECORDING) {
            chrome.desktopCapture.chooseDesktopMedia(screenOptions, port.sender.tab, onAccessApproved);
        }
    })

    function onAccessApproved(chromeMediaSourceId, opts) {
        if (!chromeMediaSourceId || !chromeMediaSourceId.toString().length) {
            port.postMessage({message: MESSAGE.USER_CANCELED})
            chrome.runtime.restart();
            return;
        }

        port.postMessage({streamId: chromeMediaSourceId, opts: opts, message: MESSAGE.STREAM_ID})
    
    }
})

