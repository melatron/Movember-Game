/*
 * Handles all the logic while manning up
 *
 * @author: antony.dikov
 * @issued 08.11.2014
 */
(function () {
	'use strict';
	var controller = new mr.controllers.BaseController;
	var R = Raphael("paper", 1000, 500);
	var attr = {
		fill: "#333",
		stroke: "#b62600",
		"stroke-width": 0.5,
		"stroke-linejoin": "round"
	};
	var world = {};
	var lastHoveredNation = '';
	var currentNation = '';


	var isDragging = false,
		startingX = 0,
		startingY = 0,
		resY = 0,
		resX = 0,
		diffX = 0,
		diffY = 0,
		flag = false;

	function setWorldMap() {
		for (var nationName in worldMap.shapes) {
			world[nationName] = R.path(worldMap.shapes[nationName]).attr(attr);
		}

		for (var state in world) {
			world[state].color = Raphael.getColor();
			(function (st, state) {
				st[0].style.cursor = "pointer";
				st[0].onmouseover = function (e) {
					currentNation && world[currentNation].animate({ fill: "#333", stroke: "#b62600" }, 500);// && (document.getElementById(current).style.display = "");
					st.animate({ fill: st.color, stroke: "#ccc" }, 500);
					st.toFront();
					R.safari();
					// Logic for the popUp here:
					currentNation = state;
					//if (currentNation != lastHoveredNation) {
					$('.nation-tooltip').show()
						.find('.country-name').text(worldMap.names[state]);
						//.find('.country-top-contributor').text(worldMap.fromServer[state].topContributor || 'None')
						//.find('.country-moustache-image').append('<img src=' + worldMap.fromServer[state].moustache || 'No Image' + '>');
					//console.log(worldMap.names[state]);
					//lastHoveredNation = currentNation;
					//}

				};
				st[0].onmouseout = function () {
					$('.nation-tooltip').hide();
					st.animate({ fill: "#333", stroke: "#b62600" }, 500);
					st.toFront();
					R.safari();
				};

				st[0].onmousemove = function (event) {
					if (!isDragging) {
						$('.nation-tooltip').position({
							my: "left+20 bottom-3",
							of: event,
							collision: "fit"
						});
					}
				}
			})(world[state], state);
		}
	}

	function mouseDownLogic(e) {
		isDragging = true;
		flag = true;
		console.log(isDragging + ' down:', e);

		var parentOffset = $('.worldmap').parent().offset();
		var relativeXPosition = (parseInt(e.pageX) - parseInt(parentOffset.left)); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
		var relativeYPosition = (parseInt(e.pageY) - parseInt(parentOffset.top));
		//console.log(relativeXPosition, relativeYPosition);
		startingX = relativeXPosition;
		startingY = relativeYPosition;
	}

	function mouseMoveLogic(e) {
		if (isDragging) {
			$('.nation-tooltip').hide();
			var parentOffset = $('.worldmap').parent().offset();
			var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
			var relativeYPosition = (e.pageY - parentOffset.top);
			console.log(startingX, startingY);

			resX = (parseInt(relativeXPosition) - startingX) + diffX,
			resY = parseInt(relativeYPosition) - startingY + diffY;
			//console.log('x: ' + resX + ' y: ' + resY);

				$('#paper').css({
					top: + resY,
					left: + resX
				});

				
		}
		
	}

	function mouseUpLogic(e) {
		isDragging = false;
		flag = false;
		diffX = resX;
		diffY = resY;

		var topEnd = 0,
			leftEnd = 0,
			changeTop = false,
			changeLeft = false,
			maxWidth = $('#paper').width() * 3 - $('.worldmap ').width(),
			maxHeight = $('#paper').height() * 3 - $('.worldmap ').height();

		if (diffY > 0) {
			topEnd = 0;
			diffY = 0;
			changeTop = true;
		} else if (diffY < -maxHeight) {
			topEnd = -maxHeight;
			diffY = -maxHeight;
			changeTop = true;
		} else {
			topEnd = diffY;
		}

		if (diffX > 0) {
			leftEnd = 0;
			diffX = 0;
			changeLeft = true;
		} else if (diffX < -maxWidth) {
			leftEnd = -maxWidth;
			diffX = -maxWidth;
			changeLeft = true;
		} else {
			leftEnd = diffX
		}

		if (changeLeft || changeTop) {
			$('#paper').animate({
				top: topEnd,
				left: leftEnd
			}, 200);
		}
	}
	function addEvents() {
		$('svg').on('mousedown', mouseDownLogic);
		$(document).on('mouseup', mouseUpLogic);
		$(document).on('mousemove', mouseMoveLogic);
	}
	
	//$('body').tooltip({
	//	items: '[data-tooltip]',
	//	track: true,
	//	content: function () {
	//		return 'kakvo stava baby';
	//	},
	//	tooltipClass: 'item-tooltip',
	//	show: {
	//		delay: 600
	//	}
	//});

	controller.init =  function () {
		setWorldMap();
		addEvents();
	}

	mr.controllers.WorldMap = controller;
})();

$(function () {
	mr.controllers.WorldMap.init();
});