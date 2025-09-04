// Service Worker for ByteToolBox
// Provides offline functionality and caching
// Website: www.bytetoolbox.com

const CACHE_NAME = 'bytetoolbox-v1.0.0';
const STATIC_CACHE = 'bytetoolbox-static-v1.0.0';
const DYNAMIC_CACHE = 'bytetoolbox-dynamic-v1.0.0';

// Files to cache for offline use
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (except for essential resources)
  if (url.origin !== location.origin) {
    // Allow Google Fonts to be cached
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
      event.respondWith(
        caches.open(DYNAMIC_CACHE)
          .then((cache) => {
            return cache.match(request)
              .then((response) => {
                if (response) {
                  return response;
                }
                return fetch(request)
                  .then((fetchResponse) => {
                    if (fetchResponse.status === 200) {
                      cache.put(request, fetchResponse.clone());
                    }
                    return fetchResponse;
                  })
                  .catch(() => {
                    // Return fallback for fonts
                    return new Response('', {
                      status: 200,
                      headers: { 'Content-Type': 'text/css' }
                    });
                  });
              });
          })
      );
    }
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('Service Worker: Serving from cache', request.url);
          return response;
        }

        // Otherwise fetch from network
        return fetch(request)
          .then((fetchResponse) => {
            // Don't cache if not a valid response
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }

            // Clone the response
            const responseToCache = fetchResponse.clone();

            // Cache the response
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return fetchResponse;
          })
          .catch(() => {
            // If offline and no cache, show offline page for navigation requests
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // For other requests, return a basic response
            return new Response('Offline - Resource not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Handle background sync (if needed in future)
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
});

// Handle push notifications (if needed in future)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
});

// Handle notification clicks (if needed in future)
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
