<?php
include_once('./conn_core.php');
include_once('./to_json.php');

$collection = $db->selectCollection($teach_collection);

if ($_GET['crud'] == 'read') {

    $arr = [];
    $id = 0;
    $cursor = $collection->find(array(), array('teachLess' => true));
    foreach ($cursor as $el) {
        $temp = str_replace('"', '', preg_split('/[,;]\s/', $el['teachLess']));
        foreach ($temp as $lesson) {
            if (!array_search($lesson, $arr)) {
                array_push($arr, $lesson);
            }
        }
    }
    foreach ($arr as $value) {

        $json_column .= 'lessonName' . ':"' . $value . '", _id' . ':"' . $id++ . '"';

        $json_column = rtrim($json_column, ',');
        $json_data .= "{" . $json_column . "},";
        $json_column = '';
    }

    $json_data = rtrim($json_data, ',');
    $json_begin = '{"success":true, "data":[';
    $json_end .= "]}";

    $result = $json_begin . $json_data . $json_end;
    print $result;
}