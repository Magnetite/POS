
//Experimental POS script
//Reg is short for Register

var Reg = {
    
    total: 0,
    subtotal: 0,
    tax: 1.07,
    tax_elgible: 0,
    paid: 0,
    change: 0,
	list: [],
	lineNum: 0,

    
	
	
	
    ring_up: function(a){                          //<= updates total and subtotal, parameter 'a' is an Object
        Reg.subtotal = Reg.money_format(Reg.subtotal + a.price);
		Reg.list.push(a);
        Reg.tax_elgible = Reg.subtotal;            //<= Temp fix, Adjust later
        Reg.total_amt();
		
		Reg.lineNum++;
		Reg.prints(a, "list");
		var b = "" + Reg.lineNum + "b";
		//Reg.onklick( b, function(){Reg.delTag(Reg.lineNum + 'a') } );  //should update list[] when deleting
		
        return Reg;
    },
	
	
	exact_change: function(){
	
		var v = prompt("Enter exact change:", "");
		Reg.paid = Reg.money_format(Reg.paid + parseFloat(v));
		Reg.total_amt();
		
		Reg.prints("Cash:   $" + Reg.paid, "list", 'a');
		
		return Reg;
	
	},
	
	
	total_amt: function(){                        //<= Calculates total 

		if ( Reg.tax_elgible > 0){
		Reg.total = Reg.money_format(Reg.tax_elgible * Reg.tax); 
		} else {
		Reg.total = Reg.money_format(Reg.tax_elgible);
		}
		
		Reg.prints("Total: " + Reg.total, "total");
		Reg.prints("Subtotal: " + Reg.subtotal, "subtotal");
		Reg.prints("Tax:  " + Reg.money_format(Reg.total - Reg.subtotal, 'r'), "tax");
		Reg.prints("Paid:  " + Reg.paid, "paid");
		Reg.prints("Due:  " + Reg.money_format(Reg.total - Reg.paid), "due");
		
		return Reg;
	},
	
	
	
	remove_item: function(delt){
	
		if (typeof(delt) != Number){
			var delt = Reg.money_format(prompt("Enter Value to take off",""));
		}
		Reg.subtotal = Reg.money_format(Reg.subtotal - delt);
		Reg.tax_elgible = Reg.money_format(Reg.tax_elgible - delt);  
		Reg.total_amt();
		
		Reg.prints("Removed $" + delt, "list", 'a');
		
		return Reg;
	},
    
    
	
	
	
	
	
	
	
	
    sale_complete: function(){	//<= Resets the state of program.  First of the "utility functions"
	
        Reg.total = 0;
        Reg.subtotal = 0;
        Reg.tax_elgible = 0;
        Reg.paid = 0;
        Reg.change = 0;
		Reg.list = [];
		Reg.lineNum = 0;
		
		Reg.clear("list","");
		Reg.clear("subtotal", "Subtotal: ");     //<= id input over here!
		Reg.clear("total", "Total: ");
		Reg.clear("paid", "Paid:  ");
		Reg.clear("due", "Due:  ");
		Reg.clear("tax", "Tax:  ");
		
        return Reg;
    },
	
	money_format: function(a, mode){                   //<= Rounds down fractional cent
	
		if (mode == 'r'){
			return (Math.round(a * 100))/100;
		}
		
		return (Math.floor(a * 100))/100;
		
	},
	
	
	prints: function(out, id, mode){  //Outputs to HTML
	
		if (mode == 'a'){
			document.getElementById(id).innerHTML += "<div><button>" + out + "</button></div>";
		} else if (typeof(out) == "object"){
			document.getElementById(id).innerHTML += "<div id = '" +  Reg.lineNum + 
			"a'><button id='" + Reg.lineNum + "b' onclick='Reg.delTag(\"" + Reg.lineNum  + "a\")'>" + out.name + Reg.lineNum + 
			"</button>  <button>$" + out.price + 
			"</button></div>";  //get rid of br element!  Done!!!
			
		} else {
			document.getElementById(id).innerHTML = out;
		}
		
		return Reg;
		
	},
	
	clear: function(id, txt){
	
		document.getElementById(id).innerHTML = txt;
		
		return Reg;
	},
	
	onklick: function(id, action){
	
		document.getElementById(id).onclick = action;
		
		return Reg;
	},
	
	delTag: function(id){
		var del = document.getElementById(id);
		del.parentNode.removeChild(del);
		
		return Reg;
	}
	
	
	
	
    
   
    
};


function prepare(){
	Reg.onklick("done", Reg.sale_complete);
	Reg.onklick("exact", Reg.exact_change);
	Reg.onklick("del", Reg.remove_item);
	Reg.onklick("test", function(){Reg.ring_up({name:"Hamburger", price:3.49})  });
	Reg.onklick("print", function(){Reg.prints("","list")} );
}

