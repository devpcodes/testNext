const withImages = require('next-images');
const isProd = process.env.NODE_ENV === 'production';
module.exports = withImages({
    assetPrefix: isProd ? 'http://127.0.0.1:3888' : '',
    inlineImageLimit: isProd ? 16384 : 0,
    webpack: (config) => {
        // config.plugins = config.plugins || [];
        // config.plugins = [
        //     ...config.plugins,
        //     new Dotenv({
        //       path: path.join(__dirname, '.env'),
        //       systemvars: true
        //     })
        // ]

        return config
    },
})
