var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

	default: {
		_id: null,
		text: null,
		imageId: null,
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/bigkeithtexasusa',
	idAttribute: '_id'

});