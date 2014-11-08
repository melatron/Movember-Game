var ws = (function() {
	'use strict';

	try {
		var host = "ws://localhost:5106",
			socket = new WebSocket(host);

		socket.onopen = function(e) {

		};

		socket.onmessage = function(e) {
			var data = $.parseJSON(e.data);

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
