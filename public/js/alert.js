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

function notifyAlert(msg) {
    let notifCont = document.createElement("div");
    let notiInfoCont = document.createElement("div");
    let desInfo = document.createElement("p");
    desInfo.innerText = msg;
    desInfo.classList.add("notify__msg")
    notiInfoCont.classList.add("notify__cont");
    notifCont.classList.add("notify__main")
    document.body.appendChild(notifCont);
    notifCont.appendChild(notiInfoCont);
    notiInfoCont.appendChild(desInfo);

    setTimeout(() => {
        notifCont.style.display = "none";
    }, 2000)
}

window.addEventListener("load", () => {
    let loads = document.querySelector('.loader');
    loads.classList.add("hidden");
});