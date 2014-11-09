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
		var bonusInterval,
			bonusOnSeconds = 0.5,
			bonuses = {
				x2: {
					chance: 4,
					speed: 7500,
					class: 'x2',
					timeouts: {
						opacity1: null,
						opacity2: null,
						bonustime: null
					},

					bonusFunction: function() {
						clearTimeout(this.timeouts.opacity1);
						clearTimeout(this.timeouts.opacity2);
						clearTimeout(this.timeouts.bonustime);

						// Set the bonus multiplier for 5 seconds
						$('.multiplier', scope).stop().css('opacity', 1).fadeIn();
						mr.gameConfig.multiplier = 2;

						this.timeouts.opacity1 = setTimeout(function() {
							$('.multiplier', scope).stop().animate({
								'opacity': 0.7
							}, 300);
						}, 1000);

						this.timeouts.opacity2 = setTimeout(function() {
							$('.multiplier', scope).stop().animate({
								'opacity': 0.4
							}, 300);
						}, 3000);

						this.timeouts.bonustime = setTimeout(function() {
							$('.multiplier', scope).stop().fadeOut();
							mr.gameConfig.multiplier = 1;
						}, 5000);
					}
				},
				time: {
					chance: 8,
					speed: 8000,
					class: 'time',
					bonusFunction: function() {
						mr.gameConfig.timer.addSeconds(1);
						$('#timer', scope).addClass('pulse');
					}
				},
				bigTime: {
					chance: 6,
					speed: 7000,
					class: 'big-time',
					bonusFunction: function() {
						mr.gameConfig.timer.addSeconds(3);
					}
				}
			};

		function spawnBonus(name) {
			var bonus = bonuses[name],
				startLeft = Math.floor((Math.random() * 350) + 1) + 50,
				bonusMarkup = $('<div class="bonus ' + bonus.class + ' pointer">x2</div>')
					.css({
						left: startLeft
					})
					.on('click', function() {
						$(this).off('click').remove();
						bonus.bonusFunction();
					})
					.animate({
						top: 600
					}, bonus.speed, function() {
						$(this).remove();
					});

			$('.game-section', scope)
				.append(bonusMarkup);
		}

		bonusInterval = setInterval(function() {
			var bonusInThisInt = false;

			// Loop trough all the bonuses
			for (var bonus in bonuses) {
				if (bonusInThisInt) {
					return;
				}

				var chance = Math.floor((Math.random() * 100) + 1);
				console.log(chance, bonuses[bonus].chance);

				if (chance <= bonuses[bonus].chance) {
					bonusInThisInt = true;
					spawnBonus(bonus);
				}
			}
		}, bonusOnSeconds * 1000);

		$(window).on('stageEnd', function() {
			clearInterval(bonusInterval);
		});
	};

	controller.clearBonuses = function() {
		$('.game-section .bonus').off('click').remove();
		$('.game-section .multiplier').stop().fadeOut();
	};

	mr.controllers.Bonus = controller;
})();