/*
 * Base controller which instantiate
 *
 * @author filip.ganchev
 * @issued 08.11.2014
 */
(function() {
	'use strict';

	mr.controllers.BaseController = function() {};

	mr.controllers.BaseController.prototype.fire = function(scope) {
		this.init(scope);
	};
})();