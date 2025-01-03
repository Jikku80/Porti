bgChanger = document.getElementById("go__create");
homeCont = document.querySelector(".main__content");
homebod = document.querySelector(".bod");

bgChanger.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("bg__changer");
})

bgChanger.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("bg__changer");
})

let gotoport = document.querySelector(".menuPortfolio");

gotoport.addEventListener("click", () => {
    let uid = document.querySelector(".menuPortfolio").id
    let newid = btoa(uid);
    location.href = `/myportfolio/${newid}`
});

(function () {
    let showPorti = document.getElementById("showAboutPorti");
    let abtPort = document.getElementById('abtPortiSection');
    let showGuide = document.getElementById("showGuide");
    let guidePort = document.getElementById("guidePorti");
    let showPortHelp = document.getElementById("showPortHelper");
    let portHelper = document.getElementById("portiHelper");
    let showInviHelp = document.getElementById("showInviHelper");
    let inviHelper = document.getElementById("portiinviHelper");
    let showmenuHelp = document.getElementById("showMenuHelper");
    let menuHelper = document.getElementById("portimenuHelper");
    let showcatalogHelp = document.getElementById("showCatalogHelper");
    let catalogHelper = document.getElementById("porticatalogeHelper");
    let showBro = document.getElementById("showBrochureHelper");
    let broHelper = document.getElementById("portibrochureHelper");
    let showLdt = document.getElementById("showLDT");
    let aboutLdt = document.getElementById("aboutTM");
    let showContact = document.getElementById("showContactTM");
    let contactLdt = document.getElementById("contactTM");

    showPorti.addEventListener("click", () => {
        abtPort.classList.toggle("hidden");
        if (!(abtPort.classList.contains("hidden"))) {
            window.location.href = "#abtPortiSection"
        }
    })
    showGuide.addEventListener("click", () => {
        guidePort.classList.toggle("hidden");
        if (!(guidePort.classList.contains("hidden"))) {
            window.location.href = "#guidePorti"
        }
    })
    showPortHelp.addEventListener("click", () => {
        portHelper.classList.toggle("hidden");
        if (!(portHelper.classList.contains("hidden"))) {
            window.location.href = "#portiHelper"
        }
    })

    showInviHelp.addEventListener("click", () => {
        inviHelper.classList.toggle("hidden");
        if (!(inviHelper.classList.contains("hidden"))) {
            window.location.href = "#portiinviHelper"
        }
    })
    showmenuHelp.addEventListener("click", () => {
        menuHelper.classList.toggle("hidden");
        if (!(menuHelper.classList.contains("hidden"))) {
            window.location.href = "#portimenuHelper"
        }
    })
    showcatalogHelp.addEventListener("click", () => {
        catalogHelper.classList.toggle("hidden");
        if (!(catalogHelper.classList.contains("hidden"))) {
            window.location.href = "#porticatalogeHelper"
        }
    })

    showBro.addEventListener("click", () => {
        broHelper.classList.toggle("hidden");
        if (!(broHelper.classList.contains("hidden"))) {
            window.location.href = "#portibrochureHelper"
        }
    })

    showLdt.addEventListener("click", () => {
        aboutLdt.classList.toggle("hidden");
        if (!(aboutLdt.classList.contains("hidden"))) {
            window.location.href = "#aboutTM"
        }
    })

    showContact.addEventListener("click", () => {
        contactLdt.classList.toggle("hidden");
        if (!(contactLdt.classList.contains("hidden"))) {
            window.location.href = "#contactTM"
        }
    })
})();

(function () {
    let theme = document.querySelector(".usrTheme").innerText;
    let upAccForm = document.querySelector(".main__content");
    let bod = document.querySelector(".bod");
    let padder = document.querySelectorAll(".padder");
    let lime = document.querySelectorAll(".shwbtn");
    let maf = document.querySelectorAll(".maf");
    let wite = document.querySelectorAll(".wite");
    let anch = document.querySelectorAll(".bottom__anch");
    let nocb = document.querySelectorAll(".nocapsB");
    let inpt = document.querySelectorAll(".form__input");
    let label = document.querySelectorAll(".form__label");
    let selec = document.querySelector(".form__select");
    let got = document.querySelector(".go__top");
    let lod = document.querySelector(".loader");
    let td = document.querySelectorAll(".td");
    let framebtn = document.querySelector(".framebtn");
    let effbtn = document.querySelectorAll(".effectbtn");
    let portlinkdis = document.querySelectorAll(".porti_all_link");
    let para = document.querySelectorAll("p");

    if (theme == "red") {
        upAccForm.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        document.body.style.backgroundColor = "crimson";
        bod.style.backgroundColor = "crimson";
        selec.style.backgroundColor = "crimson";
        padder.forEach(item => {
            item.style.backgroundColor = "crimson";
            item.style.animation = "blackShine 4s ease-in-out forwards infinite";
        })
        got.style.animation = "blackShine 4s ease-in-out forwards infinite";
        maf.forEach(item => {
            item.style.color = "black";
        })
        lime.forEach(item => {
            item.style.backgroundColor = "crimson";
        })
        upAccForm.style.color = "white";
        bgChanger.addEventListener("mouseover", () => {
            homeCont.classList.add("red__changer");
            homebod.classList.add("red__changer");
        })

        bgChanger.addEventListener("mouseout", () => {
            homeCont.classList.remove("red__changer");
            homebod.classList.remove("red__changer");
        })

    }
    else if (theme == "dark") {
        upAccForm.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
        document.body.style.backgroundColor = "black";
        bod.style.backgroundColor = "black";
        selec.style.backgroundColor = "black";
        padder.forEach(item => {
            item.style.backgroundColor = "black";
        })
        lime.forEach(item => {
            item.style.backgroundColor = "black";
        })
        bgChanger.addEventListener("mouseover", () => {
            homeCont.classList.add("black__changer");
            homebod.classList.add("black__changer");
        })

        bgChanger.addEventListener("mouseout", () => {
            homeCont.classList.remove("black__changer");
            homebod.classList.remove("black__changer");
        })
    }
    else if (theme == "white") {
        upAccForm.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        bod.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        selec.style.backgroundColor = "white";
        para.forEach(item => {
            item.style.color = "black";
        })
        portlinkdis.forEach(item => {
            item.style.backgroundColor = "gray";
            item.style.color = "white";
        })

        selec.style.borderColor = "black";
        selec.style.color = "black";
        bod.style.color = "black";
        upAccForm.style.color = "black";
        got.style.animation = "blackShine 4s ease-in-out forwards infinite";
        got.style.color = "black";
        padder.forEach(item => {
            item.style.backgroundColor = "white";
            item.style.animation = "blackShine 4s ease-in-out forwards infinite";
        })
        effbtn.forEach(item => {
            item.style.boxShadow = "6px 0px 0px black"
            item.style.borderColor = "black"
            item.style.color = "black"
        })
        lime.forEach(item => {
            item.style.backgroundColor = "white";
        })
        wite.forEach(item => {
            item.style.color = "black";
        })
        anch.forEach(item => {
            item.style.color = "black";
        })
        nocb.forEach(item => {
            item.style.color = "black";
        })
        inpt.forEach(item => {
            item.style.color = "black";
            item.style.borderColor = "black"
        })
        label.forEach(item => {
            item.style.color = "black";
        })
        td.forEach(item => {
            item.style.color = "black";
        })
        framebtn.style.background = "conic-gradient(from 90deg at 2px 2px,#0000 90deg,black 0) .40em .40em/calc(100% - 2px - 2*.40em) calc(100% - 2px - 2*.40em)"
        bgChanger.addEventListener("mouseover", () => {
            homeCont.classList.add("white__changer");
            homebod.classList.add("white__changer");
        })

        bgChanger.addEventListener("mouseout", () => {
            homeCont.classList.remove("white__changer");
            homebod.classList.remove("white__changer");
        })
        let footersec = document.querySelectorAll(".footer__anch");
        footersec.forEach(item => {
            item.style.color = "gray";
        })
    }
    else {
        console.log("Hola from Porti")
    }
})();

sendMsg = document.querySelector(".send__msg");
let msgfullName = document.querySelector("#msgname");
let msgemail = document.querySelector("#msgemail");
let msgsiteType = document.querySelector("#siteType");
let msgmessage = document.querySelector("#msgmessage");

sendMsg.addEventListener("click", async (e) => {
    if (msgfullName.value < 1 || msgfullName.value == "" || msgfullName.value == null) {
        return false;
    }
    if (msgemail.value < 1 || msgemail.value == "" || msgemail.value == null) {
        return false;
    }
    if (msgmessage.value < 1 || msgmessage.value == "" || msgmessage.value == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = '/send/msg'
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: msgfullName.value,
                email: msgemail.value,
                queryType: msgsiteType.value,
                message: msgmessage.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                setTimeout(() => {
                    successAlert("Your Message has been sent!");
                }, 3000)
            } else {
                errorAlert("OOPS!! something went wrong!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        erroralert('Sorry! Something went wrong', err);
    };
    msgsiteType.value = "query";
    msgmessage.value = "";
});


(function () {
    let startbtn = document.querySelector(".newusersignup");
    let signupform = document.querySelector(".new__signup__sec");
    let emailsec = document.querySelector(".signup__email__sec");
    let passsec = document.querySelector(".signup__password__sec");
    let countrysec = document.querySelector(".signup__country__sec");
    let namesec = document.querySelector(".signup__name__sec");
    let toemail = document.querySelector(".toemailsec");
    let topass = document.querySelector(".topasssec");
    let tocountry = document.querySelector(".tocountrysec");
    let signup = document.querySelector("#signmeup");
    let mname = document.querySelector("#m_name");
    let memail = document.getElementById("m_email");
    let mpassword = document.getElementById("m_password");
    let pwdConfirm = document.getElementById("passwordConfirm");
    let termbox = document.getElementById("termbox");
    let country = document.getElementById("country");
    let backtoemail = document.querySelector(".toemailad");
    let backtoname = document.querySelector(".toname");
    let backtopass = document.querySelector(".topassw");
    let sameE = document.querySelector(".same__email__warn");
    let same = document.querySelector(".same__user__warn");
    let whiteSpace = document.querySelector(".white__space");
    let specialCharac = document.querySelector(".unallowed__charc");
    let pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
    let usrvalid = document.querySelector(".validinfo");
    let emailvalid = document.querySelector(".validemail");
    let cancelstart = document.querySelector(".cancelletstart");

    startbtn.addEventListener("click", () => {
        signupform.classList.remove("hidden");
    })

    cancelstart.addEventListener("click", () => {
        signupform.classList.add("hidden");
    })

    toemail.addEventListener("click", async () => {
        if (mname.value < 1) {
            mname.style.borderColor = "crimson";
        }
        else {
            if (/\s/.test(mname.value)) {
                whiteSpace.classList.remove("hidden");
            } else {
                if (pattern.test(mname.value)) {
                    specialCharac.classList.remove("hidden");
                }
                else {
                    try {
                        usrvalid.classList.remove("hidden");
                        const endpoint = `/api/users/validatesignup/${mname.value}`
                        await fetch((endpoint), {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json'
                            }
                        }).then((response) => {
                            usrvalid.classList.add("hidden");
                            if (response.status === 200) {
                                whiteSpace.classList.add("hidden");
                                specialCharac.classList.add("hidden");
                                same.classList.add("hidden");
                                mname.style.borderColor = "gray";
                                emailsec.classList.remove("hidden");
                                namesec.classList.add("hidden");
                            }
                            else if (response.status === 403) {
                                same.classList.remove("hidden");
                                errorAlert("User with this name already exists!!!")
                            }
                            else {
                                console.log(response)
                            }
                        })
                    }
                    catch (err) {
                        console.log(err);
                        errorAlert('Sorry! Something went wrong', err);
                    };
                }
            }
        }

    })
    backtoname.addEventListener("click", () => {
        emailsec.classList.add("hidden");
        namesec.classList.remove("hidden");
    })

    topass.addEventListener("click", async () => {
        if (memail.value < 1 || memail.value == "" || memail.value == null) {
            memail.style.borderColor = "crimson";
        }
        else {
            try {
                emailvalid.classList.remove("hidden");
                const endpoint = `/api/users/validateemail/${memail.value}`
                await fetch((endpoint), {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then((response) => {
                    emailvalid.classList.add("hidden");
                    if (response.status === 200) {
                        passsec.classList.remove("hidden");
                        emailsec.classList.add("hidden");
                        memail.style.borderColor = "gray";
                        sameE.classList.add("hidden");
                    }
                    else if (response.status === 403) {
                        sameE.classList.remove("hidden");
                        errorAlert("User with this email already exists!!!")
                    }
                    else {
                        console.log(response)
                    }
                })
            }
            catch (err) {
                console.log(err);
                errorAlert('Sorry! Something went wrong', err);
            };
        }

    })

    backtoemail.addEventListener("click", () => {
        passsec.classList.add("hidden");
        emailsec.classList.remove("hidden");
    })

    tocountry.addEventListener("click", () => {

        let mpwdLen = mpassword.value.length;
        if (mpassword.value < 1 || mpassword.value == "" || mpassword.value == null) {
            mpassword.style.borderColor = "crimson";
        }
        else {
            if (pwdConfirm.value < 1 || pwdConfirm.value == "" || pwdConfirm.value == null) {
                pwdConfirm.style.borderColor = "crimson";
            }
            else {
                if (mpwdLen < 9) {
                    errorAlert("Password must be Atleast 9 Characters long")
                }
                else {
                    if (mpassword.value !== pwdConfirm.value) {
                        errorAlert("Password Does not Match!!! Check Again");
                    }
                    else {
                        countrysec.classList.remove("hidden");
                        passsec.classList.add("hidden");
                        mpassword.style.borderColor = "gray";
                        pwdConfirm.style.borderColor = "gray";
                    }
                }
            }
        }

    })

    backtopass.addEventListener("click", () => {
        countrysec.classList.add("hidden");
        passsec.classList.remove("hidden");
    })

    signup.addEventListener('click', async (e) => {
        let mpwdLen = mpassword.value.length;

        if (mname.value < 1 || mname.value == "" || mname.value == null) {
            return false;
        }
        if (/\s/.test(mname.value)) {
            e.preventDefault();
            whiteSpace.classList.remove("hidden");
            return false;
        }
        if (pattern.test(mname.value)) {
            e.preventDefault();
            specialCharac.classList.remove("hidden");
            return false;
        }
        if (memail.value < 1 || memail.value == "" || memail.value == null) {
            return false;
        }
        if (mpassword.value < 1 || mpassword.value == "" || mpassword.value == null) {
            return false;
        }
        if (pwdConfirm.value < 1 || pwdConfirm.value == "" || pwdConfirm.value == null) {
            return false;
        }

        if (mpwdLen < 9) {
            e.preventDefault();
            errorAlert("Password must be Atleast 9 Characters long")
            return false;
        }

        if (mpassword.value !== pwdConfirm.value) {
            e.preventDefault();
            errorAlert("Password Does not Match!!! Check Again");
            return false;
        }

        if (termbox.checked === false) {
            e.preventDefault();
            return false;
        }

        if (country.value == "" || country.value < 1) {
            e.preventDefault();
            return false;
        }
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        try {
            const endpoint = '/api/users/signup'
            await fetch((endpoint), {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: mname.value,
                    email: memail.value,
                    password: mpassword.value,
                    passwordConfirm: pwdConfirm.value,
                    termsandconditionagreed: termbox.checked,
                    country: country.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Congrats! You have been hooked ;)");
                    window.setTimeout(() => {
                        location.assign('/account/me');
                    }, 400);
                }
                else if (response.status === 404) {
                    errorAlert("User with this name already exists! Use Different Name!")
                    same.classList.remove("hidden");
                }
                else {
                    console.log(response)
                    errorAlert("The Given Email already has a account! Use Forget Password to change your password")
                    sameE.classList.remove("hidden");
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })


    let termsandcond = document.getElementById("termsandcond");
    let tac = document.querySelector(".termsandconditions");
    let termcancel = document.getElementById("termCancel");

    termsandcond.addEventListener("click", () => {
        tac.classList.remove("hidden");
    })

    termcancel.addEventListener("click", () => {
        tac.classList.add('hidden');
    })

})();

(function () {
    let dropdwn = document.querySelector(".guidedrp");
    let dropcont = document.querySelector(".guidecont");

    let kdropdwn = document.querySelector(".knowdrp");
    let kdropcont = document.querySelector(".knowcont");

    dropdwn.addEventListener("click", () => {
        dropcont.classList.toggle("hidden")
    })

    kdropdwn.addEventListener("click", () => {
        kdropcont.classList.toggle("hidden")
    })

    let menuimgsec = document.querySelector(".menuitemsec");
    let cancelmenusec = document.querySelector(".cancelmenu");
    let playmenusec = document.querySelector(".playmenuvid");
    let menucont = document.querySelector(".menucont");
    let playcatalogsec = document.querySelector(".playcatalogvid");

    let playbrochuresec = document.querySelector(".playbrochurevid");

    playmenusec.addEventListener("click", () => {
        menucont.innerHTML = "";
        menuimgsec.classList.remove("hidden");
        cancelmenusec.classList.remove("hidden");
        let val1 = "/images/menu/additems.mp4";
        let val2 = "/images/menu/makeorder.mp4";
        let val3 = "/images/menu/overview.mp4";
        let val4 = "/images/menu/stats.png";
        let val5 = "/images/menu/piestats.png";
        slider(menucont, val1, val2, val3, val4, val5);
    });

    cancelmenusec.addEventListener("click", () => {
        menuimgsec.classList.add("hidden");
        cancelmenusec.classList.add("hidden");
    })

    playcatalogsec.addEventListener("click", () => {
        menucont.innerHTML = "";
        menuimgsec.classList.remove("hidden");
        cancelmenusec.classList.remove("hidden");
        let val1 = "/images/menu/cataladd.mp4";
        let val2 = "/images/menu/catmake.mp4";
        let val3 = "/images/menu/catalover.mp4";
        let val4 = "/images/menu/catalstats.png";
        let val5 = "/images/menu/catalpiestats.png";
        slider(menucont, val1, val2, val3, val4, val5);
    });

    playbrochuresec.addEventListener("click", () => {
        menucont.innerHTML = "";
        menuimgsec.classList.remove("hidden");
        cancelmenusec.classList.remove("hidden");
        let val1 = "/images/menu/broadd.mp4";
        let val2 = "/images/menu/brobook.mp4";
        let val3 = "/images/menu/broveeview.mp4";
        let val4 = "/images/menu/brostats.png";
        let val5 = "/images/menu/bropie.png";
        slider(menucont, val1, val2, val3, val4, val5);
    });

})();

function slider(slidr, val1, val2, val3, val4, val5) {
    slidr.innerHTML = "";
    slidr.innerHTML += `
        <div class="mySlides">
            <div class="numbertext">1 / 5</div>
            <div class="showslidesec">            
                <video class="videoplayer" controls>
                    <source src="${val1}" type="video/mp4">
                </video>
            </div>
            <h1 class="slidecaps">Add Items</h1>
        </div>
        <div class="slidecollec">
            <img class="slideinnerimg addtomenuimg" src="/images/menu/add.png" alt="addtomenu" />
            <img class="slideinnerimg makeorderimg" src="/images/menu/make.png" alt="makeorders" />
            <img class="slideinnerimg overviewimg" src="/images/menu/over.png" alt="overview" />
            <img class="slideinnerimg statsimg" src="/images/menu/sta.png" alt="statistics" />
            <img class="slideinnerimg statsecimg" src="/images/menu/sta.png" alt="statistics" />
        </div>
    `
    let addtomenu = document.querySelector(".addtomenuimg");
    let makeorder = document.querySelector(".makeorderimg");
    let overview = document.querySelector(".overviewimg");
    let stats = document.querySelector(".statsimg");
    let statsec = document.querySelector(".statsecimg");
    let showslide = document.querySelector(".showslidesec");
    let slidecaps = document.querySelector(".slidecaps");
    let numbertxt = document.querySelector(".numbertext");

    addtomenu.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "1 / 5";
        showslide.innerHTML += `
                    <video class="videoplayer" controls>
                        <source src="${val1}" type="video/mp4">
                    </video>
                    `
        slidecaps.innerText = "Add Items";
    })

    makeorder.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "2 / 5";
        showslide.innerHTML += `
                    <video class="videoplayer" controls>
                        <source src="${val2}" type="video/mp4">
                    </video>
                    `
        slidecaps.innerText = "Make & Accept"
    })

    overview.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "3 / 5";
        showslide.innerHTML += `
                    <video class="videoplayer" controls>
                        <source src="${val3}" type="video/mp4">
                    </video>
                    `
        slidecaps.innerText = "Simple Overview"
    })

    stats.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "4 / 5";
        showslide.innerHTML += `
                    <img class="videoplayer" src="${val4}" alt="stats" />
                    `
        slidecaps.innerText = "Statistics"
    })

    statsec.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "5 / 5";
        showslide.innerHTML += `
                    <img class="videoplayer" src="${val5}" alt="stats" />
                    `
        slidecaps.innerText = "Statistics"
    })
};

function sliderc(slidr, val1, val2, val3, val4, val5) {
    slidr.innerHTML = "";
    slidr.innerHTML += `
        <div class="mySlides">
            <div class="numbertext">1 / 5</div>
            <div class="showslidesec">            
                <video class="videoplayer" controls>
                    <source src="${val1}" type="video/mp4">
                </video>
            </div>
            <h1 class="slidecaps">Add Items</h1>
        </div>
        <div class="slidecollec">
            <img class="slideinnerimg addtomenuimg" src="/images/menu/add.png" alt="addtomenu" />
            <img class="slideinnerimg makeorderimg" src="/images/menu/make.png" alt="makeorders" />
            <img class="slideinnerimg overviewimg" src="/images/menu/over.png" alt="overview" />
            <img class="slideinnerimg statsimg" src="/images/menu/sta.png" alt="statistics" />
            <img class="slideinnerimg statsecimg" src="/images/menu/sta.png" alt="statistics" />
        </div>
    `
    let addtomenu = document.querySelector(".addtomenuimg");
    let makeorder = document.querySelector(".makeorderimg");
    let overview = document.querySelector(".overviewimg");
    let stats = document.querySelector(".statsimg");
    let statsec = document.querySelector(".statsecimg");
    let showslide = document.querySelector(".showslidesec");
    let slidecaps = document.querySelector(".slidecaps");
    let numbertxt = document.querySelector(".numbertext");

    addtomenu.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "1 / 5";
        showslide.innerHTML += `
                    <video class="videoplayer" controls>
                        <source src="${val1}" type="video/mp4">
                    </video>
                    `
        slidecaps.innerText = "Add Items";
    })

    makeorder.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "2 / 5";
        showslide.innerHTML += `
                    <video class="videoplayer" controls>
                        <source src="${val2}" type="video/mp4">
                    </video>
                    `
        slidecaps.innerText = "Make & Accept"
    })

    overview.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "3 / 5";
        showslide.innerHTML += `
                    <video class="videoplayer" controls>
                        <source src="${val3}" type="video/mp4">
                    </video>
                    `
        slidecaps.innerText = "Simple Overview"
    })

    stats.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "4 / 5";
        showslide.innerHTML += `
                    <img class="videoplayer" src="${val4}" alt="stats" />
                    `
        slidecaps.innerText = "Statistics"
    })

    statsec.addEventListener("click", () => {
        showslide.innerHTML = "";
        numbertxt.innerText = "5 / 5";
        showslide.innerHTML += `
                    <img class="videoplayer" src="${val5}" alt="stats" />
                    `
        slidecaps.innerText = "Statistics"
    })
};
