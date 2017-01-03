
	
	<?php
	
	include("try.php");
	
	
	
		
	
	
	
	//Testing url parameter passing, passed
	if ( isset($_GET['m']) )
	{
		$menuItems = tryC();
		
		echo print_r(json_encode($menuItems), true) ;  //Caution.  String not fixed.
	
	}


   ?>
   
