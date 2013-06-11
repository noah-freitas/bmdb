/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Movie List
	// ---------------

	app.MovieListView = Backbone.View.extend({
		tagName: 'ul',

		initialize: function (col) {
			this.col = col;
			this.listenTo(col, 'add', this.addOne);
			this.listenTo(col, 'reset', this.addAll);
			this.listenTo(col, 'all', this.render);

			col.fetch();
		},

		render: function () {
			return this;
		},

		addOne: function (movie) {
			var view = new app.MovieListItemView({ model: movie });
			this.$el.append(view.render().el);
		},

		addAll: function () {
			this.$el.html('');
			this.col.each(this.addOne, this);
		}
	});

	app.moviesListView = new app.MovieListView(app.movies);
})(jQuery);
