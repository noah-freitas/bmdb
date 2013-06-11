/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '#bmdbapp',

		initialize: function () {
			this.currentView = app.moviesListView;
			this.listenTo(app.Router, 'changeView', this.updateView);
			this.render();
		},
		
		updateView: function (view) {
			this.currentView = view;
			this.render();
		},

		render: function () {
			this.$el.html(this.currentView.render().el);
		}
	});
})(jQuery);
