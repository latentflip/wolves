var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var HowlsPage = require('./pages/howls');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'howls': 'howls'
    },

    home: function () {
        var homePage = new HomePage();
        this.trigger('page', homePage);
    },

    howls: function () {
        this.trigger('page', new HowlsPage());
    }
});
