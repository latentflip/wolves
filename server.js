var Hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var config = require('getconfig');
var templatizer = require('templatizer');
var stylizer = require('stylizer');

var server = new Hapi.Server(8080);

server.pack.register([
    {
        plugin: moonboots,
        options: {
            appPath: '/{clientApp*}',
            moonboots: {
                main: __dirname + '/client/app.js',
                developmentMode: config.isDevelopment,
                stylesheets: [
                    __dirname + '/public/css/bootstrap.css',
                    __dirname + '/public/css/app.css'
                ],
                beforeBuildJS: function () {
                    if (config.isDevelopment) {
                        templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
                    }
                },
                beforeBuildCSS: function (done) {
                    stylizer({
                        infile: __dirname + '/public/css/app.styl',
                        outfile: __dirname + '/public/css/app.css',
                        development: config.isDevelopment,
                        watch: __dirname + '/public/css/**/*.styl'
                    }, done);
                }
            }
        }
    }
], function () {
    server.start();
    console.log('Server started on http://localhost:8080');
});

