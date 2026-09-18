const CACHE_NAME = 'spik-pwa-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install dan langsung aktifkan
self.addEventListener('install', event => {
  self.skipWaiting(); // Memaksa browser langsung memakai versi terbaru
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Sapu bersih cache versi lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Network-First: Ambil dari internet dulu, kalau gagal baru ambil dari cache offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
