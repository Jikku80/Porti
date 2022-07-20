let updatePort = document.getElementById('update_port');
let updateForm = document.getElementById('update_form');
let landNav = document.querySelector(".land__nav__main");
let headGo = document.querySelector(".land__goto");
let updateImgForm = document.getElementById('update_ImgForm');
let updateImg = document.getElementById("update_Img");
let delFirst = document.getElementById("delPp");
let portiqrsec = document.querySelector(".qr__sec");
let addItemSec = document.querySelector(".portfolio__tweaks");
let editThemeSec = document.getElementById("editTheme");

updatePort.addEventListener('click', () => {
    headGo.classList.add('hidden');
    landNav.classList.add('hidden');
    updatePort.classList.add('hidden');
    updateImg.classList.add("hidden");
    delFirst.classList.add("hidden");
    portiqrsec.classList.add("hidden");
    addItemSec.classList.add("hidden");
    editThemeSec.classList.add("hidden");
    updateForm.classList.remove('hidden');
    location.hash = "#"
})

updateImg.addEventListener("click", () => {
    headGo.classList.add('hidden');
    landNav.classList.add('hidden');
    updatePort.classList.add('hidden');
    updateImg.classList.add("hidden");
    delFirst.classList.add("hidden");
    portiqrsec.classList.add("hidden");
    addItemSec.classList.add("hidden");
    editThemeSec.classList.add("hidden");
    updateImgForm.classList.remove('hidden');
    location.hash = "#"
})

let cancel = document.querySelector(".cancel");
let cancl = document.querySelector(".cancl");

cancel.addEventListener("click", () => {
    headGo.classList.remove('hidden');
    landNav.classList.remove('hidden');
    updatePort.classList.remove('hidden');
    updateImg.classList.remove("hidden");
    delFirst.classList.remove("hidden");
    portiqrsec.classList.remove("hidden");
    addItemSec.classList.remove("hidden");
    editThemeSec.classList.remove("hidden");
    updateForm.classList.add('hidden');
})

cancl.addEventListener("click", () => {
    headGo.classList.remove('hidden');
    landNav.classList.remove('hidden');
    updatePort.classList.remove('hidden');
    updateImg.classList.remove("hidden");
    delFirst.classList.remove("hidden");
    portiqrsec.classList.remove("hidden");
    addItemSec.classList.remove("hidden");
    editThemeSec.classList.remove("hidden");
    updateImgForm.classList.add('hidden');
})

let upForm = document.getElementById("upForm");

let upname = document.querySelector("#upname");
let upabout = document.getElementById("upabout");
let upwhat = document.getElementById('upwhat');
let upwhy = document.getElementById("upwhy");
let upno = document.getElementById("upno");
let upshowNo = document.getElementById("upCheck");
let upemail = document.getElementById("upemail");
let upFb = document.getElementById("upFb");
let upLoc = document.getElementById("upLoc");
let upwork = document.getElementById("upwork");
let updBtn = document.getElementById("updateBtn");
let upImgBtn = document.getElementById("updateImgBtn");
let hd1 = document.getElementById("upfailure");
let hd2 = document.getElementById("upmoti");
let hd3 = document.getElementById("upmsg");
let hd4 = document.getElementById("upproblem");
let hd5 = document.getElementById("upsoln");
let id = document.getElementById('endpoint').innerText;
let themes = document.getElementById("themes");

updBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let portfolioName = document.getElementById("port_name")
    const endpoint = '/updateport'
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: upname.value,
                about: upabout.value,
                what: upwhat.value,
                why: upwhy.value,
                phn_no: upno.value,
                showNo: upshowNo.checked,
                theme: themes.value,
                email: upemail.value,
                fb: upFb.value,
                location: upLoc.value,
                previous: upwork.value,
                failure: hd1.value,
                motivation: hd2.value,
                msg: hd3.value,
                problem: hd4.value,
                solution: hd5.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Portfolio has been updated :)");
                let result = response.json();
                result.then(item => {
                    let portfolio = item.updatedPortfolio
                    portfolioName.innerHTML = `${portfolio.name}`
                })
                window.setTimeout(() => {
                    headGo.classList.remove('hidden');
                    landNav.classList.remove('hidden');
                    updatePort.classList.remove('hidden');
                    updateImg.classList.remove("hidden");
                    delFirst.classList.remove("hidden");
                    updateForm.classList.add('hidden');
                }, 400);
            } else {
                errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})

upImgBtn.addEventListener("click", async (e) => {
    if (img1.files[0] < 1 || img1.files[0] == "" || img1.files[0] == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    const formData = new FormData();
    formData.append("id", id);
    formData.append("imageCover", img1.files[0]);
    const endpoint = '/updateportImg'
    try {
        await fetch(endpoint, {
            body: formData,
            method: 'PATCH'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Portfolio Images has been updated :)");
                window.setTimeout(() => {
                    headGo.classList.remove('hidden');
                    landNav.classList.remove('hidden');
                    updatePort.classList.remove('hidden');
                    updateImg.classList.remove("hidden");
                    delFirst.classList.remove("hidden");
                    updateImgForm.classList.add('hidden');
                }, 400);
            } else {
                errorAlert("Invalid input!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})
