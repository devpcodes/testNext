const express = require('express');
const compression = require('compression');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');
const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev,
});
const handle = app.getRequestHandler();
const port = 3888;

app.prepare().then(() => {
    const server = express();

    server.use(compression());
    server.use('/widget', express.static('./widget'));
    server.use('/signature', express.static('./signature'));
    server.use('/files', express.static('./files'));

    server.get('*', (req, res) => {
        if (req.url.includes('/sw')) {
            const filePath = join(__dirname, 'public', 'sw.js');
            app.serveStatic(req, res, filePath);
        } else if (req.url.includes('/workbox-')) {
            const newUrl = req.url.split('/');
            const filePath = join(__dirname, 'public', newUrl[newUrl.length - 1]);
            app.serveStatic(req, res, filePath);
        } else {
            handle(req, res, req.url);
        }
    });
    // server.get('*', (req, res) => {
    //     return handle(req, res);
    // });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
