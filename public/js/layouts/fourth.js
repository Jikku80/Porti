
(function () {
    let ancSecond = document.querySelector(".anc__second")
    let mainHead = document.querySelector(".main__header")
    let aboutSection = document.querySelector(".main__about__section")
    let fh = document.querySelector(".fourth__head")

    ancSecond.addEventListener("click", () => {
        mainHead.classList.add("hide");
        fh.classList.add("hide");
        aboutSection.classList.remove("hide");
    })

    let fourthClose = document.getElementById("fourthClose");

    fourthClose.addEventListener("click", () => {
        aboutSection.classList.add("hide");
        fh.classList.remove("hide");
        mainHead.classList.remove("hide");
    })

    let ancThird = document.querySelector(".anc__third");
    let prevSection = document.querySelector(".main__prev__section");

    ancThird.addEventListener("click", () => {
        mainHead.classList.add("hide");
        fh.classList.add("hide");
        prevSection.classList.remove("hide");
    })

    let fourthSecClose = document.getElementById("fourthSecClose");
    fourthSecClose.addEventListener("click", () => {
        prevSection.classList.add("hide");
        mainHead.classList.remove("hide");
        fh.classList.remove("hide");
    })

    let ancFourth = document.querySelector(".anc__last");
    let contSection = document.querySelector(".main__cont__section");

    ancFourth.addEventListener("click", () => {
        mainHead.classList.add("hide");
        fh.classList.add("hide");
        contSection.classList.remove("hide");
    })

    let fourthThirdClose = document.getElementById("fourthThirdClose");
    fourthThirdClose.addEventListener("click", () => {
        contSection.classList.add("hide");
        mainHead.classList.remove("hide");
        fh.classList.remove("hide");
    })

    const fullImg = document.querySelectorAll('.imgFull');

    fullImg.forEach(img => {
        img.addEventListener("click", () => {
            window.open(img.src)
        })
    })
})()

