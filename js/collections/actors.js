/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Actor Collection
	// ---------------

	var ActorList = Backbone.Collection.extend({
		model: app.Actor,
		localStorage: new Backbone.LocalStorage('bmdb-actors'),
		nextId: function () {
			return this.length === 0 ? 1 : this.last().get('id') + 1;
		},
		forMovie: function (movieId) {
			return this.filter(function (actor) {
				return _.indexOf(actor.get('movies'), movieId) !== -1;
			}).map(function (actor) {
				return actor.get('id');
			});
		}
	});

	app.actors = new ActorList();
})();
