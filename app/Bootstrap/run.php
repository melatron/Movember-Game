<?php
use Core\Application;
use Core\Request;

$route = Request::getInstance();
$app = Application::getInstance($route->getProperty('route'));
$app->run();
