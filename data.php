<?php
// this page is just for test
header("CONTENT-TYPE:text/html; CHARSET=UTF-8");
$data = array("ajax","absolue","pure","hello","amblulance",'a');
if(isset($_POST['value']))
{
	$value = $_POST['value'];
	$output = array();
	foreach ($data as $k => $v) {
		if(strpos($v,$value)!== false)
		{
			array_push($output,$v);
		}
	}
	echo join($output,',');
	die;
}
die;