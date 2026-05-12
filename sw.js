const CACHE_NAME = 'big-yolo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install the Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate and Clear old Cache
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch assets from Cache or Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
