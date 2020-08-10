const withCss = require('@zeit/next-css');
const withImages = require('next-images');
const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');

const isProd = process.env.NODE_ENV === 'production'
module.exports = withPWA(withCss(withImages({
    assetPrefix: isProd ? 'http://127.0.0.1:3888' : '',
    inlineImageLimit: 16384,
    pwa: {
        disable: isProd ? false : true,
        dest: 'public',
        register: true
    },
    webpack: (config, {
        isServer
    }) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style\/css.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback()
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })
        }
        return config
    },
})))
