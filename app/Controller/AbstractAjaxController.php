<?php
namespace Controller;

abstract class AbstractAjaxController
{
	protected static $before = array(),
					$after = array();

	public function before($result) {}
	public function after($result) {}
}

?>
