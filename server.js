const express = require('express');
const next = require('next');
const { join } = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev,
});
const handle = app.getRequestHandler();
const port = 3888;

app.prepare().then(() => {
    const server = express();

    server.use('/widget', express.static('./widget'));
    server.use('/signature', express.static('./signature'));

    server.get('*', (req, res) => {
        if (req.url.includes('/sw')) {
            const filePath = join(__dirname, 'static', 'workbox', 'sw.js');
            app.serveStatic(req, res, filePath);
        } else if (req.url.includes('/static/workbox')) {
            const filePath = join(__dirname, req.url);
            app.serveStatic(req, res, filePath);
        } else {
            handle(req, res, req.url);
        }
        // if (req.url.includes('/newweb/sw')) {
        //     const filePath = join(__dirname, 'static', 'workbox', 'sw.js');
        //     app.serveStatic(req, res, filePath);
        // } else if (req.url.startsWith('static/workbox/')) {
        //     app.serveStatic(req, res, join(__dirname, req.url));
        // } else {
        //     handle(req, res, req.url);
        // }
    });
    // server.get('*', (req, res) => {
    //     return handle(req, res);
    // });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
