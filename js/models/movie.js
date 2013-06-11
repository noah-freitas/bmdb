/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Movie Model
	// ----------

	app.Movie = Backbone.Model.extend({
		defaults: {
			name: '',
			releaseYear: '',
			grossIncome: '',
			actors: [],
			directorName: '',
			rating: 0,
			genre: ''
		}
	});
})();
