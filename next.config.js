// const withImages = require('next-images');
const withOptimizedImages = require('next-optimized-images');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const cache = require('./resources/serviceWorker/cache');

const isProd = process.env.NODE_ENV === 'production';
module.exports = withOptimizedImages({
    assetPrefix: isProd ? '/newweb' : '',
    // inlineImageLimit: isProd ? 16384 : 0,
    webpack: (config, { isServer, buildId, dev }) => {
        let workboxOptions = {};
        if (isProd) {
            workboxOptions = {
                clientsClaim: true,
                skipWaiting: true,
                globPatterns: ['.next/static/*', '.next/static/commons/*'],
                //無效
                modifyUrlPrefix: {
                    '.next': '/newweb/_next',
                },
                runtimeCaching: cache,
                globIgnores: ['**/webpack-hmr'],
                swURLRoot: '/newweb/static/workbox',
            };
        }

        if (!isServer && !dev) {
            config.plugins.push(
                new NextWorkboxPlugin({
                    buildId,
                    ...workboxOptions,
                }),
            );
        }
        return config;
    },
});
