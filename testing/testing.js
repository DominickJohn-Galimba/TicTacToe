const testing = document.getElementById("test");
let collection = [];
function logfirstIndex(){
    return console.log(collection[0]);
}

testing.addEventListener("click", ()=>{
    console.log("hello")
    window.location.reload();
})

console.log(logfirstIndex());
