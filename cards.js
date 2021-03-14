const minus = document.getElementsByClassName("minus");
console.log(minus);
for(let i=0;i<minus.length;i++){
    const elem = minus[i];
    elem.onclick = function(){
        alert("jsdfg");
    }
  }