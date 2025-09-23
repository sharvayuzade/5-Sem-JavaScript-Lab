function add() {
let a = parseFloat(document.getElementById("a").value);
let b = parseFloat(document.getElementById("b").value);
document.getElementById("result").innerHTML = "Sum: " + (a + b);
}