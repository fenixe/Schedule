<?php

include_once('./conn_core.php');
include_once('./to_json.php');

$collection = $db->selectCollection($teach_collection);

$tech_id = $_GET['_id'];

$out_result = [];

$cursor = $collection->find(array('_id' => new MongoId($tech_id)), array('teachRules' => true));
foreach ($cursor as $el) {
    foreach ($el['teachRules'] as $temp) {
        array_push($out_result, $temp);
    }
}
to_json($out_result);


