bgChanger = document.getElementById("go__create");
homelogin = document.getElementById("log");
homeCont = document.querySelector(".main__content");
homebod = document.querySelector(".bod");
prest = document.querySelector(".presents");

bgChanger.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("bg__changer");
    prest.classList.remove("hidden");
})

bgChanger.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("bg__changer");
    prest.classList.add("hidden");
})

homelogin.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("bg__changer");
})

homelogin.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("bg__changer");
});

let futbtn = document.querySelector('.futuristic-button');
let tp = document.querySelector(".top");
let bottom = document.querySelector(".bottom");
let parallelogramleft = document.querySelector(".parallelogram-left");
let parallelogramright = document.querySelector(".parallelogram-right");

futbtn.addEventListener("mouseover", (function () {
    tp.classList.add('active');
    bottom.classList.add('active');
    parallelogramleft.classList.add('active');
    parallelogramright.classList.add('active');
}));
futbtn.addEventListener("mouseout", (function () {
    tp.classList.remove('active');
    bottom.classList.remove('active');
    parallelogramleft.classList.remove('active');
    parallelogramright.classList.remove('active');
}));


(function () {
    let showPorti = document.getElementById("showAboutPorti");
    let abtPort = document.getElementById('abtPortiSection');
    let showGuide = document.getElementById("showGuide");
    let guidePort = document.getElementById("guidePorti");
    let showPortHelp = document.getElementById("showPortHelper");
    let portHelper = document.getElementById("portiHelper");
    let showInviHelp = document.getElementById("showInviHelper");
    let inviHelper = document.getElementById("portiinviHelper");
    let showmenuHelp = document.getElementById("showMenuHelper");
    let menuHelper = document.getElementById("portimenuHelper");
    let showcatalogHelp = document.getElementById("showCatalogHelper");
    let catalogHelper = document.getElementById("porticatalogeHelper");
    let showLdt = document.getElementById("showLDT");
    let aboutLdt = document.getElementById("aboutTM");
    let showContact = document.getElementById("showContactTM");
    let contactLdt = document.getElementById("contactTM");

    showPorti.addEventListener("click", () => {
        abtPort.classList.toggle("hidden");
        if (!(abtPort.classList.contains("hidden"))) {
            window.location.href = "#abtPortiSection"
        }
    })
    showGuide.addEventListener("click", () => {
        guidePort.classList.toggle("hidden");
        if (!(guidePort.classList.contains("hidden"))) {
            window.location.href = "#guidePorti"
        }
    })
    showPortHelp.addEventListener("click", () => {
        portHelper.classList.toggle("hidden");
        if (!(portHelper.classList.contains("hidden"))) {
            window.location.href = "#portiHelper"
        }
    })

    showInviHelp.addEventListener("click", () => {
        inviHelper.classList.toggle("hidden");
        if (!(inviHelper.classList.contains("hidden"))) {
            window.location.href = "#portiinviHelper"
        }
    })
    showmenuHelp.addEventListener("click", () => {
        menuHelper.classList.toggle("hidden");
        if (!(menuHelper.classList.contains("hidden"))) {
            window.location.href = "#portimenuHelper"
        }
    })
    showcatalogHelp.addEventListener("click", () => {
        catalogHelper.classList.toggle("hidden");
        if (!(catalogHelper.classList.contains("hidden"))) {
            window.location.href = "#porticatalogeHelper"
        }
    })

    showLdt.addEventListener("click", () => {
        aboutLdt.classList.toggle("hidden");
        if (!(aboutLdt.classList.contains("hidden"))) {
            window.location.href = "#aboutTM"
        }
    })

    showContact.addEventListener("click", () => {
        contactLdt.classList.toggle("hidden");
        if (!(contactLdt.classList.contains("hidden"))) {
            window.location.href = "#contactTM"
        }
    })
})();

(function () {
    let theme = document.querySelector(".usrTheme").innerText;
    let upAccForm = document.querySelector(".main__content");
    let bod = document.querySelector(".bod");
    let padder = document.querySelectorAll(".padder");
    let lime = document.querySelectorAll(".shwbtn");
    let maf = document.querySelectorAll(".maf");
    let wite = document.querySelectorAll(".wite");
    let anch = document.querySelectorAll(".bottom__anch");
    let nocb = document.querySelectorAll(".nocapsB");
    let inpt = document.querySelectorAll(".form__input");
    let label = document.querySelectorAll(".form__label");
    let selec = document.querySelector(".form__select");
    let got = document.querySelector(".go__top");
    let lod = document.querySelector(".loader");
    let td = document.querySelectorAll(".td");
    let btn89 = document.querySelector(".button-89");

    if (theme == "red") {
        upAccForm.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        document.body.style.backgroundColor = "crimson";
        bod.style.backgroundColor = "crimson";
        selec.style.backgroundColor = "crimson";
        padder.forEach(item => {
            item.style.backgroundColor = "crimson";
            item.style.animation = "blackShine 4s ease-in-out forwards infinite";
        })
        got.style.animation = "blackShine 4s ease-in-out forwards infinite";
        maf.forEach(item => {
            item.style.color = "black";
        })
        lime.forEach(item => {
            item.style.backgroundColor = "crimson";
        })
        upAccForm.style.color = "white";
        bgChanger.addEventListener("mouseover", () => {
            homeCont.classList.add("red__changer");
            homebod.classList.add("red__changer");
            prest.classList.remove("hidden");
        })

        bgChanger.addEventListener("mouseout", () => {
            homeCont.classList.remove("red__changer");
            homebod.classList.remove("red__changer");
            prest.classList.add("hidden");
        })

        homelogin.addEventListener("mouseover", () => {
            homeCont.classList.add("red__changer");
            homebod.classList.add("red__changer");
        })

        homelogin.addEventListener("mouseout", () => {
            homeCont.classList.remove("red__changer");
            homebod.classList.remove("red__changer");
        });
    }
    else if (theme == "dark") {
        upAccForm.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
        document.body.style.backgroundColor = "black";
        bod.style.backgroundColor = "black";
        selec.style.backgroundColor = "black";
        padder.forEach(item => {
            item.style.backgroundColor = "black";
        })
        lime.forEach(item => {
            item.style.backgroundColor = "black";
        })
        bgChanger.addEventListener("mouseover", () => {
            homeCont.classList.add("black__changer");
            homebod.classList.add("black__changer");
            prest.classList.remove("hidden");
        })

        bgChanger.addEventListener("mouseout", () => {
            homeCont.classList.remove("black__changer");
            homebod.classList.remove("black__changer");
            prest.classList.add("hidden");
        })

        homelogin.addEventListener("mouseover", () => {
            homeCont.classList.add("black__changer");
            homebod.classList.add("black__changer");
        })

        homelogin.addEventListener("mouseout", () => {
            homeCont.classList.remove("black__changer");
            homebod.classList.remove("black__changer");
        });
    }
    else if (theme == "white") {
        upAccForm.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        bod.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        selec.style.backgroundColor = "white";
        selec.style.borderColor = "black";
        selec.style.color = "black";
        bod.style.color = "black";
        upAccForm.style.color = "black";
        got.style.animation = "blackShine 4s ease-in-out forwards infinite";
        got.style.color = "black";
        padder.forEach(item => {
            item.style.backgroundColor = "white";
            item.style.animation = "blackShine 4s ease-in-out forwards infinite";
        })
        lime.forEach(item => {
            item.style.backgroundColor = "white";
        })
        wite.forEach(item => {
            item.style.color = "black";
        })
        anch.forEach(item => {
            item.style.color = "black";
        })
        nocb.forEach(item => {
            item.style.color = "black";
        })
        inpt.forEach(item => {
            item.style.color = "black";
            item.style.borderColor = "black"
        })
        label.forEach(item => {
            item.style.color = "black";
        })
        td.forEach(item => {
            item.style.color = "black";
        })
        btn89.style.background = "conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,black 0) var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p))"
        bgChanger.addEventListener("mouseover", () => {
            homeCont.classList.add("white__changer");
            homebod.classList.add("white__changer");
            prest.classList.remove("hidden");
        })

        bgChanger.addEventListener("mouseout", () => {
            homeCont.classList.remove("white__changer");
            homebod.classList.remove("white__changer");
            prest.classList.add("hidden");
        })

        homelogin.addEventListener("mouseover", () => {
            homeCont.classList.add("white__changer");
            homebod.classList.add("white__changer");
        })

        homelogin.addEventListener("mouseout", () => {
            homeCont.classList.remove("white__changer");
            homebod.classList.remove("white__changer");
        });
    }
    else {
        console.log("Hola from Porti")
    }
})();

sendMsg = document.querySelector(".send__msg");
let msgfullName = document.querySelector("#msgname");
let msgemail = document.querySelector("#msgemail");
let msgsiteType = document.querySelector("#siteType");
let msgmessage = document.querySelector("#msgmessage");

sendMsg.addEventListener("click", async (e) => {
    if (msgfullName.value < 1 || msgfullName.value == "" || msgfullName.value == null) {
        return false;
    }
    if (msgemail.value < 1 || msgemail.value == "" || msgemail.value == null) {
        return false;
    }
    if (msgmessage.value < 1 || msgmessage.value == "" || msgmessage.value == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = '/send/msg'
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: msgfullName.value,
                email: msgemail.value,
                queryType: msgsiteType.value,
                message: msgmessage.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                setTimeout(() => {
                    successAlert("Your Message has been sent!");
                }, 3000)
            } else {
                errorAlert("OOPS!! something went wrong!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        erroralert('Sorry! Something went wrong', err);
    };
    msgsiteType.value = "query";
    msgmessage.value = "";
})