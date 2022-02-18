const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html']
const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen to requests
self.addEventListener('fetch', (event) => {
    event.repondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)  //if there is internet data, display the fetched data
                    .catch(() => caches.match('offline.html')) // if not, show this
            })
    )
});

// Install SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        cache.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.ibncludes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});