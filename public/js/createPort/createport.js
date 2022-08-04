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

(function () {
    let portName = document.querySelector(".port__name__cont");
    let portAbout = document.querySelector(".port__about__cont");
    let portWhat = document.querySelector(".port__what__cont");
    let portWhy = document.querySelector(".port__why__cont");
    let portFail = document.querySelector(".port__fail__cont");
    let portMoti = document.querySelector(".port__moti__cont");
    let portMsg = document.querySelector(".port__msg__cont");
    let portPhn = document.querySelector(".port__phn__cont");
    let portShow = document.querySelector(".port__show__cont");
    let portEmail = document.querySelector(".port__email__cont");
    let portSocial = document.querySelector(".port__social__cont");
    let portAddress = document.querySelector(".port__address__cont");
    let portAccomp = document.querySelector(".port__accomp__cont");
    let portProb = document.querySelector(".port__prob__cont");
    let portSoln = document.querySelector(".port__soln__cont");
    let portSubmit = document.querySelector(".portSubmit");
    let next = document.getElementById("portNameNext");
    let aboutNext = document.getElementById("portAboutNext");
    let whatNext = document.getElementById("portWhatNext");
    let whyNext = document.getElementById("portWhyNext");
    let failNext = document.getElementById("portFailNext");
    let motiNext = document.getElementById("portMotiNext");
    let msgNext = document.getElementById("portMsgNext");
    let phnNext = document.getElementById("portPhnNext");
    let showNext = document.getElementById("portShowNext");
    let emailNext = document.getElementById("portEmailNext");
    let socialNext = document.getElementById("portSocialNext");
    let addressNext = document.getElementById("portAddressNext");
    let accompNext = document.getElementById("portAccompNext");
    let probNext = document.getElementById("portProbNext");
    let aboutPrev = document.getElementById("portAboutPrev");
    let whatPrev = document.getElementById("portWhatPrev");
    let whyPrev = document.getElementById("portWhyPrev");
    let failPrev = document.getElementById("portFailPrev");
    let motiPrev = document.getElementById("portMotiPrev");
    let msgPrev = document.getElementById("portMsgPrev");
    let phnPrev = document.getElementById("portPhnPrev");
    let showPrev = document.getElementById("portShowPrev");
    let emailPrev = document.getElementById("portEmailPrev");
    let socialPrev = document.getElementById("portSocialPrev");
    let addressPrev = document.getElementById("portAddressPrev");
    let accompPrev = document.getElementById("portAccompPrev");
    let probPrev = document.getElementById("portProbPrev");
    let solnPrev = document.getElementById("portSolnPrevious");

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
    // let soln = document.getElementById("yourSoln");
    let fail = document.getElementById("yourFail");
    let moti = document.getElementById("yourMoti");
    let msg = document.getElementById("yourMsg");

    next.addEventListener("click", () => {
        if (yourname.value < 1) {
            return false;
        }
        portName.classList.add("hidden");
        portAbout.classList.remove("hidden");
    })

    aboutNext.addEventListener("click", () => {
        if (aboutyou.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portAbout.classList.add("hidden");
        portWhat.classList.remove("hidden");
    });

    aboutPrev.addEventListener("click", () => {
        portAbout.classList.add("hidden");
        portName.classList.remove("hidden");
    })

    whatNext.addEventListener("click", () => {
        if (what.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portWhat.classList.add("hidden");
        portWhy.classList.remove("hidden");
    });

    whatPrev.addEventListener("click", () => {
        portWhat.classList.add("hidden");
        portAbout.classList.remove("hidden");
    })

    whyNext.addEventListener("click", () => {
        if (why.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portWhy.classList.add("hidden");
        portFail.classList.remove("hidden");
    });

    whyPrev.addEventListener("click", () => {
        portWhy.classList.add("hidden");
        portWhat.classList.remove("hidden");
    });

    failNext.addEventListener("click", () => {
        if (fail.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portFail.classList.add("hidden");
        portMoti.classList.remove("hidden");
    });

    failPrev.addEventListener("click", () => {
        portFail.classList.add("hidden");
        portWhy.classList.remove("hidden");
    });

    motiNext.addEventListener("click", () => {
        if (moti.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portMoti.classList.add("hidden");
        portMsg.classList.remove("hidden");
    });

    motiPrev.addEventListener("click", () => {
        portMoti.classList.add("hidden");
        portFail.classList.remove("hidden");
    });

    msgNext.addEventListener("click", () => {
        if (msg.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portMsg.classList.add("hidden");
        portPhn.classList.remove("hidden");
    });

    msgPrev.addEventListener("click", () => {
        portMsg.classList.add("hidden");
        portMoti.classList.remove("hidden");
    });

    phnNext.addEventListener("click", () => {
        if (yourno.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portPhn.classList.add("hidden");
        portShow.classList.remove("hidden");
    });

    phnPrev.addEventListener("click", () => {
        portPhn.classList.add("hidden");
        portMsg.classList.remove("hidden");
    });

    showNext.addEventListener("click", () => {
        if (showNo.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portShow.classList.add("hidden");
        portEmail.classList.remove("hidden");
    });

    showPrev.addEventListener("click", () => {
        portShow.classList.add("hidden");
        portPhn.classList.remove("hidden");
    });

    emailNext.addEventListener("click", () => {
        if (youremail.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portEmail.classList.add("hidden");
        portSocial.classList.remove("hidden");
    });

    emailPrev.addEventListener("click", () => {
        portEmail.classList.add("hidden");
        portShow.classList.remove("hidden");
    });

    socialNext.addEventListener("click", () => {
        if (fb.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portSocial.classList.add("hidden");
        portAddress.classList.remove("hidden");
    });

    socialPrev.addEventListener("click", () => {
        portSocial.classList.add("hidden");
        portEmail.classList.remove("hidden");
    })

    addressNext.addEventListener("click", () => {
        if (loction.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portAddress.classList.add("hidden");
        portAccomp.classList.remove("hidden");
    });

    addressPrev.addEventListener("click", () => {
        portAddress.classList.add("hidden");
        portSocial.classList.remove("hidden");
    })

    accompNext.addEventListener("click", () => {
        if (yourwork.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portAccomp.classList.add("hidden");
        portProb.classList.remove("hidden");
    });

    accompPrev.addEventListener("click", () => {
        portAccomp.classList.add("hidden");
        portAddress.classList.remove("hidden");
    });

    probNext.addEventListener("click", () => {
        if (prob.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        portProb.classList.add("hidden");
        portSoln.classList.remove("hidden");
        portSubmit.classList.remove("hidden");
    });

    probPrev.addEventListener("click", () => {
        portProb.classList.add("hidden");
        portAccomp.classList.remove("hidden");
    });

    solnPrev.addEventListener("click", (e) => {
        e.preventDefault();
        portSoln.classList.add("hidden");
        portSubmit.classList.add("hidden");
        portProb.classList.remove("hidden");
    })

})();