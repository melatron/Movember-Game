(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;

	controller.init = function(scope) {
		var allButtons = $('.big-button');
		var gameWrapper = $('.game-wrapper');

		function showButtons(){
			$('#game-start-ui').animate({
				right: '20px'
			}, 700);

			$('#movember-rain-logo').animate({
				top: '20px'
			},1000);

			$('#sidebar').animate({
				right: '-40%'
			},1000);
		}

		function hideButtons(){
			$('#game-start-ui').animate({
				right: '-260px'
			}, 700);

			$('#movember-rain-logo').animate({
				top: '-200px'
			},1000);
		}

		function commonButtonActions(){
			allButtons.off('click');
			hideButtons();
		}

		$('#play-button').on('click', function () {
			mr.music.click();
			commonButtonActions();
			mr.fireController('Play', gameWrapper);
			mr.fireController('Sidebar',gameWrapper);
		});

		$('#donation-button').on('click', function () {
			mr.music.click();
			commonButtonActions();
			mr.fireController('Donate',gameWrapper);
		});

		$('#map-button').on('click', function () {
			mr.music.click();
			commonButtonActions();
			mr.controllers.WorldMap.open();
		});

		showButtons();

	};

	mr.controllers.Menu = controller;
})();