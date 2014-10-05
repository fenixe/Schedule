<?php

function teach_to_json($cursor)
{
    $json_column = '';
    $json_data = '';
    $json_end = '';
    $val_temp = '';

    foreach ($cursor as $el) {
        //print_r($el);
        foreach ($el as $key => $value) {
            if ($key == "teachLess") {
                foreach ($value as $arr_data) {
                    if (empty($val_temp)) {
                        $val_temp .= '"' . $arr_data['lessonName'] . '"';
                    } else {
                        $val_temp .= ', "' . $arr_data['lessonName'] . '"';
                    }
                }
                $value = $val_temp;
                $val_temp = '';
            }
            $search = array('"', '\'');
            $replace = array('\"', '&#039;');
            $ctpldata = str_replace($search, $replace, $value);

            $json_column .= '"'.$key.'"' . ':"' . $ctpldata . '",';
        }
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

function to_json($cursor)
{
    $json_column = '';
    $json_data = '';
    $json_end = '';

    foreach ($cursor as $el) {
        foreach ($el as $key => $value) {
            $search = array('"', '\'');
            $replace = array('\"', '&#039;');
            $ctpldata = str_replace($search, $replace, $value);
            $json_column .= '"'.$key.'"' . ':"' . $ctpldata . '",';
        }
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