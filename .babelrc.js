const env = require('./env-config.js');
module.exports = {
    "presets": [
        "next/babel"
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd",
                "style": "css"
            }
        ],
        ['transform-define', env]
    ]
}