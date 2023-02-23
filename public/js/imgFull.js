const fullImg = document.querySelectorAll('.imgFull');
let imgsec = document.querySelector(".fullimg__sec");
let imgbod = document.querySelector(".fullimg__bod");
let cancelimgsec = document.querySelector(".cancelimgsec");

fullImg.forEach(img => {
    img.addEventListener("click", () => {
        imgsec.classList.remove("hidden");
        imgbod.innerHTML = "";
        imgbod.innerHTML =
            `
            <img class="fullimgmode" src="${img.src}" alt="img" />
        `
    })
});

cancelimgsec.addEventListener("click", () => {
    imgsec.classList.add("hidden");
    imgbod.innerHTML = "";
})