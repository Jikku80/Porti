create_port = document.querySelector(".create_port")
portBod = document.querySelector(".port__bod");
inviSec = document.querySelector('.invi__section');
menuSec = document.querySelector('.menu__section');
catSec = document.querySelector('.catalouge__section');
layout1 = document.querySelectorAll(".portunl");
id1 = document.getElementById("usId").innerText;

let layoutOneForm = document.createElement("div");
layoutOneForm.classList.add("createForm");
layoutOneForm.innerHTML = createPortiForm("Create Portfolio", "cancel__create", "yourname", "aboutyou", "what", "why", "yourno", "yourCheck", "youremail", "yourFb", "yourLoc", "yourwork", "form__btn", "yourProb", "yourSoln", "yourFail", "yourMoti", "yourMsg")

document.body.appendChild(layoutOneForm);
let crForm = document.querySelector('.createForm');
crForm.classList.add("hidden");

layout1.forEach(item => {
    item.addEventListener("click", () => {
        location.hash = "#portNav";
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
        let prob = document.getElementById("yourProb");
        let soln = document.getElementById("yourSoln");
        let fail = document.getElementById("yourFail");
        let moti = document.getElementById("yourMoti");
        let msg = document.getElementById("yourMsg");
        let submit = document.getElementById("form__btn");
        let theme = item.id;
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
            if (prob.value < 1 || prob.value == "" || prob.value == null) {
                e.preventDefault();
                return false;
            }
            if (soln.value < 1 || soln.value == "" || soln.value == null) {
                e.preventDefault();
                return false;
            }
            if (fail.value < 1 || fail.value == "" || fail.value == null) {
                e.preventDefault();
                return false;
            }
            if (moti.value < 1 || moti.value == "" || moti.value == null) {
                e.preventDefault();
                return false;
            }
            if (msg.value < 1 || msg.value == "" || msg.value == null) {
                e.preventDefault();
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
                        problem: prob.value,
                        solution: soln.value,
                        failure: fail.value,
                        motivation: moti.value,
                        msg: msg.value
                    })
                }).then((response) => {
                    load.classList.add("hidden");
                    if (response.status === 201) {
                        successAlert("Your Portfolio has been created :)");
                        window.setTimeout(() => {
                            location.assign(`/myportfolio/${id1}`);
                        }, 400);
                    } else {
                        errorAlert("A user with this phone number or Email Address already exists!!!")
                        console.log(response);
                    }
                })
            }
            catch (err) {
                console.log(err);
                errorAlert('Sorry! Something went wrong', err);
            };
        })
    })
});

(function () {
})();

let cancelCreate = document.querySelector(".cancel__create");
cancelCreate.addEventListener("click", () => {
    crForm.classList.add("hidden");
    portBod.classList.remove("hidden");
    inviSec.classList.remove("hidden");
    menuSec.classList.remove("hidden");
    catSec.classList.remove("hidden");
    location.hash = "#crtPort";
});

function aboutHelper(about) {
    let aboutPortflio = document.getElementById(about);
    aboutPortflio.addEventListener("click", () => {
        console.log("about sec")
    })
};