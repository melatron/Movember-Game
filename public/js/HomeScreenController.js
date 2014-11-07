﻿mr.homeScreenController = (function () {
	'use strict';

	function addEvents() {
		$('.play-button').off('click').on('click', function () {
			mr.playScreen.init();
		});

		$('.ranking-button').off('click').on('click', function () {
			mr.rankingScreen.init();
		});

		$('.global-map-button').off('click').on('click', function () {
			mr.globalMapScreen.init();
		});

		$('.donate-button').off('click').on('click', function () {
			mr.donateScreen.init();
		});

		$('.achivement-button').off('click').on('click', function () {

		});
	}

	return {
		init: function () {

		}
	}
})();