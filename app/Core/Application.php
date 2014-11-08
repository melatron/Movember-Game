<?php
namespace Core;

use Controller\AbstractAjaxController;
use Core\Exception\ApplicationException;

class Application
{
	protected $method;
	protected $route;
	protected $controller;

	private static $instance;

	private function __construct($route)
	{
		$this->resolveController($route);
		$this->route = $route;
	}

	private function resolveController($route, $params = null)
	{
		$route = explode('@', $route);

		if (empty($route) || count($route) < 2) {
			throw new ApplicationException('Invalid route.');
		}

		$this->controller = ucfirst($route[0]);
		$this->method = $route[1];
	}

	public static function getInstance($route = null)
	{
		if (! isset(self::$instance)) {
			self::$instance = new self($route);
		}

		return self::$instance;
	}

	public function run($params = null)
	{
		$this->execController($this->controller, $this->method, $params);
	}

	private function execController($controller, $method, $params = null)
	{
		$controllerName = 'Controller\\' . $this->controller . 'Controller';

		if (! class_exists($controllerName)) {
			$message = "The controller class {$controllerName} does not exist.";
			throw new ApplicationException($message);
		}

		$controller = new $controllerName();

		if (! $controller instanceof AbstractAjaxController) {
			throw new ApplicationException('Controller must be an instance of AbstractAjaxController');
		}

		if (! method_exists($controller, $method)) {
			$message = 'The controller class ' . $this->controller . ' does not have a method ' . $method;
			throw new ApplicationException($message);
		}

		return $result = $controller->$method($params);
	}
}

?>
