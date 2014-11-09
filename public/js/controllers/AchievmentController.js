(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;
	var unlockedAchievments;
	var allAchievments = [
	'special-1','special-2','special-3',
	'special-4','special-5','special-6',
	'special-7','special-8','special-9',
	'special-10','special-11','special-12',
	'clicks-50','clicks-100','clicks-200','clicks-300'
	];

	function Achievment(merit,name){
		this.merit = merit;
		this.name = name;
	}

	var achievmentMerits = {
		'special-1': new Achievment(1,'Amateur gent'),
		'special-2': new Achievment(1,'Barber\'s apprentice'),
		'special-3': new Achievment(1,'Not too shaggy'),
		'special-4': new Achievment(2,'Growing strong'),
		'special-5': new Achievment(2,'Follicle fury'),
		'special-6': new Achievment(2,'Rising star'),
		'special-7': new Achievment(3,'Scissor-san'),
		'special-8': new Achievment(3,'Gel master'),
		'special-9': new Achievment(3,'Barbershop pro'),
		'special-10': new Achievment(4,'Hair incarnate'),
		'special-11': new Achievment(4,'Beardbender'),
		'special-12': new Achievment(4,'The God of moustaches'),
		'clicks-50' : new Achievment(1,'Clicky'),
		'clicks-100' : new Achievment(2,'Fast clicker'),
		'clicks-200': new Achievment(3,'Hyper clicker'),
		'clicks-300': new Achievment(4,'Nothing left to learn'),
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
				$('#achievment-box')
				.text(achievmentMerits[achievment].name)
				.fadeIn(function(){
					setTimeout(function(){
						$('#achievment-box').fadeOut(300);
					},2000);
				},300);
				localStorage.setItem('unlockedAchievments',JSON.stringify(unlockedAchievments));
			}
		}


	};

	controller.getBonusSeconds = function(){
		var bonusSeconds = 0;

		for(var i = 0;i<unlockedAchievments.length;i++){
			if(achievmentMerits[unlockedAchievments[i]]){
				bonusSeconds += achievmentMerits[unlockedAchievments[i]].merit;
			}
		}

		return bonusSeconds;
	}

	mr.controllers.Achievment = controller;
})();