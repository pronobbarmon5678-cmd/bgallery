importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
// শুধু অ্যাপ ইনস্টলের জন্য। সবসময় আগে ইন্টারনেট থেকে নতুন পেজ আনে, তাই নোটিশ/ডেটা কখনো পুরোনো দেখাবে না।
// নেট না থাকলে শেষবার দেখা পেজটা খুলবে। Supabase ও ফন্টের রিকোয়েস্টে হাত দেয় না।
const C="bg-v2";
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match("./"))));
});
