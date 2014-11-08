/*
 * Our global namespace for the game.
 * Contains core functionality that keeps the game up and running.
 *
 * Dependencies: jQuery 2.1.1
 *
 * @author filip.ganchev, antony.dikov
 * @issued 08.11.2014
 */
var mr = (function() {
	'use strict';

	var self;

	return {
		constants: {},
		controllers: {},
		init: function () {
			self = this;
		}
	}
})();