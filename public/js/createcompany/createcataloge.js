create_portC = document.querySelector(".create_port")
footerBodC = document.querySelector(".footer")
portBodC = document.querySelector(".port__section");
inviBodC = document.querySelector(".invi__section");
menuBodC = document.querySelector('.menu__section');
catBodC = document.querySelector('.catalouge__section');

catalogeLayouts = document.querySelectorAll(".cataloge_layouts");

let catalogeOneForm = document.createElement("div");
catalogeOneForm.classList.add("createCataloge");
catalogeOneForm.innerHTML = createCataloge("catalogesname", "catalogesemail", "catalogessocial", "catalogesaddress", "catalogesadd_link", "catalogesphn_no", "catalogesslogan", "cataloge__form__btn", "catalogetype")

document.body.appendChild(catalogeOneForm);
let mkCForm = document.querySelector('.createCataloge');
mkCForm.classList.add("hidden");
let catalogeid1 = document.getElementById("uiId").innerText;
let catalogtmid = document.querySelector(".catalogtmid");
catalogeLayouts.forEach(item => {

    item.addEventListener("click", () => {
        catalogtmid.innerText;
        location.hash = "#portNav";
        portBodC.classList.add("hidden");
        footerBodC.classList.add("hidden");
        inviBodC.classList.add("hidden");
        menuBodC.classList.add("hidden");
        catBodC.classList.add("hidden");
        mkCForm.classList.remove("hidden");
        let themeid = item.id;
        catalogtmid.innerText = themeid
    })
});

(function () {
    let name = document.querySelector("#catalogesname");
    let email = document.getElementById("catalogesemail")
    let social = document.getElementById("catalogessocial");
    let address = document.getElementById("catalogesaddress");
    let add_link = document.getElementById("catalogesadd_link");
    let slogan = document.getElementById("catalogesslogan");
    let phn_no = document.getElementById("catalogesphn_no")
    let submit = document.getElementById("cataloge__form__btn");
    let compType = document.getElementById("catalogetype");


    let skipandcreate = document.getElementById("skipandcreatecatalog");

    skipandcreate.addEventListener("click", async (e) => {
        let theme = catalogtmid.innerText;
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        let yoname = document.getElementById("curlogusr").innerText;
        let yoemail = document.getElementById("curusremail").innerText;
        let yname;
        let yemail;
        if (name.value !== "") {
            yname = name.value
        } else {
            yname = yoname;
        }
        if (email.value !== "") {
            yemail = email.value
        } else {
            yemail = yoemail;
        }
        if (phn_no.value !== "") {
            yno = phn_no.value
        } else {
            yno = 0
        }

        const endpoint = `/api/v1/catalouge/createCompany`
        try {
            await fetch((endpoint), {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: yname,
                    email: yemail,
                    social: social.value,
                    locationLink: add_link.value,
                    slogan: slogan.value,
                    contact: yno,
                    theme: theme,
                    Address: address.value,
                    compType: compType.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Enterprise has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/catalouge/${catalogeid1}/additems`);
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

    submit.addEventListener("click", async (e) => {
        let theme = catalogtmid.innerText;
        if (name.value < 1 || name.value == "" || name.value == null) {
            return false;
        }
        if (email.value < 1 || email.value == "" || email.value == null) {
            return false;
        }
        if (address.value < 1 || address.value == "" || address.value == null) {
            return false;
        }
        if (phn_no.value < 1 || phn_no.value == "" || phn_no.value == null) {
            return false;
        }
        if (compType.value < 1 || compType.value == "") {
            return false;
        }
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/createCompany`
        try {
            await fetch((endpoint), {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    social: social.value,
                    locationLink: add_link.value,
                    slogan: slogan.value,
                    contact: phn_no.value,
                    theme: theme,
                    Address: address.value,
                    compType: compType.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Enterprise has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/catalouge/${catalogeid1}/additems`);
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

let cancelCataloge = document.querySelector(".cancel__cataloge");
cancelCataloge.addEventListener("click", () => {
    mkCForm.classList.add("hidden");
    // portBodC.classList.remove("hidden");
    footerBodC.classList.remove("hidden");
    inviBodC.classList.remove("hidden");
    // menuBodC.classList.remove("hidden");
    catBodC.classList.remove("hidden");
    window.setTimeout(() => {
        location.hash = "#crtCataloge";
    }, 200)
});

let updateCataLayout = document.querySelectorAll(".updateCataLayout");

updateCataLayout.forEach(item => {
    item.addEventListener("click", async () => {

        let theme = item.id;
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/${catalogeid1}/updateCompanyLayout`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    theme: theme
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Company Details Updated Successfully :)");
                    window.setTimeout(() => {
                        location.assign(`/catalouge/${catalogeid1}/additems`);
                    }, 400);
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Duplication Input error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
});

(function () {
    let createcustom = document.querySelector("#customThemeVamos");
    createcustom.addEventListener("click", async () => {
        try {
            const endpoint = `/api/v1/catalouge/${catalogeid1}/updateCompanyLayout`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    theme: "customCatalog"
                })
            }).then((response) => {
                if (response.status === 200) {
                    console.log("success");
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Duplication Input error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };

        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/customTheme/`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({

                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    console.log("vamos");
                    window.setTimeout(() => {
                        location.assign(`/layouts/custom`);
                    }, 400);
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Duplication Input error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})();