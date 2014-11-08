/*
 * Initialze all the logic in order
 *
 * Dependencies: none
 *
 * @author filip.ganchev, antony.dikov
 * @issued 08.11.2014
 */
$(document).ready(function() {

	// Trigger event when the window is resized
	var timer,
		windowHeight,
		windowWidth;

	$(window).on('resize', function() {
		timer && clearTimeout(timer);

		timer = setTimeout(function() {
			if ($(window).width() != windowWidth || $(window).height() != windowHeight) {
				windowHeight = $(window).height();
				windowWidth = $(window).width();

				$(window).trigger('windowResized');
			}
		}, 200);
	});

	$(window).on('windowResized', function() {
		$('body').css({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}).trigger('windowResized');
	

	$('.screen.play').show();
});