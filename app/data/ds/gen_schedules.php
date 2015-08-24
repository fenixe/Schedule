<?php
include_once('./conn_core.php');
include_once('./to_json.php');

session_start();

function generate_full_rules_array($arr){
    $rules_out = array();
    foreach ($arr as $rules) {
        $num_lesson = $rules['numLesson'];
        foreach ($rules as $key => $val) {
            $temp = array();
            if (preg_match('/^week/', $key) && !empty($val)) {
                $day_pair = $key.'-'.$num_lesson;
                $temp['day'] = $day_pair;
                $temp['lessonId'] = $val;
                $temp['isSet'] = 'true';
                array_push($rules_out, $temp);
            }
        }
    }
    sort($rules_out);
    return $rules_out;
}

function change_id_plan($arr){
    foreach ($arr as &$arg) {
        foreach ($arg as $key => $val) {
            if ($key == "_id") {
                $arg['id'] = (string)$val;
                unset($arg['_id']);
            }
        }
    }
    return $arr;
}

/*$private_id = session_id();
$_SESSION['pr_key'] = $private_id;
$_SESSION['id_process'] = getmypid();
session_write_close();*/

# Учебный план
$institute = 'ИПСА';
$flow = 'Системы искусственного интилекта';
$semester = 1;
$year = 2014;
$course = 1;

#   ВЫБИРАЕМ УЧЕБНЫЙ ПЛАН ИЗ БД И КОНВЕКТИРУЕМ ЕГО В МАССИВ

$sort_arr = array('flow' => $flow, 'institute' => $institute, 'semester' => $semester, 'year' => $year, 'course' => $course); // выборка из учебного плана

$curr_coll = $db->selectCollection($curr_collection);
$cursor = $curr_coll->find($sort_arr);
$teach_plan = iterator_to_array($cursor, false);

$schedule_coll = $db->selectCollection($schedules_collection);
$cursor = $schedule_coll->find($sort_arr);
$temp_array = iterator_to_array($cursor, false)[0];
$work_week = $temp_array['work_week'];
$rules_array = $temp_array['rules'];
print_r($rules_array);

//foreach ($teach_plan as $arr){
    print $teach_plan[0]['teachName'];
    $arr_plan = $teach_plan[0];

    $plan_les_id = $arr_plan['_id'];


    $cursor = $db->selectCollection($teach_collection) -> find(array("teachName" => 'Кухарев С.А'));
    $teach = iterator_to_array($cursor, false);
    $teach_rules = $teach[0]['teachRules'];
    foreach ($teach_rules as $rule_arr){
        print_r($rule_arr);
        foreach ($rule_arr as $day => $val );

    }
///}


//$rules_array = generate_full_rules_array($rules_array);
//$teach_plan = change_id_plan($teach_plan);
//


//$full_weeks = generate_full_week($work_week);
$size_work_week = sizeof($work_week);
$size_rules_array = sizeof($rules_array);
$size_teach_plan = sizeof($teach_plan);
//$repeats = pow($size_teach_plan , ($size_work_week - $size_rules_array));
//echo $repeats;


//$work_tmp_name = tempnam(sys_get_temp_dir(), 'work_week');
//$teach_tmp_name = tempnam(sys_get_temp_dir(), 'teach_plan');
//$rules_tmp_name = tempnam(sys_get_temp_dir(), 'rules_array');



//file_put_contents($work_tmp_name, json_encode($work_week));
//file_put_contents($teach_tmp_name, json_encode(change_id_plan($teach_plan), JSON_UNESCAPED_UNICODE));
//file_put_contents($rules_tmp_name, json_encode($rules_array));


file_put_contents("C:\\work.json", json_encode($work_week));
file_put_contents("C:\\rules.json", json_encode(generate_full_rules_array($rules_array),JSON_UNESCAPED_UNICODE) );
file_put_contents("C:\\plan.json", json_encode(change_id_plan($teach_plan), JSON_UNESCAPED_UNICODE));


//$private_id = session_id();
//$_SESSION['pr_key'] = $private_id;
//$_SESSION['work_tmp_name'] = $work_tmp_name;
//$_SESSION['teach_tmp_name'] = $teach_tmp_name;
//$_SESSION['rules_tmp_name'] = $rules_tmp_name;
//$_SESSION['id_process'] = getmypid();
//session_write_close();


$start_time = microtime(); // Узнаем время запуска скрипта
$start_array = explode(" ", $start_time); // Разделяем секунды и миллисекунды
$start_time = $start_array[1]; // получаем стартовое время скрипта
$max_exec = ini_get("max_execution_time"); //Получаем максимально возможное время работы скрипта

/*
do{
    $nowtime = time();  // Текущее время
    //// Если текущее время есть в массиве с временами выполнения скрипта......
    if (in_array($nowtime, $_SESSION["num_st"])) {
        // Сокетом цепляемся к файлу с основным содержанием действий
        $result = include_once('run_java_gen.php');

    } //// выполнили заданное действие
    // Узнаем текущее время чтобы проверить, дальше ли вести цикл или перезапустить
    $now_time = microtime();
    $now_array = explode(" ",$now_time);
    $now_time = $now_array[1];
    // вычитаем из текущего времени начальное начальное
    $exec_time = $now_time - $start_time + $exec_time;
    /// тормозимся на секунду
    usleep(1000000);
    //Остановка скрипта, работающего в фоновом режиме.
    if (file_exists("stop.txt")) exit;
    //Проверяем время работы, если до конца работы скрипта
    //осталось менее 5 секунд, завершаем работу цикла.
} while($exec_time < ($max_exec - 5));   */

















