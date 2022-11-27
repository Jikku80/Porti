// const box = document.querySelector('.bgbox');
const cont = document.querySelector('#contact');
const abt = document.getElementById("about");
const abtbody = document.querySelector(".about__body");
const prv = document.getElementById("previous");
const prev = document.querySelector(".prev");


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const box = entry.target.querySelector(".bgbox");

        if (entry.isIntersecting) {
            box.classList.add('fadein-animation');
            // prev.classList.add('fadein-animation');
            // abtbody.classList.add('fadein-animation');
            return;
        }
        box.classList.remove('fadein-animation');
        // prev.classList.remove('fadein-animation');
        // abtbody.classList.remove('fadein-animation');
    })
})

observer.observe(cont, prv, abt);

// const fullImg = document.querySelectorAll('.imgFull');

// fullImg.forEach(img => {
//     img.addEventListener("click", () => {
//         window.open(img.src)
//     })
// });

(function () {
    let fontColor = document.querySelector(".main").id;
    let fontFam = document.querySelector(".navbar").id;
    let backColor = document.querySelector(".navbar__list").id;
    let headColor = document.querySelector(".portfoName").id;
    let focusColor = document.querySelector(".topFirst").id;
    let secHeadColor = document.querySelector(".about__body").id;
    let mainSec = document.querySelector(".main");
    let nav = document.querySelector(".navbar");
    let about = document.getElementById("about");
    let previous = document.getElementById("previous");
    let contact = document.getElementById("contact");
    let heds = document.querySelectorAll(".dyF");
    let headers = document.querySelectorAll(".headFont");
    let ans = document.querySelectorAll(".ansFont");
    let contbox = document.querySelectorAll(".contbox");
    let prevBtn = document.querySelector(".firstPrev");
    let nextBtn = document.querySelector(".firstNext");

    mainSec.style.backgroundColor = backColor;
    nav.style.backgroundColor = focusColor;
    previous.style.backgroundColor = focusColor;
    heds.forEach(item => {
        item.style.color = focusColor;
    })
    contbox.forEach(item => {
        item.style.backgroundColor = focusColor;
        item.style.color = headColor;
    })

    about.style.backgroundColor = secHeadColor;

    mainSec.style.color = fontColor;
    mainSec.style.fontFamily = fontFam;

    headers.forEach(items => {
        items.style.color = headColor;
    })

    ans.forEach(items => {
        items.style.color = fontColor;
    })

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

paginate(".firstNext", ".firstPrev", ".accomp__cont", ".accomp__cont__card", "#firstImgCont");


