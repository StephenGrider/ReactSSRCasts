const presets = [
    "@babel/preset-env",
    "@babel/preset-react"
];
const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    ["inline-json-import", {}],
    [
        "babel-plugin-root-import",
        {
            "paths": [
                {
                    "rootPathSuffix": "./src",
                    "rootPathPrefix": "~/"
                },
                {
                    "rootPathSuffix": "./src/client",
                    "rootPathPrefix": "~client/"
                },
                {
                    "rootPathSuffix": "./src/admin",
                    "rootPathPrefix": "~admin/"
                }
            ]
        }
    ]
];

module.exports = { presets, plugins };
