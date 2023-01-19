const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = [
    "/"
];

// Install the service worker and cache static assets
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercept network requests and serve cached assets if available
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

