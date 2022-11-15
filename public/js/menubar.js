(function () {
    let menubar = document.querySelector(".menu__bar");
    let menu = document.querySelector(".main__navigation");
    let width = window.screen.width;

    menubar.classList.add("hidden");
    if (width < 601) {
        menu.classList.add("hidden");
        menubar.classList.remove("hidden");
        menubar.addEventListener("click", () => {
            menubar.classList.add("hidden");
            menu.classList.remove("hidden");
            window.location.hash = "#side__bar"

        })
    }
})();