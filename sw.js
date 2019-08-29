const expectedCaches = ['moliAssistantv4'];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('moliAssistantv4').then(function(cache) {
        return cache.addAll([
            '/',
            '/index',
            '/meonly',
            '/detetor',
            '/custom',
            '/chatv2',
            '/404',
            '/ios_notification.mp3'
        ]).then(()=>self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!expectedCaches.includes(key)) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log('V3 now ready to handle fetches!');
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('moliAssistantv4')
        .then(cache => cache.match(event.request, {ignoreSearch:true}))
        .then(response => {
            return response || fetch(event.request)
        })
    );
});