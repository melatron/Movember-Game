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

	$('.game-wrapper .play').show();

	// Fire the play logic
	mr.fireController('Menu', $('.game-wrapper'));
	//Init achievments
	mr.fireController('Achievment', $('.game-wrapper'));

	mr.music = new PlayList();
	mr.music.startMainMusic();
	//$(document).off('click').on('click', function () {
	//	mr.music.click();
	//})
	
});