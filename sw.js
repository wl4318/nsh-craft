const CACHE = 'nsh-craft-v2';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE)); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', function(e) {
  if (e.request.url.startsWith('chrome-extension://') || e.request.url.startsWith('moz-extension://')) return;
  if (e.request.destination === 'document') {
    e.respondWith(fetch(e.request).then(function(r) { var rc = r.clone(); caches.open(CACHE).then(function(ca){ca.put(e.request, rc);}); return r; }).catch(function(){ return caches.match(e.request); }));
  } else {
    e.respondWith(caches.match(e.request).then(function(c) { return c || fetch(e.request).then(function(r) { if(r.ok){var rc=r.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,rc)});} return r; }).catch(function(){ return c; }); }));
  }
});
