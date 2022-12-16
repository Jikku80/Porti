(function () {
    let theme = document.querySelector(".uthemer").innerText;
    let td = document.querySelector(".td");
    let lbtn = document.querySelector(".limebtn");
    let lod = document.querySelector(".loader");
    if (theme == "red") {
        document.body.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
    }
    else if (theme == "dark") {
        document.body.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
    }
    else if (theme == "white") {
        document.body.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        td.style.color = "black";
        lbtn.style.color = "black"
    }
    else {
        console.log("Hola from Porti")
    }
})();