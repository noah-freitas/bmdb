/*global Backbone, jQuery */
var app = app || {};

(function ($) {
	'use strict';

	// Movie Edit View
	// --------------

	app.MovieEditView = Backbone.View.extend({
		tagName:  'div',

		template: _.template($('#movie-edit-template').html()),
		
		events: {
			'click #save': 'save',
			'click #delete': 'del',
			'click .removeactor': 'removeActor',
			'click #addactor': 'addActor'
		},

		initialize: function () {
			var returnNameAndId = function (id) {
				var actor = app.actors.get(id);
				return {
					id: actor.get('id'),
					name: actor.get('firstName') + ' ' + actor.get('lastName')
				};
			};

			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.model.set('actorDetails', _.map(this.model.get('actors'), returnNameAndId));
			var availableActors = _.without.apply(null, app.actors.pluck('id').concat(this.model.get('actors')));
			// Make a list of actors who can be added to this movie.
			this.model.set('unassociatedActors', _.map(availableActors, returnNameAndId));
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		save: function (e) {
			e.preventDefault();
			var attrs = {
					name: $('#name').val().trim(),
					releaseYear: $('#releaseyear').val().trim(),
					grossIncome: $('#grossincome').val().trim(),
					directorName: $('#directorname').val().trim(),
					genre: $('#genre').val().trim(),
					actors: _.map($('.actor'), function (el) {
						return $(el).data('actor');
					})
				},
				id = this.model.get('id');

			// If this is an updated record.
			if (id) {
				this.model.save(attrs);
			// If this is a new record.
			} else {
				id = attrs.id = app.movies.nextId(),
				app.movies.create(attrs);
			}

			var deletedActors = _.without.apply(null, app.actors.forMovie(id).concat(attrs.actors.map));

			// Remove any deleted actors.
			_.each(deletedActors, function (actorId) {
				var actor = app.actors.get(actorId);
				actor.save({ movies: _.without(actor.get('movies'), id) });
			});

			// Add the movie link to the actor model.
			_.each(attrs.actors, function (actorId) {
				var actor = app.actors.get(actorId),
					movies = actor.get('movies');
				actor.save({ movies: _.union(movies, [id]) });
			});

			app.Router.navigate('#/movie/' + id, { trigger: true });
		},

		del: function (e) {
			e.preventDefault();
			this.model.destroy();
			app.Router.navigate('#/movies', { trigger: true });
		},

		addActor: function (e) {
			e.preventDefault();
			var id = $('#newactors').val(),
				name = $('#newactors option:selected').text();
			$('#actors').append([
				'<li>',
					'<span class=actor data-actor="' + id + '">' + name + '</span>',
					'<button class="btn btn-danger removeactor">',
						'<i class="icon-remove icon-white"></i> Remove',
					'</button>',
				'</li>'].join(''));
			$('#newactors option:selected').remove();
		},

		removeActor: function (e) {
			e.preventDefault();
			$(e.target).closest('li').remove();
		}
	});
})(jQuery);
