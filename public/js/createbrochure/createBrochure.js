let footerBodB = document.querySelector(".footer")
let inviBodB = document.querySelector(".invi__section");
let brochure = document.querySelector('.brochure__section');

brochureLayouts = document.querySelectorAll(".brochure_layouts");

let brochureOneForm = document.createElement("div");
brochureOneForm.classList.add("createBrochure");
brochureOneForm.innerHTML = createBrochure("brochurename", "brochureemail", "brochuresocial", "brochureaddress", "brochureadd_link", "brochurephn_no", "brochureslogan", "brochure__form__btn", "brochurecountry", "brochureorgtype")

document.body.appendChild(brochureOneForm);
let mkBForm = document.querySelector('.createBrochure');
mkBForm.classList.add("hidden");
let brochureuserid = document.getElementById("uiId").innerText;

brochureLayouts.forEach(item => {

    item.addEventListener("click", () => {
        location.hash = "#portNav";
        footerBodB.classList.add("hidden");
        inviBodB.classList.add("hidden");
        brochure.classList.add("hidden");
        mkBForm.classList.remove("hidden");
        let name = document.querySelector("#brochurename");
        let email = document.getElementById("brochureemail")
        let social = document.getElementById("brochuresocial");
        let address = document.getElementById("brochureaddress");
        let add_link = document.getElementById("brochureadd_link");
        let slogan = document.getElementById("brochureslogan");
        let phn_no = document.getElementById("brochurephn_no")
        let submit = document.getElementById("brochure__form__btn");
        let country = document.getElementById("brochurecountry");
        let orgType = document.getElementById("brochureorgtype")
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
            e.preventDefault();
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/brochure/createOrganization`
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
                        orgType: orgType.value
                    })
                }).then((response) => {
                    load.classList.add("hidden");
                    if (response.status === 201) {
                        successAlert("Your Organization has been created :)");
                        window.setTimeout(() => {
                            location.assign(`/brochure/${brochureuserid}/additems`);
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

let cancelBrochure = document.querySelector(".cancel__brochure");
cancelBrochure.addEventListener("click", () => {
    mkBForm.classList.add("hidden");
    footerBodB.classList.remove("hidden");
    inviBodB.classList.remove("hidden");
    brochure.classList.remove("hidden");
    window.setTimeout(() => {
        location.hash = "#crtBrochure";
    }, 200)
})