(function () {
    let theme = document.querySelector(".payUsrTheme").innerText;
    let cont = document.querySelector(".main__cont");
    let lod = document.querySelector(".loader");
    let td = document.querySelectorAll(".td");

    if (theme == "red") {
        document.body.style.backgroundColor = "crimson";
        cont.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
    }
    else if (theme == "dark") {
        document.body.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
        cont.style.backgroundColor = "black";

    }
    else if (theme == "white") {
        document.body.style.backgroundColor = "white";
        cont.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        cont.style.color = "black";
        td.forEach(item => {
            item.style.color = "black";
        })
    }
    else {
        console.log("Hola from Porti")
    }
})();