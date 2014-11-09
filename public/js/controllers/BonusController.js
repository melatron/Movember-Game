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
		function spawnBonus(name) {
			var left = Math.floor((Math.random() * 350) + 1) + 50;
			var bonusMarkup = $('<div class="bonus"></div>').css({
				left: left
			}).animate({
				top: 600
			}, 2000);

			$('.game-section', scope)
				.append(bonusMarkup);
		}

		var bonusInterval,
			bonusOnSeconds = 1,
			chances = {
				x2: 100,
				time: 0,
				bigTime: 0
			},
			stayFor = {
				min: 3,
				max: 6
			};

		bonusInterval = setInterval(function() {
			// Loop trough all the bonuses
			for (var bonus in chances) {
				var chance = Math.floor((Math.random() * 100) + 1);

				if (chance <= chances[bonus]) {
					spawnBonus(bonus);
				}
			}
		}, bonusOnSeconds * 1000);

		$(window).on('stageEnd', function() {
			clearInterval(bonusInterval);
		});
	};

	mr.controllers.Bonus = controller;
})();