(function () {
    let portGuide = document.querySelector(".port__guide__sec");
    let inviGuide = document.querySelector(".invi__guide__sec");
    let menuGuide = document.querySelector(".menu__guide__sec");
    let catalogGuide = document.querySelector(".catalog__guide__sec");
    let broGuide = document.querySelector(".bro__guide__sec");

    let fcircle = document.querySelector(".firstround");
    let scircle = document.querySelector(".secround");
    let tcircle = document.querySelector(".thirdround");
    let focircle = document.querySelector(".fouthround");
    let ficircle =document.querySelector(".fifthround");

    let pHead = document.querySelector(".port__guide__head");
    let iHead = document.querySelector(".invi__guide__head");
    let mHead = document.querySelector(".menu__guide__head");
    let cHead = document.querySelector(".catalog__guide__head");
    let bHead = document.querySelector(".bro__guide__head");

    portGuide.addEventListener("mouseover", () => {
        fcircle.style.backgroundColor = "rgb(54, 219, 54)"
        pHead.style.color = "rgb(54, 219, 54)"
    })

    portGuide.addEventListener("mouseout", () => {
        fcircle.style.backgroundColor = "#759675"
        pHead.style.color = "rgb(68, 68, 68)"
    })

    inviGuide.addEventListener("mouseover", () => {
        scircle.style.backgroundColor = "rgb(54, 219, 54)"
        iHead.style.color = "rgb(54, 219, 54)"
    })

    inviGuide.addEventListener("mouseout", () => {
        scircle.style.backgroundColor = "#759675"
        iHead.style.color = "rgb(68, 68, 68)"
    })

    menuGuide.addEventListener("mouseover", () => {
        tcircle.style.backgroundColor = "rgb(54, 219, 54)"
        mHead.style.color = "rgb(54, 219, 54)"
    })

    menuGuide.addEventListener("mouseout", () => {
        tcircle.style.backgroundColor = "#759675"
        mHead.style.color = "rgb(68, 68, 68)"
    })

    catalogGuide.addEventListener("mouseover", () => {
        focircle.style.backgroundColor = "rgb(54, 219, 54)"
        cHead.style.color = "rgb(54, 219, 54)"
    })

    catalogGuide.addEventListener("mouseout", () => {
        focircle.style.backgroundColor = "#759675"
        cHead.style.color = "rgb(68, 68, 68)"
    })

    broGuide.addEventListener("mouseover", () => {
        ficircle.style.backgroundColor = "rgb(54, 219, 54)"
        bHead.style.color = "rgb(54, 219, 54)"
    })

    broGuide.addEventListener("mouseout", () => {
        ficircle.style.backgroundColor = "#759675"
        bHead.style.color = "rgb(68, 68, 68)"
    })
})();