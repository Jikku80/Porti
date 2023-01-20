function successAlert(msg) {
    let mainCont = document.createElement("div");
    let msgCont = document.createElement("div");
    let desc = document.createElement("p");
    desc.innerText = msg;
    desc.classList.add("success__msg")
    msgCont.classList.add("success__cont");
    mainCont.classList.add("success__main")
    document.body.appendChild(mainCont);
    mainCont.appendChild(msgCont);
    msgCont.appendChild(desc);

    setTimeout(() => {
        mainCont.style.display = "none";
    }, 2000)

}

function errorAlert(msg) {
    let mainCont = document.createElement("div");
    let msgCont = document.createElement("div");
    let desc = document.createElement("p");
    desc.innerText = msg;
    desc.classList.add("success__msg")
    msgCont.classList.add("error__cont");
    mainCont.classList.add("success__main")
    document.body.appendChild(mainCont);
    mainCont.appendChild(msgCont);
    msgCont.appendChild(desc);

    setTimeout(() => {
        mainCont.style.display = "none";
    }, 2000)
}

window.addEventListener("load", () => {
    let loads = document.querySelector('.loader');
    loads.classList.add("hidden");
});

