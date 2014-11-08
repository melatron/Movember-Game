(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;

	controller.init = function(scope) {

		$('#donate-open').on('click',function(){
			window.open('http://uk.movember.com/donate');
		});

		$('#donation-window').animate({
			right: '50px'
		},700);

		$('.close-button').off('click').on('click',function(){
			$(this).off('click');
			$('#donation-window').animate({
			right: '-260px'
		},700);
			mr.fireController('Menu',$('.game-container'));
		});
	};

	mr.controllers.Donate = controller;
})();