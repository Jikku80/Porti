layout6 = document.querySelector("#layout6")
portBod = document.querySelector(".port__bod");

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
    infoAlert("Please Remember Your Phone number, required to access your creations!", "All the fields are Required")
    portBod.classList.add("hidden");
    layoutSix.classList.remove("hidden");
    let yourname = document.querySelector("#sixthname");
    let aboutyou = document.getElementById("sixthabout");
    let what = document.getElementById("sixthwhat");
    let why = document.getElementById("sixthwhy");
    let yourno = document.getElementById("sixthno");
    let showNo = document.getElementById("sixthCheck");
    let youremail = document.getElementById("sixthemail");
    let fb = document.getElementById("sixthFb");
    let yourwork = document.getElementById("sixthwork");
    let hd1 = document.getElementById("sixth1");
    let hd2 = document.getElementById("sixth2");
    let hd3 = document.getElementById("sixth3");
    let hd4 = document.getElementById("sixth4");
    let hd5 = document.getElementById("sixth5");
    let submit = document.getElementById("sixthformbtn");
    let theme = "836b9b955a98e0f2e2d678c179696d6ac53356eb";

    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            let num = btoa(yourno.value);
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
            hd5.value = ""
    })
})

let clsixthCreate = document.querySelector(".clSixthcreate")
clsixthCreate.addEventListener("click", () => {
    layoutSix.classList.add("hidden");
    portBod.classList.remove("hidden");
})