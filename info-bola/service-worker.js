importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log('SW Register Succes');

    var urlsToCache = [{
            url: 'https://riyhs.github.io/info-bola/',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/index.html',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/nav.html',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/manifest.json',
            revision: '2'
        },
        {
            url: 'https://riyhs.github.io/info-bola/pages/home.html',
            revision: '1.3'
        },
        {
            url: 'https://riyhs.github.io/info-bola/pages/matches.html',
            revision: '2'
        },
        {
            url: 'https://riyhs.github.io/info-bola/pages/rank.html',
            revision: '2'
        },
        {
            url: 'https://riyhs.github.io/info-bola/pages/teams.html',
            revision: '2'
        },
        {
            url: 'https://riyhs.github.io/info-bola/pages/fav-teams.html',
            revision: '2'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/css/materialize.min.css',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/css/style.css',
            revision: '2.2.1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/js/materialize.min.js',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/js/nav.js',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/js/script.js',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/js/api.js',
            revision: '2.1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/js/idb.js',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/js/db.js',
            revision: '1.1.2'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/ball.png',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/icon-512x512.png',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/icon-384x384.png',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/icon-192x192.png',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/icon-144x144.png',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/icon-128x128.png',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/icon-96x96.png',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/icon-72x72.png',
            revision: '1'
        },
        {
            url: 'https://riyhs.github.io/info-bola/assets/img/soccer.png',
            revision: '1'
        }
    ];

    workbox.precaching.precacheAndRoute(urlsToCache);

    workbox.routing.registerRoute(
        /.*(?:png|svg|jpg|jpeg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                }),
            ]
        })
    );

    // url luar
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 5,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/competitions/2021/'),
        workbox.strategies.cacheFirst()
    );
} else {
    console.log('SW Register Failed');
}

// push notif 
self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        icon: 'logo-192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
