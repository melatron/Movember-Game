<?php
namespace Persistence;

class RankingRepository extends AbstractMongoRepository
{

	public function setOptions()
	{
		return array(
			'collectionName' => 'users',
			'dbName' => 'movember',
			'dbHost' => 'localhost',
		);
	}

	public function getRanking()
	{
		$pipeline = array(
			array('$group' => array('country' => '$country', 'score' => array('$sum' => '$score'))),
			array('$match' => array('score' => array('$gte' => 10)))
		);
		return $this->aggregate($pipeline);
	}
}

?>
