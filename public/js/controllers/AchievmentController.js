(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;
	
	var unlockedAchievments;

	controller.init = function(scope) {
		
	};

	controller.stop = function(){
		clearInterval(newsInterval);
	}

	mr.controllers.Achievment = controller;
})();