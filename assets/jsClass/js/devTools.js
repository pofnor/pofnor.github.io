const logTable = [
    {name:'Ali',instagram:'@Ali'},
    {name:'Ahmad',instagram:'@Ahmad'},
    {name:'Amir',instagram:'@Amir'},
    {name:'Maryam',instagram:'@Maryam'}
];

function createLi(){
    const result=document.getElementById("result");
    result.textContent = "Open Performance Panel and see the Timings(Performance Mark 'Create 10000 Li')";
    const result2=document.getElementById("result2");
    result2.textContent = "Open Memory Panel and see the Allocation sampling and click on start";
    let ul = document.createElement("ul");
    performance.mark("Li-Begin");
    for(let i=0;i<10000;i++){
        let li = document.createElement("li");
        ul.appendChild(li);
    }
    performance.mark("Li-End");
    performance.measure("Create 10000 Li","Li-Begin","Li-End");
}
function calculate(){
    const result=document.getElementById("result");
    result.textContent = "Open Performance Panel and see the Timings(Performance Mark 'For Loop')";
    const result2=document.getElementById("result2");
    result2.textContent = "";
    let temp=0;
    performance.mark("For-Begin");
    for(let i=0;i<10000000;i++){
        temp +=i*10000;        
        temp -=i;
    }    
    performance.mark("For-End");
    performance.measure("For Loop","For-Begin","For-End");
}
function logConsole(){
    const result=document.getElementById("result");
    result.textContent = "Open Console Panel by pressing Control+Shift+J and see the result";
    const result2=document.getElementById("result2");
    result2.textContent = "Also you can open Console Panel with Esc when your the DevTools is opening";
    console.log('Hello');    
    console.group("Log Levels");    
    console.log("I am logged using console.log()");
    console.warn("I am logged using console.warn()");
    console.error("I am logged using console.error()");
    console.groupEnd("Log Levels");
    console.group("How to find and change HTML Elements");
    console.groupCollapsed("Find");
    console.log("document.querySelectorAll('button')");
    console.groupCollapsed("Change");
    console.log("document.querySelector('h2').innerHTML = 'Change by console';");
    console.groupEnd("Change and find HTML Elements");
}
function logVariables(){    
    console.clear();
    console.groupCollapsed("Log Variables");
    console.log("go to next line with Shift+Enter");
    console.groupCollapsed("Source Code");
    console.log("let counter = 0;");
    console.log("$('#createLi').addEventListener('click',() => {");
    console.log("console.log(`I was pressed , Create 10000 Li , ${++counter} times by now`);");
    console.log("});");    
    console.groupEnd("Source Code");    
    console.groupEnd("Log Variables");
    console.groupCollapsed("Table");
    console.log("we declare a logTable object with some data");
    console.log("console.log(logTable);");        
    console.log("console.table(logTable);");    
    console.groupEnd("Table");
    console.groupCollapsed("Json");
    console.log("HTML");
    console.log("console.log(document.head);");    
    console.log("Json");
    console.log("console.dir(document.head);");    
    console.groupEnd("Json");
    console.groupCollapsed("Count");
    console.log("console.count();");        
    console.log("console.countReset();");    
    console.groupEnd("Count");
    console.groupCollapsed("Time");
    console.warn("console.time();");
    console.time();       
    console.log("run the calculate() and result is the Runtime:")
    calculate();
    console.warn("console.timeEnd();");
    console.timeEnd();
    console.groupEnd("Time");
    const result=document.getElementById("result");
    result.textContent = "";
}