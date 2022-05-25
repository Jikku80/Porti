layout4 = document.querySelector("#layout4")
portBod4 = document.querySelector(".port__bod");
inviSec4 = document.querySelector('.invi__section');
menuSec4 = document.querySelector('.menu__section');
id4 = document.getElementById("usId").innerText;

let formLayoutFour = document.createElement("div");
formLayoutFour.classList.add('formLayout4')
formLayoutFour.innerHTML = `
<form class="comp__form">
    <div class="form__head">
        <h1>BS Layout</h1>
        <img src="/images/cancel.png" alt="cancel_img" class="clcreate" />
    </div>
    <div class="form__cont">
        <label>Portfolio Name:</label>
        <input id="fourthname" type="text" placeholder="TechMafia" required/>
    </div>
    <div class="form__cont">
        <label>About Your Portfolio</label>
        <textarea id="fourthabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
    </div>
    <div class="form__cont">
        <label>What You Do:</label>
        <textarea id="fourthwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Why You Do it:</label>
        <textarea id="fourthwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
    </div>
    <label>Contact Details:</label>
    <div class="form__cont">
        <label>Phn Number:</label>
        <input id="fourthno" type="number" placeholder="9999888899" required/>
    </div>
    <div class="form__cont">
        <label>Show Number:</label>
        <input id="fourthCheck" class="checkbox" type="checkbox" />
    </div>
    <div class="form__cont">
        <label>Email Address:</label>
        <input id="fourthemail" type="email" placeholder="techmafia@gmail.com" required/>
    </div>
    <div class="form__cont">
        <label>Your Social Media Profile Link</label>
        <input id="fourthFb" type="text" placeholder="https://www.facebook.com/instagram.com/" required />
    </div>
    <div class="form__cont">
        <label>Address</label>
        <input id="fourthLoc" type="text" placeholder="your location" required />
    </div>
    <div class="form__cont">
        <label>Prior Accomplishment</label>
        <textarea id="fourthwork"  rows="4" cols="50" placeholder="Your big or small any accomplishment relevent to your portfolio...." required></textarea>
    </div>
    <div class="form__cont small__form">
        <label>Cover Image</label>
        <input type="file" id="fourthimg1" name="img1" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="fourth1Img" placeholder="My first" required />
    </div>
    <label>Add Your Accomplishment Image, All image field must have image --Required--</label>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="fourthimg2" name="img2" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="fourth2Img" placeholder="My second" required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="fourthimg3" name="img3" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="fourth3Img" placeholder="My third" required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="fourthimg4" name="img4" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="fourth4Img" placeholder="My fourth" required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="fourthimg5" name="img5" accept="image/*" required/>
        <label>Heading</label>
        <input type="text" id="fourth5Img" placeholder="My fifth" required />
    </div>
    <button id="fourthformbtn" class="redbtn">Create</button>
</form>
    `
document.body.appendChild(formLayoutFour);
let layoutFour = document.querySelector(".formLayout4")
layoutFour.classList.add("hidden");

layout4.addEventListener("click", () => {
    portBod4.classList.add("hidden");
    inviSec4.classList.add("hidden");
    menuSec4.classList.add("hidden");
    layoutFour.classList.remove("hidden");
    let yourname = document.querySelector("#fourthname");
    let aboutyou = document.getElementById("fourthabout");
    let what = document.getElementById("fourthwhat");
    let why = document.getElementById("fourthwhy");
    let yourno = document.getElementById("fourthno");
    let showNo = document.getElementById("fourthCheck");
    let youremail = document.getElementById("fourthemail");
    let fb = document.getElementById("fourthFb");
    let loction = document.getElementById("fourthLoc");
    let yourwork = document.getElementById("fourthwork");
    let img1 = document.getElementById("fourthimg1");
    let hd1 = document.getElementById("fourth1Img");
    let img2 = document.getElementById("fourthimg2");
    let hd2 = document.getElementById("fourth2Img");
    let img3 = document.getElementById("fourthimg3");
    let hd3 = document.getElementById("fourth3Img");
    let img4 = document.getElementById("fourthimg4");
    let hd4 = document.getElementById("fourth4Img");
    let img5 = document.getElementById("fourthimg5");
    let hd5 = document.getElementById("fourth5Img");
    let submit = document.getElementById("fourthformbtn");
    let theme = "d798d4338adeb553a1089a58e61e18c2fcdf77bb";

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
        if (loction.value < 1 || loction.value == "" || loction.value == null) {
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
            formData.append("location", loction.value);
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
                        location.assign(`/myportfolio/${id4}`);
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
            loction.value = "",
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

let clCreate = document.querySelector(".clcreate")
clCreate.addEventListener("click", () => {
    layoutFour.classList.add("hidden");
    portBod4.classList.remove("hidden");
    inviSec4.classList.remove("hidden");
    menuSec4.classList.remove("hidden");
})