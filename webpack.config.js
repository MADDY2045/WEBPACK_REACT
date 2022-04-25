const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Depenencies specs
//webpack and webpack-cli to run webpack commands
//webpack-dev-server to run react locally
//

module.exports = {
    entry:path.join(__dirname,'src','index.js'),//path to start bundling the javascript files
    mode: 'development',
    output:{
        path:path.resolve(__dirname,'dist'),//we tell webpack to create the final bundled file in dist folder
    },
    module:{
        rules:[//We now need to tell webpack to transpile javascript files using babel before bundling them. To do that we need to define some rules for the module bundling.
            {
            test: /\.?js$/,
            exclude:/node_modules/,
            use:{
                loader:"babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']//Here we have 2 presets @babel/preset-env for transpiling ES2015+ syntax and we have @babel/preset-react for transpiling react code
                  }
            }
        },
            {
            test: /\.css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: true,
                },
              },
            ],
            include: /\.module\.css$/,
          },
            {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            exclude: /\.module\.css$/,
          }
    ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'src','index.html')//Once the bundled javascript file is created we need to tell webpack to inject it as a script tag to the HTML file
        })
    ],
}