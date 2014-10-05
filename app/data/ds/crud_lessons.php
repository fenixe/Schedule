<?php

include_once('./conn_core.php');
include_once('./to_json.php');

$collection = $db->selectCollection($less_collection);

if ($_GET['crud'] == 'read') {
    $teacher = $_GET['teacher'];
    $found = array();
    $collection = null;
    $out_result = [];

    if (!empty($teacher)) {
        $collection = $db->selectCollection($teach_collection);
        $found = (array('teachName' => $teacher));
        $cursor = $collection->find($found, array('teachLess' => true));
        foreach ($cursor as $el){
            foreach ($el['teachLess'] as $temp) {
                array_push($out_result, $temp);
            }
        }
        //print_r($out_result);
        to_json($out_result);
    } else {
        $collection = $db->selectCollection($less_collection);
        $cursor = $collection->find();
        to_json($cursor);
    }
} else if ($_GET['crud'] == 'create') {
    $get_json = $HTTP_RAW_POST_DATA;
    $get_objects = object_to_array(json_decode($get_json));
    $out_result = [];

    if (gettype($get_objects[0]) == 'array') {
        $data = $get_objects;
    } else {
        $data[0] = $get_objects;
    }

    foreach ($data as $el) {
        $argc = $collection->insert($el);
        array_push($out_result, $el);
    }
    to_json($out_result);

} else if ($_GET['crud'] == 'update') {
    $get_json = $HTTP_RAW_POST_DATA;
    $get_objects = object_to_array(json_decode($get_json));
    $out_result = [];

    if (gettype($get_objects[0]) == 'array') {
        $data = $get_objects;
    } else {
        $data[0] = $get_objects;
    }

    foreach ($data as $el) {
        $id = $el['_id'];
        unset($el['_id']);
        $collection->update(array("_id" => new MongoId($id)), array('$set' => $el), array('upsert' => true));

        $cursor = $collection->find(array('_id' => new MongoId($id)));
        foreach ($cursor as $arr) {
            array_push($out_result, $arr);
        }
    }
    to_json($out_result);

} else if ($_GET['crud'] == 'destroy') {
    $get_json = $HTTP_RAW_POST_DATA;
    $get_objects = object_to_array(json_decode($get_json));

    if (gettype($get_objects[0]) == 'array') {
        $data = $get_objects;
    } else {
        $data[0] = $get_objects;
    }

    foreach ($data as $el) {
        $collection->remove(array('_id' => new MongoId($el['_id'])));
    }
    print '{"success":true }';
}