ig.module(
	'game.entities-events'
)
.requires(
	'impact.game',
	'impact.input'
)
.defines(function() {
	'use strict';

	ig.Input.inject({
		trigger: function(action) {
			this.actions[action] = true;
			this.presses[action] = true;
			this.delayedKeyup[action] = true;
		}
	});

	ig.Game.inject({
		gamePointer: {
			x: 0,
			y: 0
		},

		hoveredEntity: {
			name: '',
			index: 0,
			last: {
				name: '',
				index: 0
			},
			check: true,
			x: 0,
			y: 0
		},

		virtualCanvasContainer: false,

		processHoveredEntity: function() {
			if (! ig.ua.mobile) {
				var mouseX = ig.input.mouse.x;
				var mouseY = ig.input.mouse.y;
			} else {
				var mouseX = ig.game.gamePointer.x;
				var mouseY = ig.game.gamePointer.y;
			}

			this.hoveredEntity.prevent = false;
			this.hoveredEntity.last.name = this.hoveredEntity.name;
			this.hoveredEntity.last.index = this.hoveredEntity.index;

			if (this.hoveredEntity.x == mouseX && this.hoveredEntity.y == mouseY) {
				this.hoveredEntity.check = false;
			} else {
				this.hoveredEntity.name = '';
				this.hoveredEntity.index = 0;
				this.hoveredEntity.x = mouseX;
				this.hoveredEntity.y = mouseY;
				this.hoveredEntity.check = true;
			}
		},

		processEntityEvents: function() {
			if (this.hoveredEntity.prevent) {
				this.hoveredEntity.name = '';
				this.hoveredEntity.index = 0;
			}

			// Trigger mouseOut
			if (this.hoveredEntity.last.name != '' && this.hoveredEntity.name != this.hoveredEntity.last.name) {
				var entity = this.getEntityByName(this.hoveredEntity.last.name);
				if (typeof entity != 'undefined') {
					entity.mouseOut();
				}
			}

			// Trigger mouseIn
			if (this.hoveredEntity.name != '' && this.hoveredEntity.name != this.hoveredEntity.last.name) {
				var entity = this.getEntityByName(this.hoveredEntity.name);
				if (typeof entity != 'undefined') {
					entity.mouseIn();
				}
			}

			// Trigger mouseOver
			if (this.hoveredEntity.name != '') {
				var entity = this.getEntityByName(this.hoveredEntity.name);
				if (typeof entity != 'undefined') {
					entity.mouseOver();
				}

				// Trigger mouseClick
				if (typeof entity != 'undefined' && this.gamePointer.clicked) {
					entity.mouseClick();
				}
			}
		},

		setHoveredEntity: function(entity) {
			if (! ig.ua.mobile) {
				var mouseX = ig.input.mouse.x;
				var mouseY = ig.input.mouse.y;
			} else {
				var mouseX = ig.game.gamePointer.x;
				var mouseY = ig.game.gamePointer.y;
			}

			this.hoveredEntity.name = entity.name;
			this.hoveredEntity.index = entity.zIndex;
			this.hoveredEntity.x = mouseX;
			this.hoveredEntity.y = mouseY;
		},

		getVirtualCanvas: function() {
			if (!this.virtualCanvasContainer) {
				this.virtualCanvasContainer = document.createElement('canvas');
				this.virtualCanvasContainer.width  = 1;
				this.virtualCanvasContainer.height = 1;
			}

			return this.virtualCanvasContainer;
		}
	});
});