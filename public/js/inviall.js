(function () {
    let theme = document.querySelector(".uthemer").innerText;
    let td = document.querySelector(".td");
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
        let footersec = document.querySelectorAll(".footer__anch");
        footersec.forEach(item => {
            item.style.color = "gray";
        })
    }
    else {
        console.log("Hola from Porti")
    }
})();