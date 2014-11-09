<?php
namespace Controller;

use Persistence\UserRepository;

class StyleMustacheController extends AbstractController
{
	public function win($params, $from, $clients)
	{
		$repo = new UserRepository();
		$repo->insertElement(['a' => 346457]);
	}
}
