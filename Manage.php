<!DOCTYPE html>
<html>
<head>
<title> Manage Database</title>
<meta charset="utf-8">

<link rel="stylesheet" 
href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="JSPOS.js"></script>

<style>
table, th, td {
    border-bottom: 1px solid black; 
	padding: 6px;
}



tr:hover {
	background-color:lime;

}
</style>

</head>
<body>
<div class="btn btn-default"><a href="Test_POS.php">Back to Register</a></div>



<div class="container">
	<div class="row">
	<div class="col-md-2">
	<div class="btn-group-vertical">
	
	
	<div class="btn btn-default" id="CreateRow" >Add Row of Table</div>
	<div class="btn btn-default" id="ReadRow">Show Row of Table</div>
	<div class="btn btn-default" id="UpdateRow">Change Row of Table</div>
	<div class="btn btn-default" id="DeleteRow">Delete Row of Table</div>
	
	<div class="btn btn-default" id="ShowAll">Show All Rows of Table</div>
	<div class="btn btn-default" id="Clear">Clear Screen</div>
	
	
	
	</div>
	</div>
	
		
		
		<br /><div id="outputLine"> </div><br />
		<table class="col-md-10" id ="output">
		</table>
		
		
	</div>
	</div>
</body>
</html>