(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;
	var unlockedAchievments;
	var allAchievments = [
	'special-1','special-2','special-3',
	'special-4','special-5','special-6',
	'special-7','special-8','special-9',
	'special-10','special-11','special-12'
	];

	var achievmentMerits = {
		'special-1': 1,
		'special-2': 1,
		'special-3': 1,
		'special-4': 2,
		'special-5': 2,
		'special-6': 2,
		'special-7': 3,
		'special-8': 3,
		'special-9': 3,
		'special-10': 4,
		'special-11': 4,
		'special-12': 4,
		'clicks-50' : 1,
		'clicks-100' : 2,
		'clicks-200': 3,
		'clicks-300': 4
	}

	controller.init = function(scope) {
		unlockedAchievments = JSON.parse(localStorage.getItem('unlockedAchievments')) || [];
	};

	controller.addAchievment = function(achievment){
		for(var i =0;i<unlockedAchievments.length;i++){
			if(achievment === unlockedAchievments[i]){
				return;
			}
		}

		for(var i = 0; i<allAchievments.length;i++){
			if(achievment == allAchievments[i]){
				unlockedAchievments.push(achievment);
			}
		}
	};

	controller.getBonusSeconds = function(){
		var bonusSeconds = 0;

		for(var i = 0;i<unlockedAchievments.length;i++){
			if(achievmentMerits[unlockedAchievments[i]]){
				bonusSeconds += achievmentMerits[unlockedAchievments[i]];
			}
		}

		return bonusSeconds;
	}

	mr.controllers.Achievment = controller;
})();