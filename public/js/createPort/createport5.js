layout5 = document.querySelector("#layout5")
footer5 = document.querySelector(".footer")
portBod5 = document.querySelector(".port__bod");
inviSec5 = document.querySelector('.invi__section');
menuSec5 = document.querySelector('.menu__section');
catSec5 = document.querySelector('.catalouge__section');

id5 = document.getElementById("usId").innerText;

let formLayoutFive = document.createElement("div");
formLayoutFive.classList.add('formLayout5')
formLayoutFive.innerHTML = `
<form class="comp__form" action="/api/v1/portfolio/createCollec" method="post" enctype="multipart/form-data">
    <div class="form__head">
        <h1>AT Layout</h1>
        <img src="/images/cancel.png" alt="cancel_img" class="clFivecreate" />
    </div>
    <div class="to_centre">
        <button id="skipandcreateport" class="whitebtn wite">Skip Form & Create</button>
    </div>
    <div class="form__cont">
        <label class="form__label">Portfolio Name:</label>
        <input id="fifthname" class="form__input" name="portname" type="text" placeholder="TechMafia" required/>
    </div>
    <div class="form__cont">
        <label class="form__label">Occupation:</label>
        <input id="fifthrole" class="form__input" name="role" type="text" placeholder="Artist, Photographer" required/>
    </div>
    <div class="form__cont">
        <label class="form__label">About Your Portfolio</label>
        <textarea id="fifthabout" class="form__input" name="aboutyou" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
    </div>
    <div class="form__cont">
        <label class="form__label">What You Do:</label>
        <textarea id="fifthwhat" class="form__input" name="whatyoudo" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
    </div>
    <div class="form__cont">
        <label class="form__label">Why You Do it:</label>
        <textarea id="fifthwhy" class="form__input" name="whyyoudo" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
    </div>
    <label>Contact Details:</label>
    <div class="form__cont">
        <label class="form__label">Phone Number:</label>
        <input id="fifthno" class="form__input" type="number" name="phonenumber" placeholder="9999888899" required/>
    </div>
    <div class="form__cont">
        <label class="form__label">Show Number:</label>
        <input id="fifthCheck"  class="checkbox form__input" name="shownumber" type="checkbox" />
    </div>
    <div class="form__cont">
        <label class="form__label">Email Address:</label>
        <input id="fifthemail" class="form__input" type="email" name="emailaddress" placeholder="techmafia@gmail.com" required/>
    </div>
    <div class="form__cont">
        <label class="form__label">Your Social Media Profile Link</label>
        <input id="fifthFb" class="form__input" type="text" name="social" placeholder="https://www.facebook.com/instagram.com/" required />
    </div>
    <div class="form__cont">
        <label class="form__label">Address</label>
        <input id="fifthLoc" class="form__input" type="text" name="address" placeholder="your location" required />
        <input id="fifthtm" class="form__input hidden" type="text" name="theme" value="da98568d1b2005611973ad49868b38aa8ae68fd7" required />
    </div>
    <p>You can Upload Upto 20 Images At Once</p>
    <div class="form__cont small__form">
        <label class="form__label">Upload Images</label>
        <input type="file" class="form__input" id="fifthimg1" name="uploadimages" multiple accept="image/*"/>
    </div>
    <div class="form__btn">
    <button id="fifthformbtn" class="redbtn">Create</button>
    </div>

</form>
    `
document.body.appendChild(formLayoutFive);
let layoutFive = document.querySelector(".formLayout5")
layoutFive.classList.add("hidden");

layout5.addEventListener("click", () => {
    location.hash = "#portNav"
    portBod5.classList.add("hidden");
    footer5.classList.add("hidden");
    inviSec5.classList.add("hidden");
    menuSec5.classList.add("hidden");
    catSec5.classList.add("hidden");
    layoutFive.classList.remove("hidden");
})

let clFiveCreate = document.querySelector(".clFivecreate")
clFiveCreate.addEventListener("click", () => {
    layoutFive.classList.add("hidden");
    portBod5.classList.remove("hidden");
    footer5.classList.remove("hidden");
    inviSec5.classList.remove("hidden");
    // menuSec5.classList.remove("hidden");
    // catSec5.classList.remove("hidden");
    window.setTimeout(() => {
        location.hash = "#crtPort";
    }, 200)
})

let skipandcreate = document.getElementById("skipandcreateport");

skipandcreate.addEventListener("click", async (e) => {
    let aboutyou = document.querySelector("#fifthabout");
    let what = document.getElementById("fifthwhat");
    let why = document.getElementById("fifthwhy");
    let yourno = document.getElementById("fifthno");
    let showNo = document.getElementById("fifthCheck");
    let fb = document.getElementById("fifthFb");
    let loction = document.getElementById("fifthLoc");
    let theme = document.getElementById("fifthtm").value;
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden");
    let curname = document.getElementById("curlogusr").innerText;
    let curemail = document.getElementById("curusremail").innerText;
    let yorname = document.querySelector("#fifthname").value;
    let yoremail = document.getElementById("fifthemail").value;
    let yorrole = document.querySelector("#fifthrole").value;

    const endpoint = '/api/v1/portfolio/makePorti'
    let yname;
    let yrole;
    let yemail;
    if (yorname !== "") {
        yname = yorname;
    }
    else {
        yname = curname;
    }
    if (yorrole !== "") {
        yrole = yorrole;
    } else {
        yrole = "Human";
    }
    if (yoremail !== "") {
        yemail = yoremail;
    }
    else {
        yemail = curemail;
    }

    try {
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: yname,
                role: yrole,
                about: aboutyou.value,
                what: what.value,
                why: why.value,
                phn_no: yourno.value,
                showNo: showNo.checked,
                theme: theme,
                email: yemail,
                fb: fb.value,
                location: loction.value,
                createdAt: Date.now()
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 201) {
                successAlert("Your Portfolio has been created :)");
                let newid = btoa(id1);
                window.setTimeout(() => {
                    location.assign(`/myportfolio/${newid}`);
                }, 400);
            } else {
                errorAlert("Email Address or Phone Number is not correct!!!")
                console.log(response);
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})