const CACHE_NAME = "rad-quiz-cache-20260708-cat2019-2017";
const STATIC_ASSETS = [
  "./",
  "./専門医試験_問題集.html",
  "./app.css",
  "./app.js",
  "./legacy-memos.js",
  "./questions.json",
  "./questions-data.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon-180.png",
  "./assets/questions/2016/q86-depth-dose.png",
  "./assets/questions/2017/q8-compton-diagram.png",
  "./assets/questions/2020/q76-water-interactions.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET") return;

  if (url.origin === self.location.origin) {
    // アプリのシェル（HTMLナビゲーションと中核JS/CSS）はネットワーク優先にして、
    // デプロイ直後に「新しいHTML＋古いapp.js」のような不整合が起きないようにする。
    const isShell =
      event.request.mode === "navigate" ||
      /\.(html|js|css)$/i.test(url.pathname);

    if (isShell) {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            }
            return response;
          })
          .catch(() => caches.match(event.request))
      );
      return;
    }

    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            }
            return response;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
  }
});
