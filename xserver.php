
	
	<?php
	
	include("try.php");
	
	
	
		//Turn string into an array, to easily update stock values
		$IdStk = explode("-", $_GET['s']);
	
	
	
	//Testing url parameter passing, passed
	if ( isset($_GET['n']) && isset($_GET['m']) )
	{
		$menuItems = tryC();
		
		echo print_r(json_encode($menuItems), true) ;//$menuItems;  //Caution.  String not fixed.
	
	}


   ?>
   
