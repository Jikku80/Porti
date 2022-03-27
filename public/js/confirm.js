let tm = document.getElementById("tm")
let ph = document.getElementById("ph");
theme = tm.innerText
let confirmBtn = document.getElementById("portConfirm");
let num = btoa(ph.innerText)

confirmBtn.addEventListener("click", () => {
    window.setTimeout(() => {
        location.assign(`/myportfolio/${num}?${theme}`);
    }, 400);
})
