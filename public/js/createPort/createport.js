footer__first = document.querySelector(".footer")
portBod = document.querySelector(".port__bod");
inviSec = document.querySelector('.invi__section');
menuSec = document.querySelector('.menu__section');
catSec = document.querySelector('.catalouge__section');
layout1 = document.querySelectorAll(".portunl");
let id1 = document.getElementById("usId").innerText;

let layoutOneForm = document.createElement("div");
layoutOneForm.classList.add("createForm");
layoutOneForm.innerHTML = createPortiForm("Create Portfolio", "cancel__create", "yourname", "aboutyou", "what", "why", "yourno", "yourCheck", "youremail", "yourFb", "yourLoc", "yourwork", "form__btn", "yourProb", "yourSoln", "yourFail", "yourMoti", "yourMsg", "role")

document.body.appendChild(layoutOneForm);
let crForm = document.querySelector('.createForm');
crForm.classList.add("hidden");
let tmid = document.querySelector(".uniquetmid")

layout1.forEach(item => {
    item.addEventListener("click", () => {
        tmid.innerText = "";
        location.hash = "#portNav";
        footer__first.classList.add("hidden");
        portBod.classList.add("hidden");
        inviSec.classList.add("hidden");
        menuSec.classList.add("hidden");
        catSec.classList.add("hidden");
        crForm.classList.remove("hidden");
        let themeid = item.id;
        tmid.innerText = themeid;
    });
});

(function () {
    let yourname = document.querySelector("#yourname");
    let role = document.querySelector("#role");
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

    submit.addEventListener("click", async (e) => {
        let theme = tmid.innerText;
        if (yourname.value < 1 || yourname.value == "" || yourname.value == null) {
            return false;
        }
        if (youremail.value < 1 || youremail.value == "" || youremail.value == null) {
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
                    role: role.value,
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
                    msg: msg.value,
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
    let skipandcreate = document.getElementById("skipandcreateportfolio");

    skipandcreate.addEventListener("click", async (e) => {
        let theme = tmid.innerText;
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        let curname = document.getElementById("curlogusr").innerText;
        let curemail = document.getElementById("curusremail").innerText;
        let yorname = document.querySelector("#yourname").value;
        let yoremail = document.getElementById("youremail").value;
        let yorrole = document.querySelector("#role").value;

        const endpoint = '/api/v1/portfolio/makePorti'
        let yname;
        let yrole;
        let yemail;
        if (yourno.value !== "") {
            yno = yourno.value
        } else {
            yno = 0
        }
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
                    phn_no: yno,
                    showNo: showNo.checked,
                    theme: theme,
                    email: yemail,
                    fb: fb.value,
                    location: loction.value,
                    previous: yourwork.value,
                    problem: prob.value,
                    solution: soln.value,
                    failure: fail.value,
                    motivation: moti.value,
                    msg: msg.value,
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
})();

let cancelCreate = document.querySelector(".cancel__create");
cancelCreate.addEventListener("click", () => {
    crForm.classList.add("hidden");
    footer__first.classList.remove("hidden");
    portBod.classList.remove("hidden");
    inviSec.classList.remove("hidden");
    // menuSec.classList.remove("hidden");
    // catSec.classList.remove("hidden");
    window.setTimeout(() => {
        location.hash = "#crtPort";
    }, 200)
});

function aboutHelper(about) {
    let aboutPortflio = document.getElementById(about);
    aboutPortflio.addEventListener("click", () => {
        console.log("about sec")
    })
};

(function () {
    let portName = document.querySelector(".port__name__cont");
    let portRole = document.querySelector(".port__role__cont");
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
    let roleNext = document.getElementById("portRoleNext");
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
    let rolePrev = document.getElementById("portRolePrev");
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
    let youremail = document.getElementById("youremail");
    let yourrole = document.getElementById("role");

    next.addEventListener("click", () => {
        if (yourname.value < 1) {
            return false;
        }
        portName.classList.add("hidden");
        portRole.classList.remove("hidden");
    })

    roleNext.addEventListener("click", () => {
        if (yourrole.value < 1) {
            return false;
        }
        portAbout.classList.remove("hidden");
        portRole.classList.add("hidden");
    })

    rolePrev.addEventListener("click", () => {
        portName.classList.remove("hidden");
        portRole.classList.add("hidden");
    })

    aboutNext.addEventListener("click", () => {
        portAbout.classList.add("hidden");
        portWhat.classList.remove("hidden");
    });

    aboutPrev.addEventListener("click", () => {
        portAbout.classList.add("hidden");
        portRole.classList.remove("hidden");
    })

    whatNext.addEventListener("click", () => {
        portWhat.classList.add("hidden");
        portWhy.classList.remove("hidden");
    });

    whatPrev.addEventListener("click", () => {
        portWhat.classList.add("hidden");
        portAbout.classList.remove("hidden");
    })

    whyNext.addEventListener("click", () => {
        portWhy.classList.add("hidden");
        portFail.classList.remove("hidden");
    });

    whyPrev.addEventListener("click", () => {
        portWhy.classList.add("hidden");
        portWhat.classList.remove("hidden");
    });

    failNext.addEventListener("click", () => {
        portFail.classList.add("hidden");
        portMoti.classList.remove("hidden");
    });

    failPrev.addEventListener("click", () => {
        portFail.classList.add("hidden");
        portWhy.classList.remove("hidden");
    });

    motiNext.addEventListener("click", () => {
        portMoti.classList.add("hidden");
        portMsg.classList.remove("hidden");
    });

    motiPrev.addEventListener("click", () => {
        portMoti.classList.add("hidden");
        portFail.classList.remove("hidden");
    });

    msgNext.addEventListener("click", () => {
        portMsg.classList.add("hidden");
        portPhn.classList.remove("hidden");
    });

    msgPrev.addEventListener("click", () => {
        portMsg.classList.add("hidden");
        portMoti.classList.remove("hidden");
    });

    phnNext.addEventListener("click", () => {
        portPhn.classList.add("hidden");
        portShow.classList.remove("hidden");
    });

    phnPrev.addEventListener("click", () => {
        portPhn.classList.add("hidden");
        portMsg.classList.remove("hidden");
    });

    showNext.addEventListener("click", () => {
        portShow.classList.add("hidden");
        portEmail.classList.remove("hidden");
    });

    showPrev.addEventListener("click", () => {
        portShow.classList.add("hidden");
        portPhn.classList.remove("hidden");
    });

    emailNext.addEventListener("click", () => {
        if (youremail.value < 1) {
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
        portSocial.classList.add("hidden");
        portAddress.classList.remove("hidden");
    });

    socialPrev.addEventListener("click", () => {
        portSocial.classList.add("hidden");
        portEmail.classList.remove("hidden");
    })

    addressNext.addEventListener("click", () => {
        portAddress.classList.add("hidden");
        portAccomp.classList.remove("hidden");
    });

    addressPrev.addEventListener("click", () => {
        portAddress.classList.add("hidden");
        portSocial.classList.remove("hidden");
    })

    accompNext.addEventListener("click", () => {
        portAccomp.classList.add("hidden");
        portProb.classList.remove("hidden");
    });

    accompPrev.addEventListener("click", () => {
        portAccomp.classList.add("hidden");
        portAddress.classList.remove("hidden");
    });

    probNext.addEventListener("click", () => {
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

let updatePortLayout = document.querySelectorAll(".updatePortfolioLayout");

updatePortLayout.forEach(item => {
    item.addEventListener("click", async () => {
        let theme = item.id;
        const endpoint = `/api/v1/portfolio/${id1}/updatePortfolioLayout`
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    theme: theme
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Portfolio layout has been updated :)");
                    let newid = btoa(id1);
                    // window.setTimeout(() => {
                    //     location.assign(`/myportfolio/${newid}`);
                    // }, 400);
                } else {
                    errorAlert("Portfolio Layout Update Error!!!")
                }
            })

        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})