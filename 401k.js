var lables =["Current Age:" ,"Age at Retirement:", "Annual Income/Salary:","Expected Yearly Income/Salary Increase (%):","Current 401K Balance:", "Contribution by Employer (% of Income/Salary):", "Expected Anual Return (%):"];

var inputId =["YourAge", "RetirementAge", "Income","Increase","Balance","Contribution","Return"];

var defaultVal =["25","65","60000","3","5000","10","6"];
var createButtons=function(){

var inner=" ";
var calc= document.getElementById("calculator");

for (i=0; i < lables.length; i++){
inner +="<form class=\"form-horizontal\"><div class=\"form-group\"><label class=\"control-label col-sm-5\"> "+ lables[i]+ "</label><div class=\"col-sm-5\"><input  class=\"form-control\" id=\""+inputId[i]+"\" value=\""+defaultVal[i]+"\"></div></div></form>";
}
console.log(inner);
calc.innerHTML=inner;

};


 var btn = document.getElementById("Calculate");
      function calculate() {
         var income = Number(document.getElementById("Income").value);
		 var your_age = Number(document.getElementById("YourAge").value);
		 var retire_age = Number(document.getElementById("RetirementAge").value);
		 var increase = Number(document.getElementById("Increase").value);
		 var curr_balance = Number(document.getElementById("Balance").value);
		 var contribution = Number(document.getElementById("Contribution").value);
		 var exp_return = Number(document.getElementById("Return").value);
		 // Find number of years required
		 var num_years = retire_age - your_age;
		 // Make array of income and contribution each year
		var income_arr = [];
		var contr_arr = [];
		var balance_arr = [];
		var interest_arr = [];
		income_arr[0] = income;
		contr_arr[0] = income * (contribution / 100);
		interest_arr[0] = curr_balance * (increase / 100);		
		balance_arr[0] = curr_balance + contr_arr[0] + interest_arr[0];
		
		for(i = 1; i < num_years; i++)
		{
			var prev_income = income_arr[i-1];			
			income_arr[i] = prev_income + (prev_income * (increase / 100));
			contr_arr[i] = income_arr[i] * (contribution / 100);
			interest_arr[i] = balance_arr[i-1] * (exp_return / 100);
			balance_arr[i] = balance_arr[i-1] + interest_arr[i] + contr_arr[i]
		}

		 // Make array for years
    var years = []
    for(i = 0; i < num_years; i++)
    {
        years[i] = i;
    }
    // Make Chart
    new Chartist.Line('#chart1', {
      labels: years,
      series: [balance_arr]
    }, {
      low: 0,
      showArea: true
    });
		
       
       document.getElementById("Output").innerHTML = " After " + num_years + " years: $" + balance_arr[num_years - 1].formatMoney(2);
      }

	Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
