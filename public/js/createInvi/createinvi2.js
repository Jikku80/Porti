create_port2 = document.querySelector(".create_port")
portBod2 = document.querySelector(".port__section");
inviBod2 = document.querySelector(".invi__section");
menuBod2 = document.querySelector(".menu__section");
catBod2 = document.querySelector('.catalouge__section');

invi2 = document.querySelector("#invi2");

let inviTwoForm = document.createElement("div");
inviTwoForm.classList.add("createInvi2");
inviTwoForm.innerHTML = `
    <form class="comp__form">
        <div class="form__head">
            <h1>INI Layout</h1>
            <img src="/images/cancel.png" alt="cancel_img" class="cancel__inviteTwo pointer" />
        </div>
        <p>You can Change Cover Image to your preference from update Cover Image</p>
        <div class="form__cont">
            <label>Program Name:</label>
            <input id="fname2" type="text" placeholder="Dr DE'z Party" required/>
        </div>
        <div class="form__cont">
            <label>Organizer Name:</label>
            <input id="sname2" type="text" placeholder="Dr D" required/>
        </div>
        <div class="form__cont">
            <label>Phone Number: </label>
            <input id="invino2" placeholder="999999998" required />
        </div>
        <div class="form__cont">
            <label>Program Detail :</label>
            <textarea id="aboutinvi2" rows="4" cols="30" placeholder="We gonna go all night wild..." required></textarea>
        </div>
        <div class="form__cont">
            <label>Venue :</label>
            <input id="whatinvi2" placeholder="Kings Palace" required />
        </div>
        <div class="form__cont">
            <label>Date :</label>
            <input id="whyinvi2" placeholder="2nd November 2022" required />
        </div>
        <div class="form__cont">
            <label>Time onwards: </label>
            <input id="inviwork2" placeholder="11:00 AM onwards" required />
        </div>
        <button id="invi__form__btn2" class="redbtn">Create</button>
    </form>
`

document.body.appendChild(inviTwoForm);
let mkForm2 = document.querySelector('.createInvi2');
mkForm2.classList.add("hidden");
inid2 = document.getElementById("uiId").innerText;

invi2.addEventListener("click", () => {
    location.hash = "#portNav"
    portBod2.classList.add("hidden");
    inviBod2.classList.add("hidden");
    menuBod2.classList.add("hidden");
    catBod2.classList.add("hidden");
    mkForm2.classList.remove("hidden");
    let yourname = document.querySelector("#fname2");
    let secname = document.getElementById("sname2")
    let aboutyou = document.getElementById("aboutinvi2");
    let what = document.getElementById("whatinvi2");
    let why = document.getElementById("whyinvi2");
    let yourwork = document.getElementById("inviwork2");
    let yourno = document.getElementById("invino2")
    let submit = document.getElementById("invi__form__btn2");
    let theme = "c71c0e24cd20e4b25ae8e3d9e35337500a44a8f7";

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
                    pdate: why.value,
                    ptime: yourwork.value,
                    phn_no: yourno.value,
                    theme: theme
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Invitation has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/invitations/${inid2}`);
                    }, 400);
                } else {
                    console.log(response)
                    errorAlert("All the fields are rquired!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })

})

let cancelInvite2 = document.querySelector(".cancel__inviteTwo");
cancelInvite2.addEventListener("click", () => {
    mkForm2.classList.add("hidden");
    portBod2.classList.remove("hidden");
    inviBod2.classList.remove("hidden");
    menuBod2.classList.remove("hidden");
    catBod2.classList.remove("hidden");
    location.hash = "#crtInvi";
})
