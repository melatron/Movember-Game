var IHLoader;

ig.module(
	'plugins.ih-loader'
)
.requires(
	'impact.loader'
)
.defines(function() {
	'use strict';

	IHLoader = ig.Loader.extend({
		draw: function() {}
	});
});
