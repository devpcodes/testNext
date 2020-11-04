// const withImages = require('next-images');
const withOptimizedImages = require('next-optimized-images');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const cache = require('./resources/serviceWorker/cache');

const isProd = process.env.NODE_ENV === 'production';
module.exports = withOptimizedImages({
    assetPrefix: isProd ? '/newweb' : '',
    // inlineImageLimit: isProd ? 16384 : 0,
    webpack: (config, { isServer, buildId, dev }) => {
        const workboxOptions = {
            clientsClaim: true,
            skipWaiting: true,
            globPatterns: ['.next/static/*', '.next/static/commons/*'],
            modifyUrlPrefix: {
                '.next': '/_next',
            },
            runtimeCaching: cache,
            globIgnores: ['**/webpack-hmr'],
        };
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
