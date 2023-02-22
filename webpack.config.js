const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production'

module.exports = {
    entry: { app: path.resolve(__dirname, "./src/index.js") },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: production ? "[name].[contenthash].js" : "[name].js"
    },
    module: {
        rules:[ 
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: [
                    production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: !production
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            modules: true,
                            sourceMap: !production
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss']
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'simple webpack build',
            template: './src/index.html',
            
        }),
        new MiniCssExtractPlugin({
            filename: production ? '[name].[contenthash].css' : '[name].css',
        })
    ],
    devServer: {
        port: 3001,
        hot: true,
        client: {
            // Показывает ошибки при компиляции в самом браузере
            overlay: {
              errors: true,
              warnings: false,
            },
            // Показывает прогесс компиляции
            progress: true
          },
    },
    mode: production ? 'production' : 'development'
}