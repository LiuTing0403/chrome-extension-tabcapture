# chrome-extension-tabcapture

## 本插件仅适用于论答网站的录屏功能，适用于域名包含 *.learnta.cn/ 的网站

### 使用方法

1. clone repo

2. 在chrome中加载已解压的扩展程序

3. 通过window post message来控制录制的开始与结束

   ```js
   function startCapture() {
      window.postMessage('start-recording', window.location.origin) // 通知插件开始录制
   }

   function stopCapture() {
      window.postMessage('stop-recording', window.location.origin) // 通知插件停止录制
   }

   // 通过监听window message事件获取插件数据

   function messageHandler(e) {
       const {message, opts, streamId} = e.data
       if (e.data.message === 'stream-id') {
         // stramId 插件通过消息发送streamId
       } else if (e.data === 'extension-is-installed') {
         // 插件发送消息，插件已经安装
       } else if (e.data === 'user-canceled') {
         // 插件发送消息，用户取消了屏幕分享
       }
   }

   window.addEventListener('message', messageHandler)// 通过监听message事件与插件通信

   ```

4. 检查插件是否安装

   ```Js
   function checkExtensionStatus() {
     window.postMessage('check-extension-ready', window.location.origin)
   }
   ```

5. 消息类型

   ```js
   // web端发送消息类型
   // 询问插件是否安装： 'check-extension-ready'
   // 通知插件开始录制：'start-recording'
   // 通知插件停止录制：'stop-recording'

   // 插件回复消息类型
   // 插件确认安装：'extension-is-installed'
   // 插件发送streamId：'stream-id'
   // 插件发送用户取消了视频分享：'user-canceled'
   ```

   ​