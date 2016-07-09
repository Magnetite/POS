
	
	<?php
	
	include("try.php");
	
	if (isset($_GET['n']))
	{
		$menuItems = tryC();
		
		echo print_r(json_encode($menuItems), true) ;//$menuItems;  //Caution.  String not fixed.
	
	}


   ?>
   
