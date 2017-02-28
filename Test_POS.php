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
	
		

		
		<div class="col-md-6">
		
		
			<div class="btn-group-vertical">
				<div class="denom btn btn-default" id="50d"> $50</div>
				<div class="denom btn btn-default" id="20d"> $20</div>
				<div class="denom btn btn-default" id="10d"> $10</div>
				<div class="denom btn btn-default" id="5d"> $5</div>
				<div class="denom btn btn-default" id="1d"> $1</div>
			</div>
		
			<div class="btn-group-vertical">
			<div class="btn btn-default denom" id="cash" >Cash</div> 
			<div class="btn btn-default denom" id="exact" >Exact</div>
			<br>
			<div class="btn btn-default denom" id="NearestD" >Nearest 1.00</div> 
			<div class="btn btn-default denom" id="Nearest25" >Nearest .25</div> 
			<div class="btn btn-default denom" id="Nearest10" >Nearest .10</div> 
			<div class="btn btn-default denom" id="Nearest5" >Nearest .05</div>
			<br>
			<div class="btn btn-default denom" id="Dup" >Quantity</div>
			<br>
			<div class="btn btn-default denom" id="More50" >$50 More</div> 
			<div class="btn btn-default denom" id="More20" >$20 More</div> 
			<div class="btn btn-default denom" id="More10" >$10 More</div> 
			<div class="btn btn-default denom" id="More5" >$5 More</div> 
			<div class="btn btn-default denom" id="More1" >$1 More</div> 
			<br>
			<div class="btn btn-default denom" id="print" >Print Receipt</div>
			<div class="btn btn-default denom" id="done" >Done</div>
			
			
			<div class="btn btn-default denom" > <a href="Manage.php">Manage DB</a></div>
			</div>
			<div class="btn-group-vertical" id = "menuButtons">
			</div>
			
		</div>
		
		<div class="receipt col-md-6">
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
<div id="nav" class="btn btn-default">Back to register</div> <div id="printer" class="btn btn-default">print</div>
<br />
<div id="NextOrder" class="btn btn-default">Next Order</div>
<br />
<table id="output"></table>

<div id="rgtotals" class="receipt col-md-6">
			<div id="rtax" > Tax: 0</div>
			<div id="rpaid" > Paid: 0</div>

			<div id="rtotal">Total: 0</div>
			<div id="rdue">Due: 0</div>
			<div id="rchange">Change: 0</div>
		</div>

</body>
</html>