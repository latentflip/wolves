var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var templates = require('../templates');
var dom = require('ampersand-dom');

module.exports = View.extend({
    template: templates.main,
    autoRender: true,
    events: {
        'click a[href]': 'handleLinks'
    },
    initialize: function () {
        this.listenTo(app.router, 'page', this.handleNewPage);
    },
    handleNewPage: function (page) {
        this.pages.set(page);
        this.updateActiveNav();
    },
    render: function () {
        this.renderWithTemplate();

        this.pages = new ViewSwitcher(this.getByRole('page-container'));
        return this;
    },
    handleLinks: function (event) {
        var aTag = event.target;

        if (aTag.host === window.location.host) {
            event.preventDefault();
            app.router.navigate(aTag.pathname, { trigger: true });
        }
    },
    updateActiveNav: function () {
        var pathname = window.location.pathname;

        this.getAll('[role=main-nav] a[href]').forEach(function (aTag) {
            if (pathname.indexOf(aTag.pathname) === 0) {
                dom.addClass(aTag.parentNode, 'active');
            } else {
                dom.removeClass(aTag.parentNode, 'active');
            }
        });
    }
});
