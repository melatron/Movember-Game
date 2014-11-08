<?php
namespace Controller;

abstract class AbstractController
{
	public function before($result) {}
	public function after($result) {}
}
