/**
 * CyberSoluce Service Worker
 * Provides offline functionality, caching, and PWA capabilities
 */

const CACHE_NAME = 'cybersoluce-v1.0.0';
const STATIC_CACHE_NAME = 'cybersoluce-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'cybersoluce-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/cybersoluce.png',
  '/src/main.tsx',
  '/src/App.tsx',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
];

// Routes that should always try network first
const NETWORK_FIRST_ROUTES = [
  '/api/',
  '/assessment',
  '/dashboard'
];

// Routes that should be cached
const CACHE_FIRST_ROUTES = [
  '/about',
  '/pricing',
  '/contact',
  '/security',
  '/platform'
];

// Maximum age for cached responses (in milliseconds)
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_DYNAMIC_CACHE_SIZE = 50;

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch event - handle network requests with caching strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Handle different caching strategies based on request type
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isApiRequest(request)) {
    event.respondWith(handleApiRequest(request));
  } else if (isNavigationRequest(request)) {
    event.respondWith(handleNavigationRequest(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

/**
 * Check if request is for a static asset
 */
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|ico)$/);
}

/**
 * Check if request is for API
 */
function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || 
         url.hostname.includes('api.') ||
         NETWORK_FIRST_ROUTES.some(route => url.pathname.startsWith(route));
}

/**
 * Check if request is a navigation request
 */
function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

/**
 * Handle static assets with cache-first strategy
 */
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Check if cached response is still fresh
      const cacheDate = new Date(cachedResponse.headers.get('date'));
      const now = new Date();
      
      if (now - cacheDate < MAX_CACHE_AGE) {
        return cachedResponse;
      }
    }
    
    // Fetch from network and update cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Network failed for static asset, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for images
    if (request.url.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="14" fill="#666">Image unavailable</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    
    throw error;
  }
}

/**
 * Handle API requests with network-first strategy
 */
async function handleApiRequest(request) {
  try {
    // Always try network first for API requests
    const networkResponse = await fetch(request);
    
    // Cache successful GET requests
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      
      // Clean up old cache entries
      limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_CACHE_SIZE);
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Network failed for API request, trying cache:', error);
    
    // Try to serve from cache for GET requests
    if (request.method === 'GET') {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        // Add header to indicate this is a cached response
        const response = cachedResponse.clone();
        response.headers.set('X-Served-By', 'ServiceWorker-Cache');
        return response;
      }
    }
    
    // Return offline response for API requests
    return new Response(
      JSON.stringify({
        error: 'Network unavailable',
        message: 'This feature requires an internet connection',
        offline: true
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Handle navigation requests with network-first, fallback to app shell
 */
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.warn('[SW] Network failed for navigation, serving app shell:', error);
    
    // Serve the app shell (index.html) for navigation requests when offline
    const appShell = await caches.match('/index.html');
    if (appShell) {
      return appShell;
    }
    
    // Fallback offline page
    return new Response(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CyberSoluce - Offline</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 2rem; background: #f5f5f5; }
            .container { max-width: 500px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #005B96; }
            .retry-btn { background: #005B96; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
            .retry-btn:hover { background: #004080; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>CyberSoluce</h1>
            <h2>You're offline</h2>
            <p>Please check your internet connection and try again.</p>
            <button class="retry-btn" onclick="window.location.reload()">Retry</button>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

/**
 * Handle other dynamic requests
 */
async function handleDynamicRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      limitCacheSize(DYNAMIC_CACHE_NAME, MAX_DYNAMIC_CACHE_SIZE);
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

/**
 * Limit the size of a cache
 */
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    // Remove oldest entries
    const keysToDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

/**
 * Handle background sync for offline actions
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

/**
 * Handle background sync operations
 */
async function handleBackgroundSync() {
  console.log('[SW] Handling background sync');
  
  // Process any queued offline actions
  try {
    // This would typically involve syncing offline data
    // when the connection is restored
    const offlineActions = await getOfflineActions();
    
    for (const action of offlineActions) {
      try {
        await processOfflineAction(action);
        await removeOfflineAction(action.id);
      } catch (error) {
        console.error('[SW] Failed to process offline action:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

/**
 * Get offline actions from IndexedDB (placeholder)
 */
async function getOfflineActions() {
  // This would typically read from IndexedDB
  return [];
}

/**
 * Process an offline action (placeholder)
 */
async function processOfflineAction(action) {
  // This would typically send the action to the server
  console.log('[SW] Processing offline action:', action);
}

/**
 * Remove an offline action (placeholder)
 */
async function removeOfflineAction(actionId) {
  // This would typically remove the action from IndexedDB
  console.log('[SW] Removing offline action:', actionId);
}

/**
 * Handle push notifications
 */
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'New notification from CyberSoluce',
    icon: '/cybersoluce.png',
    badge: '/cybersoluce.png',
    tag: data.tag || 'general',
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'CyberSoluce', options)
  );
});

/**
 * Handle notification clicks
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action) {
    // Handle action button clicks
    console.log('[SW] Notification action clicked:', event.action);
  } else {
    // Handle notification click - focus or open the app
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          // Try to focus existing window
          for (const client of clientList) {
            if (client.url.includes(self.location.origin) && 'focus' in client) {
              return client.focus();
            }
          }
          
          // Open new window if no existing window found
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
    );
  }
});

console.log('[SW] Service worker loaded successfully');