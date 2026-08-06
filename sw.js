self.addEventListener('install', (event) => {
  self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Este es el que dispara la notificación desde el admin.html
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body } = event.data.payload;
    const options = {
      body: body,
      icon: 'https://distrito.menwapp.com/imagenes/ASCOMP.png',
      badge: 'https://distrito.menwapp.com/imagenes/ASCOMP.png',
      vibrate: [200, 100, 200],
      tag: 'reserva-nueva'
    };
    event.waitUntil(self.registration.showNotification(title, options));
  }
});

// Este es para notificaciones Push (si llegas a usarlas después)
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || "Revisa el panel de administración.",
    icon: 'https://distrito.menwapp.com/imagenes/ASCOMP.png',
    badge: 'https://distrito.menwapp.com/imagenes/ASCOMP.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(self.registration.showNotification(data.title || "🔔 ¡Nueva Reserva!", options));
});
