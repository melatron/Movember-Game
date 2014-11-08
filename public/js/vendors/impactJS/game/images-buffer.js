ig.module(
	'game.images-buffer'
)
.requires(
	'impact.image',
	'impact.game'
)
.defines(function() {
	'use strict';

	ig.Image.inject({
		onload: function(event) {
			this.parent(event);

			// Check for actions in the buffer
			var buffer = ig.game.imagesBuffer[this.path];
			if (Array.isArray(buffer)) {
				for (var i = 0; i < buffer.length; i++) {
					buffer[i].image.callback(this, buffer[i].image.params);
				}
				delete ig.game.imagesBuffer[this.path];
			}
		},
	});

	ig.Game.inject({
		imagesBuffer: {},

		getImage: function(path, callback, params) {
			var image = new ig.Image(path);

			if (typeof callback === 'function') {
				if (image.loaded) {
					callback(image, params);
				} else {
					if (!Array.isArray(this.imagesBuffer[path])) {
						this.imagesBuffer[path] = [];
					}

					this.imagesBuffer[path].push({
						'image': {
							'callback': callback,
							'params': params
						}
					});
				}
			}

			return image;
		}
	});
});
