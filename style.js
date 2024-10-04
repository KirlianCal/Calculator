// Updates what is being displayed when a button is pressed
function update(value) 
{
    let display = document.getElementById('display');
    display.value += value; // Adds the pressed button value to the display
}

// Resets what is being displayed when 'C' is pressed
function clearDisplay() 
{
    document.getElementById('display').value = '';
}

function clearEntry() 
{
    let display = document.getElementById('display').value;
    // Find the index of the last operator (+, -, *, /)
    let lastOperatorIndex = Math.max(
        display.lastIndexOf('+'), 
        display.lastIndexOf('-'), 
        display.lastIndexOf('*'), 
        display.lastIndexOf('/')
    );
    // If there is an operator, slice off the part after the last operator
    if (lastOperatorIndex !== -1) 
    {
        document.getElementById('display').value = display.slice(0, lastOperatorIndex + 1);
    } 
    else 
    {
        // If no operator is found, clear everything
        document.getElementById('display').value = '';
    }
}

// Deletes the last character entered
function del() 
{
    let display = document.getElementById('display');
    display.value = display.value.substring(0, display.value.length - 1);
}

// Calculates the result of the expression in the display
function calculate() 
{
    let display = document.getElementById('display').value;

    if (display.indexOf('SQRT')!==-1){
        let numStr=display.split('SQRT')[1].trim();
        let num=Number(numStr);
        if (!isNaN(num)){
            display=Math.sqrt(num).toString();
            document.getElementById('display').value=display;
            return;
        }
    }
    if(display.indexOf('POW')!==-1){
        const numStr=display.split('POW')[1].trim();
        let num=Number(numStr);
        if (!isNaN(num)){
            display=Math.pow(num,2).toString();
            document.getElementById('display').value=display;
            return;
        }
    }
    
    // Split the expression: numbers and operators
    let numbers = [];
    let operators = [];
    let currentNumber = '';

    for (let i = 0; i < display.length; i++) 
    {
        const char = display[i]; // Get the current character from the display string for processing

        if (!isNaN(char) || char === '.') 
        {
            // If the character is a number, or a decimal point, add it to the currentNumber
            currentNumber += char;
        } 
        else 
        {
            // If an operator, push the currentNumber and operator to their array
            if (currentNumber) 
            {
                numbers.push(parseFloat(currentNumber));
                currentNumber = '';
            }

            operators.push(char); // Add the current operator to the operators array
        }
    }

    // Push the last number if there is one (add the last number extracted from the input string to the numbers array,)
    if (currentNumber) 
    {
        numbers.push(+currentNumber); // Convert currentNumber to a number and add it to the numbers array
    }

    // Calculations for mult and division
    for (let i = 0; i < operators.length; i++) 
    {
        const operator = operators[i];
        if (operator === '*' || operator === '/') 
        {
            const a = numbers[i];
            const b = numbers[i + 1];
            let result = operator === '*' ? a * b : a / b; // Calculate the result for multiplication or division
            numbers.splice(i, 2, result); // Replace the two numbers with the result
            operators.splice(i, 1); // Remove the operator
            i--; // Decrement index to check the new operator at this index again
        }
    }

    // Calculations for addition and subtraction
    let total = numbers[0]; 
    for (let i = 0; i < operators.length; i++) 
    {
        const operator = operators[i];
        const nextNumber = numbers[i + 1];
        if (operator === '+') 
        {
            total += nextNumber;
        } 
        else if (operator === '-') 
        {
            total -= nextNumber;
        }
    }

    // Update the display with the result
    display = total.toString();
    document.getElementById('display').value = display;
}