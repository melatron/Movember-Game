<?php
use Core\Application;
use Core\Request;

require_once '../Core/_init.php';

$route = Request::getInstance();
$app = Application::getInstance($route->getProperty('route'));
$app->run();
