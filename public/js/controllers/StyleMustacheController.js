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
		mustageChancesObj = {};

	function fillMustageChancesObj(score) {
		for (var mustageLevel = 1; mustageLevel <= 12; mustageLevel++) {
			mustageChancesObj[mustageLevel] = (score / ((Math.exp(mustageLevel / difficultyCoeficient) / Math.exp(1 / difficultyCoeficient)) * ClicksForLevelOne) * 100).toFixed(2);
		};
	}

	controller.init = function (score) {
		fillMustageChancesObj(score);
		console.log(score);
		console.log(mustageChancesObj);
	};
	controller.gamble = function (mustageNumber) {
		if (Number(NumbermustageChancesObj[mustageNumber]) * 100 < Math.random() * 10000) {
			return true;
		} else {
			return false;
		}
	}

	mr.controllers.StyleMustache = controller;
})();
