var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config.dev'),
    fs = require('fs'),
    restConfiguration = fs.readFileSync('../rest/env/dev/resources/config.edn', 'utf8'),
    restPort = restConfiguration.replace(/{/g, '')
                                .replace(/}/g, '')
                                .replace(/\n/g, '')
                                .split(/(:[a-z]*\s\w*)/g)
                                .reduce(function (res, e) {
                                    var tmp = '';
                                    if (e.indexOf(':port') !== -1) {
                                        tmp = e.split(' ');
                                        res = tmp[1];
                                    }
                                    return res;
                                }, null);

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    },
    proxy: {
        '/api/*': {
            target: 'http://localhost:' + restPort
        }
    }
}).listen(3000, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3000');
});
