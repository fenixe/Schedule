<?php

ini_set('display_errors', 'Off');

$DB = 'diplom';
$curr_collection = 'curriculum';
$less_collection = 'lessons';
$teach_collection = 'teachers';
$stud_collection = 'students';
$schedules_collection = 'schedules';

$mongo = new MongoClient();
$db = $mongo->selectDB($DB);

function object_to_array($data){
    if (is_array($data) || is_object($data)){
        $result = array();
        foreach ($data as $key => $value){
            $result[$key] = object_to_array($value);
            if (empty($result['_id'])) {
                unset($result['_id']);
            }
        }
        return $result;
    }
    return $data;
}





