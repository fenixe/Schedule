<?php
include_once('./conn_core.php');
include_once('./to_json.php');

$collection = $db->selectCollection($curr_collection);
$MAX_SESSION_PER_DAY = 3;   // Мксимальное колличество пар в неделю

# Учебный план
$institute = 'ИПСА';
$flow = 'Системы искусственного интилекта';
$semester = 1;
$year = 2014;
$course = 1;

                    #   ВЫБИРАЕМ УЧЕБНЫЙ ПЛАН ИЗ БД И КОНВЕКТИРУЕМ ЕГО В МАССИВ

$sort_arr = array('flow' => $flow, 'institute' => $institute, 'semester' => $semester, 'year' => $year, 'course' => $course);  // выборка из учебного плана
$cursor = $collection->find($sort_arr);
$teach_plan = iterator_to_array($cursor, false);

                    #   НАЧАЛО ГЕН. АЛГОРИТМА ГЕНЕРАЦИЯ ПЕРВОГО ПОТОМСТВА

function gen_populetion($teach_plan){                        // генерация возможной попуцяции
    //$week = array("monday", "wednesday", "tuesday", "thursday", "friday");
    $week = array("Понедельни", "Вторник", "Среда", "Четверг", "Пятница");
    $schedule = array();
    $schedule_length = sizeof($teach_plan) - 1;
    global $MAX_SESSION_PER_DAY;                    // Макс. кол-во пар в день

    foreach ($week as $day) {
        $schedule_per_day = array();
        //$max_per_day = rand(0, $MAX_SESSION_PER_DAY);
        //$hours_semester = -1;

        for ($i = 1; $i <= $MAX_SESSION_PER_DAY; $i++){
            $rand_lesson = mt_rand(-1, $schedule_length - 1);    // выбор случайно пары из учебного плана , или -1 если "окно"
            $lesson = [];
            if ($rand_lesson < 0) {
                $lesson = "None";
            }else{
                $lesson = $teach_plan[$rand_lesson];
                $teach_plan[$rand_lesson]['hoursSemester'] -= (2 * 7);     // отнемаем от общего времени по учебному плану время на пары
            }
            $schedule_per_day[$i] = $lesson;
        }
        $schedule[$day] = $schedule_per_day;
    }
    return $schedule;
}


function gen_generation($amount, $teach_plan){             //генерируем в случайном порядке первую популяцию из n-особей
    $generation = array();
    for ($i = 1; $i <= $amount; $i++){
        array_push($generation, gen_populetion($teach_plan));
    }
    return $generation;
}

$n = 50;
$generations = gen_generation($n, $teach_plan);    // набор начальной популяций

                    #   ОЦЕНКА ПОПУЛЯЦИИ НА ЖИВУЧЕСТЬ

/** проверка популяции на соответсвие требованиям, выставляеться сумарная оценка:
 * pairsPerWeek = 500 - кол-во пар в неделю, штраф за вариант: одна, две пары в день;
 * noCoinPair = 1000 - не совпадение пар;
 * findFreeAuditor = 500 - наличие свободной аудитории                         ?
 * inSpecialAud = 600 - провидение аудитории в специальной аудитолии           ?
 * streamLectures = 500 - потоковые лекции                                     ?
 * evenUneven = 300 - чет/нечет                                                ?
 * inSpecialDay = 600 - проведение в определенный день и время                 ?
 * optimalByGroup = 800 - оптимальное распределение по группам                 ?
 * sameInDay = 300 - одинаковые занятия в день, штраф за вариант: более двух одинаковых пар в день;             ?
 * minWind = 500 - min. окон,  штраф за «окно»;                                                                 +
 * oneTeachInLess = 1000 - не возможность провидения одним преподователем одной и той же пары в разныых группах
 *
*/

$screening_assessment = array( 'pairsPerWeek' => 500,               // Массив вессовых коэффициентов
                               'noCoinPair' => 1000,
                               'findFreeAuditor' => 500,
                               'inSpecialAud' => 600,
                               'streamLectures' => 500,
                               'evenUneven' => 300,
                               'inSpecialDay' => 600,
                               'optimalByGroup' => 800,
                               'sameInDay' => 300,
                               'minWind' => 500,
                               'oneTeachInLess' => 1000);

function check_free_windows($daySchedule){                      // Проверка на наличие окон
    return  sizeof(array_keys($daySchedule, "None"));
}

function check_same_in_day($daySchedule){                       // Проверка на совпадение пар в один день

}

function check_generation($generation){                       // Проверка поколения на живучисть
    global $screening_assessment;

    foreach ($generation as $dayName =>  $daySchedule){
        $screening_assessment['minWind'] -= check_free_windows($daySchedule)*100;      // штраф за наличие окон
        check_same_in_day($daySchedule);

    }
}

check_generation($generations[0]);

function new_week_day()
{
    global $work_week;
    $el = key($work_week);
    next($work_week);
    return $el;
}

function get_new_less_in_cycle($less, $arr)
{
    $out_arr = array();
    $iterator = (new ArrayObject($arr))->getIterator();
    $num_el = array_search($less, $arr);
    $bool = true;
    $iterator->seek($num_el);
    do {
        if ($num_el != 0) {
            if ($num_el != 0 && !$iterator->valid()) {
                $iterator->rewind();
            }
            if ($iterator->key() == $num_el - 1) {
                $bool = false;
            }
            array_push($out_arr, $iterator->current());
            $iterator->next();
        } else {
            array_push($out_arr, $iterator->current());
            $iterator->next();
            $bool = $iterator->valid();
        }
    } while ($bool);
    return $out_arr;
}

function get_new_lesson(&$teach_plan_temp){
    global $count;
    $count++;
    $el = current($teach_plan_temp);
    if (next($teach_plan_temp) === false) {
        reset($teach_plan_temp);
    }
    return $el;
}

function get_new_generation($teach_plan_temp){
    global $work_week;
    $out_arr_gen = array();
    $out_arr = array();
    for ($i = 1; $i <= 2; $i++) {
        foreach ($work_week as $day => $val) {
            foreach ($teach_plan_temp as &$less) {
                if (empty($out_arr_gen[$day])) {
                    if ($less['hoursSemester'] > 0) {
                        $less['hoursSemester'] -= 2;
                        $out_arr_gen[$day] = $less;
                    } else {
                        $out_arr_gen[$day] = '';
                        continue;
                    }
                }
            }
        }
        $out_arr['week - ' . $i] = $out_arr_gen;
    }
    return $out_arr;
}

function generate(&$temp_schedule, &$clone_teach_plan, &$clone_work_week){
    $size = count($clone_teach_plan);
    $temp_week = array();

    if (count($clone_teach_plan) > 0) {
        foreach ($clone_teach_plan as $key => $val) {
            foreach ($clone_work_week as $day => &$day_val) {
                $day_val = $val;
            }
        }
        array_shift($clone_teach_plan);

        generate($temp_schedule, $clone_teach_plan, $clone_work_week);
    } else {
        array_push($temp_schedule, $clone_work_week);
    }
}

$arr1 = array("d-1", "d-2", "d-3", "d-4", "d-5", "d-6", "d-7", "d-8", "d-9", "d-10");
$arr2 = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20);

$result = array();

// Высота матрицы / блока
$matrix_h = count($arr2);
// Количество "строк"
$rows = pow($matrix_h, count($arr1) - 1);
$collection = $db->selectCollection("temp_schedules");

foreach ($arr1 as $column => $value) {
    // Количество повторений одного значения
    $repeats = pow($matrix_h, $column + 1) / $matrix_h;

    // Количество повторений(итераций) всех значений
    $iterations = $rows / $repeats;
    $current_row = 0;

    while ($iterations > 0) {
        foreach ($arr2 as $value2) {
            for ($repeat = 0; $repeat < $repeats; $repeat++) {
                //$result[$current_row][$value] = $value2;
                //$count++;
               //$collection->update(array("key" => $current_row), array('$set' => array($value => $value2)), array("upsert" => true));
                $current_row++;
            }
            print_r($result);
            foreach($result as $key => $val){
                foreach ($val as $k => $v){
                    //print_r(($v));
                    //$args = $collection->update(array("key" => $key), array('$addToSet' => array($k => array('$each' =>array( $v)))), array("upsert" => true));
                }
            }
           $result = null;
        }
        $iterations--;
    }
}
