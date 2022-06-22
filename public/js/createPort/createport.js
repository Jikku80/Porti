create_port = document.querySelector(".create_port")
portBod = document.querySelector(".port__bod");
inviSec = document.querySelector('.invi__section');
menuSec = document.querySelector('.menu__section');
catSec = document.querySelector('.catalouge__section');
layout1 = document.querySelector("#layout1");
id1 = document.getElementById("usId").innerText;

let layoutOneForm = document.createElement("div");
layoutOneForm.classList.add("createForm");
layoutOneForm.innerHTML = createPortiForm("PL Layout", "cancel__create", "yourname", "aboutyou", "what", "why", "yourno", "yourCheck", "youremail", "yourFb", "yourLoc", "yourwork", "form__btn")

document.body.appendChild(layoutOneForm);
let crForm = document.querySelector('.createForm');
crForm.classList.add("hidden");

layout1.addEventListener("click", () => {
    portBod.classList.add("hidden");
    inviSec.classList.add("hidden");
    menuSec.classList.add("hidden");
    catSec.classList.add("hidden");
    crForm.classList.remove("hidden");
    let yourname = document.querySelector("#yourname");
    let aboutyou = document.querySelector("#aboutyou");
    let what = document.getElementById("what");
    let why = document.getElementById("why");
    let yourno = document.getElementById("yourno");
    let showNo = document.getElementById("yourCheck");
    let youremail = document.getElementById("youremail");
    let fb = document.getElementById("yourFb");
    let loction = document.getElementById("yourLoc");
    let yourwork = document.getElementById("yourwork");
    let submit = document.getElementById("form__btn");
    let theme = "a9993e364706816aba3e25717850c26c9cd0d89d";
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
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = '/api/v1/portfolio/makePorti'
        try {
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
                        location.assign(`/myportfolio/${id1}`);
                    }, 400);
                } else {
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

let cancelCreate = document.querySelector(".cancel__create");
cancelCreate.addEventListener("click", () => {
    crForm.classList.add("hidden");
    portBod.classList.remove("hidden");
    inviSec.classList.remove("hidden");
    menuSec.classList.remove("hidden");
    catSec.classList.remove("hidden");
})


// `
//     <form class="comp__form">
//         <div class="form__head">
//             <h1>PL Layout</h1>
//             <img src="/images/cancel.png" alt="cancel_img" class="cancel__create" />
//         </div>
//         <div class="form__cont">
//             <label>Portfolio Name:</label>
//             <input id="yourname" type="text" placeholder="TechMafia" required/>
//         </div>
//         <div class="form__cont">
//             <label>About Your Portfolio</label>
//             <textarea id="aboutyou" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
//         </div>
//         <div class="form__cont">
//             <label>What You Do:</label>
//             <textarea id="what" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
//         </div>
//         <div class="form__cont">
//             <label>Why You Do it:</label>
//             <textarea id="why" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
//         </div>
//         <label>Contact Details:</label>
//         <div class="form__cont">
//             <label>Phone Number:</label>
//             <input id="yourno" type="number" placeholder="9999888899" required/>
//         </div>
//         <div class="form__cont">
//             <label>Show Number:</label>
//             <div class="check">
//                 <input id="yourCheck" class="checkbox" type="checkbox" />
//                 <span class="customCheck"></span>
//             </div>
//         </div>
//         <div class="form__cont">
//             <label>Email Address:</label>
//             <input id="youremail" type="email" placeholder="techmafia@gmail.com" required/>
//         </div>
//         <div class="form__cont">
//             <label>Your Social Profile Link</label>
//             <input id="yourFb" type="text" placeholder="https://www.facebook.com/instagram.com/linkedin.com" />
//         </div>
//         <div class="form__cont">
//             <label>Address</label>
//             <input id="yourLoc" type="text" placeholder="your location" required />
//         </div>
//         <div class="form__cont">
//             <label>Previous Accomplishment Details</label>
//             <textarea id="yourwork"  rows="4" cols="50" placeholder="TechMafia has done..." required></textarea>
//         </div>
//         <button id="form__btn" class="redbtn">Create</button>
//     </form>
// `