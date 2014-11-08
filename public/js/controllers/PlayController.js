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
		var volume = 0,
			startDelay = 3,
			startDelayInterval,
			playing = false,
			playTimer = new mr.Countdown({
				seconds: 100,
				onUpdateStatus: function(options) {
					var markup = $('.counter', scope);

					if (markup.length > 0) {
						markup.text(Math.floor(options.ms / 1000));
					} else {
						timer.stop();
					}
				},
				onCounterEnd: function() {
					playing = false;
				}
			});

		// Start delay
		startDelayInterval = setInterval(function() {
			if (startDelay == 0) {
				clearInterval(startDelayInterval);

				playTimer.start();
				playing = true;

				return;
			}

			startDelay -= 1;
		}, 1000);

		// Handle player click
		$('.moustache', scope).on('click', function() {
			// Check if we can play
			if (!playing) {
				return;
			}

			volume += 1;

			$('.volume', scope).text(volume);
		});
	};

	mr.controllers.Play = controller;
})();