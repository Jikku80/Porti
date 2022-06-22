layout3 = document.querySelector("#layout3")
portBod3 = document.querySelector(".port__bod");
inviSec3 = document.querySelector('.invi__section');
menuSec3 = document.querySelector('.menu__section');
catSec3 = document.querySelector('.catalouge__section');

id3 = document.getElementById("usId").innerText;


let formLayoutThree = document.createElement("div");
formLayoutThree.classList.add('formLayout3')
formLayoutThree.innerHTML = createPortiForm("ST Layout", "closecreate", "uthirdname", "uthirdabout", "uthirdwhat", "uthirdwhy", "uthirdno", "uthirdCheck", "uthirdemail", "uthirdFb", "uthirdLoc", "uthirdwork", "thirdformbtn")
document.body.appendChild(formLayoutThree);
let layoutThree = document.querySelector(".formLayout3")
layoutThree.classList.add("hidden");

layout3.addEventListener("click", () => {
    portBod3.classList.add("hidden");
    inviSec3.classList.add("hidden");
    menuSec3.classList.add("hidden");
    catSec3.classList.add("hidden");
    layoutThree.classList.remove("hidden");
    let yourname = document.querySelector("#uthirdname");
    let aboutyou = document.getElementById("uthirdabout");
    let what = document.getElementById("uthirdwhat");
    let why = document.getElementById("uthirdwhy");
    let yourno = document.getElementById("uthirdno");
    let showNo = document.getElementById("uthirdCheck");
    let youremail = document.getElementById("uthirdemail");
    let fb = document.getElementById("uthirdFb");
    let loction = document.getElementById("uthirdLoc");
    let yourwork = document.getElementById("uthirdwork");
    let submit = document.getElementById("thirdformbtn");
    let theme = "481743d632b80d39bc2771d19be3ca3005b3f8af";

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
                        location.assign(`/myportfolio/${id3}`);
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

let closeCreate = document.querySelector(".closecreate")
closeCreate.addEventListener("click", () => {
    layoutThree.classList.add("hidden");
    portBod3.classList.remove("hidden");
    inviSec3.classList.remove("hidden");
    menuSec3.classList.remove("hidden");
    catSec3.classList.remove("hidden");
});

// `
// <form class="comp__form">
//     <div class="form__head">
//         <h1>ST Layout</h1>
//         <img src="/images/cancel.png" alt="cancel_img" class="closecreate" />
//     </div>
//     <div class="form__cont">
//         <label>Portfolio Name:</label>
//         <input id="uthirdname" type="text" placeholder="TechMafia" required/>
//     </div>
//     <div class="form__cont">
//         <label>About Your Portfolio</label>
//         <textarea id="uthirdabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
//     </div>
//     <div class="form__cont">
//         <label>What You Do:</label>
//         <textarea id="uthirdwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
//     </div>
//     <div class="form__cont">
//         <label>Why You Do it:</label>
//         <textarea id="uthirdwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
//     </div>
//     <label>Contact Details:</label>
//     <div class="form__cont">
//         <label>Phn Number:</label>
//         <input id="uthirdno" type="number" placeholder="9999888899" required/>
//     </div>
//     <div class="form__cont">
//         <label>Show Number:</label>
//         <input id="uthirdCheck" class="checkbox" type="checkbox" />
//     </div>
//     <div class="form__cont">
//         <label>Email Address:</label>
//         <input id="uthirdemail" type="email" placeholder="techmafia@gmail.com" required/>
//     </div>
//     <div class="form__cont">
//         <label>Your Social Media Profile Link</label>
//         <input id="uthirdFb" type="text" placeholder="https://www.facebook.com/instagram.com/" />
//     </div>
//     <div class="form__cont">
//         <label>Address</label>
//         <input id="uthirdLoc" type="text" placeholder="your location" required />
//     </div>
//     <div class="form__cont">
//         <label>Accomplishments</label>
//         <textarea id="uthirdwork"  rows="4" cols="50" placeholder="Your big or small any accomplishment relevent to your portfolio...." required></textarea>
//     </div>
//     <button id="thirdformbtn" class="redbtn">Create</button>
// </form>
//     `