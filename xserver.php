
	
	<?php
	
<<<<<<< HEAD
	include("try.php");
	
=======
>>>>>>> origin/master
	if (isset($_GET['n']))
	{
		$menuItems = tryC();
		
		echo print_r(json_encode($menuItems), true) ;//$menuItems;  //Caution.  String not fixed.
	
	}


   ?>
   
