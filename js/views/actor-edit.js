/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Actor Item View
	// --------------

	app.ActorEditView = Backbone.View.extend({
		tagName:  'div',

		template: _.template($('#actor-edit-template').html()),
		
		events: {
			'click #save': 'save',
			'click #delete': 'del'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		save: function (e) {
			e.preventDefault();
			var attrs = {
					firstName: $('#firstname').val().trim(),
					lastName: $('#lastname').val().trim(),
					gender: $('#gender').val().trim(),
					birthDate: $('#birthdate').val().trim(),
				},
				id = this.model.get('id');

			// If this is an updated record.
			if (id) {
				this.model.save(attrs);
			// If this is a new record.
			} else {
				id = attrs.id = app.actors.nextId(),
				app.actors.create(attrs);
			}

			app.Router.navigate('#/actor/' + id, { trigger: true });
		},

		del: function (e) {
			e.preventDefault();
			this.model.destroy();
			app.Router.navigate('#/actors', { trigger: true });
		}
	});
})(jQuery);
