<?php
namespace Persistence;

use Persistence\MongoAdapter;
/**
 * @author lubomir.gavadinov
 */
abstract class AbstractMongoRepository
{
	/**
	 * @var MongoAdapter
	 */
	protected $adapter;

	protected
			$collectionName = '',
			$dbHost = '',
			$dbName = '',
			$collectionObject,
			$dbObject;

	/**
	 * Acceptable options: dbHost, dbName, user, pass
	 *
	 *
	 * @author lubomir.gavadinov
	 */
	abstract public function setOptions();

	public function __construct()
	{
		$options = $this->setOptions();
		$options['driver'] = 'mongo';

		$this->adapter = chain(new MongoAdapter($options['dbName'], $options['dbHost']))->connect();
		$this->dbName = $this->adapter->getDbName();
		$this->dbHost= $this->adapter->getDbHost();
		$this->collectionName = (isset($options['collectionName']) ? $options['collectionName'] : '');
		$this->collectionObject = $this->adapter->getMongo()->{$this->dbName}->{$this->collectionName};
		$this->dbObject = $this->adapter->getMongo()->selectDB($this->dbName);
	}

	/**
	 *
	 * @author lubomir.gavadinov
	 * @param array $conditions
	 * @return \MongoCursor
	 */
	public function findBy(array $conditions = array(), array $columns = array())
	{
		$cursor = $this->collectionObject->find($conditions, $columns);
		return $cursor;
	}

	/**
	 *
	 * @author elitsa.ilieva
	 * @param array $conditions
	 * @return \MongoCursor
	 */
	public function findOneBy(array $conditions = array(), array $columns = array())
	{
		$cursor = $this->collectionObject->findOne($conditions, $columns);
		return $cursor;
	}

	/**
	 *
	 * @author elitsa.ilieva
	 * @param array $conditions
	 * @return \MongoCursor
	 */
	public function execute(\MongoCode $code, $params)
	{
		return $this->adapter->getMongo()->selectDB($this->dbName)->execute($code, $params);
	}

	/** Insert element in current collection
	 *
	 * @author lubomir.gavadinov
	 * @param array $params
	 */
	public function insertElement(array $params)
	{
		try {
			$this->collectionObject->insert($params);
		} catch (\MongoException $e) {
			dd($e->getMessage());
		}
	}

	/** Insert element in current collection
	 *
	 * @author lubomir.gavadinov
	 * @param array $params
	 */
	public function distinct($key, array $params)
	{
		return $this->collectionObject->distinct($key, $params);
	}

	public function upsert(array $criteria, array $newObject, array $options = array())
	{
		return $this->collectionObject->update($criteria, $newObject, $options);
	}

	public function aggregate(array $pipeline, array $options = array())
	{
		return $this->collectionObject->aggregate($pipeline, $options);
	}
}


?>
