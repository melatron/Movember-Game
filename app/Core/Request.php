<?php
namespace Core;

class Request
{
	protected
	$host,
	$url,
	$baseUrl,
	$route;

	/*
	 * Singleton instance of the request
	*/
	private static $instance;

	private function __construct()
	{
		$this->host = 'http' . (isset($_SERVER['HTTPS']) ? 's' : '') . '://' . $_SERVER['HTTP_HOST'];

		$this->url = $this->host . $_SERVER['REQUEST_URI'];
		$this->baseUrl = preg_replace_callback('/(?:.*public\/)(.*)/', function($matches) {
			$replace = preg_quote($matches[1]);
			return preg_replace('#' . $replace . '#', '', $matches[0]);
		}, $this->url);
		$route = parse_url($_SERVER['REQUEST_URI'])["path"];
		$this->route = substr($route, strpos($route, "public/") + 7);
	}

	public static function getInstance()
	{
		if (!isset(self::$instance)) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function getProperty($var)
	{
		if(in_array($var, array_keys(get_class_vars(__CLASS__)))) {
			return self::getInstance()->$var;
		}
	}
}

?>
