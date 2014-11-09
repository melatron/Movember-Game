/*
 * Handle all bonuses while manning the f*ck up
 *
 * @author: filip.ganchev
 * @issued 09.11.2014
 */
(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;

	controller.init = function(scope) {
		var bonusInterval = 1,
			bonusOnSeconds = 1,
			chances = {
				x2: 10,
				time: 15,
				bigTime: 5
			};

		bonusInterval = setInterval(function() {
			console.log('interval iterate');
		}, bonusOnSeconds * 1000);
	};

	mr.controllers.Bonus = controller;
})();