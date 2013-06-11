/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Actor List
	// ---------------

	app.ActorListView = Backbone.View.extend({
		tagName: 'ul',

		initialize: function () {
			this.listenTo(app.actors, 'add', this.addOne);
			this.listenTo(app.actors, 'reset', this.addAll);
			this.listenTo(app.actors, 'all', this.render);

			app.actors.fetch();
		},

		render: function () {
			return this;
		},

		addOne: function (actor) {
			var view = new app.ActorListItemView({ model: actor });
			this.$el.append(view.render().el);
		},

		addAll: function () {
			this.$el.html('');
			app.actors.each(this.addOne, this);
		}
	});

	app.actorsListView = new app.ActorListView();
})(jQuery);
