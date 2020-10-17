const CACHE_NAME = "aplikasi_smk_v5";
var urls = [
    "https://riyhs.github.io/smk-bisa/",
    "https://riyhs.github.io/smk-bisa/index.html",
    "https://riyhs.github.io/smk-bisa/nav.html",
    "https://riyhs.github.io/smk-bisa/css/materialize.css",
    "https://riyhs.github.io/smk-bisa/css/style.css",
    "https://riyhs.github.io/smk-bisa/halamans/1.html",
    "https://riyhs.github.io/smk-bisa/halamans/2.html",
    "https://riyhs.github.io/smk-bisa/halamans/3.html",
    "https://riyhs.github.io/smk-bisa/halamans/home.html",
    "https://riyhs.github.io/smk-bisa/js/materialize.js",
    "https://riyhs.github.io/smk-bisa/js/script.js",
    "https://riyhs.github.io/smk-bisa/manifest.json",
    "https://riyhs.github.io/smk-bisa/img/1.jpg",
    "https://riyhs.github.io/smk-bisa/img/3.jpg",
    "https://riyhs.github.io/smk-bisa/img/4.jpg",
    "https://riyhs.github.io/smk-bisa/education/png/conference.png",
    "https://riyhs.github.io/smk-bisa/education/png/library.png",
    "https://riyhs.github.io/smk-bisa/education/png/student.png",
    "https://riyhs.github.io/smk-bisa/icon.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urls);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("service worker : menggunakan aset dari cache : ", response.url);
                return response;
            }

            console.log(
                "service worker: memuat dari server: ", event.request.url
            );
            return fetch(event.request);
        })
    );
});

// hapus cache 
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("service worker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
