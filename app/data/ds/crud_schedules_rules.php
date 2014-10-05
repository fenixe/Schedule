<?php

include_once('./conn_core.php');
include_once('./to_json.php');

$collection = $db->selectCollection($schedules_collection);

if ($_GET['crud'] == 'read') {
    $institute = $_GET['institute'];
    $flow = $_GET['flow'];
    $semester = (int)$_GET['semester'];
    $year = (int)$_GET['year'];
    $course = (int)$_GET['course'];
    $out_result = [];

    $sort_arr = array('institute' => $institute, 'flow' => $flow, 'semester' => $semester, 'year' => $year, 'course' => $course);

    $cursor = $collection->find($sort_arr, array("rules" => true));
    foreach ($cursor as $arr) {
        foreach ($arr['rules'] as $res) {
            array_push($out_result, $res);
        }
    }
    to_json($out_result);
} else if ($_GET['crud'] == 'create') {
    $get_json = $HTTP_RAW_POST_DATA;
    $get_objects = object_to_array(json_decode($get_json));
    $out_result = array();
    $work_week = array();
    $main_array = array();

    if (gettype($get_objects[0]) == 'array') {
        $data = $get_objects;
    } else {
        $data[0] = $get_objects;
    }

    foreach ($data as $el) {
        $main_array = $el;

        $el['_id'] = new MongoId($el['_id']);
        $num_lesson = $main_array['numLesson'];
        unset($main_array['numLesson']);
        unset($main_array['_id']);

        foreach ($main_array as $key => $val) {
            $temp = array();
            if (preg_match('/^week/', $key)) {
                $day_pair = $key . '-' . $num_lesson;
                array_push($work_week, $day_pair);
                unset($main_array[$key]);
            }
        }
        $collection->update($main_array, array('$addToSet' => array('rules' => $el)), array('upsert' => true));
        array_push($out_result, $el);
    }
    $collection->update($main_array, array('$set' => array('work_week' => $work_week)), array('upsert' => true));
    array_push($out_result, $el);
    to_json($out_result);

} else if ($_GET['crud'] == 'update') {
    $get_json = $HTTP_RAW_POST_DATA;
    $get_objects = object_to_array(json_decode($get_json));
    $out_result = array();
    $work_week = array();

    if (gettype($get_objects[0]) == 'array') {
        $data = $get_objects;
    } else {
        $data[0] = $get_objects;
    }

    foreach ($data as $el) {
        $el['_id'] = new MongoId($el['_id']);

        $collection->update(array('rules._id' => $el['_id']), array('$set' => array('rules.$' => $el)), array('upsert' => true));
        $cursor = $collection->find(
            array('rules' => array('$elemMatch' => array('_id' => new MongoId($el['_id'])))),
            array("rules.$" => true)
        );
        foreach ($cursor as $arr) {
            foreach ($arr['rules'] as $res) {
                array_push($out_result, $res);
            }
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
        $collection->update(array(), array('$pull' => array('rules' => array('_id' => $el['_id']))));
    }
    print '{"success":true }';
}




