<?php
namespace Controller;

abstract class AbstractController
{
	private static $controllers = array();

	public static function make($controller)
	{
		$controller = 'Controller\\' .  $controller . 'Controller';

		if (! isset(self::$controllers[$controller])) {
			self::$controllers[$controller] = new $controller();
		}

		return self::$controllers[$controller];
	}

	public function before($result) {}
	public function after($result) {}
}
