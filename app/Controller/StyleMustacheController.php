<?php
namespace Controller;

use Persistence\UserRepository;
use Persistence\MongoAdapter;

class StyleMustacheController extends AbstractController
{
	public function win($params, $from, $clients)
	{
		$mongo = new \MongoClient('mongodb://localhost/movember');
		$db = $mongo->selectDb('movember');
		$collection = new \MongoCollection($db, 'users');
		$criteria = ['userId' => 1];
		$user = iterator_to_array($collection->find($criteria));
		$user = array_pop($user);
		$mustache = ($user['currMustache'] < $params['mustacheNum'] ? $params['mustacheNum'] : $user['currMustache']);

		$collection->update($criteria, ['$set' => ['points' => $user['points'] + $params['points'], 'currMustache' => $mustache]]);
	}
}
