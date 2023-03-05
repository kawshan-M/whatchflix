#PHP
$serverApi = new \MongoDB\Driver\ServerApi(\MongoDB\Driver\ServerApi::V1);
$client = new \MongoDB\Client(
    'mongodb+srv://Watchflix:7TYVRXtcUxoESp9h@cluster0.biflqxw.mongodb.net/?retryWrites=true&w=majority', [], ['serverApi' => $serverApi]);
$db = $client->test;

#