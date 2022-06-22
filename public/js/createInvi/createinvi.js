create_port = document.querySelector(".create_port")
portBod = document.querySelector(".port__section");
inviBod = document.querySelector(".invi__section");
menuBod = document.querySelector('.menu__section');
catBod = document.querySelector('.catalouge__section');

invi1 = document.querySelector("#invi1");

let inviOneForm = document.createElement("div");
inviOneForm.classList.add("createInvi");
inviOneForm.innerHTML = `
    <form class="comp__form">
        <div class="form__head">
            <h1>MRG Layout</h1>
            <img src="/images/cancel.png" alt="cancel_img" class="cancel__invite pointer" />
        </div>
        <div class="form__cont">
            <label>First Person Name:</label>
            <input id="fname" type="text" placeholder="Romeo" required/>
        </div>
        <div class="form__cont">
            <label>Second Person Name:</label>
            <input id="sname" type="text" placeholder="Juliet" required/>
        </div>
        <div class="form__cont">
            <label>Your Story :) :</label>
            <textarea id="aboutinvi" rows="4" cols="30" placeholder="We met at a bar down the alley..." required></textarea>
        </div>
        <div class="form__cont">
            <label>Venue :</label>
            <input id="whatinvi" placeholder="Kings Palace" required />
        </div>
        <div class="form__cont">
            <label>Date :</label>
            <input id="whyinvi" placeholder="2nd November 2022" required />
        </div>
        <div class="form__cont">
            <label>Time onwards: </label>
            <input id="inviwork" placeholder="11:00 AM onwards" required />
        </div>
        <div class="form__cont">
            <label>Phone Number: </label>
            <input id="invino" placeholder="999999998" required />
        </div>
        <div class="form__cont small__form">
            <label>Cover Image</label>
            <input type="file" id="inviimg1" name="img1" accept="image/*" required />
        </div>
        <label>Add Your Lovey Dovey Images, All image field must have image --Required--</label>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="inviimg2" name="img2" accept="image/*" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="inviimg3" name="img3" accept="image/*" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="inviimg4" name="img4" accept="image/*" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="inviimg5" name="img5" accept="image/*" required />
        </div>
        <button id="invi__form__btn" class="redbtn">Create</button>
    </form>
`

document.body.appendChild(inviOneForm);
let mkForm = document.querySelector('.createInvi');
mkForm.classList.add("hidden");
inid1 = document.getElementById("uiId").innerText;

invi1.addEventListener("click", () => {
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
    let img1 = document.getElementById("inviimg1");
    let img2 = document.getElementById("inviimg2");
    let img3 = document.getElementById("inviimg3");
    let img4 = document.getElementById("inviimg4");
    let img5 = document.getElementById("inviimg5");
    let submit = document.getElementById("invi__form__btn");
    let theme = "4dc50fc3bc007be011b5445f3f79298b9eeb51b7";

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
        if (img1.files[0] < 1 || img1.files[0] == "" || img1.files[0] == null) {
            return false;
        }
        if (img2.files[0] < 1 || img2.files[0] == "" || img2.files[0] == null) {
            return false;
        }
        if (img3.files[0] < 1 || img3.files[0] == "" || img3.files[0] == null) {
            return false;
        }
        if (img4.files[0] < 1 || img4.files[0] == "" || img4.files[0] == null) {
            return false;
        }
        if (img5.files[0] < 1 || img5.files[0] == "" || img5.files[0] == null) {
            return false;
        }
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const formData = new FormData();
        formData.append("fname", yourname.value);
        formData.append("sname", secname.value);
        formData.append("about", aboutyou.value);
        formData.append("address", what.value);
        formData.append("pdate", why.value);
        formData.append("ptime", yourwork.value);
        formData.append("phn_no", yourno.value);
        formData.append("theme", theme);
        formData.append("imgCover", img1.files[0]);
        formData.append("imgSecond", img2.files[0]);
        formData.append("imgThird", img3.files[0]);
        formData.append("imgFourth", img4.files[0]);
        formData.append("imgFifth", img5.files[0]);
        const endpoint = '/api/v1/invite'
        try {
            await fetch((endpoint), {
                body: formData,
                method: 'POST'
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
        yourname.value = "",
            secname.value = "",
            aboutyou.value = "",
            what.value = "",
            why.value = "",
            yourwork.value = "",
            yourno.value = "",
            img1.value = "",
            img2.value = "",
            img3.value = "",
            img4.value = "",
            img5.value = ""
    })

})

let cancelInvite = document.querySelector(".cancel__invite");
cancelInvite.addEventListener("click", () => {
    mkForm.classList.add("hidden");
    portBod.classList.remove("hidden");
    inviBod.classList.remove("hidden");
    menuBod.classList.remove("hidden");
    catBod.classList.remove("hidden");
})
