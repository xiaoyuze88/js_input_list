<?php
header("CONTENT-TYPE:text/html; CHARSET=UTF-8");
	$data = array("肖宇泽","肖燕","肖研","肖晓燕","肖开开",'a');
	if(isset($_POST['value']))
	{

		$value = $_POST['value'];
		// echo $value;
		$output = array();
		// print_r($data);
		foreach ($data as $k => $v) {
			// echo strpos($value,$v);
			// echo $v;
			// echo strpos($v,'a')==false;
			if(strpos($v,$value)!== false)
			{
				// echo "!";
				array_push($output,$v);
			}
		}
		// print_r($output);
		echo join($output,',');
		die;
	}
	
	die;