ig.module(
	'plugins.input-trigger'
)
.requires(
	'impact.input'
)
.defines(function() {
	'use strict';

	ig.Input.inject({
		trigger: function( action ) {
			this.actions[action] = true;
			this.presses[action] = true;
			this.delayedKeyup[action] = true;
		}
	});
});
