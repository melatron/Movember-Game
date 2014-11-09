/*
 * Handles all the logic while manning up
 *
 * @author: antony.dikov
 * @issued 08.11.2014
 */
function PlayList() {
	var questSounds = //preloader.returnQuestMusicArrayCopy(),
		mainSounds = [new Audio('sounds/MainSound.mp3')],
		currentMainSongIndex = 0;

	this.startMainMusic = function () {
		currentMainSongIndex = Math.floor((Math.random() * (mainSounds.length - 1)));
		mainSounds[currentMainSongIndex].play();
	};
	this.startMusicByQuest = function (quest) {
		mainSounds[currentMainSongIndex].pause();
		setTimeout(function () {
			switch (quest) {
				case "castle":
					questSounds[0].load();
					questSounds[0].loop = true;
					questSounds[0].play();
					break;
				case "dragon":
					questSounds[1].load();
					questSounds[1].loop = true;
					questSounds[1].play();
					break;
				default:
					break;
			};
		}, 1000);
	};
	this.resumeMainMusic = function () {
		for (var i = 0; i < questSounds.length; i++) {
			if (!questSounds[i].ended) {
				questSounds[i].pause();
			}
		}
		setTimeout(function () {
			mainSounds[currentMainSongIndex].load();
			mainSounds[currentMainSongIndex].play();
		}, 1000);
	};
	this.startNextSong = function () {
		if (mainSounds[currentMainSongIndex].ended && currentMainSongIndex + 1 < mainSounds.length) {
			currentMainSongIndex++;
			mainSounds[currentMainSongIndex].play();
		}
		else if (mainSounds[currentMainSongIndex].ended) {
			currentMainSongIndex = 0;
			mainSounds[currentMainSongIndex].play();
		}
	};
	this.pauseMainMusic = function () {
		mainSounds[currentMainSongIndex].pause();
	};
	this.pauseQuestMusic = function (quest) {
		switch (quest) {
			case "castle":
				questSounds[0].pause();
				break;
			case "dragon":
				questSounds[1].pause();
				break;
			default:
				break;
		}
	};
	this.loadSound = function (url) {
		var temp = new Audio();
		temp.src = url;

		return temp;
	};
}