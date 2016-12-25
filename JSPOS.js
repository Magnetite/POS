
//Experimental POS script
//rg is short for register

var rg = {
    
    total: 0,
    subtotal: 0,
    tax: 0.07,
	taxSub: 0,
    paid: 0,
    change: 0,
	list: [],
	dict: {},
	lineNum: 0,

    
	
	
	
    ring_up: function(a){                          //<= updates total and subtotal, parameter 'a' is an Object
        rg.subtotal = rg.money_format(rg.subtotal + a.price, 'r');  
		//rg.list.push(a);
		
		
		
		if ( rg.dict.hasOwnProperty(a.id) )
		{
		
			 if (rg.dict[a.id].stock === 0 ){
				alert("Out of stock!");
				return;
			 } else {
				rg.dict[a.id].stock -= 1;
				}
				
		} else {
			
			
			rg.dict[a.id] = a;
			rg.dict[a.id].stock -= 1;
		}
        
        rg.total_amt();
		
		rg.lineNum++;
		rg.prints(a, "list");
		
		
        return rg;
    },
	
	
	exact_change: function(a){
	
		var v = 0;
	
		if (arguments.length === 0){
			v = prompt("Enter exact change:", "");
		} else {
			v = a;
		}
		
		if ( v > 0 ){
			rg.paid = rg.money_format(rg.paid + parseFloat(v));
			rg.total_amt();
			
			rg.prints("Cash:   $" + rg.paid, "list", 'a');
		}
		return rg;
	
	},
	
	cash_button: function(cash){
	
		if ( cash >= (rg.total - rg.paid) ){
			rg.exact_change(cash);
		} else {
			alert("Not enough to cover payment");
		}
	
	},
	
	
	total_amt: function(){                        //<= Calculates total 
    
		
		if ( rg.subtotal >= 0){
		rg.taxSub = rg.money_format(rg.subtotal * rg.tax, 'r'); 
		}
		rg.total = rg.money_format(rg.subtotal + rg.taxSub, 'r');
		
		
		rg.prints("Total: " + rg.total, "total");
		rg.prints("Subtotal: " + rg.subtotal, "subtotal");
		rg.prints("Tax:  " + rg.money_format(rg.taxSub, 'r'), "tax"); //Fix, make taxSub variable instead
		rg.prints("Paid:  " + rg.paid, "paid");
		rg.prints("Due:  " + rg.money_format(rg.total - rg.paid), "due");
		
		return rg;
	},
	
	
	
	
	
	change_price: function(a){
		
		a.price = prompt("Enter a new price:","");
		
		rg.subtotal = rg.money_format( rg.subtotal - money_format(parseFloat(a.price), 'c' ) , 'c');   //<= Need to fix rounding error
		rg.total_amt(); 
		return rg;
	},
    
    
	
	
	
	
	
	
	
	
    sale_complete: function(){	//<= Resets the state of program.  First of the "utility functions"
	
        rg.total = 0;
        rg.subtotal = 0;
        rg.tax_elgible = 0;
        rg.paid = 0;
        rg.change = 0;
		rg.list = [];
		rg.lineNum = 0;
		
		rg.clear("list","");
		rg.clear("subtotal", "Subtotal: 0");     //<= id input over here!
		rg.clear("total", "Total: 0");
		rg.clear("paid", "Paid:  0");
		rg.clear("due", "Due:  0");
		rg.clear("tax", "Tax:  0");
		
        return rg;
    },
	
	
	money_format: function(a, mode){                   //<= Rounds fractional cent
	
		if (mode === 'r'){
			return (Math.round(a * 100))/100;
		} 
		else if ( mode === 'c'){
			return (Math.ceil(a * 100))/100;
		} 
		
		return (Math.floor(a * 100))/100;
		
	},
	
	
	prints: function(out, id, mode){  //<= Outputs to HTML
	
		if (mode == 'a'){
			document.getElementById(id).innerHTML += "<div><button>" + out + "</button></div>";
		} else if (typeof(out) === "object"){
			document.getElementById(id).innerHTML += "<div id = '" +  rg.lineNum + 
			"a'><button onclick='rg.delTag(\"" + rg.lineNum  + 
			"a\",\"" + out.price +
			"\", " + out.id + ")'>" + out.name + 
			"</button> <button>$" + out.price + 
			"</button></div>"; 
			
		} else {
			document.getElementById(id).innerHTML = out;
		}
		
		return rg;
		
	},
	
	clear: function(id, txt){
	
		document.getElementById(id).innerHTML = txt;
		
		return rg;
	},
	
	onklick: function(id, action){   //Replace with jQuery Mathod
	
		document.getElementById(id).onclick = action;
		
		return rg;
	},
	
	delTag: function(id, price, index){
		
		
		
		rg.dict[index].stock += 1; 
		
		if (rg.dict[index].stock === rg.dict[index].max){ delete rg.dict[index]};
	
	
		var del = document.getElementById(id);
		del.parentNode.removeChild(del);
		
		if (price){                    //<= update price after taking off item
		rg.subtotal = rg.money_format( rg.subtotal - parseFloat(price) , 'r');  //<= Need to fix rounding error, so it subtracts like it should
		
		rg.total_amt();
		}  
		
		
		
		return rg;
	},
	
	
	ajax: function(a, callback, IdStock){
	
	
		if (!IdStock){
		
			var IdStock = ""; //Use var here?
		
		}
	
		$.ajax({
					type: "GET",
					url: "xserver.php",
					data: "n=" + a + "&s=" + IdStock + "&m=" +  Math.random(),
					dataType: "json",
					success: function(result){
					callback(result);
					},
					})
	
	
	}
	
	
	   
   
    
};








//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Prepare event handlers of UI 
/*
function prepare(){
	rg.onklick("done", rg.sale_complete);
	rg.onklick("exact", rg.exact_change);
	rg.onklick("del", rg.remove_item);
	rg.onklick("burger", function(){rg.ring_up({name:"Hamburger", price:3.49})  });
	rg.onklick("fries", function(){rg.ring_up({name:"Fries", price:1.79})  });
	rg.onklick("salad", function(){rg.ring_up({name:"Salad", price:1.99})  });
	rg.onklick("print", function(){rg.prints("","list")} );
}

$.ajax({
					type: "GET",
					url: "xserver.php",
					data: "n=menu&m=hi" +  Math.random(),
					dataType: "json",
					success: function(result){
						$.each(result, function(){
							$('#menuButtons').append('<div class="btn btn-default denom" id="' + this.id + '" >' + this.name + '</div>');
							var fcost = this.cost;
							var fname = this.name;
							$('#' + this.id).bind("click", function(){  
								rg.ring_up({name:fname, price:fcost});
								
							})
							
						})
						rg.onklick("done", rg.sale_complete);
						rg.onklick("cash", rg.exact_change);
					}
					})
*/














$(document).ready(function(){


	
	
	 rg.ajax("menu", function(r){
						$.each(r, function(){
							$('#menuButtons').append('<div class="btn btn-default denom" id="' + this.id + '" >' + this.name + '</div>');
							var fcost = this.cost;
							var fname = this.name;
							var fstock = this.in_stock;
							var fid = this.id;
							$('#' + this.id).bind("click", function(){
								//Make functionality for fstock!
								rg.ring_up({id:fid, name:fname, price:fcost, stock:fstock, max:fstock});
								
							})
							
						})
						rg.onklick("50d", function(){ return rg.cash_button(50);} )
						rg.onklick("20d", function(){ return rg.cash_button(20);})
						rg.onklick("10d", function(){ return rg.cash_button(10);} )
						rg.onklick("5d", function(){ return rg.cash_button(5);})
						rg.onklick("1d", function(){ return rg.cash_button(1);})
						
						
						rg.onklick("done", rg.sale_complete);
						rg.onklick("cash", rg.exact_change);
					})  
					
	  });


