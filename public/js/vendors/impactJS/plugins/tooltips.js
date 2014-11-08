ig.module(
	'plugins.tooltips'
)
.requires(
	'impact.game'
)
.defines(function() {
	'use strict';

	ig.Game.inject({
		tooltip: {
			status: false,
			icon: '',
			title: '',
			content: '',
			params: {},
			follow: true,
			followId: 0,
			x: 0,
			y: 0,
			timer: new ig.Timer(),
			delay: 0.6,
			bgAlpha: 0,
			bgAlphaStep: 0.06,
			txtSize: 13,
			txtColor: '#333333',
			txtWidth: 0,
			txtHeight: 0,
			txtLines: 0,
			titleHeight: 33,
			shadowColor: '#2E2C2C',

			draw: function() {
				if (this.status) {
					// Font
					ig.system.context.font = this.txtSize + 'px Trebuchet MS';

					// Background color
					ig.system.context.fillStyle = 'rgba(238, 238, 238, ' + this.bgAlpha +')';

					// Shadow
					ig.system.context.shadowColor = this.shadowColor;
					ig.system.context.shadowOffsetX = 0;
					ig.system.context.shadowOffsetY = 2;
					ig.system.context.shadowBlur = 7;

					// Positions
					var posX = (this.follow) ? ig.input.mouse.x : this.x;
					var posY = (this.follow) ? ig.input.mouse.y + 17 : this.y;

					// Draw box
					ig.system.context.fillRect(
						posX,
						posY,
						this.txtWidth + 20,
						this.txtHeight
					);

					// Clear Shadow
					ig.system.context.shadowOffsetX = 0;
					ig.system.context.shadowOffsetY = 0;
					ig.system.context.shadowBlur = 0;

					// Draw Text
					ig.system.context.fillStyle = this.txtColor;
					for (var i = 1; i <= this.txtLines.length; i++) {
						posY += 17;
						ig.system.context.fillText(
							this.txtLines[i-1].trim(),
							posX + 10,
							posY
						);
					}
				}
			},

			update: function() {
				if (this.content && ! ig.game.isDragging) {
					if (this.delay > 0 && this.timer.delta() < this.delay) {
						this.status = false;
					} else if (this.follow == false && (this.x != ig.input.mouse.x || this.y != ig.input.mouse.y)) {
						this.status = false;
					} else {
						this.status = true;

						this.bgAlpha += this.bgAlphaStep;
						this.bgAlpha = Math.min(this.bgAlpha, 0.7);
					}
				} else {
					this.status = false;
				}
			},

			show: function(params) {
				if (this.params.content == params.content) {
					return;
				}

				// Check for params
				if (typeof params == 'undefined') {
					return;
				}

				if (typeof params.icon != 'undefined') {
					this.icon = params.icon;
				}

				if (typeof params.title != 'undefined') {
					this.title = params.title;
				}

				this.content = params.content.replace(/<br\/>/g, '\n');
				this.content = this.content.replace(/\n+$/, '');

				// Check for preset positions
				if (typeof params.x == 'number' && typeof params.y == 'number') {
					this.x = params.x;
					this.y = params.y;
					this.follow = false;
				} else {
					this.follow = true;
				}

				this.followId = 0;
				if (typeof params.followId != 'undefined') {
					this.followId = params.followId;
				}

				if (typeof params.delay != 'undefined') {
					this.delay = params.delay;
				}

				// Text size
				this.txtLines = this.content.split('\n');
				ig.system.context.font = this.txtSize + 'px Georgia';

				// Loop trough all lines
				var txtLines = [];
				var txtLineWidth = 0;

				for (var i = 0; i < this.txtLines.length; i++) {
					var lineLength = ig.system.context.measureText(this.txtLines[i]);
					if (typeof params.maxWidth != 'undefined') {
						// Loop trough all the words in the line
						var words = this.txtLines[i].split(' ');
						var line = '';

						for (var n = 0; n < words.length; n++) {
							var testLine = line + words[n];
							var testLineLength = ig.system.context.measureText(testLine).width;
							line = testLine + ' ';

							txtLineWidth = Math.max(testLineLength, txtLineWidth);

							if (testLineLength >= params.maxWidth) {
								txtLines.push(testLine);
								this.txtLines[i] = this.txtLines[i].replace(testLine, '');
								line = '';
							}
						}

						txtLines.push(this.txtLines[i]);
					} else {
						var testLineLength = ig.system.context.measureText(this.txtLines[i]).width;

						txtLineWidth = Math.max(testLineLength, txtLineWidth);
						txtLines.push(this.txtLines[i]);
					}
				}

				this.txtLines = txtLines;
				this.txtWidth = txtLineWidth;
				this.txtHeight = 8 + (17 * this.txtLines.length);
				this.params = params;
				// Delay
				this.timer.reset();
			},

			hide: function() {
				this.bgAlpha = 0;
				this.content = '';
				this.params = {};
			}
		}
	});
});
