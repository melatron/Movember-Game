var BaseEntity;

ig.module(
	'game.entities.base'
)
.requires(
	'impact.entity'
)
.defines(function() {
	'use strict';

	BaseEntity = ig.Entity.extend({
		showShadow: false,
		imageAlpha: 1,
		imageMaxAlpha: 1,
		imageMinAlpha: 0.85,
		imageStepAlpha: 0.02,

		shadowAlpha: 0,
		shadowMaxAlpha: 0.4,
		shadowMinAlpha: 0,
		shadowStepAlpha: 0.02,

		focused: false,
		hovered: false,
		hoverable: true,
		hoverTransparencyCheck: false,
		triggerEvents: false,

		init: function(x, y, settings) {
			this.beforeInit();

			this.addAnim('idle', 1, [0]);
			this.parent(x, y, settings);

			this.afterInit();
		},

		beforeInit: function() {},

		afterInit: function() {},

		update: function() {
			this.parent();

			this.processEvents();
		},

		processEvents: function() {
			if (!ig.game.hoveredEntity.check && ! this.alwaysCheck) {
				return;
			}

			if (ig.game.gamePointer.mouseOut) {
				this.focused = false;
				this.hovered = false;
				return;
			}

			if (!ig.ua.mobile) {
				var mouseX = ig.input.mouse.x;
				var mouseY = ig.input.mouse.y;
			} else {
				var mouseX = ig.game.gamePointer.x;
				var mouseY = ig.game.gamePointer.y;
			}

			this.checkFocus(mouseX, mouseY);

			if (this.hoverable) {
				if (this.focused) {
					this.checkHover(mouseX, mouseY);

					if (this.hovered && ig.game.hoveredEntity.index < this.zIndex) {
						ig.game.setHoveredEntity(this);
					}
				} else {
					this.hovered = false;
				}
			}
		},

		draw: function() {
			if (this.showShadow) {
				this.drawShadow();

				this.imageAlpha -= this.imageStepAlpha;
				this.imageAlpha = Math.max(this.imageAlpha, this.imageMinAlpha);

				this.shadowAlpha += this.shadowStepAlpha;
				this.shadowAlpha = Math.min(this.shadowAlpha, this.shadowMaxAlpha);
			} else {
				this.imageAlpha += this.imageStepAlpha;
				this.imageAlpha = Math.min(this.imageAlpha, this.imageMaxAlpha);

				this.shadowAlpha -= this.shadowStepAlpha;
				this.shadowAlpha = Math.max(this.shadowAlpha, this.shadowMinAlpha);
			}

			this.currentAnim.alpha = this.imageAlpha;

			this.parent();

			if (this.showShadow) {
				this.clearShadow();
			}
		},

		drawShadow: function() {
			ig.system.context.shadowColor = 'rgba(255, 255, 0, '+ this.shadowAlpha +')';
			ig.system.context.shadowOffsetX = 0;
			ig.system.context.shadowOffsetY = -2;
			ig.system.context.shadowBlur = 20;
		},

		clearShadow: function() {
			ig.system.context.shadowColor = 'rgba(0, 0, 0, 0)';
			ig.system.context.shadowOffsetX = 0;
			ig.system.context.shadowOffsetY = 0;
			ig.system.context.shadowBlur = 0;
		},

		mouseDown: function() {
			// use in extended entity
		},

		mouseUp: function() {
			// use in extended entity
		},

		mouseClick: function() {
			// use in extended entity
		},

		mouseIn: function() {
			// use in extended entity
		},

		mouseOut: function() {
			// use in extended entity
		},

		mouseOver: function() {
			// use in extended entity
		},

		checkFocus: function(x, y) {
			var inFocus = (this.pos.x <= (x + ig.game.screen.x)) &&
			((x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
			(this.pos.y <= (y + ig.game.screen.y)) &&
			((y + ig.game.screen.y) <= this.pos.y + this.size.y);

			this.focused = inFocus;

			return inFocus;
		},

		checkHover: function(x, y) {
			if (this.hoverTransparencyCheck) {
				this.hovered = this.checkIsOverImage(x, y);
			} else {
				this.hovered = this.focused;
			}
		},

		checkIsOverImage: function(x, y) {
			var isOverImage = false;

			if (this.hoverOnFocus && this.focused) {
				var isOverImage = true;
			} else {
				var isOverImage = this.imageTransparencyCheck(x, y);
			}

			return isOverImage;
		},

		imageTransparencyCheck: function(pointX, pointY) {
			var isTransparent = false;

			var canvas = ig.game.getVirtualCanvas();

			var context = canvas.getContext('2d');

			var x = pointX - this.pos.x + ig.game.screen.x;
			var y = pointY - this.pos.y + ig.game.screen.y;

			context.drawImage(this.currentAnim.sheet.image.data, x, y, 1, 1, 0, 0, 1, 1);

			try {
				var imgdata = context.getImageData(0, 0, 1, 1);
			} catch(error) {
				return true;
			}

			context.clearRect(0, 0, canvas.width, canvas.height);

			if (
				imgdata.data[0] == 0 &&
				imgdata.data[1] == 0 &&
				imgdata.data[2] == 0 &&
				imgdata.data[3] == 0
			) {
				isTransparent = true;
			}

			return ! isTransparent;
		}
	});
});
