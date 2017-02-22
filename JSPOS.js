
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
	dup: 1,
	receiptStr: "",
	t_heading: [],
	test_str: "",

    
	
	
	
    ring_up: function(a){                          //<= updates total and subtotal, parameter 'a' is an Object
        rg.subtotal = rg.money_format(rg.subtotal + a.price, 'r');  
		
		
		
			//Modify this loop?  1/14 
			while(rg.dup > 0){
		
						if ( rg.dict.hasOwnProperty(a.id) )
						{
						
							 if (rg.dict[a.id].stock === 0 ){
								alert("Out of stock!");
								return;
							 } else if (rg.dict[a.id].stock - rg.dup < 0){
								
								//1/14
								alert("Not Enough Stock!");
								return;
							 
							 } else {
								rg.dict[a.id].stock -= 1;
								}
								
						} else {
							
							
							rg.dict[a.id] = a;
							rg.dict[a.id].stock -= 1;  //Check for non zero stock!  1/14
						}
						
						
		
						rg.lineNum++;
						rg.prints(a, "list");
						rg.total_amt();  //1/14
						
						rg.dup -= 1;
						
				}	
				
				

					rg.dup = 1;
        
        
		
		
        return rg;
    },
	
	duplicate: function(){
	
		rg.dup = prompt("Enter how many:", "");
		return rg;
	
	},
	
	
	exact_change: function(a){
	
		var v = 0;
	
		if (arguments.length === 0){
			v = prompt("Enter exact change:", "");
			if (v = ""){return rg;}
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
	
	nearest_amount: function(nearest){
	 //nearest parameter represents cents.
	
		var am =  Math.round(rg.total * 100);
		var res =  am + nearest - (am % nearest);
		
		rg.exact_change( res/100 );
		
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
		
		if ((rg.total - rg.paid) >= 0){
		rg.prints("Due:  " + rg.money_format(rg.total - rg.paid, 'r'), "due");
		rg.prints("Change:  " + rg.money_format(0, 'r'), "change");
		
		} else {
		rg.prints("Change:  " + rg.money_format(Math.abs(rg.total - rg.paid), 'r'), "change");
		rg.prints("Due:  " + rg.money_format(0, 'r'), "due");
		}
		
		return rg;
	},
	
	amount_over: function(over){
	
	rg.exact_change(rg.total + over);
	
	},
	
	
	
	change_price: function(a){
		
		r = prompt("Enter a override price:","");
		
		
		rg.test(r);
		
		a.price = r;
		
		rg.subtotal = rg.money_format( rg.subtotal - money_format(parseFloat(a.price), 'c' ) , 'c');   //<= Need to fix rounding error
		rg.total_amt(); 
		return rg;
	},
	
	
	
	
	
	CreateRow: function(){
	
		
		var c = prompt("Enter a comma separated list of values to enter into DB. 'name',cost,coupon_code,stock,id","");
		rg.test(c);
		
		rg.ajax("c=" + c, function(){rg.RowPrint("Request Sent");});
		
		return rg;
	
	},
	
	ReadRow: function(table, col, id){
	
		rg.ajax("t=" + table + "&P1=" + col + "&P2=" + id, function(R){ 
		
		rg.RowPrint("Read Request Sent");
		
		rg.tableMake(R);
		console.log(R);
		});
		return rg;
	
	},
	
	ReadRow_test: function(){
	
		var r = prompt("Enter 'table',col,id","menu,id,3");
		
		
		rg.test(r);
		
		var outArr = r.split(",");
		
		
		rg.ReadRow(outArr[0],outArr[1],outArr[2]);
		
		return rg;
	
	},
	
	ReadAll: function(){
	
		var table  = prompt("Input the name of the table from where to read all rows:","menu");
		
		rg.test(table);
		
		
		
		rg.docWrite("<caption>Table: " + table + "</caption>", "output", 1);
		//rg.ajax("t=" + table + "&r1=1", function(result){ JSON.stringify(result).split("},{").map(function(a){ rg.docWrite("<td>" + JSON.stringify(a).replace(/[{}"\\ \[\]]/g, "").replace(/,/g, "</td><td>") + "<br /></td>", "output", 1); }); });
		rg.ajax("t=" + table + "&r1=1", function(result){ rg.tableMake(result); });
		
		
	},
	
	
	
	UpdateRow: function(){
	
		//Test phase
		
		var input = prompt("Please type query like so:  'Field-Value-id_Num'", "");
		
		//Check if string is empty
		rg.test(input);  
		
		var send = input.split("-");
		
		
		rg.ajax("t=menu&u1=" + send[0] + "&u2=" + send[1] + "&u3=" + send[2], function(){rg.RowPrint("Update Request sent"); });  //<= Finish this
		return rg;
	
	},
	
	DeleteRow: function(){
	
		//Testing...
		var d = prompt("Enter exact name of item to delete from database:", "");
		
		rg.test(d);
		
		//Uses name as an id to find and delete an item from database. The name is required to be quoted.
		rg.ajax("d='" + d + "'" ,function(){rg.RowPrint("Request Sent"); });
		
		return rg;
		
	
	},
	
	tableMake: function(Arr){
	
		var heading = "";
		var bodyLine = "";
		var body = "";
		
		Object.keys(Arr[0]).map(function(a){
		
			heading += "<th>" + a + "</th>";
		});
		
		
		Arr.forEach(function(a){
			
			
			Object.values(a).map(function(b){ 

				//rg.test(typeof b === typeof {});
			
				bodyLine += "<td>" + b + "</td>";
			});
			
			body += "<tr>" + bodyLine + "</tr>";  //bug fixed, 
			bodyLine = "";
		});
		
		
		
		rg.docWrite("<tr>" + heading + "</tr>" + body, "output", 1);
		return rg;
	
	
	},
	
	RowPrint: function(msg){
	
		if (typeof (document.getElementById('outputLine').value !== 'undefined') && typeof (document.getElementById('outputLine').value !== null) ){
		
			document.getElementById('outputLine').innerHTML += "<br>" + msg;
			
		
		} else {
		
			console.log(msg);
		}
	
	
	},
	
	test: function(a){
	
	if (a === null && typeof a === "object" || a === undefined || a === "" || a === true){
	
		return rg;
	}
	
	},
    
    
	
	
	
    sale_complete: function(){	
	
		var str = rg.object_str();
	
		if (rg.paid >= rg.total){
	
				rg.ajax("u=" + str, function(){
				//test 
				console.log("Request Successful");
				
				} )
				
		} else { 
		
		alert("Not enough funds!");
		return;
		
		}
	
        rg.total = 0;
        rg.subtotal = 0;
        rg.tax_elgible = 0;
        rg.paid = 0;
        rg.change = 0;
		rg.list = [];
		rg.dict = {};
		rg.lineNum = 0;
		
		
		rg.clear("list","");
		rg.clear("subtotal", "Subtotal: 0");     
		rg.clear("total", "Total: 0");
		rg.clear("paid", "Paid:  0");
		rg.clear("due", "Due:  0");
		rg.clear("tax", "Tax:  0");
		rg.clear("change", "Change:  0");
		
        return rg;
    },
	
	receipt: function(){
	
		$('.container').hide();
		$('#nav').addClass("btn btn-default").text("Back to Register").click(function(){ location.reload(); });
		$('#printer').addClass("btn btn-default").text("print").click(function(){ window.print(); });
	
		var ar = Object.values(rg.dict);
	
		
		rg.tableMake(ar);
		
	
		return rg;
	
	},
	
	docWrite: function(out, id, mode){
	
		var doc = document;
		
		if (mode){
		
			doc.getElementById(id).innerHTML += out;
			rg.test_str += out;
		} else {
		
			doc.getElementById(id).innerHTML = out;
		}
		
		return rg;
		
	
	},
	
	tableWrite: function(Obj){
	
		if (rg.t_heading.length === 0){
		
			
			var doc = document;
			/*
			var r = doc.createElement("div");
			r.setAttribute("id", "output");
			doc.body.appendChild(r);
			*/
		
			doc.write("<thead><tr>");
		
			rg.t_heading = Object.keys(Obj);
			
			rg.t_heading.map(function(out){ doc.write("<th>" + out + "</th>"); });
		
			doc.write("</tr></thead>");
			
		}  
		
		rg.docWrite("<tr>", "output", 1);
		
		Object.values(Obj).map(function(g){ rg.docWrite("<td>" + g + "</td>", "output", 1); });
		
		rg.docWrite("</tr>", "output", 1);
		
	},
	
	tabWrite: function(Obj){
	
		var obKeys = Object.keys(Obj);
		var obVals = Object.values(Obj);
		var doc = document;
	
		
		if ( !doc.getElementById("tab_head") ){
		
			rg.addElement("table", "DB_table", "", 0);  // TODO finish this
			
			rg.addElement("tr", "head_row", "DB_table", 1);
			
			obKeys.map( function(cur){ rg.addElement("td", "", "head_row", 1); });
		
		}
	
	
	},
	
	addElement: function(nu, id, addTo, mode, txt){
	
		//nu is the type of element to create, and "id" is its id.  
		//addTo is the id of the parent element that receives the new element.
	
		var doc = document;
		
		var x = doc.createElement(nu);
		
		
		if (txt){
			
			x.appendChild( doc.createTextNode(txt) );
		} else if (id.length > 0) {
			x.setAttribute("id", id);
		}
		
		//Add to either the body, or to an element by an id
		if (mode === 1){
			doc.getElementById(addTo).appendChild(x);
		} else if (mode === 0) {
			doc.body.appendChild(x);
		} 
		
		
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
			rg.docWrite("<div><button>" + out + "</button></div>", id, 1);
		} else if (typeof(out) === "object" && !(typeof(out) == "string")){
		
		var outStr = "<div id = '" +  rg.lineNum + "a'>";  //<= Start div
		
		outStr += "<button onclick='rg.delTag(\"" + rg.lineNum  + "a\",\"" + out.price + "\", " + out.id + ")'>"; //<= Button with old onclick function
		
		outStr += out.name + "</button>"; //<= end button
		
		outStr += "<button>$" + out.price + "</button></div>" //<= end 2nd button, and div
		
			rg.docWrite( outStr , id, 1); 
			
		} else {
			rg.docWrite(out, id);
		}
		
		return rg;
		
	},
	
	clear: function(id, txt){
	
		document.getElementById(id).innerHTML = txt;
		
		return rg;
	},
	
	onklick: function(id, action){   //Replace with jQuery Mathod
	
		if (!document.getElementById(id)){
			
			return rg;
		
		}
	
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
	
	object_str: function(mode)
	{
	
		var len = Object.keys(rg.dict).length;
		var OutStr = "";
		
		for (var i = 0; i < len; i++){
		
			if (i > 0){ 
				OutStr += "-";
			}
			
			if (!mode){
			OutStr += Object.keys(rg.dict)[i] + "-" + rg.dict[Object.keys(rg.dict)[i]].stock; 
			} else {
			
			//Functionality for the receipt function, Need to add how much of each product bought
			OutStr += rg.dict[Object.keys(rg.dict)[i]].name + "-" + rg.dict[Object.keys(rg.dict)[i]].price; 
			}
		}
		
		//returns OutStr instead of rg
		return OutStr;
	
	},
	
	ajax: function(a, callback){
	
	
		var data_str = a + "&m=" +  Math.random();
	
		$.ajax({
					type: "GET",
					url: "xserver.php",
					data: data_str,
					dataType: "json",
					success: function(result){
					callback(result);
					}
					
					})
	
	
	}
	
	
	   
   
    
};







$(document).ready(function(){


	
	
	 rg.ajax("n=menu", function(r){
	 
						
						$.each(r, function(){
							$('#menuButtons').append('<div class="btn btn-default denom" id="' + this.id + '" >' + this.name + '</div>');
							var fcost = this.cost;
							var fname = this.name;
							var fstock = this.in_stock;
							var fid = this.id;
							$('#' + this.id).bind("click", function(){
								
								rg.ring_up({id:fid, name:fname, price:fcost, stock:fstock, max:fstock});
								
							})
							
						})
						
						
					})




						rg.onklick("50d", function(){ return rg.cash_button(50);} )
						rg.onklick("20d", function(){ return rg.cash_button(20);})
						rg.onklick("10d", function(){ return rg.cash_button(10);} )
						rg.onklick("5d", function(){ return rg.cash_button(5);})
						rg.onklick("1d", function(){ return rg.cash_button(1);})
						
						rg.onklick("exact", function(){ return rg.exact_change(rg.total); });
						
						rg.onklick("Dup", function(){ return rg.duplicate(); });
						
						rg.onklick("NearestD", function(){ return rg.nearest_amount(100); });
						rg.onklick("Nearest25", function(){ return rg.nearest_amount(25); });
						rg.onklick("Nearest10", function(){ return rg.nearest_amount(10); });
						rg.onklick("Nearest5", function(){ return rg.nearest_amount(5); });
						
						
						rg.onklick("More50", function(){ return rg.amount_over(50); });
						rg.onklick("More20", function(){ return rg.amount_over(20); });
						rg.onklick("More10", function(){ return rg.amount_over(10); });
						rg.onklick("More5", function(){ return rg.amount_over(5); });
						rg.onklick("More1", function(){ return rg.amount_over(1); });
						
						
						rg.onklick("done", function(){ return rg.sale_complete();} );
						rg.onklick("cash",  function(){ return rg.exact_change();} );
						rg.onklick("print",  function(){ return rg.receipt();} );
						
						
						rg.onklick("CreateRow",  function(){ return rg.CreateRow(); });
						rg.onklick("ReadRow",  function(){ return rg.ReadRow_test(); });
						rg.onklick("UpdateRow",  function(){ return rg.UpdateRow(); });
						rg.onklick("DeleteRow",  function(){ return rg.DeleteRow(); });
						rg.onklick("ShowAll",  function(){ return rg.ReadAll(); });
						rg.onklick("Clear",  function(){ return rg.docWrite("","output").docWrite("","outputLine"); });
						
						
					
	  });

	  
