var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BIqgT-ceXndrL2kdkTeTqOtS9g2_oUL_JbEc_Dw-NIu9iMe2iZa6D21tn_0vN0u1UVNwNVSNX0XcK_7C0YE3HuA",
    "privateKey": "f3TQYIRROdZYkrB3t3pGRgwgNVUXkuqG6v0uXg8GYtI"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c4RG6R7FOEI:APA91bFUmZCRz8Vh7pm72zFNggGprS8FmAUih1PZB10CJDMJPN2rRtRAjErXp007IbWIHdLkeU2Pi7anv6FeGpRDnCnM_Smoc48Uyme3E_131vTkNM1ftZUip120r6866MPuSjlEuN7X",
    "keys": {
        "p256dh": "BPzG/ZMiNZ28VwH/Nx84xdb/A2U8ngK+shnEXmFtATsvBprNYwkZYCCuYYcQAXGYG5Q0V8a/gVpFBfphzT4dM1o=",
        "auth": "f+x6FfTUqMsfx0pZJ/dsUQ=="
    }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '519255312063',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);

// {
//     "publicKey":"BIqgT-ceXndrL2kdkTeTqOtS9g2_oUL_JbEc_Dw-NIu9iMe2iZa6D21tn_0vN0u1UVNwNVSNX0XcK_7C0YE3HuA",
//     "privateKey":"f3TQYIRROdZYkrB3t3pGRgwgNVUXkuqG6v0uXg8GYtI"
// }