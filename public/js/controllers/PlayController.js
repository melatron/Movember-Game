/*
 * Handles all the logic while manning up
 *
 * @author: filip.ganchev
 * @issued 08.11.2014
 */
(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;

	controller.init = function(scope) {
		console.log('Play controller', scope);
	};

	mr.controllers.Play = controller;
})();