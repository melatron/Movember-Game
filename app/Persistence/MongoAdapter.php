<?php
namespace Persistence;

class MongoAdapter
{
	protected
			$mongo,
			$dbName,
			$dbHost;

	public function __construct($dbName = 'movember', $dbHost = 'localhost')
	{
		$this->dbName = $dbName;
		$this->dbHost = $dbHost;
		$port = 27017;

		$this->dsn = "mongodb://{$dbHost}/{$dbName}";
	}

	public function connect($username = '', $password = '')
	{
		try {
			$this->mongo = new \MongoClient('mongodb://localhost/movember');
		} catch (\Exception $ex) {
			throw $ex;
			throw new \Exception("DSN: {$this->dsn}");
		}

		return $this;
	}

	public function getDbName()
	{
		return $this->dbName;
	}

	public function getDbHost()
	{
		return $this->dbHost;
	}

	public function getMongo()
	{
		return $this->mongo;
	}
}
