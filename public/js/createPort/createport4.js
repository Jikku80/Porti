layout4 = document.querySelector("#layout4")
portBod4 = document.querySelector(".port__bod");
inviSec4 = document.querySelector('.invi__section');
menuSec4 = document.querySelector('.menu__section');
catSec4 = document.querySelector('.catalouge__section');

id4 = document.getElementById("usId").innerText;

let formLayoutFour = document.createElement("div");
formLayoutFour.classList.add('formLayout4')
formLayoutFour.innerHTML = createPortiForm("BS Layout", "clcreate", "fourthname", "fourthabout", "fourthwhat", "fourthwhy", "fourthno", "fourthCheck", "fourthemail", "fourthFb", "fourthLoc", "fourthwork", "fourthformbtn")
document.body.appendChild(formLayoutFour);
let layoutFour = document.querySelector(".formLayout4")
layoutFour.classList.add("hidden");

layout4.addEventListener("click", () => {
    portBod4.classList.add("hidden");
    inviSec4.classList.add("hidden");
    menuSec4.classList.add("hidden");
    catSec4.classList.add("hidden");
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
                        location.assign(`/myportfolio/${id4}`);
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

let clCreate = document.querySelector(".clcreate")
clCreate.addEventListener("click", () => {
    layoutFour.classList.add("hidden");
    portBod4.classList.remove("hidden");
    inviSec4.classList.remove("hidden");
    menuSec4.classList.remove("hidden");
    catSec4.classList.remove("hidden");
})

// `
// <form class="comp__form">
//     <div class="form__head">
//         <h1>BS Layout</h1>
//         <img src="/images/cancel.png" alt="cancel_img" class="clcreate" />
//     </div>
//     <div class="form__cont">
//         <label>Portfolio Name:</label>
//         <input id="fourthname" type="text" placeholder="TechMafia" required/>
//     </div>
//     <div class="form__cont">
//         <label>About Your Portfolio</label>
//         <textarea id="fourthabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
//     </div>
//     <div class="form__cont">
//         <label>What You Do:</label>
//         <textarea id="fourthwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
//     </div>
//     <div class="form__cont">
//         <label>Why You Do it:</label>
//         <textarea id="fourthwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
//     </div>
//     <label>Contact Details:</label>
//     <div class="form__cont">
//         <label>Phn Number:</label>
//         <input id="fourthno" type="number" placeholder="9999888899" required/>
//     </div>
//     <div class="form__cont">
//         <label>Show Number:</label>
//         <input id="fourthCheck" class="checkbox" type="checkbox" />
//     </div>
//     <div class="form__cont">
//         <label>Email Address:</label>
//         <input id="fourthemail" type="email" placeholder="techmafia@gmail.com" required/>
//     </div>
//     <div class="form__cont">
//         <label>Your Social Media Profile Link</label>
//         <input id="fourthFb" type="text" placeholder="https://www.facebook.com/instagram.com/"/>
//     </div>
//     <div class="form__cont">
//         <label>Address</label>
//         <input id="fourthLoc" type="text" placeholder="your location" required />
//     </div>
//     <div class="form__cont">
//         <label>Prior Accomplishment</label>
//         <textarea id="fourthwork"  rows="4" cols="50" placeholder="Your big or small any accomplishment relevent to your portfolio...." required></textarea>
//     </div>
//     <button id="fourthformbtn" class="redbtn">Create</button>
// </form>
//     `