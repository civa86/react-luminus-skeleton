(function (module) {
    'use strict';

    var path = require('path'),
        webpack = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        noVendorDeps = ['bootstrap', 'ionicons'],
        vendorDeps = Object.keys(require('./package.json').dependencies)
                           .filter(function (e) { return noVendorDeps.indexOf(e) === -1 }),
        devtoolValue,
        entry,
        output,
        pluginsSet,
        emitLintErrors,
        ExtractStyle,
        devPort = 3333;

    if (process.env.NODE_ENV === 'production') {
        //Build Configuration
        console.log('/***** BUILD ****/');

        console.log('Vendors', vendorDeps);

        ExtractStyle = new ExtractTextPlugin('css/screen.[hash].css');

        devtoolValue = 'source-map';
        entry = {
            app: './src/index',
            vendor: vendorDeps
        };
        output = {
            path: path.join(__dirname, 'dist'),
            filename: 'js/bundle.[hash].min.js',
            publicPath: '/'
        };
        pluginsSet = [
            new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.[hash].js"),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                output: {
                    comments: false
                }
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html'),
                inject: 'body'
            }),
            ExtractStyle,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            })
        ];
        emitLintErrors = true;

    } else {
        //Development Configuration
        console.log('/***** DEVELOPMENT ****/');

        ExtractStyle = new ExtractTextPlugin('css/screen.css');

        devtoolValue = 'source-map';
        entry = [
            'webpack-dev-server/client?http://localhost:' + devPort,
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/index'
        ];
        output = {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/'
        };
        pluginsSet = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'index.html'),
                inject: 'body'
            }),
            ExtractStyle,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"'
            })
        ];
        emitLintErrors = false;
    }

    module.exports = {
        devtool: devtoolValue,
        entry: entry,
        output: output,
        plugins: pluginsSet,
        resolveLoader: {
            fallback: path.join(__dirname, 'node_modules')
        },
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loaders: ['eslint-loader'],
                    include: path.join(__dirname, 'src')
                }
            ],
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel'],
                    exclude: /node_modules/,
                    include: path.join(__dirname, 'src')
                },
                {
                    test: /\.less$/,
                    loader: ExtractStyle.extract('style', 'css!less')
                },
                {
                    test: /\.css$/,
                    loader: ExtractStyle.extract('style', 'css')
                },
                {
                    test: /\.(txt)$/,
                    loader: 'file?name=[name].[ext]'
                },
                {
                    test: /\.(woff|woff2|ttf|eot)(\?=?|$)/,
                    loader: 'file?name=assets/fonts/[name].[ext]'
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)(\?=?|$)/,
                    loader: 'file?name=assets/img/[name].[ext]'
                }
            ]
        },
        eslint: {
            configFile: './.eslintrc',
            emitError: emitLintErrors,
            emitWarning: !emitLintErrors,
            failOnWarning: emitLintErrors,
            failOnError: emitLintErrors,
            plugins: [
                "react"
            ]
        },
        port: devPort
    };
})(module);
