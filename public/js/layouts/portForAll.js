(function () {
    const freeBtn = document.getElementById("freePortSec");
    const lockBtn = document.getElementById("lockedPortSec");
    const freeCatalBtn = document.getElementById("freeCatalgBtn");
    const lockCatalBtn = document.getElementById("lockedCatalgBtn");
    const freeCatalSec = document.getElementById("freeCatalgSec");
    const lockCatalSec = document.getElementById("lockedCatalgSec");
    const freeMenuBtn = document.getElementById("freeMenuBtn");
    const lockMenuBtn = document.getElementById("lockedMenuBtn");
    const freeMenuSec = document.getElementById("freeMenuSec");
    const lockMenuSec = document.getElementById("lockedMenuSec");
    const freeInviBtn = document.getElementById("freeInviBtn");
    const lockInviBtn = document.getElementById("lockedInviBtn");
    const freeInviSec = document.getElementById("freeInviSec");
    const lockInviSec = document.getElementById("lockedInviSec");
    const freeSec = document.getElementById("freeItems");
    const lockSec = document.getElementById("lockedItems");
    const gbtn = document.querySelectorAll(".glassbtn");
    const catalgbtn = document.querySelectorAll(".catalgbtn");
    const menubtn = document.querySelectorAll(".menubtn");
    const invitebtn = document.querySelectorAll(".invitebtn");

    gbtn[0].style.backgroundColor = "white";
    gbtn[0].style.color = "black";

    catalgbtn[0].style.backgroundColor = "white";
    catalgbtn[0].style.color = "black";

    menubtn[0].style.backgroundColor = "white";
    menubtn[0].style.color = "black";

    invitebtn[0].style.backgroundColor = "white";
    invitebtn[0].style.color = "black";

    lockSec.classList.add("hidden");
    lockCatalSec.classList.add("hidden");
    lockMenuSec.classList.add("hidden");
    lockInviSec.classList.add("hidden");

    freeBtn.addEventListener("click", () => {
        lockSec.classList.add("hidden");
        freeSec.classList.remove("hidden");
        gbtn[0].style.backgroundColor = "white";
        gbtn[0].style.color = "black";
        gbtn[1].style.backgroundColor = "transparent";
        gbtn[1].style.color = "white";
    })

    lockBtn.addEventListener("click", () => {
        freeSec.classList.add("hidden");
        lockSec.classList.remove("hidden");
        gbtn[0].style.backgroundColor = "transparent";
        gbtn[0].style.color = "white";
        gbtn[1].style.backgroundColor = "white";
        gbtn[1].style.color = "black";
    })


    freeInviBtn.addEventListener("click", () => {
        lockInviSec.classList.add("hidden");
        freeInviSec.classList.remove("hidden");
        invitebtn[0].style.backgroundColor = "white";
        invitebtn[0].style.color = "black";
        invitebtn[1].style.backgroundColor = "transparent";
        invitebtn[1].style.color = "white";
    })

    lockInviBtn.addEventListener("click", () => {
        freeInviSec.classList.add("hidden");
        lockInviSec.classList.remove("hidden");
        invitebtn[0].style.backgroundColor = "transparent";
        invitebtn[0].style.color = "white";
        invitebtn[1].style.backgroundColor = "white";
        invitebtn[1].style.color = "black";
    })

    freeMenuBtn.addEventListener("click", () => {
        lockMenuSec.classList.add("hidden");
        freeMenuSec.classList.remove("hidden");
        menubtn[0].style.backgroundColor = "white";
        menubtn[0].style.color = "black";
        menubtn[1].style.backgroundColor = "transparent";
        menubtn[1].style.color = "white";
    })

    lockMenuBtn.addEventListener("click", () => {
        freeMenuSec.classList.add("hidden");
        lockMenuSec.classList.remove("hidden");
        menubtn[0].style.backgroundColor = "transparent";
        menubtn[0].style.color = "white";
        menubtn[1].style.backgroundColor = "white";
        menubtn[1].style.color = "black";
    })

    freeCatalBtn.addEventListener("click", () => {
        lockCatalSec.classList.add("hidden");
        freeCatalSec.classList.remove("hidden");
        catalgbtn[0].style.backgroundColor = "white";
        catalgbtn[0].style.color = "black";
        catalgbtn[1].style.backgroundColor = "transparent";
        catalgbtn[1].style.color = "white";
    })

    lockCatalBtn.addEventListener("click", () => {
        freeCatalSec.classList.add("hidden");
        lockCatalSec.classList.remove("hidden");
        catalgbtn[0].style.backgroundColor = "transparent";
        catalgbtn[0].style.color = "white";
        catalgbtn[1].style.backgroundColor = "white";
        catalgbtn[1].style.color = "black";
    })
})();