ig.module(
	'game.pointer-handler'
)
.requires(
	'impact.game'
)
.defines(function() {
	'use strict';

	ig.Game.inject({
		draggable: false,

		setPointer: function(type) {
			switch (type) {
				case 'pointer':
					$('#' + ig.system.canvas.id).css('cursor', 'pointer');
					break;
				default:
					$('#' + ig.system.canvas.id).css('cursor', 'default');
			}
		},

		preventClick: function() {
			this.gamePointer.clickX = false;
			this.gamePointer.clickY = false;
		},

		preventHover: function() {
			this.hoveredEntity.prevent = true;
		},

		handlePointer: function() {
			// Handle mouse
			this.gamePointer.clicked = false;

			if (ig.input.pressed('mouse')) {
				this.gamePointer.clickX = ig.input.mouse.x;
				this.gamePointer.clickY = ig.input.mouse.y;
				this.gamePointer.x = ig.input.mouse.x;
				this.gamePointer.y = ig.input.mouse.y;
			}

			if (ig.input.state('mouse') && this.draggable) {
				if (this.gamePointer.x != ig.input.mouse.x || this.gamePointer.y != ig.input.mouse.y) {
					if (!this.isDragging) {
						$(ig.system.canvas).trigger('dragStart');
					}
					this.isDragging = true;
				}

				if (this.isDragging) {
					this.moveCamera(
						this.gamePointer.x - ig.input.mouse.x,
						this.gamePointer.y - ig.input.mouse.y
					);

					this.gamePointer.x = ig.input.mouse.x;
					this.gamePointer.y = ig.input.mouse.y;
				}
			}

			if (ig.input.released('mouse')) {
				if (this.draggable) {
					if (this.isDragging) {
						$(ig.system.canvas).trigger('dragStop');
					}
					this.isDragging = false;
				}

				if (
					this.gamePointer.clickX == this.gamePointer.x &&
					this.gamePointer.clickY == this.gamePointer.y &&
					!this.gamePointer.preventClick
				) {
					this.gamePointer.clicked = true;
				}
			}

			// Handle touch
		},

		moveCamera: function(newPosX, newPosY) {
			var maxCameraX = (this.arenaBounds.x - ig.system.width),
				maxCameraY = (this.arenaBounds.y - ig.system.height);

			// Evaluate the X
			if (this.screen.x + newPosX < this.arenaBounds.offset.x) {
				this.screen.x = this.arenaBounds.offset.x;
			} else if (this.screen.x + newPosX > maxCameraX) {
				this.screen.x = (maxCameraX > 0) ? maxCameraX : this.arenaBounds.offset.x;
			} else {
				this.screen.x += newPosX;
			}

			// Evalute the Y
			if (this.screen.y + newPosY < this.arenaBounds.offset.y) {
				this.screen.y = this.arenaBounds.offset.y;
			} else if (this.screen.y + newPosY > maxCameraY) {
				this.screen.y = (maxCameraY > 0) ? maxCameraY : this.arenaBounds.offset.y;
			} else {
				this.screen.y += newPosY;
			}
		}
	});
});