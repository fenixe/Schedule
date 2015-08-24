<?php

include_once('./conn_core.php');
include_once('./to_json.php');

$collection = $db->selectCollection($curr_collection);


if ($_GET['crud'] == 'read') {
    $institute = $_GET['institute'];
    $flow = $_GET['flow'];
    $semester = (int)$_GET['semester'];
    $year = (int)$_GET['year'];
    $course = (int)$_GET['course'];
    $items = [];

    $sort_arr = array('institute' => $institute, 'flow' => $flow, 'semester' => $semester, 'year' => $year, 'course' => $course);

    foreach ($sort_arr as $key => $val) {
        if (empty($val)) {
            unset($sort_arr[$key]);
        }
    }
    $cursor = $collection->find($sort_arr);

    to_json($cursor);
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
        $id = $el['_id'];
        unset($el['_id']);

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
        $cursor = $collection->find(array('_id' => $id));
        foreach ($cursor as $arr) {
            array_push($out_result, $el);
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





