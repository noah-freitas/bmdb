/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var Router = Backbone.Router.extend({
		routes: {
			'actors': 'actorList',
			'actor/:id(/:edit)': 'actor',
			'movies': 'movieList',
			'movie/:id(/:edit)': 'movie',
			'': 'index'
		},

		actorList: function () {
			this.trigger('changeView', app.actorsListView);
		},

		actor: function (id, edit) {
			var view = edit || id === 'add' ? app.ActorEditView : app.ActorDetailView,
				model = id === 'add' ? new app.Actor : app.actors.get(id);

			this.trigger('changeView', new view({ model: model }));
		},

		movieList: function () {
			this.trigger('changeView', app.moviesListView);
		},

		movie: function (id, edit) {
			var view = edit || id === 'add' ? app.MovieEditView : app.MovieDetailView,
				model = id === 'add' ? new app.Movie({ unassociatedActors: [] }) : app.movies.get(id);

			this.trigger('changeView', new view({ model: model }));
		},

		index: function () {
			this.trigger('changeView', app.moviesListView);
		}
	});

	app.Router = new Router();
	Backbone.history.start();
})();
