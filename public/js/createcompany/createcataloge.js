create_portC = document.querySelector(".create_port")
footerBodC = document.querySelector(".footer")
portBodC = document.querySelector(".port__section");
inviBodC = document.querySelector(".invi__section");
menuBodC = document.querySelector('.menu__section');
catBodC = document.querySelector('.catalouge__section');

catalogeLayouts = document.querySelectorAll(".cataloge_layouts");

let catalogeOneForm = document.createElement("div");
catalogeOneForm.classList.add("createCataloge");
catalogeOneForm.innerHTML = createCataloge("catalogesname", "catalogesemail", "catalogessocial", "catalogesaddress", "catalogesadd_link", "catalogesphn_no", "catalogesslogan", "cataloge__form__btn", "catalogecountry", "catalogetype")

document.body.appendChild(catalogeOneForm);
let mkCForm = document.querySelector('.createCataloge');
mkCForm.classList.add("hidden");
catalogeid1 = document.getElementById("uiId").innerText;

catalogeLayouts.forEach(item => {

    item.addEventListener("click", () => {
        location.hash = "#portNav";
        portBodC.classList.add("hidden");
        footerBodC.classList.add("hidden");
        inviBodC.classList.add("hidden");
        menuBodC.classList.add("hidden");
        catBodC.classList.add("hidden");
        mkCForm.classList.remove("hidden");
        let name = document.querySelector("#catalogesname");
        let email = document.getElementById("catalogesemail")
        let social = document.getElementById("catalogessocial");
        let address = document.getElementById("catalogesaddress");
        let add_link = document.getElementById("catalogesadd_link");
        let slogan = document.getElementById("catalogesslogan");
        let phn_no = document.getElementById("catalogesphn_no")
        let submit = document.getElementById("cataloge__form__btn");
        let country = document.getElementById("catalogecountry");
        let compType = document.getElementById("catalogetype");
        let theme = item.id;

        submit.addEventListener("click", async (e) => {
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
            if (country.value < 1 || country.value == "") {
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
                        country: country.value,
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

    })
});

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
})