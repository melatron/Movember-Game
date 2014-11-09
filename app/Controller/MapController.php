<?php
namespace Controller;

use Persistence\UserRepository;
class MapController extends AbstractController
{
	public function test($params, $from, $clients)
	{
		$repo = new UserRepository();
		$repo->insertElement(array('a' => 1));
	}
}
