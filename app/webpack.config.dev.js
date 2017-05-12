(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin');

    module.exports = {
        devtool: 'eval',
        entry: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/index'
        ],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin({
                filename: "vendor.css",
                disable: false,
                allChunks: true
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html'),
                inject: 'body'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"'
            })
        ],
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    include: path.join(__dirname, 'src'),
                    options: {
                        emitError: false,
                        emitWarning: true,
                        failOnWarning: false,
                        failOnError: false
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    include: path.join(__dirname, 'src')
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader",
                        publicPath: "/"
                    })
                },
                {
                    test: /\.(txt)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                },
                {
                    test: /\.(json)$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.(woff|woff2|ttf|eot)(\?=?|$)/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)(\?=?|$)/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[ext]'
                    }
                }

            ]
        }
    };
})(module);
