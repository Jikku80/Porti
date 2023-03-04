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
            window.setTimeout(() => {
                window.location.hash = "#side__bar"
            }, 200)

        })
    }
})();

let gotoport = document.querySelector("#menuPortfolio");

gotoport.addEventListener("click", () => {
    let uid = document.querySelector(".curuserId").innerText
    let newid = btoa(uid);
    location.href = `/myportfolio/${newid}`
});

(function () {
    let layouts = document.getElementById("menuLayouts");
    let search = document.getElementById("portiSearch");
    let portfolio = document.getElementById("menuPortfolio");
    let invitation = document.getElementById("menuInvitation");
    let menu = document.getElementById("menuMenu");
    let cataloge = document.getElementById("menuCataloge");
    let menuImg = document.getElementById("menuImg");
    let brochure = document.getElementById("menuBrochure");
    let restroStat = document.getElementById("menuMenuStats");
    let catStat = document.getElementById("menuCatalogeStats");
    let orgStat = document.getElementById("menuBrochureStats");
    let message = document.getElementById("message");
    let exp = document.getElementById("exp");

    let pathName = window.location.pathname;

    if (pathName.match(/search/gi)) {
        search.style.color = "greenyellow";
        search.style.fontWeight = "bold";
        search.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/mymessages/gi)) {
        message.style.color = "greenyellow";
        message.style.fontWeight = "bold";
        message.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/layouts/gi)) {
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

    if (pathName.match(/restrostat/gi)) {
        restroStat.style.color = "greenyellow";
        restroStat.style.fontWeight = "bold";
        restroStat.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/catalouge/gi)) {
        cataloge.style.color = "greenyellow";
        cataloge.style.fontWeight = "bold";
        cataloge.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/companystat/gi)) {
        catStat.style.color = "greenyellow";
        catStat.style.fontWeight = "bold";
        catStat.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/organizationstat/gi)) {
        orgStat.style.color = "greenyellow";
        orgStat.style.fontWeight = "bold";
        orgStat.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/brochure/gi)) {
        brochure.style.color = "greenyellow";
        brochure.style.fontWeight = "bold";
        brochure.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/activity/gi)) {
        exp.style.color = "greenyellow";
        exp.style.fontWeight = "bold";
        exp.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/menu/gi)) {
        menu.style.color = "greenyellow";
        menu.style.fontWeight = "bold";
        menu.style.borderBottom = "2px solid white"
        return;
    }

    if (pathName.match(/me/gi)) {
        menuImg.style.filter = "grayscale(.7)";
        menuImg.style.borderBottom = "2px solid white"
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
    let brochure = document.getElementById("menuBrochure");
    let message = document.getElementById("message");
    let restroStat = document.getElementById("menuMenuStats");
    let catStat = document.getElementById("menuCatalogeStats");
    let orgStat = document.getElementById("menuBrochureStats");
    let exp = document.getElementById("exp");
    let notif = document.querySelector(".newmsgnotifier");
    let bronoti = document.querySelector(".newbookingnoti");
    let menunoti = document.querySelector(".newmenunoti");
    let catalnoti = document.querySelector(".newcatalognoti");

    let menusiz = document.querySelector(".menu__size");

    let pathName = window.location.pathname;

    if (theme == "red") {
        upAccForm.style.backgroundColor = "crimson";
        upAccForm.style.color = "white";
        hd.style.color = "white";
        upAccForm.style.animation = "blackShine 4s ease-in-out forwards infinite";
        menusiz.style.animation = "blackShine 4s ease-in-out forwards infinite";
        notif.style.backgroundColor = "gold";
        if (bronoti) {
            bronoti.style.backgroundColor = "gold";
        }
        if (menunoti) {
            menunoti.style.backgroundColor = "gold";
        }
        if (catalnoti) {
            catalnoti.style.backgroundColor = "gold";
        }
    }
    else if (theme == "dark") {
        upAccForm.style.backgroundColor = "black";
    }
    else if (theme == "white") {
        upAccForm.style.backgroundColor = "white";
        upAccForm.style.color = "black";
        upAccForm.style.animation = "blackShine 4s ease-in-out forwards infinite";
        menusiz.style.animation = "blackShine 4s ease-in-out forwards infinite";
        labels.forEach(item => {
            item.style.color = "black";
        })
        chr.forEach(item => {
            item.style.color = "black";
        })

        if (pathName.match(/search/gi)) {
            search.style.color = "chartreuse";
            search.style.fontWeight = "bold";
            search.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/mymessages/gi)) {
            message.style.color = "chartreuse";
            message.style.fontWeight = "bold";
            message.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/layouts/gi)) {
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

        if (pathName.match(/catalouge/gi)) {
            cataloge.style.color = "chartreuse";
            cataloge.style.fontWeight = "bold";
            cataloge.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/restrostat/gi)) {
            restroStat.style.color = "chartreuse";
            restroStat.style.fontWeight = "bold";
            restroStat.style.borderBottom = "2px solid black"
            return;
        }
        if (pathName.match(/companystat/gi)) {
            catStat.style.color = "chartreuse";
            catStat.style.fontWeight = "bold";
            catStat.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/organizationstat/gi)) {
            orgStat.style.color = "chartreuse";
            orgStat.style.fontWeight = "bold";
            orgStat.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/brochure/gi)) {
            brochure.style.color = "chartreuse";
            brochure.style.fontWeight = "bold";
            brochure.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/activity/gi)) {
            exp.style.color = "chartreuse";
            exp.style.fontWeight = "bold";
            exp.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/menu/gi)) {
            menu.style.color = "chartreuse";
            menu.style.fontWeight = "bold";
            menu.style.borderBottom = "2px solid black"
            return;
        }

        if (pathName.match(/me/gi)) {
            menuImg.style.filter = "grayscale(.7)";
            menuImg.style.borderBottom = "2px solid chartreuse"
            return;
        }
    }
    else {
        return;
    }
})();

(async function () {
    let noti = document.querySelector(".newmsgnotifier");
    let userid = document.querySelector(".curuserId").innerText;
    let bronoti = document.querySelector(".newbookingnoti");
    let menunoti = document.querySelector(".newmenunoti");
    let catalnoti = document.querySelector(".newcatalognoti");
    let alrt = document.getElementById("msgalert");

    let socket = io();
    socket.on("usermessage", (name, user, message, id) => {

        if (user === userid) {
            alrt.play();
            noti.classList.remove("hidden");
            notifyAlert("New Message!!!");
        }

    });

    try {
        const endpoint = `/api/v1/message/getnewmsgnoti/${userid}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {

            if (response.status === 200) {
                let res = response.json();
                res.then(item => {
                    let data = item.msg
                    if (data.length !== 0) {
                        noti.classList.remove("hidden");
                    }
                })
            } else {
                errorAlert("Couldnt Fetch Messages!!!")
                console.log(response);
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };

    if (bronoti) {
        socket.on("brobooking", (catid, usrid) => {
            if (userid == usrid) {
                alrt.play();
                bronoti.classList.remove("hidden");
                notifyAlert("Booking Request!!!")
            }
        });

        try {
            const endpoint = `/api/v1/brochure/getnewbookingnoti/${userid}`
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'image/jpeg/png')
            myHeaders.get('Content-Type');
            await fetch(endpoint, {
                method: 'GET',
                headers: myHeaders
            }).then((response) => {
                if (response.status === 200) {
                    let res = response.json();
                    res.then(item => {
                        let data = item.newbook
                        if (data.length !== 0) {
                            bronoti.classList.remove("hidden");
                        }
                    })
                }
                else if (response.status === 404) {
                    notifyAlert("Please Create Your Organization!!!")
                }
                else {
                    errorAlert("Booking fetching error!!!")
                    console.log(response);
                }
            })

        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    }

    if (menunoti) {
        socket.on("reserve", (restoid, usrid) => {
            if (userid == usrid) {
                alrt.play();
                menunoti.classList.remove("hidden");
                notifyAlert("Reservation Request!!!");
            }
        });

        socket.on("resorders", (restoid, oderuser, usrid) => {
            if (userid == usrid) {
                alrt.play();
                menunoti.classList.remove("hidden");
                notifyAlert("Order Request!!!");
            }
        });
        try {
            const endpoint = `/api/v1/menu/getnewordernoti/${userid}`
            await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                }
            }).then((response) => {

                if (response.status === 200) {
                    let res = response.json();
                    res.then(item => {
                        let data = item.neworder
                        let secdata = item.newreserve
                        if (data.length !== 0 || secdata.length !== 0) {
                            menunoti.classList.remove("hidden");
                        }
                    })
                }
                else if (response.status === 404) {
                    notifyAlert("Please Create Your Food Store!!!");
                }
                else {
                    errorAlert("Order fetching error!!!")
                    console.log(response);
                }
            })

        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    }

    if (catalnoti) {
        socket.on("catorders", (catid, usr, usrid) => {
            if (userid == usrid) {
                alrt.play();
                catalnoti.classList.remove("hidden");
                notifyAlert("Product Order Request!!!");
            }
        });

        socket.on("return", (restoid, usrid) => {
            if (userid == usrid) {
                alrt.play();
                catalnoti.classList.remove("hidden");
                notifyAlert("Product Return Request!!!");
            }
        });

        try {
            const endpoint = `/api/v1/catalouge/getnewordernoti/${userid}`
            await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                }
            }).then((response) => {

                if (response.status === 200) {
                    let res = response.json();
                    res.then(item => {
                        let data = item.neworder
                        let secdata = item.newreturn
                        if (data.length !== 0 || secdata.length !== 0) {
                            catalnoti.classList.remove("hidden");
                        }
                    })
                }
                else if (response.status === 404) {
                    notifyAlert("Please Create Your Company!!!");
                }
                else {
                    errorAlert("Order fetching error!!!")
                    console.log(response);
                }
            })

        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    }

})();