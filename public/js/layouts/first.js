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

const fullImg = document.querySelectorAll('.imgFull');

fullImg.forEach(img => {
    img.addEventListener("click", () => {
        window.open(img.src)
    })
})


