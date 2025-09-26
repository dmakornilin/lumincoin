const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        static: '.dist',
        compress: true,
        port: 9001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            baseUrl: '/'
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/templates", to: "templates"},
                {from: "./src/webfonts", to: "webfonts"},
                {from: "./src/static/images", to: "images"},
                {from: "./src/plugins/font-awesome/css", to: "css"},
                {from: "./src/plugins/fonts", to: "css"},
                {from: "./node_modules/bootstrap/dist/css/bootstrap.css", to: "css"},
                {from: "./node_modules/bootstrap-icons/font/bootstrap-icons.min.css", to: "css"},
                {from: "./node_modules/icheck-bootstrap/icheck-bootstrap.css", to: "css"},
                {from: "./node_modules/bootstrap/dist/js/bootstrap.js", to: "js"},
                {from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.js", to: "js"},
            ],
        }),

    ],
    resolve: { alias: { 'chart.js': 'chart.js/dist/chart.js', 'chart.js/auto': 'chart.js/dist/chart.js', 'chart.js/plugins': 'chart.js/dist/plugins', 'chart.js/scales': 'chart.js/dist/scales', }, },
}
