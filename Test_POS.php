<!DOCTYPE html>
<html>
<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>

<meta charset="utf-8">
<title> Test POS</title>

<link rel="stylesheet" 
href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">


<script src="JSPOS.js"></script> 

<link rel="stylesheet" href="POS_style.css">





</head>

<body>

<div class="container">

	<div class="row">
	
		

		
		<div class="col-md-7 col-sm-7 col-xs-7">
		
		
			<div class="btn-group btn-group-lg btn-group-justified">
				<div class=" btn btn-primary" id="1d"> $1</div>
				<div class=" btn btn-primary" id="5d"> $5</div>
				<div class=" btn btn-primary" id="10d"> $10</div>
				<div class=" btn btn-primary" id="20d"> $20</div>
				<div class=" btn btn-primary" id="50d"> $50</div>
			</div>
		
			<div class="btn-group btn-group-lg btn-group-justified">
				<div class="btn btn-primary " id="Nearest5" >Nearest .05</div>
				<div class="btn btn-primary " id="Nearest10" >Nearest .10</div> 
				<div class="btn btn-primary " id="Nearest25" >Nearest .25</div> 
				<div class="btn btn-primary " id="NearestD" >Nearest 1.00</div> 
			</div>
			
			<div class="btn-group btn-group-lg btn-group-justified">
				<div class="btn btn-primary " id="More1" >$1 More</div> 
				<div class="btn btn-primary " id="More5" >$5 More</div>
				<div class="btn btn-primary " id="More10" >$10 More</div>
				<div class="btn btn-primary " id="More20" >$20 More</div>
				<div class="btn btn-primary " id="More50" >$50 More</div> 
			</div>
			
			<div class="btn-group-vertical btn-group-lg">
				<div class="btn btn-primary " id="cash" >Cash</div> 
				<div class="btn btn-primary " id="exact" >Exact</div>
				<div class="btn btn-primary " id="Dup" >Quantity</div>
				<div class="btn btn-primary " id="print" >Print Receipt</div>
				<div class="btn btn-primary " id="done" >Done</div>		
				<div class="btn btn-primary" > <a href="Manage.php">Manage DB</a></div>
				<div class="btn btn-primary " id="adjust" >Adjust Price</div>
			</div>
			
			<div class="btn-group-vertical" id = "menuButtons">
			</div>
			
			
		</div>
		
		<div class="receipt col-md-5 col-sm-5 col-xs-5">
			<div id="list"></div>
			<div id="subtotal" > Subtotal: 0</div>
			<div id="tax" > Tax: 0</div>
			<div id="paid" > Paid: 0</div>

			<div id="total">Total: 0</div>
			<div id="due">Due: 0</div>
			<div id="change">Change: 0</div>
		</div>
		<div class="col-md-3">
			
		</div>
	</div>
	
	
</div>
<br />
<div id="nav" class="btn btn-primary">Back to register</div> <div id="printer" class="btn btn-primary">print</div>
<br />
<div id="NextOrder" class="btn btn-primary">Next Order</div>
<br />
<table id="output"></table>


</body>
</html>