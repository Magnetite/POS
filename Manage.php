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
<a href="Test_POS.php" class="btn btn-default">
<span class="glyphicon glyphicon-arrow-left"></span> Back to Register</a>



<div class="container">
	<div class="row">
	<div class="col-md-2">
	<div class="btn-group-vertical">
	
	
	<div class="btn btn-default" id="CreateRow" ><span class="glyphicon glyphicon-plus"></span> Add Row of Table</div>
	<div class="btn btn-default" id="ReadRow"><span class="glyphicon glyphicon-search"></span>  Show Row of Table</div>
	<div class="btn btn-default" id="UpdateRow"><span class="glyphicon glyphicon-option-horizontal"></span> Change Row of Table</div>
	<div class="btn btn-default" id="UpdateColumn"><span class="glyphicon glyphicon-option-vertical"></span> Update Column*</div>
	<div class="btn btn-default" id="UpdateInven"><span class="glyphicon glyphicon-upload"></span> Update Stock*</div>
	<div class="btn btn-default" id="DeleteRow"><span class="glyphicon glyphicon-remove-sign"></span> Delete Row of Table</div>
	
	<div class="btn btn-default" id="ShowAll"> <span class="glyphicon glyphicon-list"></span> Show All Rows of Table</div>
	<div class="btn btn-default" id="Clear"><span class="glyphicon glyphicon-erase"></span> Clear Screen</div>
	
	
	
	</div>
	</div>
	<div class="col-md-10">
	
		<br />
		
		<br /><div id="outputLine"> </div><br />
		<table  id ="output">
		</table>
	</div>	
		
	</div>
	</div>
</body>
</html>