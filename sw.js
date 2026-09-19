// LoopLive service worker: lets the app open offline and keeps the logo/icons available.
// Bump CACHE_VERSION when you change this file's caching rules.
const CACHE_VERSION = 'looplive-v2';
const CORE = [
  '/', '/index.html', '/manifest.webmanifest',
  '/android-chrome-192x192.png', '/android-chrome-512x512.png',
  '/maskable-192x192.png', '/maskable-512x512.png',
  '/apple-touch-icon.png', '/favicon-96x96.png', '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Never touch Google sign-in / Drive traffic.
  if (/google|gstatic|googleapis/.test(url.hostname)) return;

  // Page loads: network first (so new deploys show up), cached copy when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put('/index.html', copy));
          return res;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Everything else (icons, Tailwind CDN script): serve from cache, refresh in background.
  const cacheable = url.origin === self.location.origin || url.hostname === 'cdn.tailwindcss.com';
  if (!cacheable) return;
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
