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

(function () {
    let layouts = document.getElementById("menuLayouts");
    let portfolio = document.getElementById("menuPortfolio");
    let invitation = document.getElementById("menuInvitation");
    let menu = document.getElementById("menuMenu");
    let cataloge = document.getElementById("menuCataloge");
    let menuImg = document.getElementById("menuImg");

    let pathName = window.location.pathname;

    if (pathName === "/me") {
        menuImg.style.filter = "grayscale(.7)";
        menuImg.style.borderBottom = "2px solid white"
    }

    if (pathName === "/porti") {
        layouts.style.color = "greenyellow";
        layouts.style.fontWeight = "bold";
        layouts.style.borderBottom = "2px solid white"
    }

    if (pathName.match(/myportfolio/gi)) {
        portfolio.style.color = "greenyellow";
        portfolio.style.fontWeight = "bold";
        portfolio.style.borderBottom = "2px solid white"
    }

    if (pathName.match(/invitations/gi) || pathName.match(/myinvi/gi)) {
        invitation.style.color = "greenyellow";
        invitation.style.fontWeight = "bold";
        invitation.style.borderBottom = "2px solid white"
    }

    if (pathName.match(/menu/gi)) {
        menu.style.color = "greenyellow";
        menu.style.fontWeight = "bold";
        menu.style.borderBottom = "2px solid white"
    }

    if (pathName.match(/catalouge/gi)) {
        cataloge.style.color = "greenyellow";
        cataloge.style.fontWeight = "bold";
        cataloge.style.borderBottom = "2px solid white"
    }
})();