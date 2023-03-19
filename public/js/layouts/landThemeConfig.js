(function () {
    let theme = document.querySelector(".urTheme").innerText;
    let bodsec = document.querySelector(".land__whole__sec");
    let sec = document.querySelectorAll(".redbtn");
    let label = document.querySelectorAll(".form__label");
    let inpt = document.querySelectorAll(".form__input");
    let lod = document.querySelector(".loader");
    let td = document.querySelectorAll('.td');
    let bigb = document.querySelectorAll(".bigb");
    let landfo = document.querySelector(".land__goto");
    let upform = document.querySelectorAll(".upform");

    if (theme == "red") {
        bodsec.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        document.body.style.backgroundColor = "crimson";
        inpt.forEach(item => {
            item.style.borderColor = "white";
        })
        sec.forEach(item => {
            item.style.borderColor = "white";
        })
        bigb.forEach(item => {
            item.style.animation = "blackShine 4s ease-in-out forwards infinite";
        })
    }
    else if (theme == "dark") {
        bodsec.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
        document.body.style.backgroundColor = "black";

    }
    else if (theme == "porti") {
        document.body.style.backgroundColor = "rgb(0, 26,0)"
    }
    else if (theme == "white") {
        bodsec.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        sec.forEach(item => {
            item.style.color = "black";
        })
        label.forEach(item => {
            item.style.color = "black";
        })
        inpt.forEach(item => {
            item.style.color = "black";
        })
        td.forEach(item => {
            item.style.color = "black";
        })
        bigb.forEach(item => {
            item.style.color = "black";
            item.style.animation = "blackShine 4s ease-in-out forwards infinite";
        })
        let footersec = document.querySelectorAll(".footer__anch");
        footersec.forEach(item => {
            item.style.color = "gray";
        })
        landfo.style.color = "black"
        landfo.style.animation = "blackShine 4s ease-in-out forwards infinite"
        upform.forEach(item => {
            item.style.animation = "blackShine 4s ease-in-out forwards infinite"
            item.style.color = "black";
        })
    }
    else {
        console.log("Hola from Porti")
    }
})();