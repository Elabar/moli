self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('moliAssistant').then(function(cache) {
        return cache.addAll([
            '/',
            '/index',
            '/meonly',
            '/detetor',
            '/custom',
            '/chat',
            '/404',
            '/ios_notification.mp3'
        ]).then(()=>self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('moliAssistant')
        .then(cache => cache.match(event.request, {ignoreSearch:true}))
        .then(response => {
            return response || fetch(event.request)
        })
    );
});