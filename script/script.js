//grab input and buttons
let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');

let displayString = "";
let buttonArray = Array.from(buttons);  //creating array from buttons 

//looping through individual button
buttonArray.forEach((button) => {
    //addding an event listener to listen for clicks
    button.addEventListener('click', (e) => {

        try {
            //if equal button is clicked then evaluate the expression using inbuilt eval() function
            //eval() evaluates string to mathematical expression
            if(e.target.innerHTML == '='){
                displayString = eval(ifPercentage(displayString));
                display.value = displayString;
            }
            //if all clear button is clicked then replace displayString with empty string
            else if(e.target.innerHTML == "AC"){
                displayString = "";
                display.value = displayString;
            }
            //if delete button is clicked remove last character from displayString
            else if(e.target.innerHTML == "DEL"){
                displayString = displayString.substring(0,displayString.length-1);
                display.value = displayString;
            }
            else if(e.target.innerHTML == "( )"){
                if(
                    displayString.indexOf("(") == -1 || 
                    displayString.indexOf("(") != -1 && 
                    displayString.indexOf(")") != -1 && 
                    displayString.lastIndexOf("(") < displayString.lastIndexOf(")")
                    ){
                        displayString += "(";
                        display.value = displayString;
                    }
                else if(
                    displayString.indexOf("(") != -1 && 
                    displayString.indexOf(")") == -1 || 
                    displayString.indexOf("(") != -1 && 
                    displayString.indexOf(")") != -1 && 
                    displayString.lastIndexOf("(") > displayString.lastIndexOf(")")
                    ){
                        displayString += ")";
                        display.value = displayString;
                    }
            }
            //else keep on adding characters to the expression
            else{
                displayString += e.target.innerHTML;
                display.value = displayString;
            }

        } catch (error) {
            console.error(error);
            displayString = "Error";
            display.value = displayString;
        }
    })
})


//function which checks if input conatins %
const ifPercentage = (displayString) => {
    let displayArray = displayString.split(""); //splitting string into array 

    for(let i=0;i<displayArray.length; i++){
        if(displayArray[i] == "%"){
            displayArray[i] = "/100";  //replacing % sign with /100
        }
    }

    return displayArray.join("");  //joining back to array
}