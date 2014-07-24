var domready = require('domready');
var MainView = require('./views/main');
var Router = require('./router');

window.app = {
    init: function () {
        this.router = new Router();

        var self = this;

        domready(function () {
            self.view = new MainView({
                el: document.body
            });

            self.router.history.start({ pushState: true });
        });
    }
};

window.app.init();
