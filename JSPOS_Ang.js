
//Experimental POS script
//rg is short for register

var rg = {
    
    total: 0,
    subtotal: 0,
    tax: 1.07,
    tax_elgible: 0,
    paid: 0,
    change: 0,
	list: [],
	lineNum: 0,

    
	
	
	
    ring_up: function(a){                          //<= updates total and subtotal, parameter 'a' is an Object
        rg.subtotal = rg.money_format(rg.subtotal + a.price);
		rg.list.push(a);
        
        rg.total_amt();
		
		rg.lineNum++;
		rg.prints(a, "list");
		
		
        return rg;
    },
	
	
	exact_change: function(){
	
		var v = prompt("Enter exact change:", "");
		rg.paid = rg.money_format(rg.paid + parseFloat(v));
		rg.total_amt();
		
		rg.prints("Cash:   $" + rg.paid, "list", 'a');
		
		return rg;
	
	},
	
	
	total_amt: function(){                        //<= Calculates total 

		rg.tax_elgible = rg.subtotal;             //<= Temp fix, Adjust later
		
		if ( rg.tax_elgible > 0){
		rg.total = rg.money_format(rg.tax_elgible * rg.tax); 
		} else {
		rg.total = rg.money_format(rg.tax_elgible);
		}
		
		rg.prints("Total: " + rg.total, "total");
		rg.prints("Subtotal: " + rg.subtotal, "subtotal");
		rg.prints("Tax:  " + rg.money_format(rg.total - rg.subtotal, 'r'), "tax");
		rg.prints("Paid:  " + rg.paid, "paid");
		rg.prints("Due:  " + rg.money_format(rg.total - rg.paid), "due");
		
		return rg;
	},
	
	
	
	remove_item: function(delt){
	
		if (typeof(delt) != Number){
			var delt = rg.money_format(prompt("Enter Value to take off",""));
		}
		
		if (delt === 0){return;}     //<= So it does not add button when 0 has been taken off
		
		rg.subtotal = rg.money_format(rg.subtotal - delt);
		rg.tax_elgible = rg.money_format(rg.tax_elgible - delt);  
		rg.total_amt();
		
		rg.prints("Removed $" + delt, "list", 'a');
		
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
		rg.clear("subtotal", "Subtotal: ");     //<= id input over here!
		rg.clear("total", "Total: ");
		rg.clear("paid", "Paid:  ");
		rg.clear("due", "Due:  ");
		rg.clear("tax", "Tax:  ");
		
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
			"\")'>" + out.name + 
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
	
	onklick: function(id, action){
	
		document.getElementById(id).onclick = action;
		
		return rg;
	},
	
	delTag: function(id, price){
		var del = document.getElementById(id);
		del.parentNode.removeChild(del);
		
		if (price){                    //<= update price after taking off item
		rg.subtotal = rg.money_format( rg.subtotal - parseFloat(price) , 'c');  //<= Need to fix rounding error, so it subtracts like it should
		rg.total_amt(); 
		}  
		
		var index = parseInt(id) - 1;                 //fix this and next line, does not properly delete value from array
		rg.list.splice(index, 1);
		
		
		
		return rg;
	}
	
	
	   
   
    
};


function prepare(){
	rg.onklick("done", rg.sale_complete);
	rg.onklick("exact", rg.exact_change);
	rg.onklick("del", rg.remove_item);
	rg.onklick("burger", function(){rg.ring_up({name:"Hamburger", price:3.49})  });
	rg.onklick("fries", function(){rg.ring_up({name:"Fries", price:1.79})  });
	rg.onklick("salad", function(){rg.ring_up({name:"Salad", price:1.99})  });
	rg.onklick("print", function(){rg.prints("","list")} );
}

