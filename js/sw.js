// Service Worker
const CACHE_NAME = 'daily-1-3-5-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/privacy.html',
    '/terms.html',
    '/images/icons/app-icon.png',
    '/images/app-screenshot.png',
    // その他のアセット
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .catch(() => {
                        // オフライン時のフォールバックページを返す
                        if (event.request.mode === 'navigate') {
                            return caches.match('/offline.html');
                        }
                        return new Response('オフラインです');
                    });
            })
    );
});