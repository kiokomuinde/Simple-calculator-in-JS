
//Getting the history of the numbers pressed by the user
function getHistory(){
	return document.getElementById("history-value").innerText;
}

//Printing the history above the output
function printHistory(num){
	document.getElementById("history-value").innerText = num;
}

//Finction to get the result of the equations typed in by the user.
function getOutput(){
	return document.getElementById("output-value").innerText;
}


//Printing the output of our arithmetic equations.
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText = num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}


//Function to give the user a formatted number.(A comma separated value).
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}


//Reversing the output back to normal for manipulation.
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}


//Adding event listeners to listen to both operator and number mouse clicks. 
var operator = document.getElementsByClassName("operator");
for(var j =0;j<operator.length;j++){
	operator[j].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();

			//Checking if output has a value
			if(output){
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();

			//Replacing the previous operator if two operators follow each other.
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}

			//Checking for both output and history for disabling/enabling operators.
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

var number = document.getElementsByClassName("number");
for(var j =0;j<number.length;j++){
	number[j].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());

		//Checking if the output is a number.
		if(output!=NaN){ 
			output=output+this.id;
			printOutput(output);
		}
	});

	number[j].addEventListener('keydown',function(){
		var output=reverseNumberFormat(getOutput());

		//Checking if the output is a number.
		if(output!=NaN){ 
			output=output+this.id;
			printOutput(output);
		}
	});
}
