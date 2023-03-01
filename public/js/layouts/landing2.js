let updatePortSec = document.getElementById('update_portSec');
let updateFormSec = document.getElementById('update_formSec');
let headGoSec = document.querySelector(".land__goto");
let landNavSec = document.querySelector(".land__nav__main");
let updateImgFormCollec = document.getElementById('update_ImgFormCollec');
let updateImgCollec = document.getElementById("update_ImgCollec");
let delSec = document.getElementById("delPp");
let portiqrsec2 = document.querySelector(".qr__sec");
let editThemeSec2 = document.getElementById("editTheme");


updatePortSec.addEventListener('click', () => {
    headGoSec.classList.add('hidden');
    landNavSec.classList.add('hidden');
    updatePortSec.classList.add('hidden');
    updateImgCollec.classList.add("hidden");
    delSec.classList.add("hidden");
    portiqrsec2.classList.add("hidden");
    editThemeSec2.classList.add("hidden");
    updateFormSec.classList.remove('hidden');
    window.setTimeout(() => {
        location.hash = "#"
    }, 200)
})

updateImgCollec.addEventListener("click", () => {
    headGoSec.classList.add('hidden');
    landNavSec.classList.add('hidden');
    updatePortSec.classList.add('hidden');
    updateImgCollec.classList.add("hidden");
    delSec.classList.add("hidden");
    portiqrsec2.classList.add("hidden");
    editThemeSec2.classList.add("hidden");
    updateImgFormCollec.classList.remove('hidden');
    window.setTimeout(() => {
        location.hash = "#"
    }, 200)
})

let cancelSec = document.querySelector(".cancelSec");
let canclSec = document.querySelector(".canclCollec");

cancelSec.addEventListener("click", () => {
    headGoSec.classList.remove('hidden');
    landNavSec.classList.remove('hidden');
    updatePortSec.classList.remove('hidden');
    updateImgCollec.classList.remove("hidden");
    delSec.classList.remove("hidden");
    portiqrsec2.classList.remove("hidden");
    editThemeSec2.classList.remove("hidden");
    updateFormSec.classList.add('hidden');
})

canclSec.addEventListener("click", () => {
    headGoSec.classList.remove('hidden');
    landNavSec.classList.remove('hidden');
    updatePortSec.classList.remove('hidden');
    updateImgCollec.classList.remove("hidden");
    delSec.classList.remove("hidden");
    portiqrsec2.classList.remove("hidden");
    editThemeSec2.classList.remove("hidden");
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
let pOcc = document.getElementById("upoccSec")
let pLoc = document.getElementById("upLocSec");
let pdBtn = document.getElementById("updateBtnSec");
let pImgBtn = document.getElementById("updateImgBtnCollec");
let pimg1 = document.querySelector('#img1Collec');
let pid = document.getElementById('endpoint').innerText;
let pthemes = document.getElementById("themeSec");
let searchVisiSec = document.getElementById("upSearchVisibleSec");
let watermarkSec = document.getElementById("upwatermarkSec");

pdBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let portfolioName = document.getElementById("port_name");
    const endpoint = '/update/portSec'
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
                role: pOcc.value,
                showNo: pshowNo.checked,
                theme: pthemes.value,
                email: pemail.value,
                fb: pFb.value,
                location: pLoc.value,
                searchVisible: searchVisiSec.checked,
                watermark: watermarkSec.checked
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
                    headGoSec.classList.remove('hidden');
                    landNavSec.classList.remove('hidden');
                    updatePortSec.classList.remove('hidden');
                    updateImgCollec.classList.remove("hidden");
                    delSec.classList.remove("hidden");
                    updateFormSec.classList.add('hidden');
                    location.reload();
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
