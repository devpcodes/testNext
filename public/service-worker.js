self.addEventListener('install', function(){
    console.log('install success!');
});

self.addEventListener('activate', function(){
    console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', function (e) {
    e.respondWith(caches.match(e.request).then(function(){
        return fetch(e.request).then(function(response) {
            return response;
        }).catch(function(error) {
            throw error;
        });
    }));
});
