layout5 = document.querySelector("#layout5")
portBod5 = document.querySelector(".port__bod");
inviSec5 = document.querySelector('.invi__section');
menuSec5 = document.querySelector('.menu__section');
id5 = document.getElementById("usId").innerText;

let formLayoutFive = document.createElement("div");
formLayoutFive.classList.add('formLayout5')
formLayoutFive.innerHTML = `
<form class="comp__form">
    <div class="form__head">
        <h1>AT Layout</h1>
        <img src="/images/cancel.png" alt="cancel_img" class="clFivecreate" />
    </div>
    <div class="form__cont">
        <label>Portfolio Name:</label>
        <input id="fifthname" type="text" placeholder="TechMafia" required/>
    </div>
    <div class="form__cont">
        <label>About Your Portfolio</label>
        <textarea id="fifthabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
    </div>
    <div class="form__cont">
        <label>What You Do:</label>
        <textarea id="fifthwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Why You Do it:</label>
        <textarea id="fifthwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
    </div>
    <label>Contact Details:</label>
    <div class="form__cont">
        <label>Phn Number:</label>
        <input id="fifthno" type="number" placeholder="9999888899" required/>
    </div>
    <div class="form__cont">
        <label>Show Number:</label>
        <input id="fifthCheck" class="checkbox" type="checkbox" />
    </div>
    <div class="form__cont">
        <label>Email Address:</label>
        <input id="fifthemail" type="email" placeholder="techmafia@gmail.com" required/>
    </div>
    <div class="form__cont">
        <label>Your Social Media Profile Link</label>
        <input id="fifthFb" type="text" placeholder="https://www.facebook.com/instagram.com/" required />
    </div>
    <div class="form__cont">
        <label>Address</label>
        <input id="fifthLoc" type="text" placeholder="your location" required />
    </div>
    <p>You can Upload Upto 20 Images At Once</p>
    <div class="form__cont small__form">
        <label>Upload Images</label>
        <input type="file" id="fifthimg1" multiple name="img1" accept="image/*" required />
    </div>
    <button id="fifthformbtn" class="redbtn">Create</button>
</form>
    `
document.body.appendChild(formLayoutFive);
let layoutFive = document.querySelector(".formLayout5")
layoutFive.classList.add("hidden");

layout5.addEventListener("click", () => {
    portBod5.classList.add("hidden");
    inviSec5.classList.add("hidden");
    menuSec5.classList.add("hidden");
    layoutFive.classList.remove("hidden");
    let yourname = document.querySelector("#fifthname");
    let yourabout = document.getElementById("fifthabout");
    let yourwhat = document.getElementById("fifthwhat");
    let yourwhy = document.getElementById("fifthwhy");
    let yourno = document.getElementById("fifthno");
    let showNo = document.getElementById("fifthCheck");
    let youremail = document.getElementById("fifthemail");
    let fb = document.getElementById("fifthFb");
    let location = document.getElementById("fifthLoc");
    let img1 = document.getElementById("fifthimg1");
    let submit = document.getElementById("fifthformbtn");
    let theme = "da98568d1b2005611973ad49868b38aa8ae68fd7";
    submit.addEventListener("click", async (e) => {
        if (yourname.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        if (yourabout.value < 1 || yourabout.value == "" || yourabout.value == null) {
            return false;
        }
        if (yourwhat.value < 1 || yourwhat.value == "" || yourwhat.value == null) {
            return false;
        }
        if (yourwhy.value < 1 || yourwhy.value == "" || yourwhy.value == null) {
            return false;
        }
        if (yourno.value < 1 || yourno.value == "" || yourno.value == null) {
            return false;
        }
        if (youremail.value < 1 || youremail.value == "" || youremail.value == null) {
            return false;
        }
        if (fb.value < 1 || fb.value == "" || fb.value == null) {
            return false;
        }
        if (location.value < 1 || location.value == "" || location.value == null) {
            return false;
        }
        if (img1.files[0] < 1 || img1.files[0] == "" || img1.files[0] == null) {
            return false;
        }
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const formData = new FormData();
            formData.append("name", yourname.value);
            formData.append("about", yourabout.value);
            formData.append("what", yourwhat.value);
            formData.append("why", yourwhy.value);
            formData.append("phn_no", yourno.value);
            formData.append("showNo", showNo.checked);
            formData.append("email", youremail.value);
            formData.append("fb", fb.value);
            formData.append("location", location.value);
            formData.append("theme", theme);
            for (var x = 0; x < img1.files.length; x++) {
                formData.append("images", img1.files[x]);
            }
            const endpoint = '/api/v1/portfolio/createCollec'
            await fetch((endpoint), {
                body: formData,
                method: 'POST'
            }).then((response) => {
                load.classList.add("hidden");
                console.log(response);
                if (response.status === 201) {
                    successAlert("Your Portfolio has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/myportfolio/${id5}`);
                    }, 400);
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
        yourname.value = "",
            yourabout.value = "",
            yourwhat.value = "",
            yourwhy.value = "",
            youremail.value = "",
            fb.value = "",
            location.value = "",
            yourno.value = "",
            img1.value = ""
    })
})

let clFiveCreate = document.querySelector(".clFivecreate")
clFiveCreate.addEventListener("click", () => {
    layoutFive.classList.add("hidden");
    portBod5.classList.remove("hidden");
    inviSec5.classList.remove("hidden");
    menuSec5.classList.remove("hidden");
})