(function () {
    let theme = document.querySelector(".uthemer").innerText;

    if (theme == "red") {
        document.body.style.backgroundColor = "crimson";
    }
    else if (theme == "dark") {
        document.body.style.backgroundColor = "black";

    }
    else if (theme == "white") {
        document.body.style.backgroundColor = "white";

    }
    else {
        console.log("Hola from Porti")
    }
})();