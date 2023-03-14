create_portR = document.querySelector(".create_port")
footerBodR = document.querySelector(".footer")
portBodR = document.querySelector(".port__section");
inviBodR = document.querySelector(".invi__section");
menuBodR = document.querySelector('.menu__section');
catBodR = document.querySelector('.catalouge__section');

menuLayouts = document.querySelectorAll(".menu_layouts");

let restroOneForm = document.createElement("div");
restroOneForm.classList.add("createRestro");
restroOneForm.innerHTML = createRestro("name", "address", "slogan", "phn_no", "restro__form__btn", "resType")

document.body.appendChild(restroOneForm);
let mkRestroForm = document.querySelector('.createRestro');
mkRestroForm.classList.add("hidden");
let userRestroid = document.getElementById("uiId").innerText;

let restrotmid = document.querySelector(".uniquerestrotmid");

menuLayouts.forEach(item => {

    item.addEventListener("click", () => {
        restrotmid.innerText = "";
        location.hash = "#portNav";
        portBodR.classList.add("hidden");
        footerBodR.classList.add("hidden");
        inviBodR.classList.add("hidden");
        menuBodR.classList.add("hidden");
        catBodR.classList.add("hidden");
        mkRestroForm.classList.remove("hidden");
        let themeid = item.id;
        restrotmid.innerText = themeid;
    })
});

(function () {
    let name = document.querySelector("#name");
    let address = document.getElementById("address");
    let slogan = document.getElementById("slogan");
    let no = document.getElementById("phn_no");
    let resType = document.getElementById("resType");
    let submit = document.getElementById("restro__form__btn");

    submit.addEventListener("click", async (e) => {
        let theme = restrotmid.innerText;
        if (name.value < 1 || name.value == "" || name.value == null) {
            return false;
        }
        if (address.value < 1 || address.value == "" || address.value == null) {
            return false;
        }
        if (resType.value < 1 || resType.value == "") {
            return false;
        }
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/menu/createRestaurant`
        try {
            await fetch((endpoint), {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    address: address.value,
                    slogan: slogan.value,
                    phn_no: no.value,
                    theme: theme,
                    resType: resType.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Food Hub has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/menu/${userRestroid}/additemstomenu`);
                    }, 400);
                } else {
                    console.log(response)
                    errorAlert("Duplication Input error!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })

    let skipandcreate = document.getElementById("skipandcreate");

    skipandcreate.addEventListener("click", async (e) => {
        e.preventDefault();
        let theme = restrotmid.innerText;
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let yoname = document.querySelector("#curlogusr").innerText;
        let yname;
        if (name.value !== "") {
            yname = name.value;
        }
        else {
            yname = yoname;
        }
        if (no.value !== "") {
            yno = no.value
        } else {
            yno = 0
        }
        const endpoint = `/api/v1/menu/createRestaurant`
        try {
            await fetch((endpoint), {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: yname,
                    address: address.value,
                    slogan: slogan.value,
                    phn_no: yno,
                    theme: theme,
                    resType: resType.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Food Hub has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/menu/${userRestroid}/additemstomenu`);
                    }, 400);
                } else {
                    console.log(response)
                    errorAlert("Duplication Input error!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})();

let cancelRestro = document.querySelector(".cancel__restro");
cancelRestro.addEventListener("click", () => {
    mkRestroForm.classList.add("hidden");
    // portBodR.classList.remove("hidden");
    footerBodR.classList.remove("hidden");
    inviBodR.classList.remove("hidden");
    menuBodR.classList.remove("hidden");
    // catBodR.classList.remove("hidden");
    window.setTimeout(() => {
        location.hash = "#crtMenu";
    }, 200)
})