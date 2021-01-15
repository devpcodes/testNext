const withOptimizedImages = require('next-optimized-images');
const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
    module.exports = withPWA(
        withOptimizedImages({
            basePath: '/newweb',
            assetPrefix: '/newweb',
            trailingSlash: true,
            pwa: {
                disable: process.env.NODE_ENV === 'development',
                dest: 'public',
                register: false,
                subdomainPrefix: '/newweb',
            },
            webpack: (config, { isServer, buildId, dev }) => {
                return config;
            },
        }),
    );
} else {
    module.exports = withOptimizedImages({
        basePath: '/newweb',
        assetPrefix: '/newweb',
        trailingSlash: true,
        webpack: (config, { isServer, buildId, dev }) => {
            return config;
        },
    });
}
