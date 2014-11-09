/*
 * Handles all the logic while manning up
 *
 * @author: antony.dikov
 * @issued 08.11.2014
 */
(function () {
	'use strict';
	var controller = new mr.controllers.BaseController,
		difficultyCoeficient = 2.5,
		ClicksForLevelOne = 62,
		moustacheMapper = {};

	function fillMustageChancesObj(score) {
		for (var moustacheLevel = 1; moustacheLevel <= 12; moustacheLevel++) {
			var requiredGrowth = ((Math.exp(moustacheLevel / difficultyCoeficient) / Math.exp(1 / difficultyCoeficient)) * ClicksForLevelOne);
			console.log(requiredGrowth);
			moustacheMapper[moustacheLevel] = {};
			moustacheMapper[moustacheLevel]['chanceToWin'] = (Math.min(score / requiredGrowth, 1) * 100).toFixed(2);
			moustacheMapper[moustacheLevel]['reward'] = Math.floor(requiredGrowth) - (Math.floor(requiredGrowth) < 100 ? Math.floor(requiredGrowth) % 10 : Math.floor(requiredGrowth) % 100);
		};
	}

	function winMustache(number, score) {
		console.log('YOU WON: ' + (moustacheMapper[number]['reward'] * score));
	}

	function failMustache() {
		console.log('YOU ARE A NOOB!');
	}

	controller.init = function (score) {
		moustacheMapper = {};
		$('.mustache-choice').off('click');
		$('.choose-item-dialog').fadeIn(1000, function () {
			$('.mustache-choice').off('click').on('click', function () {
				if (controller.gamble($(this).data('id'))) {
					winMustache($(this).data('id'), score);
				} else {
					failMustache($(this).data('id'));
				}
			});
		}).html('');

		fillMustageChancesObj(score);

		for (var mustache in moustacheMapper) {
			$('.choose-item-dialog').append('<div data-id="' + mustache + '" class="mustache-choice" data-chance=' +
				moustacheMapper[mustache]['chanceToWin'] + '><span class="chance-holder"></span></div>');
		}

		$('.mustache-choice').tooltip({
			items: '[data-chance]',
			track: true,
			content: function (response) {
				return '<div class="moustache-preview preview-' + $(this).data('id') +' "></div><span class="chance-holder">' + $(this).data('chance') +'%</span>';
			},
			tooltipClass: 'moustache-tooltip',
			position: {
				my: "left+15 bottom",
				at: "right center"
			},
			show: {
				delay: 500
			}
		});

		console.log(score);
		console.log(moustacheMapper);
	};
	controller.gamble = function (mustageNumber) {
		var a = Number(moustacheMapper[mustageNumber]) * 100;
		var b = Math.random() * 10000;

		if (Number(moustacheMapper[mustageNumber]['chanceToWin']) * 100 > Math.random() * 10000) {
			return true;
		} else {
			return false;
		}
	}

	mr.controllers.StyleMustache = controller;
})();
