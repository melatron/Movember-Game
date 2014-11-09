<?php
namespace Persistence;

class UserRepository extends AbstractMongoRepository
{

	public function setOptions()
	{
		return array(
			'collectionName' => 'users',
			'dbName' => 'movember',
			'dbHost' => 'localhost',
		);
	}
}

?>
