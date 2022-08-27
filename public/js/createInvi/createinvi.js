create_port = document.querySelector(".create_port")
portBod = document.querySelector(".port__section");
inviBod = document.querySelector(".invi__section");
menuBod = document.querySelector('.menu__section');
catBod = document.querySelector('.catalouge__section');

inviLayouts = document.querySelectorAll(".invi__layouts");

let inviOneForm = document.createElement("div");
inviOneForm.classList.add("createInvi");
inviOneForm.innerHTML = createInvi("fname", "sname", "aboutinvi", "whatinvi", "whyinvi", "inviwork", "invino", "invi__form__btn")

document.body.appendChild(inviOneForm);
let mkForm = document.querySelector('.createInvi');
mkForm.classList.add("hidden");
inid1 = document.getElementById("uiId").innerText;

inviLayouts.forEach(item => {

    item.addEventListener("click", () => {
        location.hash = "#portNav";
        portBod.classList.add("hidden");
        inviBod.classList.add("hidden");
        menuBod.classList.add("hidden");
        catBod.classList.add("hidden");
        mkForm.classList.remove("hidden");
        let yourname = document.querySelector("#fname");
        let secname = document.getElementById("sname")
        let aboutyou = document.getElementById("aboutinvi");
        let what = document.getElementById("whatinvi");
        let why = document.getElementById("whyinvi");
        let yourwork = document.getElementById("inviwork");
        let yourno = document.getElementById("invino")
        let submit = document.getElementById("invi__form__btn");
        let theme = item.id;

        submit.addEventListener("click", async (e) => {
            if (yourname.value < 1 || yourname.value == "" || yourname.value == null) {
                return false;
            }
            if (secname.value < 1 || secname.value == "" || secname.value == null) {
                return false;
            }
            if (aboutyou.value < 1 || aboutyou.value == "" || aboutyou.value == null) {
                return false;
            }
            if (what.value < 1 || what.value == "" || what.value == null) {
                return false;
            }
            if (why.value < 1 || why.value == "" || why.value == null) {
                return false;
            }
            if (yourno.value < 1 || yourno.value == "" || yourno.value == null) {
                return false;
            }
            if (yourwork.value < 1 || yourwork.value == "" || yourwork.value == null) {
                return false;
            }
            e.preventDefault();
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = '/api/v1/invite/makeInvi'
            try {
                await fetch((endpoint), {
                    method: 'POST',
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        fname: yourname.value,
                        sname: secname.value,
                        about: aboutyou.value,
                        address: what.value,
                        phn_no: yourno.value,
                        pdate: why.value,
                        theme: theme,
                        ptime: yourwork.value
                    })
                }).then((response) => {
                    load.classList.add("hidden");
                    if (response.status === 201) {
                        successAlert("Your Invitation has been created :)");
                        window.setTimeout(() => {
                            location.assign(`/invitations/${inid1}`);
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

let cancelInvite = document.querySelector(".cancel__invite");
cancelInvite.addEventListener("click", () => {
    mkForm.classList.add("hidden");
    portBod.classList.remove("hidden");
    inviBod.classList.remove("hidden");
    menuBod.classList.remove("hidden");
    catBod.classList.remove("hidden");
    location.hash = "#crtInvi";
})
