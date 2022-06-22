layout2 = document.querySelector("#layout2")
portBod2 = document.querySelector(".port__bod");
inviSec2 = document.querySelector('.invi__section');
menuSec2 = document.querySelector('.menu__section');
catSec2 = document.querySelector('.catalouge__section');

id2 = document.getElementById("usId").innerText;

let formLayoutTwo = document.createElement("div");
formLayoutTwo.classList.add('formLayout2')
formLayoutTwo.innerHTML = createPortiForm("BG Layout", "cancelcreate", "yrname", "yrabout", "yrwhat", "yrwhy", "yrno", "yrCheck", "yremail", "yrFb", "yrLoc", "yrwork", "formbtn")
document.body.appendChild(formLayoutTwo);
let layoutTwo = document.querySelector(".formLayout2")
layoutTwo.classList.add("hidden");

layout2.addEventListener("click", () => {
    portBod2.classList.add("hidden");
    inviSec2.classList.add("hidden");
    menuSec2.classList.add("hidden");
    catSec2.classList.add("hidden");
    layoutTwo.classList.remove("hidden");
    let yourname = document.querySelector("#yrname");
    let aboutyou = document.getElementById("yrabout");
    let what = document.getElementById("yrwhat");
    let why = document.getElementById("yrwhy");
    let yourno = document.getElementById("yrno");
    let showNo = document.getElementById("yrCheck");
    let youremail = document.getElementById("yremail");
    let fb = document.getElementById("yrFb");
    let loction = document.getElementById("yrLoc");
    let yourwork = document.getElementById("yrwork");
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
        if (loction.value < 1 || loction.value == "" || loction.value == null) {
            return false;
        }
        if (yourwork.value < 1 || yourwork.value == "" || yourwork.value == null) {
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
                    location: loction.value,
                    previous: yourwork.value,
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Portfolio has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/myportfolio/${id2}`);
                    }, 400);
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Check Your Email Address!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})

let canclCreate = document.querySelector(".cancelcreate")
canclCreate.addEventListener("click", () => {
    layoutTwo.classList.add("hidden");
    portBod2.classList.remove("hidden");
    inviSec2.classList.remove("hidden");
    menuSec2.classList.remove("hidden");
    catSec2.classList.remove("hidden");
})

// `
// <form class="comp__form">
//     <div class="form__head">
//         <h1>BG Layout</h1>
//         <img src="/images/cancel.png" alt="cancel_img" class="cancelcreate" />
//     </div>
//     <div class="form__cont">
//         <label>Portfolio Name:</label>
//         <input id="yrname" type="text" placeholder="TechMafia" required/>
//     </div>
//     <div class="form__cont">
//         <label>About Your Portfolio</label>
//         <textarea id="yrabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
//     </div>
//     <div class="form__cont">
//         <label>What You Do:</label>
//         <textarea id="yrwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
//     </div>
//     <div class="form__cont">
//         <label>Why You Do it:</label>
//         <textarea id="yrwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
//     </div>
//     <label>Contact Details:</label>
//     <div class="form__cont">
//         <label>Phn Number:</label>
//         <input id="yrno" type="number" placeholder="9999888899" required/>
//     </div>
//     <div class="form__cont">
//         <label>Show Number:</label>
//         <input id="yrCheck" class="checkbox" type="checkbox" />
//     </div>
//     <div class="form__cont">
//         <label>Email Address:</label>
//         <input id="yremail" type="email" placeholder="techmafia@gmail.com" required/>
//     </div>
//     <div class="form__cont">
//         <label>Your Social Media Profile Link</label>
//         <input id="yrFb" type="text" placeholder="https://www.facebook.com/instagram.com/linkedin.com" />
//     </div>
//     <div class="form__cont">
//         <label>Address</label>
//         <input id="yrLoc" type="text" placeholder="your location" required />
//     </div>
//     <div class="form__cont">
//         <label>Previous Accomplishment Details</label>
//         <textarea id="yrwork"  rows="4" cols="50" placeholder="TechMafia has done..." required></textarea>
//     </div>
//     <button id="formbtn" class="redbtn">Create</button>
// </form>
//     `