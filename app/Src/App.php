<?php
namespace Src;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Controller\AbstractController;

class App implements MessageComponentInterface
{

	protected $clients;

	public function __construct()
	{
		$this->clients = new \SplObjectStorage();
	}

	public function onOpen(ConnectionInterface $conn)
	{
		$now = date('Y-m-j H:i:s');
		$this->clients->attach($conn);
		echo "New connection! ({$conn->resourceId}) ({$now})\n";

		$mongo = new \MongoClient('mongodb://localhost/movember');
		$db = $mongo->selectDb('movember');
		$collection = new \MongoCollection($db, 'users');

		$all = [];
		foreach (iterator_to_array($collection->find()) as $value) {
			$all[$value['country']] = $value;
		}
		$data = array('type' => 'connect', 'all' => $all);

		$conn->send(json_encode($data));
	}

	public function onMessage(ConnectionInterface $from, $msg)
	{
		$numRecv = count($this->clients) - 1;
		echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n", $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');


		$msg = json_decode($msg, true);
		$route = explode('@', $msg['route']);
		$controller = AbstractController::make($route[0]);
		$method = $route[1];
		$controller->$method($msg, $from, $this->clients);
	}

	public function onClose(ConnectionInterface $conn)
	{
		$this->clients->detach($conn);

		echo "Connection {$conn->resourceId} has disconnected\n";
	}

	public function onError(ConnectionInterface $conn, \Exception $e)
	{
		echo "An error has occurred: {$e->getMessage()}\n";

		$conn->close();
	}
}
