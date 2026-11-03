// SWARA LUDO service worker: selalu ambil versi terbaru dari internet, simpan cadangan untuk offline
const CACHE='swara-ludo-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match(r)));
});
