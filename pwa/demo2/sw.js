//主要就是缓存内容
const CACHE_NAME = 'cache_v2'
self.addEventListener('install', async event => {
    //开启一个cache，得到一个cache对象
    const cache = await caches.open(CACHE_NAME)
    //cache对象就可以存储资源
    //等待cache把所有的资源存储起来
    await cache.addAll([
        '/demo2/',
        'logo.png',
        'manifest.json',
        'index.css'
    ])
    await self.skipWaiting()
})

self.addEventListener('activate', async event => {
    //会清除掉旧的资源，获取所有的key
    const keys = await caches.keys();
    keys.forEach(key => {
        if (key !== CACHE_NAME) {
            caches.delete(key)
        }
    });
    await self.clients.claim()
})

//注释：fetch时间会在请求发送的时候触发
// 判断资源是否能够请求成功，如果能够请求成功，就相应成功的结果，如果断网，请求失败了，读取caches缓存即可
self.addEventListener('fetch', event => {
    //请求对象
    // const req = event.request
    // console.log(event.request.url);
    //给浏览器相应
    event.respondWith(networkFirst(event.request))
})

//网络优先
async function networkFirst(req) {
    //先从网络读取资源
    try {
        const fresh = await fetch(req)
        return fresh
    } catch (error) {
        // 去缓存中读取
        const cache = await caches.open(CACHE_NAME)
        const cached = await cache.match(req)
        return cached
    }
    
}
