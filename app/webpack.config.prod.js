(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        noVendorDeps = ['bootstrap', 'ionicons'],
        vendorDeps = Object.keys(require('./package.json').dependencies)
                           .filter(function (e) { return noVendorDeps.indexOf(e) === -1 });;

    module.exports = {
        devtool: 'source-map',
        entry: {
            app: './src/index',
            vendor: vendorDeps
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'js/bundle.[hash].min.js'
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'js/vendor.[hash].js'
            }),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                sourceMap: true
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html'),
                inject: 'body'
            }),
            new ExtractTextPlugin({
                filename: 'screen.[hash].css',
                disable: false,
                allChunks: true
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
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
                        emitError: true,
                        emitWarning: false,
                        failOnWarning: true,
                        failOnError: true
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
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'less-loader'
                            }
                        ],
                        publicPath: "/"
                    })
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
