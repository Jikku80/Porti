let updatePortSix = document.getElementById('update_portSix');
let updateFormSix = document.getElementById('update_formSix');
let headGoSix = document.querySelector(".land__goto");
let landNavSix = document.querySelector(".land__nav__main");
let delFirstSix = document.getElementById("delPp");
let portiqrsix = document.querySelector(".qr__sec");

updatePortSix.addEventListener('click', () => {
    headGoSix.classList.add('hidden');
    landNavSix.classList.add('hidden');
    updatePortSix.classList.add('hidden');
    delFirstSix.classList.add("hidden");
    portiqrsix.classList.add("hidden");
    updateFormSix.classList.remove('hidden');
})

let cancelSix = document.querySelector(".cancelSix");

cancelSix.addEventListener("click", () => {
    headGoSix.classList.remove('hidden');
    landNavSix.classList.remove('hidden');
    updatePortSix.classList.remove('hidden');
    delFirstSix.classList.remove("hidden");
    portiqrsix.classList.remove("hidden");
    updateFormSix.classList.add('hidden');
})

let upFormSix = document.getElementById("upFormSix");
let updBtnSix = document.getElementById("updateBtnSix");
let idSix = document.getElementById('endpoint').innerText;

updBtnSix.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let portfolioName = document.getElementById("port_name");
    let upname = document.querySelector("#upnameSix");
    let upabout = document.getElementById("upaboutSix");
    let upwhat = document.getElementById('upwhatSix');
    let upwhy = document.getElementById("upwhySix");
    let upno = document.getElementById("upnoSix");
    let upshowNo = document.getElementById("upCheckSix");
    let upemail = document.getElementById("upemailSix");
    let upFb = document.getElementById("upFbSix");
    let upLoc = document.getElementById("upLocSix");
    let upwork = document.getElementById("upworkSix");
    let hd1 = document.getElementById("firstImgSix");
    let hd2 = document.getElementById("secondImgSix");
    let hd3 = document.getElementById("thirdImgSix");
    let hd4 = document.getElementById("fourthImgSix");
    let hd5 = document.getElementById("fifthImgSix");
    let themes = document.getElementById("themeSix");
    const endpoint = '/updateportSix'
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: idSix,
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
                firstImgHead: hd1.value,
                secondImgHead: hd2.value,
                thirdImgHead: hd3.value,
                fourthImgHead: hd4.value,
                fifthImgHead: hd5.value
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
                    headGoSix.classList.remove('hidden');
                    landNavSix.classList.remove('hidden');
                    updatePortSix.classList.remove('hidden');
                    delFirstSix.classList.remove("hidden");
                    updateFormSix.classList.add('hidden');
                }, 400);
            } else {
                errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    }
})
