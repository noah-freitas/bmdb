/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	// Actor Item View
	// --------------

	app.ActorDetailView = Backbone.View.extend({
		tagName:  'div',

		template: _.template($('#actor-detail-template').html()),

		initialize: function () {
			this.model.set('movieDetails', _.map(this.model.get('movies'), function (id) {
				return app.movies.get(id).pick('id', 'name', 'releaseYear');
			}));
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
})(jQuery);
