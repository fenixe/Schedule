<?
//require "../adm_head_dist.php";
$Nd = date("Y-" . "m-" . d);
$ud = @mysql_query("DELETE FROM raspisanie WHERE  data<'" . $Nd . "' AND data!=' '");
?>
<HTML>
<HEAD>
    <META HTTP-EQUIV='Content-Type' content='text/html; charset=windows-1251'>
    <script LANGUAGE="JavaScript">
        <!--
        function ch1() {
            w = document.form3.grup.selectedIndex;
            gru = document.form3.grup.options[w].text;
            document.form3.gr.value = gru;
            form3.submit();
        }
        //-->
    </script>
</HEAD>
<BODY>
<?
echo "<form name='form3' method='post' action='$PHP_SELF?zag=$zag'>
<input type='hidden' name='gr'>
<input type=hidden name='zag' value='$zag'>";
if (!$gr)
{
    ?>
    <table width=80%>
        <tr>
            <td align=right><font color='darkblue' face='Times New Roman'>Для просмотра, добавления или редактирования
                    расписания &nbsp;</font>
                <select name='grup' onChange='ch1();' style='font-size: 12px;'>
                    <option value='0' SELECTED>выберите группу
                        <?
                        //заполнение списка в котором содержатся № групп
                        $query1 = "select * from z_group where arxiv=0 order by kod_gr";
                        $rez1 = mysql_query($query1) or die ("Ошибка!!!");
                        while ($col1 = mysql_fetch_array($rez1)) {
                            echo "<option value='$col1[0]'>", $col1[0];
                        }
                        ?>
                </select>
    </table>
<?
}
else
{
$result = mysql_query("select * from raspisanie where gruppa = '$gr' AND  data >='$Nd' GROUP BY data");
$num = mysql_num_rows($result);
if (!$num)
{
$result1 = mysql_query("select * from raspisanie where gruppa = '$gr' AND data =' '");
$n = mysql_num_rows($result1);
//echo "n - $n";
if (!$n)
{
echo "<table width=80%><tr>";
?>
<td align=right>
    <select name='grup' onChange='ch1();' style='font-size: 12px;'>
        <option value='0' SELECTED>выберите группу
            <?
            //заполнение списка в котором содержатся № групп
            $query1 = "select * from z_group where arxiv=0 order by kod_gr";
            $rez1 = mysql_query($query1) or die ("Ошибка!!!");
            while ($col1 = mysql_fetch_array($rez1)) {
                echo "<option value='$col1[0]'>", $col1[0];
            }
            echo "</select></table>";

            echo "<p align=center><font color='darkblue' face='Times New Roman'><b>Для группы $gr расписание не составленно!</b></font></p>";
            echo "<p align=center><font size='3' face='Century'><a href='rasp_add.php?g1=$gr&zag=$zag'>Составить расписание</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href='rasp_con_add.php?g1=$gr&zag=$zag'>Назначить On-line консультацию</a></font></p>";
            exit;
            }
            }
            echo "<table width=80%><tr><td align=left><font face='monotype corsiva'><img src='../../images/print.gif'>&nbsp;<a href='rasp_pech.php?gr=$gr'target='_blank'>Версия для печати</a></font>";
            ?>
        <td align=right>
            <select name='grup' onChange='ch1();' style='font-size: 12px;'>
                <option value='0' SELECTED>выберите группу
                    <?
                    //заполнение списка в котором содержатся № групп
                    $query1 = "select * from z_group where arxiv=0 order by kod_gr";
                    $rez1 = mysql_query($query1) or die ("Ошибка!!!");
                    while ($col1 = mysql_fetch_array($rez1)) {
                        echo "<option value='$col1[0]'>", $col1[0];
                    }
                    ?>
            </select></td>
            <?
            echo "<p align=center><font color='darkblue' face='Times New Roman'><b>Расписание занятий для группы $gr</b></font></p>";
            ?>
            <p align=center><font size="3" face="Century"><a href=rasp_udal.php?g1=<?= $gr ?>&zag=<?= $zag ?>
                                                             title='Удаление для всей группы'>Удалить расписание</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href=rasp_add.php?g1=<?= $gr ?>&zag=<?= $zag ?>>Добавить расписание</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href=rasp_con_add.php?g1=<?= $gr ?>&zag=<?= $zag ?>>Назначить On-line консультацию</a></font></p>
            <table border=1 align=center width=80%>
                <tr align='center'>
                <th colspan='2'>&nbsp;
                <th width='10%'><font size='-1'>Дата
                        <br><font size='-1'>День недели<br>
                            <th width='10%'><font size='-1'>Время
                                    <th width='48%'><font size='-1'>Дисциплина
                                            <th width='14%'><font size='-1'>Преподаватель
                                                    <th width='7%'><font size='-1'>Кабинет
                                                            <?
                                                            $result = mysql_query("select * from raspisanie where gruppa = '$gr' AND  data >='$Nd' GROUP BY data");
                                                            $num = mysql_num_rows($result);
                                                            if (!$num) {
                                                                $r1 = mysql_query("select * from raspisanie where gruppa = '$gr' AND data =' ' GROUP BY Day_nedely ORDER BY id");
                                                                $num_n = mysql_num_rows($r1);
                                                                while ($f = mysql_fetch_array($r1)) {
//////////////////////////////////////////
                                                                    $dn = $f[Day_nedely];
//echo "$dn<br>";
                                                                    $d = mysql_query("select * from raspisanie where gruppa = '$gr' and Day_nedely='$dn' and Kabinet!='сайт' order by id");
                                                                    $d_n = mysql_fetch_array($d);
                                                                    $kol = mysql_num_rows($d);
                                                                    echo "<tr align='center'>";
                                                                    if ($kol != '0') {
                                                                        echo "<td  width='4%' valign='top' rowspan='" . $kol . "'>";
                                                                        echo "<a href='rasp_red.php?d=$d&dn=$dn&g1=$gr&sem=$sem&zag=$zag'>";
                                                                        echo "<image src='../../images/pravka.gif' alt='Редактировать' border='0'></a>
<td  width='4%'valign='top' rowspan='" . $kol . "'><a href='rasp_del.php?d=$d&g1=$gr&zag=$zag'>
<image src='../../images/del.gif' alt='Удаление одного дня' border='0'></a><td valign='top' rowspan='" . $kol . "'><font size='-1'>$dn";

                                                                        $result1 = mysql_query("select * from raspisanie where gruppa = '$gr' and Day_nedely='$dn' and Kabinet!='сайт' order by id");
                                                                        while ($f = mysql_fetch_array($result1)) {
                                                                            echo "<td><font size='-1'>&nbsp;$f[Time]<td><font size='-1'>&nbsp;$f[predm]<br><b><font size='-1'>&nbsp;$f[Vid_zanitii]</b><td><font size='-1'>&nbsp;$f[Prepodavatel]<td><font size='-1'>&nbsp;$f[Kabinet]<tr align='center'>";
                                                                        }
                                                                    }

////////////////////////////////////////////
                                                                }
                                                            } else {

                                                                while ($f = mysql_fetch_array($result)) {
                                                                    $dn = $f[Day_nedely];
                                                                    $d = $f[data];
                                                                    $sem = $f[sem];
                                                                    $res = mysql_query("select * from raspisanie where gruppa = '$gr' and data='$d' and Kabinet!='сайт' order by data, Time");
                                                                    $f7 = mysql_fetch_array($res);
                                                                    $num1 = mysql_num_rows($res);
                                                                    $mass_date = explode("-", $d);
                                                                    $y1 = $mass_date[0];
                                                                    $m1 = $mass_date[1];
                                                                    $d1 = $mass_date[2];

//$y1=substr($d,0,4);
//$m1=substr($d,5,2);
//$d1=substr($d,8,2);
//echo "/$d1/$m1/$y1";
//echo "<br>$d";
                                                                    $kuk = $d1 . "." . $m1 . "." . $y1;
                                                                    echo "<tr align='center'>";
                                                                    if ($num1 != '0') {
                                                                        echo "<td  width='4%' valign='top' rowspan='" . $num1 . "'>";
                                                                        echo "<a href='rasp_red.php?d=$d&g1=$gr&sem=$sem&zag=$zag'>";
                                                                        echo "<image src='../../images/pravka.gif' alt='Редактировать' border='0'></a>
<td  width='4%'valign='top' rowspan='" . $num1 . "'><a href='rasp_del.php?d=$d&g1=$gr&zag=$zag'>
<image src='../../images/del.gif' alt='Удаление одного дня' border='0'></a><td valign='top' rowspan='" . $num1 . "'><font size='-1'>&nbsp;$kuk<br>$f[Day_nedely]";

                                                                        $result1 = mysql_query("select * from raspisanie where gruppa = '$gr' and data='$d' and Kabinet!='сайт' order by data, Time");
                                                                        while ($f = mysql_fetch_array($result1)) {
                                                                            echo "<td><font size='-1'>&nbsp;$f[Time]<td><font size='-1'>&nbsp;$f[predm]<br><b><font size='-1'>&nbsp;$f[Vid_zanitii]</b><td><font size='-1'>&nbsp;$f[Prepodavatel]<td><font size='-1'>&nbsp;$f[Kabinet]<tr align='center'>";
                                                                        }
                                                                    }
                                                                }
                                                                $res3 = mysql_query("select * from raspisanie where gruppa = '$gr' and data='$d' and Kabinet='сайт' order by data, Time");
                                                                while ($f3 = mysql_fetch_array($res3)) {
                                                                    echo "<td  width='4%' valign='top'><a href='rasp_con_red.php?id=$f3[id]&g1=$gr&zag=$zag'>";
                                                                    echo "<image src='../../images/pravka.gif' alt='Редактировать' border='0'></a>
<td  width='4%' valign='top'><a href='rasp_con_del.php?id=$f3[id]&g1=$gr&zag=$zag'>
<image src='../../images/del.gif' alt='Удаление консультации' border='0'></a><td valign='top'><font size='-1'>&nbsp;$kuk<br>$f3[Day_nedely]";
                                                                    echo "<td><font size='-1'>&nbsp;$f3[Time]<td><font size='-1'>&nbsp;$f3[predm]<br><b><font size='-1'>&nbsp;$f3[Vid_zanitii]</b><td><font size='-1'>&nbsp;$f3[Prepodavatel]<td><font size='-1'>&nbsp;$f3[Kabinet]<tr align='center'>";
                                                                }
                                                            }
                                                            echo "</table>";
                                                            }
                                                            ?>
                                                            </font>
</body>
</html>