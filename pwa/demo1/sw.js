self.addEventListener('install', event => {
    // 每次改完代码都会执行
    console.log('install', event);
    //会让service worker跳过等待，进入activate状态（激活）
    // self.skipWaiting()

    //等skipwaiting结束才进入activate
    event.waitUntil(self.skipWaiting())
    console.log("111");
})
self.addEventListener('activate', event => {
    console.log('activate', event);

    //表示service worker激活后，立即获取控制权
    // self.clients.claim()
    //得到控制权之后，进行下一个请求
    event.waitUntil(self.clients.claim())
})
self.addEventListener('fetch', event => {
    console.log('fetch', event);
})