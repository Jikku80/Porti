function successAlert(msg) {
    let mainCont = document.createElement("div");
    let msgCont = document.createElement("div");
    let desc = document.createElement("p");
    let close = document.createElement("div")
    close.innerHTML = `<img src="/images/cancel.png" alt="cancel__img">`
    close.classList.add("cancel__alert");
    desc.innerText = msg;
    desc.classList.add("success__msg")
    msgCont.classList.add("success__cont");
    mainCont.classList.add("success__main")
    document.body.appendChild(mainCont);
    mainCont.appendChild(msgCont);
    msgCont.appendChild(desc);
    msgCont.appendChild(close);

    cancelAlert = document.querySelector(".cancel__alert")
    cancelAlert.addEventListener("click", () => {
        mainCont.style.display = "none";
    })

    setTimeout(() => {
        mainCont.style.display = "none";
    }, 2000)

}

function errorAlert(msg) {
    let mainCont = document.createElement("div");
    let msgCont = document.createElement("div");
    let desc = document.createElement("p");
    let close = document.createElement("div")
    close.innerHTML = `<img src="/images/cancel.png" alt="cancel__img">`
    close.classList.add("cancel__alert");
    desc.innerText = msg;
    desc.classList.add("success__msg")
    msgCont.classList.add("error__cont");
    mainCont.classList.add("success__main")
    document.body.appendChild(mainCont);
    mainCont.appendChild(msgCont);
    msgCont.appendChild(desc);
    msgCont.appendChild(close);

    cancelAlert = document.querySelector(".cancel__alert")
    cancelAlert.addEventListener("click", () => {
        mainCont.style.display = "none";
    })

    setTimeout(() => {
        mainCont.style.display = "none";
    }, 2000)
}

window.addEventListener("load", () => {
    let loads = document.querySelector('.loader');
    loads.classList.add("hidden");
});