layout6 = document.querySelector("#layout6")
portBod6 = document.querySelector(".port__bod");
inviSec6 = document.querySelector('.invi__section');
menuSec6 = document.querySelector('.menu__section');
id6 = document.getElementById("usId").innerText;

let formLayoutSix = document.createElement("div");
formLayoutSix.classList.add('formLayout6')
formLayoutSix.innerHTML = `
<form class="comp__form">
    <div class="form__head">
        <h1>NI Layout</h1>
        <img src="/images/cancel.png" alt="cancel_img" class="clSixthcreate" />
    </div>
    <div class="form__cont">
        <label>Portfolio Name:</label>
        <input id="sixthname" type="text" placeholder="TechMafia" required/>
    </div>
    <div class="form__cont">
        <label>About Your Portfolio</label>
        <textarea id="sixthabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
    </div>
    <div class="form__cont">
        <label>What You Do:</label>
        <textarea id="sixthwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Why You Do it:</label>
        <textarea id="sixthwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Your Failure, How Did You tackle your failure</label>
        <textarea type="text" id="sixth4" rows="4" cols="50" placeholder="i failed i get up dividing my problem findinf the solution...." required></textarea>
    </div>
    <div class="form__cont">
        <label>How Do you motivate yourself?</label>
        <textarea type="text" id="sixth3" rows="4" cols="50" placeholder="When ever i go out of track...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Your Message To People</label>
        <textarea type="text" id="sixth5" rows="4" cols="50" placeholder="My Message to everyone..." required></textarea>
    </div>
    <label>Contact Details:</label>
    <div class="form__cont">
        <label>Phn Number:</label>
        <input id="sixthno" type="number" placeholder="9999888899" required/>
    </div>
    <div class="form__cont">
        <label>Show Number:</label>
        <input id="sixthCheck" type="checkbox" />
    </div>
    <div class="form__cont">
        <label>Email Address:</label>
        <input id="sixthemail" type="email" placeholder="techmafia@gmail.com" required/>
    </div>
    <div class="form__cont">
        <label>Your Social Media Profile Link</label>
        <input id="sixthFb" type="text" placeholder="https://www.facebook.com/instagram.com/" required />
    </div>
    <div class="form__cont">
        <label>Address</label>
        <input id="sixthLoc" type="text" placeholder="your location" required />
    </div>
    <div class="form__cont">
        <label>Prior Accomplishment</label>
        <textarea id="sixthwork"  rows="4" cols="50" placeholder="Your big or small any accomplishment relevent to your portfolio...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Prior Problem You Faced</label>
        <textarea type="text" id="sixth1" rows="4" cols="50" placeholder="The biggest problem i faced while i worked or was learning...." required></textarea>
    </div>
    <div class="form__cont">
        <label>How you solved your problem?</label>
        <textarea type="text" id="sixth2" rows="4" cols="50" placeholder="I just dont give up easy..." required></textarea>
    </div>
    
    <button id="sixthformbtn" class="redbtn">Create</button>
</form>
    `
document.body.appendChild(formLayoutSix);
let layoutSix = document.querySelector(".formLayout6")
layoutSix.classList.add("hidden");

layout6.addEventListener("click", () => {
    portBod6.classList.add("hidden");
    inviSec6.classList.add("hidden");
    menuSec6.classList.add("hidden");
    layoutSix.classList.remove("hidden");
    let yourname = document.querySelector("#sixthname");
    let aboutyou = document.getElementById("sixthabout");
    let what = document.getElementById("sixthwhat");
    let why = document.getElementById("sixthwhy");
    let yourno = document.getElementById("sixthno");
    let showNo = document.getElementById("sixthCheck");
    let youremail = document.getElementById("sixthemail");
    let fb = document.getElementById("sixthFb");
    let location = document.getElementById("sixthLoc");
    let yourwork = document.getElementById("sixthwork");
    let hd1 = document.getElementById("sixth1");
    let hd2 = document.getElementById("sixth2");
    let hd3 = document.getElementById("sixth3");
    let hd4 = document.getElementById("sixth4");
    let hd5 = document.getElementById("sixth5");
    let submit = document.getElementById("sixthformbtn");
    let theme = "836b9b955a98e0f2e2d678c179696d6ac53356eb";

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
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = '/api/v1/portfolio/makePorti'
            await fetch((endpoint), {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: yourname.value,
                    about: aboutyou.value,
                    what: what.value,
                    why: why.value,
                    phn_no: yourno.value,
                    showNo: showNo.checked,
                    theme: theme,
                    email: youremail.value,
                    fb: fb.value,
                    location: location.value,
                    previous: yourwork.value,
                    firstImgHead: hd1.value,
                    secondImgHead: hd2.value,
                    thirdImgHead: hd3.value,
                    fourthImgHead: hd4.value,
                    fifthImgHead: hd5.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Portfolio has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/myportfolio/${id6}`);
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
            hd5.value = ""
    })
})

let clsixthCreate = document.querySelector(".clSixthcreate")
clsixthCreate.addEventListener("click", () => {
    layoutSix.classList.add("hidden");
    portBod6.classList.remove("hidden");
    inviSec6.classList.remove("hidden");
    menuSec6.classList.remove("hidden");
})