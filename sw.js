const cacheName = 'speech-app-v2';
const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// عند تثبيت التطبيق، قم بتخزين الملفات الأساسية
self.addEventListener('install', async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

// عند طلب أي ملف، ابحث عنه في الكاش أولاً
self.addEventListener('fetch', (event) => {
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  // إذا وجدته في المخزن أعطني إياه، وإلا اذهب للإنترنت
  return cachedResponse || fetch(req);
}
