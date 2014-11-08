<?php
namespace Src;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Core\Application;

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
	}

	public function onMessage(ConnectionInterface $from, $msg)
	{
		$numRecv = count($this->clients) - 1;
		echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n", $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

		$app = Application::getInstance($msg);
		$app->run(array('from' => $from, 'clients' => $this->clients));
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
