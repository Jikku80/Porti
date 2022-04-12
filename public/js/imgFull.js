const fullImg = document.querySelectorAll('.imgFull');

fullImg.forEach(img => {
    img.addEventListener("click", () => {
        window.open(img.src)
    })
})