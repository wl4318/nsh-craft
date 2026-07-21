const CACHE = 'nsh-craft-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE)); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).then(r => { if(r.ok){var rc=r.clone();caches.open(CACHE).then(ca => ca.put(e.request,rc));} return r; }).catch(() => c))); });
