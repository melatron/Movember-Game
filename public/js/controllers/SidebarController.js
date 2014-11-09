(function() {
	'use strict';
	var controller = new mr.controllers.BaseController;
	var newsInterval;
	var newsStrings = [
	'Growing the stache has never been easier than with bear hormones. Warning: Might kill non-bears',
	'Man with weird moustache kindly asked to support different cause',
	'Some women have taken up Movember. Divorce rates skyrocket.',
	'Schwarzenegger and Stalone\'s total moustache mass almost reaches Chuck Norris\' stubble',
	'Moustache extensions; Fad or here to stay?',
	'First Panda with a moustache discovered in the East. Celebrity auction for it\'s pelt this Tuesday',
	'Confused, bearded australian accidentally cures ebola instead of cancer',
	'Hair based experiments have led to the creation of a mind-controlling monste- ALL HAIL MUSTACHO',
	'Five things you might find in your moustache, and five reasons not to eat them.',
	'Moustache style debate between friends leads to civil war in Brazil.',
	'Man who shaved on November 2nd was shunned by his friends and laughed at by his wife. Serves him right.',
	'Buy Pepsi today! Oh and something, something moustache.',
	'What happens to all the donated facial hair? Channel 8 News digs deep into this mystery',
	'Desperate man from Cuba is standing on the ledge of a ten story building, threatening to shave himself.',
	'Crisis in Japan as supplies of the new beard lipstick dwindle.',
	'Watch this video of a cute duck!...it\'s a slow news day',
	'Facial hair: Who wore it better? Pirates or Vikings?',
	'"It\'s as if I\'m broken" - Tragic tale of a man with just the left side of his moustache',
	'Was Jesus\' beard a miracle? We think so. Watch the full report tonight at ten',
	'"Women are more attracted to guys with facial hair" - hopeful guy with facial hair',
	'"Beauty and the beast" is the number one ranked inspirational Movember movie',
	''
	];
	var arrayCopy = [];

	function showSidebar(){
			$('#sidebar').animate({
				right: '0%'
			},1000);
		}

	function hideSidebar(){
		$('#sidebar').animate({
			right: '-40%'
		},1000);
	}

	function addNewsPost(){
		var index = Math.floor(Math.random() * arrayCopy.length);
		var newsPost = arrayCopy.splice(index,1);
		var element = $('#news-box');
		$('<div class="news-post">'+ newsPost +'</div>')
		.prependTo(element)
		.animate({
			opacity: 1
		},300);

		if(arrayCopy.length == 0){
			clearInterval(newsInterval);
		}
	}

	controller.init = function(scope) {
		arrayCopy = newsStrings.splice(0);

		newsInterval = setInterval(function(){addNewsPost(arrayCopy)},6000);

		$('#news-box').empty();
		showSidebar();
	};

	controller.stop = function(){
		clearInterval(newsInterval);
	}

	mr.controllers.Sidebar = controller;
})();