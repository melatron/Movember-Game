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
		mustacheChancesObj = {};

	function fillMustageChancesObj(score) {
		for (var mustacheLevel = 1; mustacheLevel <= 12; mustacheLevel++) {
			mustacheChancesObj[mustacheLevel] = (Math.min(score / ((Math.exp(mustacheLevel / difficultyCoeficient) / Math.exp(1 / difficultyCoeficient)) * ClicksForLevelOne), 1) * 100).toFixed(2);
		};
	}

	function winMustache(reward) {
		console.log('YOU WON: ' + reward);
	}

	function failMustache() {
		console.log('YOU ARE A NOOB!');
	}

	controller.init = function (score) {
		fillMustageChancesObj(score);
		
		

		$('.choose-item-dialog').fadeIn(300);
		for (var mustache in mustacheChancesObj) {
			$('.choose-item-dialog').append('<div data-id="' + mustache + '" class="mustache-choice" data-chance=' + mustacheChancesObj[mustache] + '></div>');
		}
		$('.mustache-choice').off('click').on('click', function () {
			console.log($(this).data('id'));
			if (controller.gamble($(this).data('id'))) {
				winMustache($(this).data('id'));
			} else {
				failMustache($(this).data('id'));
			}
		});
		console.log(score);
		console.log(mustacheChancesObj);
	};
	controller.gamble = function (mustageNumber) {
		var a = Number(mustacheChancesObj[mustageNumber]) * 100;
		var b = Math.random() * 10000;

		console.log(a, b);
		if (Number(mustacheChancesObj[mustageNumber]) * 100 > Math.random() * 10000) {
			return true;
		} else {
			return false;
		}
	}

	mr.controllers.StyleMustache = controller;
})();
