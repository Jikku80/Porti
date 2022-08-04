(function () {
    let fontColor = document.querySelector(".main__cont").id;
    let fontFam = document.querySelector(".main__fifth__head").id;
    let backColor = document.querySelector(".main__fifth__sub").id;
    let headColor = document.querySelector(".ppname").id;
    let focusColor = document.querySelector(".main__pic").id;
    let secHeadColor = document.querySelector(".ppabt").id;
    let mainSec = document.querySelector(".main__cont");
    let nav = document.querySelectorAll(".headTop");
    let about = document.querySelectorAll(".fifth");
    let headers = document.querySelectorAll(".headFont");
    let ans = document.querySelectorAll(".ansFont");
    let contbox = document.querySelectorAll(".fif__box");

    mainSec.style.backgroundColor = secHeadColor;

    about.forEach(item => {
        item.style.fontFamily = fontFam;
        item.style.backgroundColor = backColor;
    })

    contbox.forEach(item => {
        item.style.color = headColor;
        item.style.borderColor = focusColor;

        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = focusColor;
        })

        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "transparent";
        })

    })

    nav.forEach(item => {
        item.style.color = focusColor;
        item.style.fontFamily = fontFam;
    })

    mainSec.style.color = fontColor;
    mainSec.style.fontFamily = fontFam;

    headers.forEach(items => {
        items.style.color = headColor;
    })

    ans.forEach(items => {
        items.style.color = fontColor;
    })


})();