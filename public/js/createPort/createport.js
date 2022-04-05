create_port = document.querySelector(".create_port")
portBod = document.querySelector(".port__bod");
inviSec = document.querySelector('.invi__section');
layout1 = document.querySelector("#layout1");

let layoutOneForm = document.createElement("div");
layoutOneForm.classList.add("createForm");
layoutOneForm.innerHTML = `
    <form class="comp__form">
        <div class="form__head">
            <h1>PL Layout</h1>
            <img src="/images/cancel.png" alt="cancel_img" class="cancel__create" />
        </div>
        <div class="form__cont">
            <label>Portfolio Name:</label>
            <input id="yourname" type="text" placeholder="TechMafia" required/>
        </div>
        <div class="form__cont">
            <label>About Your Portfolio</label>
            <textarea id="aboutyou" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
        </div>
        <div class="form__cont">
            <label>What You Do:</label>
            <textarea id="what" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
        </div>
        <div class="form__cont">
            <label>Why You Do it:</label>
            <textarea id="why" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
        </div>
        <label>Contact Details:</label>
        <div class="form__cont">
            <label>Phn Number:</label>
            <input id="yourno" type="number" placeholder="9999888899" required/>
        </div>
        <div class="form__cont">
            <label>Show Number:</label>
            <input id="yourCheck" type="checkbox" />
        </div>
        <div class="form__cont">
            <label>Email Address:</label>
            <input id="youremail" type="email" placeholder="techmafia@gmail.com" required/>
        </div>
        <div class="form__cont">
            <label>Your Social Profile Link</label>
            <input id="yourFb" type="text" placeholder="https://www.facebook.com/instagram.com/linkedin.com" required />
        </div>
        <div class="form__cont">
            <label>Previous Accomplishment Details</label>
            <textarea id="yourwork"  rows="4" cols="50" placeholder="TechMafia has done..." required></textarea>
        </div>
        <label>Add Your Previous Accomplishment Image, All image field must have image --Required--</label>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="yourimg1" name="img1" accept="image/*" required />
            <label>Heading</label>
            <input type="text" id="firstImg" placeholder="My first" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="yourimg2" name="img2" accept="image/*" required />
            <label>Heading</label>
            <input type="text" id="secondImg" placeholder="My second" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="yourimg3" name="img3" accept="image/*" required />
            <label>Heading</label>
            <input type="text" id="thirdImg" placeholder="My third" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="yourimg4" name="img4" accept="image/*" required />
            <label>Heading</label>
            <input type="text" id="fourtImg" placeholder="My fourth" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="yourimg5" name="img5" accept="image/*" required />
            <label>Heading</label>
            <input type="text" id="fifthImg" placeholder="My fifth" required />
        </div>
        <button id="form__btn" class="redbtn">Create</button>
    </form>
`

document.body.appendChild(layoutOneForm);
let crForm = document.querySelector('.createForm');
crForm.classList.add("hidden");

layout1.addEventListener("click", () => {
    infoAlert("Please Remember Your Phone number, required to access your creations!", "All the fields are Required")
    portBod.classList.add("hidden");
    inviSec.classList.add("hidden");
    crForm.classList.remove("hidden");
    let yourname = document.querySelector("#yourname");
    let aboutyou = document.getElementById("aboutyou");
    let what = document.getElementById("what");
    let why = document.getElementById("why");
    let yourno = document.getElementById("yourno");
    let showNo = document.getElementById("yourCheck");
    let youremail = document.getElementById("youremail");
    let fb = document.getElementById("yourFb");
    let yourwork = document.getElementById("yourwork");
    let img1 = document.getElementById("yourimg1");
    let hd1 = document.getElementById("firstImg");
    let img2 = document.getElementById("yourimg2");
    let hd2 = document.getElementById("secondImg");
    let img3 = document.getElementById("yourimg3");
    let hd3 = document.getElementById("thirdImg");
    let img4 = document.getElementById("yourimg4");
    let hd4 = document.getElementById("fourtImg");
    let img5 = document.getElementById("yourimg5");
    let hd5 = document.getElementById("fifthImg");
    let submit = document.getElementById("form__btn");
    let theme = "a9993e364706816aba3e25717850c26c9cd0d89d";

    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let num = btoa(yourno.value);
        const formData = new FormData();
        formData.append("name", yourname.value);
        formData.append("about", aboutyou.value);
        formData.append("what", what.value);
        formData.append("why", why.value);
        formData.append("phn_no", yourno.value);
        formData.append("showNo", showNo.checked);
        formData.append("email", youremail.value);
        formData.append("fb", fb.value);
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
        try {
            await fetch((endpoint), {
                body: formData,
                method: 'POST'
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Portfolio has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/myportfolio/${num}?${theme}`);
                    }, 400);
                } else {
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

let cancelCreate = document.querySelector(".cancel__create");
cancelCreate.addEventListener("click", () => {
    crForm.classList.add("hidden");
    portBod.classList.remove("hidden");
    inviSec.classList.remove("hidden");
})
