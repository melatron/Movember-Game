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
		moustacheMapper = {},
		score = 0;

	function fillMustageChancesObj(score) {
		for (var moustacheLevel = 1; moustacheLevel <= 12; moustacheLevel++) {
			var requiredGrowth = ((Math.exp(moustacheLevel / difficultyCoeficient) / Math.exp(1 / difficultyCoeficient)) * ClicksForLevelOne);

			moustacheMapper[moustacheLevel] = {};
			moustacheMapper[moustacheLevel]['chanceToWin'] = (Math.min(score / requiredGrowth, 1) * 100).toFixed(2);
			moustacheMapper[moustacheLevel]['reward'] = Math.floor(requiredGrowth) - (Math.floor(requiredGrowth) < 100 ? Math.floor(requiredGrowth) % 10 : Math.floor(requiredGrowth) % 100);
		};
	}

	function winMustache(number, score) {
		//console.log('YOU WON: ' + (moustacheMapper[number]['reward'] * score));
		
		mr.controllers.Achievment.addAchievment('special-' + number);
		fillMustageChancesObj(0);
		$('.mustache-choice').off('click');
		$('.choose-item-dialog').fadeOut(1000, function () {
			$('#donate-stache').fadeIn(200).off('click').on('click', function () {
				$(this).fadeOut(300);
				ws.send(JSON.stringify({ route: 'StyleMustache@win', mustanceNum: number, points: moustacheMapper[number]['reward'] * score }));
				score = 0;
				mr.fireController('Menu',$('.game-content'));
			});
		});
	}

	function failMustache() {
		fillMustageChancesObj(0);
		$('.mustache-choice').off('click');
		$('.choose-item-dialog').fadeOut(1000, function () {
			$('#craft-failed-text').fadeIn(1000);
		});
	}

	function addEvents(){
		$('.mustache-choice').off('click').on('click', function () {
			if (controller.gamble($(this).data('id'))) {
				winMustache($(this).data('id'), score);
			} else {
				failMustache($(this).data('id'));
			}
		});

		// $('.mustache-choice').tooltip({
		// 	items: '[data-chance]',
		// 	track: true,
		// 	content: function (response) {
		// 		return '<div class="preview moustache trim t' + $(this).data('id') +' "></div><div class="chance-holder">' + $(this).data('chance') +'%</div>';
		// 	},
		// 	tooltipClass: 'moustache-tooltip',
		// 	position: {
		// 		my: "left+15 bottom",
		// 		at: "right center"
		// 	},
		// 	show: {
		// 		delay: 400
		// 	}
		// });
	}

	function fillDom() {
		$('.choose-item-dialog').append('<div class="choose-item-desc">'+
							'<div>Style your stache!</div>'+
							'<div>The better the mustache the harder it is to pull off.</div>'+
						'</div>')
		for (var mustache in moustacheMapper) {
			$('.choose-item-dialog').append('<div data-id="' + mustache + '" class="mustache-choice">'+
				'<img src="images/moustaches/trims/'+mustache+'.png">'+
				'<div class="chance-holder">'+Math.round(moustacheMapper[mustache]['chanceToWin'])+'% </div></div>');
		}
	}

	controller.init = function (points) {
		score = points;
		moustacheMapper = {};
		$('.mustache-choice').off('click');
		$('.choose-item-dialog').fadeIn(1000, function () {
			addEvents();
		}).html('');

		fillMustageChancesObj(score);

		fillDom();

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
