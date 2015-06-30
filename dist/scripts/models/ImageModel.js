var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

	default: {
		_id: null,
		url: null,
		caption: null,
	},

	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/bigkeithtexas2usa',
	idAttribute: '_id'


});