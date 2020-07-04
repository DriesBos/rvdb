importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.933d8e3.js",
    "revision": "32f93b1925c44a398427cd9fc4120d93"
  },
  {
    "url": "/_nuxt/commons/app.edb65b2.js",
    "revision": "3a06b0f1c8a90f0396c9e22a30d625b0"
  },
  {
    "url": "/_nuxt/pages/_slug.70d60ce.js",
    "revision": "257e08a97ef13869a86cd18098b36a8c"
  },
  {
    "url": "/_nuxt/pages/index.06517f3.js",
    "revision": "0827970ddb49f2bec727456e741bce24"
  },
  {
    "url": "/_nuxt/runtime.a8a820c.js",
    "revision": "030fc6e062658e3ee722d8aa17e7afac"
  },
  {
    "url": "/_nuxt/vendors~app.1e76ffe.js",
    "revision": "49e7e86e6da3ec08dda999bdb31fb8e3"
  }
], {
  "cacheId": "nuxt-storyblok-boilerplate",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
