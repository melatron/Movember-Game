/*
 * Initialze all the logic in order
 *
 * Dependencies: none
 *
 * @author filip.ganchev, antony.dikov
 * @issued 08.11.2014
 */
$(document).ready(function() {
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

	// Impact Stuff ATM
	var gameWidth = $('body').width(),
		gameHeight = $('body').height();

	if (typeof(MovemberGame) != 'undefined') {
		ig.main('#mr-game', MovemberGame, 30, gameWidth, gameHeight, 1, IHLoader);
	} else {
		$(window).on('loadedImpact', function() {
			ig.main('#mr-game', MovemberGame, 30, gameWidth, gameHeight, 1, IHLoader);
		});
	}
});