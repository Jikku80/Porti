function openFullImg() {
    const fullImg = document.querySelectorAll('.imgFull');
    let smalldiv = document.querySelectorAll(".open_full")
    let imgsec = document.querySelector(".fullimg__sec");
    let imgbod = document.querySelector(".fullimg__bod");
    let cancelimgsec = document.querySelector(".cancelimgsec");

    smalldiv.forEach(item => {
        item.addEventListener("click", () => {
            imgsec.classList.remove("hidden");
            img = item.childNodes[1]
            imgbod.innerHTML = "";
            imgbod.innerHTML =
                `
                <img class="fullimgmode" src="${img.src}" draggable="false" alt="img" />
            `
        })
    });

    cancelimgsec.addEventListener("click", () => {
        imgsec.classList.add("hidden");
        imgbod.innerHTML = "";
    })
}