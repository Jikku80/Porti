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
    let search = document.getElementById("portiSearch");
    let portfolio = document.getElementById("menuPortfolio");
    let invitation = document.getElementById("menuInvitation");
    let menu = document.getElementById("menuMenu");
    let cataloge = document.getElementById("menuCataloge");
    let menuImg = document.getElementById("menuImg");

    let pathName = window.location.pathname;

    if (pathName === "/inspire") {
        search.style.color = "greenyellow";
        search.style.fontWeight = "bold";
        search.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName === "/me") {
        menuImg.style.filter = "grayscale(.7)";
        menuImg.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName === "/porti") {
        layouts.style.color = "greenyellow";
        layouts.style.fontWeight = "bold";
        layouts.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/myportfolio/gi)) {
        portfolio.style.color = "greenyellow";
        portfolio.style.fontWeight = "bold";
        portfolio.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/invitations/gi) || pathName.match(/myinvi/gi)) {
        invitation.style.color = "greenyellow";
        invitation.style.fontWeight = "bold";
        invitation.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/menu/gi)) {
        menu.style.color = "greenyellow";
        menu.style.fontWeight = "bold";
        menu.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/catalouge/gi)) {
        cataloge.style.color = "greenyellow";
        cataloge.style.fontWeight = "bold";
        cataloge.style.borderBottom = "2px solid white"
        return;
    }
})();


(function () {
    let theme = document.querySelector(".userTheme").innerText;
    let upAccForm = document.querySelector(".navigation");
    let labels = document.querySelectorAll(".anavi");
    let chr = document.querySelectorAll(".chr");
    let hd = document.getElementById("logout");

    let layouts = document.getElementById("menuLayouts");
    let search = document.getElementById("portiSearch");
    let portfolio = document.getElementById("menuPortfolio");
    let invitation = document.getElementById("menuInvitation");
    let menu = document.getElementById("menuMenu");
    let cataloge = document.getElementById("menuCataloge");
    let menuImg = document.getElementById("menuImg");

    let pathName = window.location.pathname;

    if (theme == "red") {
        upAccForm.style.backgroundColor = "crimson";
        upAccForm.style.color = "white";
        hd.style.color = "white";
        upAccForm.style.animation = "blackShine 4s ease-in-out forwards infinite";
    }
    else if (theme == "dark") {
        upAccForm.style.backgroundColor = "black";
    }
    else if (theme == "white") {
        upAccForm.style.backgroundColor = "white";
        upAccForm.style.color = "black";
        upAccForm.style.animation = "blackShine 4s ease-in-out forwards infinite";
        labels.forEach(item => {
            item.style.color = "black";
        })
        chr.forEach(item => {
            item.style.color = "black";
        })

        if (pathName === "/inspire") {
            search.style.color = "chartreuse";
            search.style.fontWeight = "bold";
            search.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName === "/me") {
            menuImg.style.filter = "grayscale(.7)";
            menuImg.style.borderBottom = "2px solid chartreuse"
            return;
        }

        if (pathName === "/porti") {
            layouts.style.color = "chartreuse";
            layouts.style.fontWeight = "bold";
            layouts.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/myportfolio/gi)) {
            portfolio.style.color = "chartreuse";
            portfolio.style.fontWeight = "bold";
            portfolio.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/invitations/gi) || pathName.match(/myinvi/gi)) {
            invitation.style.color = "chartreuse";
            invitation.style.fontWeight = "bold";
            invitation.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/menu/gi)) {
            menu.style.color = "chartreuse";
            menu.style.fontWeight = "bold";
            menu.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/catalouge/gi)) {
            cataloge.style.color = "chartreuse";
            cataloge.style.fontWeight = "bold";
            cataloge.style.borderBottom = "2px solid black"
            return;
        }
    }
    else {
        console.log("Hola from Porti")
    }
})();