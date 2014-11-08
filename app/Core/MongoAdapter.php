<?php
namespace Framework\Persistence;

use Framework\Persistence\Exception\CannotConnectException;

class MongoAdapter
{
	protected
			$mongo,
			$dbName,
			$dbHost;

	public function connect($username = '', $password = '')
	{
		try {
			$this->mongo = new \MongoClient('mongodb://localhost/Hack');
		} catch (\Exception $ex) {
			throw $ex;
			throw new CannotConnectException("DSN: {$this->dsn}");
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

	/**
	 *
	 * @author lubomir.gavadinov
	 * @return \MongoClient
	 */
	public function getMongo()
	{
		return $this->mongo;
	}
}
