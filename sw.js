const CACHE_NAME='trabzon-afet-saha-1.0';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok)caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));return r;}).catch(async()=>await caches.match(e.request,{ignoreSearch:true})||(e.request.mode==='navigate'?caches.match('./index.html'):Promise.reject(new Error('offline')))));});
