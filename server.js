const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev,
});
const handle = app.getRequestHandler();
const port = 3888;

app.prepare().then(() => {
    const server = express();

    server.use('/nossr', express.static('./no_ssr/testPage'));

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
