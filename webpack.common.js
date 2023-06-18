const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = ["index", "signup", "login", "forgot", "levels", "activate", "verify", "profile", "shop", "play"];
// let pages = ['login'];
let seqprog = ["seqprog"];


pages = pages.concat(seqprog);

module.exports = {
    entry: pages.reduce((config, page) => {
        config[page] = `./src/${page}.js`;
        return config;
    }, {}),
    optimization: {
        splitChunks: {
          chunks: "all",
        },
    },
    plugins: [].concat(
        pages.map(
          (page) =>
            new HtmlWebpackPlugin({
              inject: true,
              template: `./templates/${page}.html`,
              filename: `${page}.html`,
              chunks: [page],
            })
        ),
        // <- here goes array(s) of other plugins
    ),
    module: {
        rules: [ 
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.png|svg|jpg|jpeg|gif|mp3/,
                type: 'asset/resource'
            }
        ]
    },
    experiments: {
        topLevelAwait: true
    },
    externals: {
        // only define the dependencies you are NOT using as externals!
        canvg: "canvg",
        html2canvas: "html2canvas",
        dompurify: "dompurify"
    }
}