var worldMapController = (function(){
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
					currentNation && world[currentNation].animate({ fill: "#ff6700", stroke: "#b62600" }, 500);// && (document.getElementById(current).style.display = "");
					st.animate({ fill: st.color, stroke: "#ccc" }, 500);
					st.toFront();
					R.safari();
					// Logic for the popUp here:
					currentNation = state;
					//if (currentNation != lastHoveredNation) {
					$('.nation-tooltip').show();
					//lastHoveredNation = currentNation;
					//}

				};
				st[0].onmouseout = function () {
					$('.nation-tooltip').hide();
					st.animate({ fill: "#ffa112", stroke: "#b62600" }, 500);
					st.toFront();
					R.safari();
				};

				st[0].onmousemove = function (e) {
					//if ($('.nation-tooltip').is(':visible')) {
					if (!isDragging) {
						console.log('mestim seeee');
						$('.nation-tooltip').position({
							my: "left+20 bottom-3",
							of: e,
							collision: "fit"
						});
					} {
						//$('.nation-tooltip').hide();
					}
					//}
					//console.log('mesteneto e qko neshto');
				}
				//console.log('59', st[0]);
				//if (state == "AF") { Hovering your country !!!;
				//	st[0].onmouseover();
				//}
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
			changeLeft = false;

		if (diffY > 0) {
			topEnd = 0;
			diffY = 0;
			changeTop = true;
		} else if (diffY < -650) {
			topEnd = -650;
			diffY = -650;
			changeTop = true;
		} else {
			topEnd = diffY;
		}

		if (diffX > 0) {
			leftEnd = 0;
			diffX = 0;
			changeLeft = true;
		} else if(diffX < -2230) {
			leftEnd = -2230;
			diffX = -2230;
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
		$('svg').off('mousedown').on('mousedown', mouseDownLogic);
		$(document).off('mouseup').on('mouseup', mouseUpLogic);
		$(document).off('mousemove').on('mousemove', mouseMoveLogic);
		$('.close-button').off('click').on('click',function(){
			closeWorldMap();
		});
	}

	function removeEvents(){
		$('svg').off('mousedown');
		$(document).off('mouseup');
		$(document).off('mousemove');
		$('.close-button').off('click');
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

	function openWorldMap(){
		$('.worldmap').animate({
			top: '0px'
		},700);

		addEvents();
	}

	function closeWorldMap(){
		removeEvents();
		$('.worldmap').animate({
			top: '-550px'
		},700);
		mr.fireController('Menu',$('.game-container'));
	}

	return {
		init: function () {
			setWorldMap();
		},
		open: openWorldMap
	}
})();

$(function () {
	worldMapController.init();
});