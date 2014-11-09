/*
 * Handles all the logic while manning the f*ck up
 *
 * @author: filip.ganchev
 * @issued 08.11.2014
 */
(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;

	controller.init = function(scope) {
		// Check if the play timer is not already there
		if (typeof mr.gameConfig.timer === 'object') {
			mr.gameConfig.timer.stop();
			mr.gameConfig.timer = '';
		}

		$('.moustache').attr('class','moustache l0 pointer animated');

		// Show the info how to start
		$('.tap-to-start', scope)
			.removeClass('ui-hide')
			.addClass('flipInX');

		var volume = 0,
			playTime = 15 + mr.controllers.Achievment.getBonusSeconds(),
			firstTap = false,
			playing = false,
			moustacheLevel = 0,
			moustacheForms = {
				1: 40,
				2: 70,
				3: 103,
				4: 141,
				5: 183,
				6: 230,
				7: 283,
				8: 342,
				9: 408,
				10: 483
			},
			achievementsTable = [50, 100, 250, 500, 1000];

		mr.gameConfig.timer = new mr.Countdown({
			seconds: playTime,
			onUpdateStatus: function(options) {
				var markup = $('#timer', scope);

				if (markup.length > 0) {
					var seconds = Math.floor(options.ms / 1000);
					
					// Check if the timer is below 20% || 10%
					if (seconds <= 5) {
						markup.addClass('danger-text');
						$('.timer-image', scope).addClass('pulse');
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
				mr.gameConfig.timer = '';

				$(window).trigger('stageEnd');
				mr.controllers.Bonus.clearBonuses();
			}
		});

		$('#timer', scope).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('pulse');
		});

		// Start time fix
		var startTime = new mr.Countdown({});
		$('#timer', scope).html(startTime.formatSeconds(playTime));

		$('.volume span', scope).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('pulse');
		});

		// Handle player click
		$('.moustache', scope).on('click', function(event) {
			// Check for first tap
			if (!firstTap) {
				firstTap = true;

				$('.tap-to-start', scope)
					.addClass('flipOutX')
					.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						$(this).remove();

						mr.gameConfig.timer.start();
						playing = true;

						mr.fireController('Bonus', $('.game-wrapper'));
					});
				return;
			}

			// Check if we can play
			if (!playing) {
				return;
			}

			volume += 1 * mr.gameConfig.multiplier;

			// Check if we reached the next level moustache
			if (volume == moustacheForms[moustacheLevel + 1]) {
				$(this).removeClass('l' + moustacheLevel);
				moustacheLevel += 1;
				$(this).addClass('l' + moustacheLevel + ' tada');
			}

			// Check for achievements
			for (var i = 0; i < achievementsTable.length ; i++) {
				if (volume == achievementsTable[i]) {
					mr.controllers.Achievment.addAchievment('clicks-' + achievementsTable[i]);
				}
			}

			$('.volume span', scope)
				.text(volume)
				.addClass('pulse');

			// Indicate the +1 hair
			var plus = $('<div class="plus-box animated fadeOutUp"></div>')
	            .css({
	            	top: -20,
					left: (140 - parseInt($(this).css('left'))) + 30
				}).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					$(this).remove();
				});
			$(this).append(plus);
		}).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('tada');
		});;
		
		function showPlayComponents(){
			$('.volume', scope).animate({
				top: '0px'
			}, 1000);
			$('.counter', scope).animate({
				bottom: '0px'
			}, 1000);
		}

		function hidePlayComponents(){
			$('.volume', scope).animate({
				top: '-75px'
			}, 1000);
			$('.counter', scope).animate({
				bottom: '-75px'
			}, 1000);
		}

		showPlayComponents();

		$(window).off('stageEnd').on('stageEnd',function(){
			hidePlayComponents();
			mr.fireController('StyleMustache',volume);
		})
	};

	mr.controllers.Play = controller;
})();