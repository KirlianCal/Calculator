function getValue(event) 
{
    let buttonValue = event.target.textContent; // or event.target.innerText
    console.log(buttonValue); // This will log the value of the pressed button
}