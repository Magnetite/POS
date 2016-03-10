
//Experimental POS script

var Register = {
    
    total: 0,
    subtotal: 0,
    tax: 1.07,
    tax_elgible: 0,
    paid: 0,
    change: 0,
	list: "",

    
    ringUp: function(a){      //Updates total and subtotal 1
        this.subtotal += a;
        this.tax_elgible += a;        //<= update later
        this.totalAmt();
        return this;
    },
	
	 
    cash: function(c){   //Updates the value of paid 2
        this.paid += c;
        return this;
    },
	
	
	exact_change: function(){
	
		var v = prompt("Enter exact change:", "");
		this.paid = parseInt(v);
		return this;
	
	},
	
	
    change_back: function(){   //Calculates change due 3
        change = paid - total;
        return this;
    },
	
	
	totalAmt: function(){   // Calculates total  4
		this.total = this.tax_elgible * this.tax;  //Changed
		return this;
	},
	
	Remove_item: function(d){
		this.subtotal -= d;
		this.tax_elgible -= d;  //Changed
		this.totalAmt();
		
		return this;
	},
    
    
    saleComplete: function(){   // Resets the state of program  5
        this.total = 0;
        this.subtotal = 0;
        this.tax_elgible = 0;
        this.paid = 0;
        this.change = 0;
		this.list = "";
        return this;
    },
	
	
	print: function(out, id){  //Outputs to HTML
		document.getElementById(id).innerHTML = out;
		return this;
	},
	
	
	
	
    
   
    
};


function prepare(){
	document.getElementById("done").onclick = JSPOS.Register.saleComplete();
	document.getElementById("exact").onclick = JSPOS.Register.exact_change();
}

