<?php

use Ratchet\Server\IoServer;
use Src\App;
use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;

require_once 'Core/_init.php';

$server = IoServer::factory(
	new HttpServer(
		new WsServer(
			new App()
		)
	),
	1337
);

$server->run();
