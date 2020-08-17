const withImages = require('next-images');
const NextWorkboxPlugin = require ('next-workbox-webpack-plugin');
const cache = require('./resorces/serviceWorker/cache');

const isProd = process.env.NODE_ENV === 'production';
module.exports = withImages({
    assetPrefix: isProd ? 'http://127.0.0.1:3888' : '',
    inlineImageLimit: isProd ? 16384 : 0,
    webpack: (config, { isServer, buildId, dev }) => {
        const workboxOptions = {
            clientsClaim: true,
            skipWaiting: true,
            globPatterns: ['.next/static/*', '.next/static/commons/*'],
            modifyUrlPrefix: {
                '.next': '/_next',
            },
            runtimeCaching: cache
        };
        if (!isServer && !dev) {
            config.plugins.push(
                new NextWorkboxPlugin({
                    buildId,
                    ...workboxOptions,
                }),
            );
        }
        return config
    },
})
