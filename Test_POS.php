<!DOCTYPE html>
<html>
<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>

<meta charset="utf-8">
<title> Test POS</title>

<link rel="stylesheet" 
href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">


<script src="JSPOS.js"></script> 



<style>

.denom {
background-color: blue;
//border-radius: 10px;
color: white;
width: 65px;
height:40px;
//margin: 10px 10px 10px 10px;
font-size: 20px;
}



</style>


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
			<div class="btn btn-default denom" id="NearestD" >Nearest 1.00</div> 
			<div class="btn btn-default denom" id="Nearest25" >Nearest .25</div> 
			<div class="btn btn-default denom" id="Nearest10" >Nearest .10</div> 
			<div class="btn btn-default denom" id="Nearest5" >Nearest .05</div> 
			<div class="btn btn-default denom" id="print" >Print Receipt</div>
			<div class="btn btn-default denom" id="done" >Done</div> 
			</div>
			<div class="btn-group-vertical" id = "menuButtons">
			</div>
			
		</div>
		
		<div class="col-md-6">
			<div id="list"></div>
			<div id="subtotal" > Subtotal:</div>
			<div id="tax" > Tax:</div>
			<div id="paid" > Paid:</div>

			<div id="total">Total:</div>
			<div id="due">Due:</div>
			<div id="change">Change:</div>
		</div>
	</div>
</div>

</body>
</html>