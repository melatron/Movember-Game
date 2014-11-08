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
			playTime = 10,
			firstTap = false,
			playing = false,
			playTimer = new mr.Countdown({
				seconds: playTime,
				onUpdateStatus: function(options) {
					var markup = $('.counter', scope);

					if (markup.length > 0) {
						var seconds = Math.floor(options.ms / 1000),
							elapsed = (seconds / playTime) * 100;
						
						// Check if the timer is below 20% || 10%
						if (seconds <= 5) {
							markup.addClass('danger-text pulse');
						} else if (seconds <= 10) {
							markup.addClass('caution-text');
						} 

						markup.text(options.min + ':' + options.s);
					} else {
						timer.stop();
					}
				},
				onCounterEnd: function() {
					playing = false;
				}
			});

		$('.volume span').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('pulse');
		});

		// Handle player click
		$('.moustache', scope).on('click', function(event) {
			// Check for first tap
			if (!firstTap) {
				$('.tap-to-start', scope)
					.addClass('flipOutX')
					.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						$(this).remove();

						firstTap = true;

						playTimer.start();
						playing = true;
					});
				return;
			}

			// Check if we can play
			if (!playing) {
				return;
			}

			volume += 1;

			$('.volume span', scope)
				.text(volume)
				.addClass('pulse');

			// Indicate the +1 hair
			var plus = $('<div class="plus-box animated fadeOutUp"></div>')
	            .css({
					left: (event.pageX - (event.pageX - this.offsetLeft)) + 50
				}).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					$(this).remove();
				});
			$(this).append(plus);
		});

		$('.volume').animate({top:'0px'},1000);
		$('.counter').animate({bottom:'0px'},1000);

	};

	mr.controllers.Play = controller;
})();