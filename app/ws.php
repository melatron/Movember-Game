<?php

use Ratchet\Server\IoServer;
use Src\App;
use Ratchet\WebSocket\WsServer;

require_once 'Core/_init.php';

$server = IoServer::factory(new WsServer(new App()), 1337);

$server->run();
