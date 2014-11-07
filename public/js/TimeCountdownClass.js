mr.Countdown = function Countdown(options) {
	var timer,
		instance = this,
		seconds = parseInt(options.seconds) * 1000 || 10000,
		updateStatus = options.onUpdateStatus || function () { },
		counterEnd = options.onCounterEnd || function () { },
		last = 0,
		starter = 0;

	function decrementCounter() {
		var now = seconds - (new Date().getTime() - starter),
			currentSeconds = parseInt(now / 1000);

		if (now <= 0) {
			counterEnd();
			instance.stop();
		}
		else if (currentSeconds != last) {
			var hours = parseInt(currentSeconds / 3600) < 10 ? '0' + parseInt(currentSeconds / 3600) : parseInt(currentSeconds / 3600),
				minutes = parseInt(currentSeconds / 60) % 60 < 10 ? '0' + parseInt(currentSeconds / 60) % 60 : parseInt(currentSeconds / 60) % 60,
				secondZ = parseInt(currentSeconds) % 60 < 10 ? '0' + parseInt(currentSeconds) % 60 : parseInt(currentSeconds) % 60;

			updateStatus(now, hours + ': ' + minutes + ': ' + secondZ, instance);
			last = currentSeconds;
		}
	}

	this.start = function () {
		clearInterval(timer);
		starter = new Date().getTime();
		timer = setInterval(decrementCounter, 100);
	};

	this.stop = function () {
		clearInterval(timer);
	};
};