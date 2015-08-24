<?php

include_once('./conn_core.php');
include_once('./to_json.php');

$collection = $db->selectCollection($teach_collection);

if ($_GET['crud'] == 'read') {
    $lesson = $_GET['lesson'];
    $found = array();
    if (!empty($lesson)) {
        $found = (array('teachLess.lessonName' => $lesson));
    }
    $cursor = $collection->find($found);
    teach_to_json($cursor);
} else if ($_GET['crud'] == 'create') {
    $get_json = $HTTP_RAW_POST_DATA;
    $get_objects = object_to_array(json_decode($get_json));
    //print_r($get_objects);
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
    teach_to_json($out_result);
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
    teach_to_json($out_result);

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

