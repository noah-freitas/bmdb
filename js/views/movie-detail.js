/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
	'use strict';

	// Movie Item View
	// --------------

	app.MovieDetailView = Backbone.View.extend({
		tagName:  'div',

		template: _.template($('#movie-detail-template').html()),

		initialize: function () {
			// Add actor names to the actors' array model.
			this.model.set('actorDetails', _.map(this.model.get('actors'), function (id) {
				var actor = app.actors.get(id);
				return {
					id: id,
					name: actor.get('firstName') + ' ' + actor.get('lastName')
				};
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
