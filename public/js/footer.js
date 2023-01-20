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