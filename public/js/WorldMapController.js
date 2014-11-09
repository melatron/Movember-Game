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
		fill: "#ff6700",
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
		flag = false,
		zoomFactor = 3;

	function setWorldMap() {
		for (var nationName in worldMap.shapes) {
			world[nationName] = R.path(worldMap.shapes[nationName]).attr(attr);
		}

		for (var state in world) {
			world[state].color = Raphael.getColor();
			(function (st, state) {
				st[0].style.cursor = "inherit";
				st[0].onmouseover = function (e) {
					currentNation && world[currentNation].animate({ fill: "#ff6700", stroke: "#b62600" }, 500);// && (document.getElementById(current).style.display = "");
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
					st.animate({ fill: "#ffa112", stroke: "#b62600" }, 500);
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
		var maxWidth = $('#paper').width() * zoomFactor - $('.worldmap ').width(),
			maxHeight = $('#paper').height() * zoomFactor - $('.worldmap ').height();

		if (isDragging) {
			$('.nation-tooltip').hide();
			var parentOffset = $('.worldmap').parent().offset();
			var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
			var relativeYPosition = (e.pageY - parentOffset.top);
			//console.log(startingX, startingY);
			var newResX = (parseInt(relativeXPosition) - startingX) + diffX,
				newResY = parseInt(relativeYPosition) - startingY + diffY;
			
			//console.log('x: ' + resX + ' y: ' + resY);
			var constPx = 25,
				flag = newResY > 0 + constPx || newResY < -(maxHeight + constPx) || newResX > 0 + constPx || newResX < -(maxWidth + constPx),
				topF = (newResY > 0 + constPx),
				leftF = (newResX > 0 + constPx),
				bottomF = (newResY < -(maxHeight + constPx)),
				rightF = (newResX < -(maxWidth + constPx));
			//console.log('top: ' + (resY > 0 + constPx));
			//console.log('left: ' + (resX > 0 + constPx));
			//console.log('bottom: ' + (resY < -(maxHeight + constPx)));
			//console.log('right: ' + (resX < -(maxWidth + constPx)));

			//console.log('t: ' + aa + '| d: ' + bb + '| l: ' + cc + '| r: ' + dd);
			if (!flag) {
				resX = (parseInt(relativeXPosition) - startingX) + diffX,
				resY = parseInt(relativeYPosition) - startingY + diffY;
				$('#paper').css({
					top: !topF && !bottomF ? resY : '', 
					left: !leftF && !rightF ? resX : ''
				});
			}
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
			maxWidth = $('#paper').width() * zoomFactor - $('.worldmap ').width(),
			maxHeight = $('#paper').height() * zoomFactor - $('.worldmap ').height();

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
			}, 100);
		}
	}

	function mouseWheelLogic(e) {
		var delta = Math.max(-1, Math.min(1, (e.originalEvent.wheelDelta || -e.originalEvent.detail)));
		console.log(delta);
		if (zoomFactor > 2 && delta < 0) {
			zoomFactor--;
			$('#paper').css({
				'top': '0px',
				'left': '0px'
			});
			resY = 0;
			resX = 0;

			$('#paper').css({
				'transform-origin': '0 0',
				'transform': 'matrix(' + zoomFactor + ', 0, 0, ' + zoomFactor + ', 0, 0)'
			});
			console.log('zoomOut');
		} else if (zoomFactor < 5 && delta > 0) {
			zoomFactor++;
			$('#paper').css({
				'top': '0px',
				'left': '0px'
			});
			resY = 0;
			resX = 0;

			$('#paper').css({
				'transform-origin': '0 0',
				'transform': 'matrix(' + zoomFactor + ', 0, 0, ' + zoomFactor + ', 0, 0)'
			});
			console.log('zoomIn');
		}
	}

	function addEvents() {
		$('svg').off('mousedown').on('mousedown', mouseDownLogic);
		$(document).off('mouseup').on('mouseup', mouseUpLogic);
		$(document).off('mousemove').on('mousemove', mouseMoveLogic);
		$(document).off('mousewheel').on('mousewheel', mouseWheelLogic);
		$('.close-button').off('click').on('click',function(){
			closeWorldMap();
		});
	}

	function removeEvents(){
		$('svg').off('mousedown');
		$(document).off('mouseup');
		$(document).off('mousemove');
		$('.close-button').off('click').on('click', closeWorldMap);
	}

	function closeWorldMap() {
		removeEvents();
		$('.worldmap').animate({
			top: '-550px'
		}, 700);
		mr.fireController('Menu', $('.game-container'));
	}

	controller.init = function () {
		setWorldMap();
	}
	controller.open = function () {
		$('.worldmap').animate({
			top: '0px'
		}, 700);

		addEvents();
	}

	mr.controllers.WorldMap = controller;
})();

$(function () {
	mr.controllers.WorldMap.init();
});