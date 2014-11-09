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
		}

		function hideButtons(){
			$('#game-start-ui').animate({
				right: '-260px'
			}, 700);
		}

		function commonButtonActions(){
			allButtons.off('click');
			hideButtons();
		}

		$('#play-button').on('click',function(){
			commonButtonActions();
			mr.fireController('Play', gameWrapper);
		});

		$('#donation-button').on('click',function(){
			commonButtonActions();
			mr.fireController('Donate',gameWrapper);
		});

		$('#map-button').on('click',function(){
			commonButtonActions();
			mr.controllers.WorldMap.open();
		});

		showButtons();

	};

	mr.controllers.Menu = controller;
})();