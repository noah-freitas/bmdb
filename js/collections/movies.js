/*global Backbone, _ */
var app = app || {};

(function () {
	'use strict';

	// Actor Collection
	// ---------------

	var MovieList = Backbone.Collection.extend({
		model: app.Movie,
		localStorage: new Backbone.LocalStorage('bmdb-movies'),
		nextId: function () {
			return this.length === 0 ? 1 : this.last().get('id') + 1;
		},
		recent: function () {
			return _.sortBy(this, function (movie) {
				return -movie.get('id');
			});
		}
	});

	app.movies = new MovieList();
})();
