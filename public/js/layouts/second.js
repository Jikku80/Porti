(function () {
    let bgColor = document.querySelector(".sec").id;
    let headColor = document.querySelector(".main").id;
    let fontColor = document.querySelector(".bgCover").id;
    let focusColor = document.querySelector(".portName").id;
    let fontFam = document.querySelector(".fontFam").id;
    let secHeadColor = document.querySelector(".mid").id;
    let mainBod = document.querySelector(".main");
    let hm = document.querySelector(".home");
    let portName = document.querySelector(".portName");
    let aboutSec = document.getElementById("abt");
    let preWork = document.getElementById("prevWork");
    let preSec = document.getElementById("pre");
    let headFont = document.querySelectorAll(".headFont");
    let ansFont = document.querySelectorAll(".ansFont");
    let contBox = document.querySelectorAll(".cont__box");
    let prevBtn = document.querySelector(".prev__addimgSec");
    let nextBtn = document.querySelector(".next__addimgSec");

    mainBod.style.backgroundColor = bgColor;
    mainBod.style.fontFamily = fontFam;
    mainBod.style.color = fontColor;

    headFont.forEach(item => {
        item.style.color = headColor;
    })

    ansFont.forEach(item => {
        item.style.color = fontColor;
    });

    aboutSec.style.backgroundColor = focusColor;
    hm.style.color = focusColor;
    portName.style.color = focusColor;
    contBox.forEach(item => {
        item.style.borderColor = focusColor;
        item.style.color = focusColor;

        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = focusColor;
            item.style.color = headColor;
            item.style.borderColor = focusColor;
        })

        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = bgColor;
            item.style.color = focusColor;
            item.style.borderColor = focusColor;
        })
    })

    preWork.style.borderColor = focusColor;
    preWork.style.color = focusColor;
    preWork.addEventListener("mouseover", () => {
        preWork.style.backgroundColor = focusColor;
        preWork.style.color = headColor;
    })

    preWork.addEventListener("mouseout", () => {
        preWork.style.backgroundColor = "transparent";
        preWork.style.color = focusColor;
    })

    preSec.style.backgroundColor = secHeadColor;

    nextBtn.style.color = fontColor;
    nextBtn.style.borderColor = headColor;

    nextBtn.addEventListener("mouseover", () => {
        nextBtn.style.backgroundColor = headColor;
    })

    nextBtn.addEventListener("mouseout", () => {
        nextBtn.style.backgroundColor = "transparent";
    })

    prevBtn.style.color = fontColor;
    prevBtn.style.borderColor = headColor;

    prevBtn.addEventListener("mouseover", () => {
        prevBtn.style.backgroundColor = headColor;
    })

    prevBtn.addEventListener("mouseout", () => {
        prevBtn.style.backgroundColor = "transparent";
    })
})();

paginate(".next__addimgSec", ".prev__addimgSec", ".prev__cont__sub", "port__images", "#imgCont")