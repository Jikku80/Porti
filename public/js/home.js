bgChanger = document.getElementById("go__create");
homelogin = document.getElementById("log");
homeCont = document.querySelector(".main__content");
homebod = document.querySelector(".bod");
prest = document.querySelector(".presents");

bgChanger.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("crim");
    prest.classList.remove("hidden");
})

bgChanger.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("crim");
    prest.classList.add("hidden");
})

homelogin.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("crim");
})

homelogin.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("crim");
})