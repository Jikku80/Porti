(function () {
    let bgCol = document.querySelector(".main__sixth").id;
    let fcColor = document.querySelector(".fcolor").id;
    let fontCol = document.querySelector(".main__sixth__prev").id;
    let headCol = document.querySelector(".main__prev__bod").id;
    let secHeadColor = document.querySelector(".main__sixth__about").id;
    let fontFam = document.querySelector(".main__sixth__cont").id;
    let mainCont = document.querySelector(".main__sixth");
    let primeHead = document.querySelectorAll(".firstHalf");
    let subHead = document.querySelectorAll(".otherHalf");
    let secHead = document.querySelectorAll(".secHead");
    let touchCont = document.querySelector(".main__sixth__cont");
    let aboutCont = document.querySelector(".main__sixth__about");
    let prevCont = document.querySelector(".main__sixth__prev");
    let sixBox = document.querySelectorAll(".sixth__box");
    let cont = document.querySelectorAll(".ans");
    primeHead.forEach(items => {
        items.style.color = headCol;
    })
    subHead.forEach(items => {
        items.style.color = fcColor;
    })
    touchCont.style.borderColor = fcColor;
    aboutCont.style.borderColor = fcColor;
    prevCont.style.borderColor = fcColor;
    sixBox.forEach(items => {
        items.addEventListener("mouseover", () => {
            items.style.backgroundColor = fcColor;
            items.style.color = fontCol;
        })
        items.addEventListener("mouseout", () => {
            items.style.backgroundColor = bgCol;
            items.style.color = fontCol;
        })
        items.style.borderColor = fcColor;
    })
    mainCont.style.color = fontCol;
    mainCont.style.backgroundColor = bgCol;
    mainCont.style.fontFamily = fontFam;
    secHead.forEach(items => {
        items.style.color = secHeadColor;
    })
    cont.forEach(items => {
        items.style.color = fontCol;
    })
})();




