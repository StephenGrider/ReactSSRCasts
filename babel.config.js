const presets = [
    "@babel/preset-env",
    "@babel/preset-react"
];
const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    ["inline-json-import", {}]
];

module.exports = { presets, plugins };
