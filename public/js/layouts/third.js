let leftNext = document.getElementById("left__next");
let rightNext = document.getElementById("right__next");

let prevLNext = document.getElementById("prevl__next");
let prevRNext = document.getElementById("prevr__next");

let cleftNext = document.getElementById("cleft__next");
let crightNext = document.getElementById("cright__next");

let aboutSec = document.querySelector(".about__sec");
let prevSec = document.querySelector(".prev__sec");
let contactSec = document.querySelector(".contact__sec");

rightNext.addEventListener("click", () => {
    aboutSec.classList.add("hidden");
    contactSec.classList.add("hidden");
    prevSec.classList.remove("hidden");
})

leftNext.addEventListener("click", () => {
    aboutSec.classList.add("hidden");
    prevSec.classList.add("hidden");
    contactSec.classList.remove("hidden");
})

prevRNext.addEventListener("click", () => {
    prevSec.classList.add("hidden");
    aboutSec.classList.add("hidden");
    contactSec.classList.remove("hidden");
})

prevLNext.addEventListener("click", () => {
    prevSec.classList.add("hidden");
    contactSec.classList.add("hidden");
    aboutSec.classList.remove("hidden");
})

crightNext.addEventListener("click", () => {
    contactSec.classList.add("hidden");
    prevSec.classList.add("hidden");
    aboutSec.classList.remove("hidden");
})

cleftNext.addEventListener("click", () => {
    aboutSec.classList.add("hidden");
    contactSec.classList.add("hidden");
    prevSec.classList.remove("hidden");
});

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

// observer.observe(cont, prv, abt);

const fullImg = document.querySelectorAll('.imgFull');

fullImg.forEach(img => {
    img.addEventListener("click", () => {
        window.open(img.src)
    })
});

(function () {
    let fontColor = document.querySelector(".main").id;
    let fontFam = document.querySelector(".about__sec").id;
    let backColor = document.querySelector(".about__sec__other").id;
    let headColor = document.querySelector(".prev__next").id;
    let focusColor = document.querySelector(".prev__sec__other").id;
    let secHeadColor = document.querySelector(".prev__first").id;
    let mainSec = document.querySelector(".main");
    let nav = document.querySelector(".topHead");
    let about = document.querySelector(".about__sec__other");
    let previous = document.querySelector(".prev__sec__other");
    let contact = document.querySelector(".contact__sec__other");
    let headers = document.querySelectorAll(".headFont");
    let tophead = document.querySelectorAll(".topHead");
    let ans = document.querySelectorAll(".ansFont");
    let secHead = document.querySelectorAll(".secHead");
    let contbox = document.querySelectorAll(".contact__sec__box");
    let prevBtn = document.querySelector(".firstPrev");
    let nextBtn = document.querySelector(".firstNext");

    mainSec.style.backgroundColor = backColor;
    nav.style.color = focusColor;
    previous.style.borderColor = focusColor;
    contbox.forEach(item => {
        item.style.color = headColor;
        item.style.borderColor = focusColor;
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = focusColor;
            item.style.color = headColor;
        })

        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "transparent";
            item.style.color = headColor;
        })
    })

    tophead.forEach(item => {
        item.style.color = focusColor
    })

    secHead.forEach(item => {
        item.style.color = secHeadColor
    })

    about.style.borderColor = focusColor;
    contact.style.borderColor = focusColor

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

paginate(".firstNext", ".firstPrev", ".accomp__cont", ".accomp__cont__card", "#thirdImgCont");