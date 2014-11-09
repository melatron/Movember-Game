var ws = (function() {
	'use strict';

	try {
//		var host = "ws://54.93.196.194:1337",
		var host = "ws://realm44.imperiaonline.org:1337",
			socket = new WebSocket(host);

		socket.onopen = function(e) {

		};

		socket.onmessage = function(e) {
			var data = $.parseJSON(e.data);
			if(data.type == 'connect') {
				var all = data.all;
				mr.controllers.WorldMap.init(all);
			}
		};

		socket.onclose = function() {

		};

		$.event.trigger({
			type: "wsConnect",
			socket: socket
		});

	} catch(e) {
		alert('<p>Error' + e);
	}

	return socket;
})();
