const CACHE = 'tirafune-v2';
const ASSETS = [
  '/tira-fune/',
  '/tira-fune/index.html',
  '/tira-fune/manifest.json',
  '/tira-fune/icons/icon-192.png',
  '/tira-fune/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => 
      cached || fetch(e.request).catch(() => caches.match('/tira-fune/index.html'))
    )
  );
});
