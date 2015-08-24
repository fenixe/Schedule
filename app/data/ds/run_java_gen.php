<?php
//include_once('./gen_schedules.php');
//session_start();

print_r($_SESSION);

$work_tmp_name = $_SESSION['work_tmp_name'];
$teach_tmp_name = $_SESSION['teach_tmp_name'];
$rules_tmp_name = $_SESSION['rules_tmp_name'];
//
//$work_tmp_name = $_SESSION['work_tmp_name'];
//$teach_tmp_name = $_SESSION['teach_tmp_name'];
//$rules_tmp_name = $_SESSION['rules_tmp_name'];


function run_generator(){
    passthru('java -jar "C:\Diplom.jar" ', $output);
    return $output;
}
$output = run_generator();

do {
    sleep(3);
    print_r($output);
}while($output);