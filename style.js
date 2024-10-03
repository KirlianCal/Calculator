function del(){
    let display = document.getElementById('display');
    display.value=display.value.substring(0,display.value.length-1);
    
}
function clearDisplay(){
    let display = document.getElementById('display');
    index="";
    display.value=index;
}