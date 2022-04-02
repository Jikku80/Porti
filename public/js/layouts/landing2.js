let updatePortSec = document.getElementById('update_portSec');
let updateFormSec = document.getElementById('update_formSec');
let headGoSec = document.querySelector(".land__goto");
let updateImgFormCollec = document.getElementById('update_ImgFormCollec');
let updateImgCollec = document.getElementById("update_ImgCollec");
let delSec = document.getElementById("delPp");

updatePortSec.addEventListener('click', () => {
    headGoSec.classList.add('hidden');
    updatePortSec.classList.add('hidden');
    updateImgCollec.classList.add("hidden");
    delSec.classList.add("hidden");
    updateFormSec.classList.remove('hidden');
})

updateImgCollec.addEventListener("click", () => {
    headGoSec.classList.add('hidden');
    updatePortSec.classList.add('hidden');
    updateImgCollec.classList.add("hidden");
    delSec.classList.add("hidden");
    updateImgFormCollec.classList.remove('hidden');
})

let cancelSec = document.querySelector(".cancelSec");
let canclSec = document.querySelector(".canclCollec");

cancelSec.addEventListener("click", () => {
    headGoSec.classList.remove('hidden');
    updatePortSec.classList.remove('hidden');
    updateImgCollec.classList.remove("hidden");
    delSec.classList.remove("hidden");
    updateFormSec.classList.add('hidden');
})

canclSec.addEventListener("click", () => {
    headGoSec.classList.remove('hidden');
    updatePortSec.classList.remove('hidden');
    updateImgCollec.classList.remove("hidden");
    delSec.classList.remove("hidden");
    updateImgFormCollec.classList.add('hidden');
})

let upFormSec = document.getElementById("upFormSec");

let pname = document.querySelector("#upnameSec");
let pabout = document.getElementById("upaboutSec");
let pwhat = document.getElementById("upwhatSec");
let pwhy = document.getElementById("upwhySec");
let pno = document.getElementById("upnoSec");
let pshowNo = document.getElementById("upCheckSec");
let pemail = document.getElementById("upemailSec");
let pFb = document.getElementById("upFbSec");
let pdBtn = document.getElementById("updateBtnSec");
let pImgBtn = document.getElementById("updateImgBtnCollec");
let pimg1 = document.querySelector('#img1Collec');
let pid = document.getElementById('endpoint').innerText;
let pthemes = document.getElementById("themeSec");

pdBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let num = btoa(pno.value);
    const endpoint = '/updateportSec'
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: pid,
                name: pname.value,
                about: pabout.value,
                what: pwhat.value,
                why: pwhy.value,
                phn_no: pno.value,
                showNo: pshowNo.checked,
                theme: pthemes.value,
                email: pemail.value,
                fb: pFb.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Portfolio has been updated :)");
                window.setTimeout(() => {
                    location.assign(`/myportfolio/${num}?${pthemes.value}`);
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
    pname.value = "",
        pabout.value = "",
        pwhat.value = "",
        pwhy.value = "",
        pemail.value = "",
        pFb.value = "",
        pno.value = ""
})

pImgBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let num = btoa(pno.value);
    const formData = new FormData();
    for (var x = 0; x < pimg1.files.length; x++) {
        formData.append("images", pimg1.files[x]);
    }
    const endpoint = '/updateportImgCollec'
    try {
        await fetch(endpoint, {
            body: formData,
            method: 'PATCH'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Portfolio Images has been updated :)");
                window.setTimeout(() => {
                    location.assign(`/myportfolio/${num}?${searchPoint}`);
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
    pimg1.value = ""
})