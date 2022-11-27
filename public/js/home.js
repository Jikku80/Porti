bgChanger = document.getElementById("go__create");
homelogin = document.getElementById("log");
homeCont = document.querySelector(".main__content");
homebod = document.querySelector(".bod");
prest = document.querySelector(".presents");

bgChanger.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("crim");
    prest.classList.remove("hidden");
})

bgChanger.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("crim");
    prest.classList.add("hidden");
})

homelogin.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("crim");
})

homelogin.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("crim");
});


(function () {
    let loadIt = document.getElementById("becomeDeveloper");
    loadIt.addEventListener("click", async () => {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        try {
            const foldName = "my-folder"
            const fileName = "home.pug"
            const endpoint = `/api/themes/${fileName}/createFolder/${foldName}`

            await fetch((endpoint), {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            }).then((response) => {

                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Folder has been Added :)");
                }
                else if (response.status === 409) {
                    errorAlert("Folder with name already exists, Use other")
                }
                else {
                    console.log(response);
                    errorAlert("Addition Error!!!")
                }

            })
        } catch (err) {
            errorAlert("Ooops, System Error")
            console.log(err);
        }
    })
})();

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
