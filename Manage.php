<!DOCTYPE html>
<html>
<head>
<title> Manage Database</title>
<meta charset="utf-8">

<link rel="stylesheet" 
href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="JSPOS.js"></script>

<link rel="stylesheet" href="POS_style.css">

</head>
<body>
<a href="Test_POS.php" class="btn btn-default">Back to Register</a>



<div class="container">
	<div class="row">
	<div class="col-md-2">
	<div class="btn-group-vertical">
	
	
	<div class="btn btn-default" id="CreateRow" >Add Row of Table</div>
	<div class="btn btn-default" id="ReadRow">Show Row of Table</div>
	<div class="btn btn-default" id="UpdateRow">Change Row of Table</div>
	<div class="btn btn-default" id="UpdateColumn">Update Column*</div>
	<div class="btn btn-default" id="UpdateInven">Update Stock*</div>
	<div class="btn btn-default" id="DeleteRow">Delete Row of Table</div>
	
	<div class="btn btn-default" id="ShowAll">Show All Rows of Table</div>
	<div class="btn btn-default" id="Clear">Clear Screen</div>
	
	
	
	</div>
	</div>
	
		<br />
		
		<br /><div id="outputLine"> </div><br />
		<table class="col-md-10" id ="output">
		</table>
		
		
	</div>
	</div>
</body>
</html>