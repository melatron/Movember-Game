<?php
require_once '../app/Core/_init.php';

$mongo = new \MongoClient('mongodb://localhost/Hack');
$mongo->Hack->users->insert(['a' => 5]);
