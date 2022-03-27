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
})