/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Actor Model
	// ----------

	app.Actor = Backbone.Model.extend({
		defaults: {
			firstName: '',
			lastName: '',
			gender: '',
			birthDate: '',
			movies: []
		}
	});
})();
