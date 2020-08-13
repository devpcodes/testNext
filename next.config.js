const withImages = require('next-images');
const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';
module.exports = withPWA(withImages({
    assetPrefix: isProd ? 'http://127.0.0.1:3888' : '',
    inlineImageLimit: isProd ? 16384 : 0,
    pwa: {
        disable: isProd ? false : true,
        dest: 'public',
        register: true
    },
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
}))
