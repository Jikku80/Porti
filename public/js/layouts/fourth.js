
(function () {
    let ancSecond = document.querySelector(".anc__second")
    let mainHead = document.querySelector(".main__header")
    let aboutSection = document.querySelector(".main__about__section")

    ancSecond.addEventListener("click", () => {
        mainHead.classList.add("hide");
        aboutSection.classList.remove("hide");
    })

    let fourthClose = document.getElementById("fourthClose");

    fourthClose.addEventListener("click", () => {
        aboutSection.classList.add("hide");
        mainHead.classList.remove("hide");
    })

    let ancThird = document.querySelector(".anc__third");
    let prevSection = document.querySelector(".main__prev__section");

    ancThird.addEventListener("click", () => {
        mainHead.classList.add("hide");
        prevSection.classList.remove("hide");
    })

    let fourthSecClose = document.getElementById("fourthSecClose");
    fourthSecClose.addEventListener("click", () => {
        prevSection.classList.add("hide");
        mainHead.classList.remove("hide");
    })

    let ancFourth = document.querySelector(".anc__last");
    let contSection = document.querySelector(".main__cont__section");

    ancFourth.addEventListener("click", () => {
        mainHead.classList.add("hide");
        contSection.classList.remove("hide");
    })

    let fourthThirdClose = document.getElementById("fourthThirdClose");
    fourthThirdClose.addEventListener("click", () => {
        contSection.classList.add("hide");
        mainHead.classList.remove("hide");
    })
})()