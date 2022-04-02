layout5 = document.querySelector("#layout5")
portBod = document.querySelector(".port__bod");

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
        <input id="fifthCheck" type="checkbox" />
    </div>
    <div class="form__cont">
        <label>Email Address:</label>
        <input id="fifthemail" type="email" placeholder="techmafia@gmail.com" required/>
    </div>
    <div class="form__cont">
        <label>Your Social Media Profile Link</label>
        <input id="fifthFb" type="text" placeholder="https://www.facebook.com/instagram.com/" required />
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
    infoAlert("Please Remember Your Phone number, required to access your creations!", "All the fields are Required")
    portBod.classList.add("hidden");
    layoutFive.classList.remove("hidden");
    let yourname = document.querySelector("#fifthname");
    let yourabout = document.getElementById("fifthabout");
    let yourwhat = document.getElementById("fifthwhat");
    let yourwhy = document.getElementById("fifthwhy");
    let yourno = document.getElementById("fifthno");
    let showNo = document.getElementById("fifthCheck");
    let youremail = document.getElementById("fifthemail");
    let fb = document.getElementById("fifthFb");
    let img1 = document.getElementById("fifthimg1");
    let submit = document.getElementById("fifthformbtn");
    let theme = "da98568d1b2005611973ad49868b38aa8ae68fd7";
    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            let num = btoa(yourno.value);
            const formData = new FormData();
            formData.append("name", yourname.value);
            formData.append("about", yourabout.value);
            formData.append("what", yourwhat.value);
            formData.append("why", yourwhy.value);
            formData.append("phn_no", yourno.value);
            formData.append("showNo", showNo.checked);
            formData.append("email", youremail.value);
            formData.append("fb", fb.value);
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
                        location.assign(`/myportfolio/${num}?${theme}`);
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
            yourno.value = "",
            img1.value = ""
    })
})

let clFiveCreate = document.querySelector(".clFivecreate")
clFiveCreate.addEventListener("click", () => {
    layoutFive.classList.add("hidden");
    portBod.classList.remove("hidden");
})