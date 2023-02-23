(function () {
    let theme = document.querySelector(".ueserTheme").innerText;
    let upAccForm = document.querySelector(".footer__row");
    let anc = document.querySelectorAll(".footer__anch");
    if (theme == "white") {
        upAccForm.style.color = "black";
        anc.forEach(item => {
            item.style.color = "black";
        })
    }
    else {
        return;
    }
})();

(function () {
    let openprivacy = document.querySelector(".loadPrivacy");
    let privsec = document.querySelector('.our__privacy__sec');
    let cancelpriv = document.querySelector("#priCancel")
    openprivacy.addEventListener("click", () => {
        privsec.classList.remove("hidden");
    })

    cancelpriv.addEventListener("click", () => {
        privsec.classList.add('hidden');
    })
})();