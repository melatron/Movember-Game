var MovemberGame;

ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',

	'game.images-buffer',
	'game.pointer-handler',
	'game.entities-events',

	'game.entities.base',

	'plugins.ih-loader',
	'plugins.tooltips',
	'plugins.input-trigger'

	,'impact.debug.debug'
)
.defines(function() {
	'use strict';

	MovemberGame = ig.Game.extend({
		init: function() {
			ig.input.bind(ig.KEY.MOUSE1, 'mouse');

			$(window).on('windowResized', function() {
				ig.game.setDimensions($('body').width(), $('body').height());
			});

			// When leaving with the mouse from the canvas disable bulshit behaviour
			$(ig.system.canvas).on('mouseleave', function() {
				ig.input.mouse.x = -10000;
				ig.input.mouse.y = -10000;
				ig.input.actions['mouse'] = false;
				ig.game.hoveredElement = '';
				ig.game.hoveredElementIndex = 0;
				ig.game.isDragging = false;
				ig.input.trigger('mouse');
			});

			// Propagate mouse down/up cause apparently the browser doesn't give a F
			$(ig.system.canvas).mousedown(function(event) {
				$(document).trigger('mousedown', event);
			});
			$(ig.system.canvas).mouseup(function(event) {
				$(document).trigger('mouseup', event);
			});
		},

		update: function() {
			this.handlePointer();

			this.processHoveredEntity();

			this.parent();

			this.processEntityEvents();

			// Update tooltip
			this.tooltip.update();
		},

		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();

			// Draw tooltip
			this.tooltip.draw();
		},

		// Set the canvas and sys dimensions
		setDimensions: function(width, height) {
			if (typeof width != 'number' && typeof height != 'number') {
				return false;
			}

			$(ig.system.canvas).attr({
				width: width,
				height: height
			});

			ig.system.width = width;
			ig.system.height = height;
			ig.system.realWidth = width;
			ig.system.realHeight = height;
		}
	});

	$(window).trigger('loadedImpact');
});
