layout2 = document.querySelector("#layout2")
portBod2 = document.querySelector(".port__bod");
inviSec2 = document.querySelector('.invi__section');
menuSec2 = document.querySelector('.menu__section');
id2 = document.getElementById("usId").innerText;

let formLayoutTwo = document.createElement("div");
formLayoutTwo.classList.add('formLayout2')
formLayoutTwo.innerHTML = `
<form class="comp__form">
    <div class="form__head">
        <h1>BG Layout</h1>
        <img src="/images/cancel.png" alt="cancel_img" class="cancelcreate" />
    </div>
    <div class="form__cont">
        <label>Portfolio Name:</label>
        <input id="yrname" type="text" placeholder="TechMafia" required/>
    </div>
    <div class="form__cont">
        <label>About Your Portfolio</label>
        <textarea id="yrabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
    </div>
    <div class="form__cont">
        <label>What You Do:</label>
        <textarea id="yrwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Why You Do it:</label>
        <textarea id="yrwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
    </div>
    <label>Contact Details:</label>
    <div class="form__cont">
        <label>Phn Number:</label>
        <input id="yrno" type="number" placeholder="9999888899" required/>
    </div>
    <div class="form__cont">
        <label>Show Number:</label>
        <input id="yrCheck" type="checkbox" />
    </div>
    <div class="form__cont">
        <label>Email Address:</label>
        <input id="yremail" type="email" placeholder="techmafia@gmail.com" required/>
    </div>
    <div class="form__cont">
        <label>Your Social Media Profile Link</label>
        <input id="yrFb" type="text" placeholder="https://www.facebook.com/instagram.com/linkedin.com" required />
    </div>
    <div class="form__cont">
        <label>Address</label>
        <input id="yrLoc" type="text" placeholder="your location" required />
    </div>
    <div class="form__cont">
        <label>Previous Accomplishment Details</label>
        <textarea id="yrwork"  rows="4" cols="50" placeholder="TechMafia has done..." required></textarea>
    </div>
    <div class="form__cont small__form">
        <label>Cover Image</label>
        <input type="file" id="yrimg1" name="img1" accept="image/*" required/>
        <label>Heading</label>
        <input type="text" id="frstImg" placeholder="Cover Image" required />
    </div>
    <label>Add Your Previous Accomplisments Image, All image field must have image --Required--</label>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="yrimg2" name="img2" accept="image/*" required/>
        <label>Heading</label>
        <input type="text" id="secndImg" placeholder="My second " required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="yrimg3" name="img3" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="thrdImg" placeholder="My third " required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="yrimg4" name="img4" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="fourImg" placeholder="My fourth "  required/>
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="yrimg5" name="img5" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="fiftImg" placeholder="My fifth" required />
    </div>
    <button id="formbtn" class="redbtn">Create</button>
</form>
    `
document.body.appendChild(formLayoutTwo);
let layoutTwo = document.querySelector(".formLayout2")
layoutTwo.classList.add("hidden");

layout2.addEventListener("click", () => {
    portBod2.classList.add("hidden");
    inviSec2.classList.add("hidden");
    menuSec2.classList.add("hidden");
    layoutTwo.classList.remove("hidden");
    let yourname = document.querySelector("#yrname");
    let aboutyou = document.getElementById("yrabout");
    let what = document.getElementById("yrwhat");
    let why = document.getElementById("yrwhy");
    let yourno = document.getElementById("yrno");
    let showNo = document.getElementById("yrCheck");
    let youremail = document.getElementById("yremail");
    let fb = document.getElementById("yrFb");
    let location = document.getElementById("yrLoc");
    let yourwork = document.getElementById("yrwork");
    let img1 = document.getElementById("yrimg1");
    let hd1 = document.getElementById("frstImg");
    let img2 = document.getElementById("yrimg2");
    let hd2 = document.getElementById("secndImg");
    let img3 = document.getElementById("yrimg3");
    let hd3 = document.getElementById("thrdImg");
    let img4 = document.getElementById("yrimg4");
    let hd4 = document.getElementById("fourImg");
    let img5 = document.getElementById("yrimg5");
    let hd5 = document.getElementById("fiftImg");
    let submit = document.getElementById("formbtn");
    let theme = "589c22335a381f122d129225f5c0ba3056ed5811";

    submit.addEventListener("click", async (e) => {
        if (yourname.value < 1 || yourname.value == "" || yourname.value == null) {
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
        if (youremail.value < 1 || youremail.value == "" || youremail.value == null) {
            return false;
        }
        if (fb.value < 1 || fb.value == "" || fb.value == null) {
            return false;
        }
        if (location.value < 1 || location.value == "" || location.value == null) {
            return false;
        }
        if (yourwork.value < 1 || yourwork.value == "" || yourwork.value == null) {
            return false;
        }
        if (hd1.value < 1 || hd1.value == "" || hd1.value == null) {
            return false;
        }
        if (hd2.value < 1 || hd2.value == "" || hd2.value == null) {
            return false;
        }
        if (hd3.value < 1 || hd3.value == "" || hd3.value == null) {
            return false;
        }
        if (hd4.value < 1 || hd4.value == "" || hd4.value == null) {
            return false;
        }
        if (hd5.value < 1 || hd5.value == "" || hd5.value == null) {
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
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const formData = new FormData();
            formData.append("name", yourname.value);
            formData.append("about", aboutyou.value);
            formData.append("what", what.value);
            formData.append("why", why.value);
            formData.append("phn_no", yourno.value);
            formData.append("showNo", showNo.checked);
            formData.append("email", youremail.value);
            formData.append("fb", fb.value);
            formData.append("location", location.value);
            formData.append("previous", yourwork.value);
            formData.append("theme", theme);
            formData.append("firstImgHead", hd1.value);
            formData.append("secondImgHead", hd2.value);
            formData.append("thirdImgHead", hd3.value);
            formData.append("fourthImgHead", hd4.value);
            formData.append("fifthImgHead", hd5.value);
            formData.append("imageCover", img1.files[0]);
            formData.append("imageSecond", img2.files[0]);
            formData.append("imageThird", img3.files[0]);
            formData.append("imageFourth", img4.files[0]);
            formData.append("imageFifth", img5.files[0]);
            const endpoint = '/api/v1/portfolio'
            await fetch((endpoint), {
                body: formData,
                method: 'POST'
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Portfolio has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/myportfolio/${id2}`);
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
            youremail.value = "",
            fb.value = "",
            location.value = "",
            yourno.value = "",
            aboutyou.value = "",
            what.value = "",
            why.value = "",
            yourwork.value = "",
            hd1.value = "",
            hd2.value = "",
            hd3.value = "",
            hd4.value = "",
            hd5.value = "",
            img1.value = "",
            img2.value = "",
            img3.value = "",
            img4.value = "",
            img5.value = ""
    })
})

let canclCreate = document.querySelector(".cancelcreate")
canclCreate.addEventListener("click", () => {
    layoutTwo.classList.add("hidden");
    portBod2.classList.remove("hidden");
    inviSec2.classList.remove("hidden");
    menuSec2.classList.remove("hidden");
})