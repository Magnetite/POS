
//Experimental POS script
//Reg is short for Register

var Reg = {
    
    total: 0,
    subtotal: 0,
    tax: 1.07,
    tax_elgible: 0,
    paid: 0,
    change: 0,
	list: "",

    
    ring_up: function(a){      //Updates total and subtotal 1
        Reg.subtotal += a;
        Reg.tax_elgible += a;        //<= update later
        Reg.total_amt();
        return Reg;
    },
	
	
	exact_change: function(){
	
		var v = prompt("Enter exact change:", "");
		Reg.paid = Reg.money_format(parseFloat(v));
		Reg.prints("Cash:   $" + Reg.paid, "list", 'a');
		return Reg;
	
	},
	
	
    change_back: function(){   //Calculates change due 3
        change = paid - total;
        return Reg;
    },
	
	
	total_amt: function(){   // Calculates total  4
		Reg.total = Reg.money_format(Reg.tax_elgible * Reg.tax );   // Rounds down fractional cent
		Reg.prints("Total: " + Reg.total, "total");
		Reg.prints("Subtotal: " + Reg.subtotal, "subtotal");
		return Reg;
	},
	
	money_format: function(a){
		return (Math.floor(a * 100))/100;
	},
	
	remove_item: function(){
		var delt = Reg.money_format(prompt("Enter Value to take off",""));
		Reg.subtotal -= delt;
		Reg.tax_elgible -= delt;  
		Reg.total_amt();
		Reg.prints("Removed $" + delt, "list", 'a');
		
		return Reg;
	},
    
    
	
	
	
	
	
	
	
	
    sale_complete: function(){   // Resets the state of program.  First of the "utility functions"
        Reg.total = 0;
        Reg.subtotal = 0;
        Reg.tax_elgible = 0;
        Reg.paid = 0;
        Reg.change = 0;
		Reg.list = "";
		Reg.clear("list","");
		Reg.clear("subtotal", "Subtotal: ");  // id input over here!
		Reg.clear("total", "Total: ");
        return Reg;
    },
	
	
	prints: function(out, id, mode){  //Outputs to HTML
	
		if (mode == 'a'){
			document.getElementById(id).innerHTML += "<br>" + out;
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
	}
	
	
	
	
    
   
    
};


function prepare(){
	Reg.onklick("done", Reg.sale_complete);
	Reg.onklick("exact", Reg.exact_change);
	Reg.onklick("del", Reg.remove_item);
	Reg.onklick("print", function(){Reg.prints("Hello_World","subtotal")} );
}

