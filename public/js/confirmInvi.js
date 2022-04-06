let tim = document.getElementById("tim")
let poh = document.getElementById("poh");
teme = tim.innerText
let confirmationBtn = document.getElementById("inviConfirm");
let numr = btoa(poh.innerText)

confirmationBtn.addEventListener("click", () => {
    window.setTimeout(() => {
        location.assign(`/myinvi/${numr}?${teme}`);
    }, 400);
})