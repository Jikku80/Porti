(function () {
    let portGuide = document.querySelector(".port__guide__sec");
    let inviGuide = document.querySelector(".invi__guide__sec");
    let menuGuide = document.querySelector(".menu__guide__sec");
    let catalogGuide = document.querySelector(".catalog__guide__sec");
    let broGuide = document.querySelector(".bro__guide__sec");

    let fcircle = document.querySelector(".firstround");

    let pHead = document.querySelector(".port__guide__head");
    let iHead = document.querySelector(".invi__guide__head");
    let mHead = document.querySelector(".menu__guide__head");
    let cHead = document.querySelector(".catalog__guide__head");
    let bHead = document.querySelector(".bro__guide__head");

    window.addEventListener("scroll", () => {
        let bod = document.body.getBoundingClientRect();

        if (bod.y < -10){
            if (bod.y > -400){
                fcircle.style.top = Math.abs(bod.y) + "px";
            }
        }
    })

    portGuide.addEventListener("mouseover", () => {
        fcircle.style.backgroundColor = "rgb(54, 219, 54)"
        pHead.style.color = "rgb(54, 219, 54)"
        fcircle.style.top = "20px";
    })

    portGuide.addEventListener("mouseout", () => {
        fcircle.style.backgroundColor = "#759675"
        pHead.style.color = "rgb(68, 68, 68)"
    })

    inviGuide.addEventListener("mouseover", () => {
        fcircle.style.backgroundColor = "rgb(54, 219, 54)"
        iHead.style.color = "rgb(54, 219, 54)"
        fcircle.style.top = "140px";
    })

    inviGuide.addEventListener("mouseout", () => {
        fcircle.style.backgroundColor = "#759675"
        iHead.style.color = "rgb(68, 68, 68)"
    })

    menuGuide.addEventListener("mouseover", () => {
        fcircle.style.backgroundColor = "rgb(54, 219, 54)"
        mHead.style.color = "rgb(54, 219, 54)"
        let bod = pHead.getBoundingClientRect();
        fcircle.style.top = Math.abs(bod.y) + "px";
    })

    menuGuide.addEventListener("mouseout", () => {
        fcircle.style.backgroundColor = "#759675"
        mHead.style.color = "rgb(68, 68, 68)"
    })

    catalogGuide.addEventListener("mouseover", () => {
        fcircle.style.backgroundColor = "rgb(54, 219, 54)"
        cHead.style.color = "rgb(54, 219, 54)"
        let bod = iHead.getBoundingClientRect();
        fcircle.style.top = Math.abs(bod.y) + "px";
    })

    catalogGuide.addEventListener("mouseout", () => {
        fcircle.style.backgroundColor = "#759675"
        cHead.style.color = "rgb(68, 68, 68)"
    })

    broGuide.addEventListener("mouseover", () => {
        fcircle.style.backgroundColor = "rgb(54, 219, 54)"
        bHead.style.color = "rgb(54, 219, 54)"
        let bod = mHead.getBoundingClientRect();
        fcircle.style.top = Math.abs(bod.y) + "px";
    })

    broGuide.addEventListener("mouseout", () => {
        fcircle.style.backgroundColor = "#759675"
        bHead.style.color = "rgb(68, 68, 68)"
    })
})();