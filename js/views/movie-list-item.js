/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Movie Item View
	// --------------

	app.MovieListItemView = Backbone.View.extend({
		tagName:  'li',

		template: _.template($('#movie-list-template').html()),

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
})(jQuery);
