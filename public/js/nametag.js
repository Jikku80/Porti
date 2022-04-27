let lgot = document.querySelectorAll(".logout");
let ltag = document.querySelectorAll(".lgot");
let crpt = document.querySelectorAll('.crpt')
let cp = document.querySelectorAll(".cp");
let ypf = document.querySelectorAll(".ypf");
let pf = document.querySelectorAll(".pf");
let yin = document.querySelectorAll(".yin");
let intg = document.querySelectorAll(".intg");
let hm = document.querySelectorAll(".hm");
let hmtg = document.querySelectorAll(".hmtg");
let act = document.querySelectorAll(".act");
let actg = document.querySelectorAll(".actg");

for (let item of hm) {
    item.addEventListener("mouseover", () => {
        for (let tag of hmtg) {
            tag.classList.remove("hidden");
        }
    })
}

for (let item of lgot) {
    item.addEventListener("mouseover", () => {
        for (let tag of ltag) {
            tag.classList.remove("hidden");
        }
    })
}

for (let item of crpt) {
    item.addEventListener("mouseover", () => {
        for (let tag of cp) {
            tag.classList.remove("hidden");
        }
    })
}

for (let item of ypf) {
    item.addEventListener("mouseover", () => {
        for (let tag of pf) {
            tag.classList.remove("hidden");
        }
    })
}

for (let item of yin) {
    item.addEventListener("mouseover", () => {
        for (let tag of intg) {
            tag.classList.remove("hidden");
        }
    })
}

for (let item of act) {
    item.addEventListener("mouseover", () => {
        for (let tag of actg) {
            tag.classList.remove("hidden");
        }
    })
}

for (let item of hm) {
    item.addEventListener("mouseout", () => {
        for (let tag of hmtg) {
            tag.classList.add("hidden");
        }
    })
}

for (let item of lgot) {
    item.addEventListener("mouseout", () => {
        for (let tag of ltag) {
            tag.classList.add("hidden");
        }
    })
}

for (let item of crpt) {
    item.addEventListener("mouseout", () => {
        for (let tag of cp) {
            tag.classList.add("hidden");
        }
    })
}

for (let item of ypf) {
    item.addEventListener("mouseout", () => {
        for (let tag of pf) {
            tag.classList.add("hidden");
        }
    })
}

for (let item of yin) {
    item.addEventListener("mouseout", () => {
        for (let tag of intg) {
            tag.classList.add("hidden");
        }
    })
}

for (let item of act) {
    item.addEventListener("mouseout", () => {
        for (let tag of actg) {
            tag.classList.add("hidden");
        }
    })
}

window.addEventListener("load", () => {
    let load = document.querySelector('.loader');
    load.classList.add("hidden");
})