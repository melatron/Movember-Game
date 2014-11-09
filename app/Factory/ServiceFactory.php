<?php
namespace Factory;

class ServiceFactory
{
	public static function create($name)
	{
		$service = 'Service\\' . ucfirst($name) . 'Service';

		if (class_exists($service)) {
			return new $service();
		}
	}
}

?>
