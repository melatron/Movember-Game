<?php
require_once '../app/Core/_init.php';
require_once app_dir . 'Bootstrap/autoload.php';
require_once '../app/Support/helpers.php';
require_once app_dir . '/Bootstrap/run.php';
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />

		<title>Moustache</title>
		<meta name="description" content="SOON" />
		<meta name="author" content="Bropundzel" />

		<!-- CSS -->
		<link rel="stylesheet" href="css/vendors/normalize.min.css" />
		<link rel="stylesheet" href="css/core/common.css" />
		<link rel="stylesheet" href="css/main.css" />
		<link rel="stylesheet" href="css/game.css" />
		<link rel="stylesheet" href="css/worldmap.css" />

		<link rel="shortcut icon" href="images/favicon.png" />
	</head>
	<body>
		<!-- START GAME -->
		<div class="game-wrapper no-select">
			<!-- START PLAY SCREEN -->
			<div id="main-game-screen">
				<div class="game-section">
					<div class="player">
						<div class="moustache"></div>
					</div>
					<div class="volume">0</div>
					<div class="counter">0</div>
				</div>
				<div id="game-start-ui">
					<button class="big-button">Play</button>
					<button class="big-button">Donate</button>
					<button class="big-button">World Map</button>
				</div>
			</div>
			<!-- END PLAY SCREEN -->

			<!-- START WORLD MAP -->
			<div class="worldmap ui-hide">
				<div id="paper"></div>
			</div>
			<!-- END WORLD MAP -->
		</div>
		<!-- END GAME SCREEN -->

		<!-- VENDORS -->
		<script src="js/vendors/jquery-2.1.1.js"></script>
		<script src="js/vendors/raphael-min.js"></script>
		<!-- CORE -->
		<script src="js/core/mr.js"></script>
		<!-- CONTROLLERS -->
		<script src="js/controllers/BaseController.js"></script>
		<script src="js/controllers/PlayController.js"></script>

		<script src="js/world.js"></script>
		<script src="js/WorldMapController.js"></script>
		<script src="js/TimeCountdownClass.js"></script>
		<!-- INIT -->
		<script src="js/core/bootstrap.js"></script>


	</body>
</html>
