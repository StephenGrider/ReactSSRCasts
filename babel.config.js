const presets = [
    "@babel/preset-env",
    "@babel/preset-react"
];
const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@loadable/babel-plugin",
    "@babel/plugin-proposal-export-default-from",
    ["inline-json-import", {}],
    [
        "babel-plugin-root-import",
        {
            "paths": [
                {
                    "rootPathSuffix": "./app",
                    "rootPathPrefix": "~app/"
                },
                {
                    "rootPathSuffix": "./app/client",
                    "rootPathPrefix": "~client/"
                },
                {
                    "rootPathSuffix": "./app/admin",
                    "rootPathPrefix": "~admin/"
                },
                {
                    "rootPathSuffix": "./vendor",
                    "rootPathPrefix": "~vendor/"
                }
            ]
        }
    ]
];

module.exports = { presets, plugins };
