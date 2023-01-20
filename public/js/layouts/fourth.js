
(function () {
    let ancSecond = document.querySelector(".anc__second")
    let mainHead = document.querySelector(".main__header")
    let aboutSection = document.querySelector(".main__about__section")
    let fh = document.querySelector(".fourth__head")

    ancSecond.addEventListener("click", () => {
        mainHead.classList.add("hide");
        fh.classList.add("hide");
        aboutSection.classList.remove("hide");
    })

    let fourthClose = document.getElementById("fourthClose");

    fourthClose.addEventListener("click", () => {
        aboutSection.classList.add("hide");
        fh.classList.remove("hide");
        mainHead.classList.remove("hide");
    })

    let ancThird = document.querySelector(".anc__third");
    let prevSection = document.querySelector(".main__prev__section");

    ancThird.addEventListener("click", () => {
        mainHead.classList.add("hide");
        fh.classList.add("hide");
        prevSection.classList.remove("hide");
    })

    let fourthSecClose = document.getElementById("fourthSecClose");
    fourthSecClose.addEventListener("click", () => {
        prevSection.classList.add("hide");
        mainHead.classList.remove("hide");
        fh.classList.remove("hide");
    })

    let ancFourth = document.querySelector(".anc__last");
    let contSection = document.querySelector(".main__cont__section");

    ancFourth.addEventListener("click", () => {
        mainHead.classList.add("hide");
        fh.classList.add("hide");
        contSection.classList.remove("hide");
    })

    let fourthThirdClose = document.getElementById("fourthThirdClose");
    fourthThirdClose.addEventListener("click", () => {
        contSection.classList.add("hide");
        mainHead.classList.remove("hide");
        fh.classList.remove("hide");
    })

    const fullImg = document.querySelectorAll('.imgFull');

    fullImg.forEach(img => {
        img.addEventListener("click", () => {
            window.open(img.src)
        })
    })
})();

(function () {
    let fontColor = document.querySelector(".main").id;
    let fontFam = document.querySelector(".bg__imgCov").id;
    let backColor = document.querySelector(".main__header").id;
    let headColor = document.querySelector(".header__round").id;
    let focusColor = document.querySelector(".fourth__head").id;
    let secHeadColor = document.querySelector(".header__round__inner").id;
    let mainSec = document.querySelector(".main");
    let nav = document.querySelector(".fourth__head");
    let about = document.querySelector(".main__about__section");
    let previous = document.querySelector(".main__prev__section");
    let contact = document.querySelector(".main__cont__section");
    let headers = document.querySelectorAll(".headFont");
    // let tophead = document.querySelectorAll(".topHead");
    let secHead = document.querySelectorAll(".secHead");
    let ans = document.querySelectorAll(".ansFont");
    let contbox = document.querySelectorAll(".fourth__cont");
    let prevBtn = document.querySelector(".firstPrev");
    let nextBtn = document.querySelector(".firstNext");

    nav.style.color = focusColor;
    previous.style.backgroundColor = backColor;
    contbox.forEach(item => {
        item.style.color = headColor;
        item.style.borderColor = focusColor;
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = focusColor;
            item.style.color = headColor;
        })

        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "transparent";
            item.style.color = headColor;
        })
    })

    // tophead.forEach(item => {
    //     item.style.color = focusColor
    // })

    secHead.forEach(item => {
        item.style.color = secHeadColor
    })

    about.style.backgroundColor = backColor;
    contact.style.backgroundColor = backColor

    mainSec.style.color = fontColor;
    mainSec.style.fontFamily = fontFam;

    headers.forEach(items => {
        items.style.color = headColor;
    })

    ans.forEach(items => {
        items.style.color = fontColor;
    })

    nextBtn.style.color = fontColor;
    nextBtn.style.borderColor = headColor;

    nextBtn.addEventListener("mouseover", () => {
        nextBtn.style.backgroundColor = headColor;
    })

    nextBtn.addEventListener("mouseout", () => {
        nextBtn.style.backgroundColor = "transparent";
    })

    prevBtn.style.color = fontColor;
    prevBtn.style.borderColor = headColor;

    prevBtn.addEventListener("mouseover", () => {
        prevBtn.style.backgroundColor = headColor;
    })

    prevBtn.addEventListener("mouseout", () => {
        prevBtn.style.backgroundColor = "transparent";
    })

})();

paginate(".firstNext", ".firstPrev", ".accomp__cont", ".accomp__cont__card", "#thirdImgCont");

(function () {
    let editBtn = document.querySelector(".showEdit");
    let seditBtn = document.querySelector(".showeditbtn");
    let clse = document.querySelector(".close__show");

    seditBtn.addEventListener("click", () => {
        clse.classList.remove('hidden');
        editBtn.classList.remove("hidden");
        seditBtn.classList.add("hidden");
    })

    clse.addEventListener("click", () => {
        editBtn.classList.add("hidden");
        clse.classList.add('hidden');
        seditBtn.classList.remove("hidden");
    })
})();

(function () {
    let defaultBtn = document.getElementById("defaultseventhTheme");
    let fontColor = "gray";
    let headColor = "white";
    let secHead = "white";
    let focusColor = "teal";
    let backColor = "#2c2c2c";
    let fontFam = "Arial, Helvetica, sans-serif";
    let id = document.getElementById('seventhid').innerText;

    defaultBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/portfolio/${id}/updatePortfolioTheme`
        try {
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    fontColor: fontColor,
                    headColor: headColor,
                    secHeadColor: secHead,
                    backColor: backColor,
                    focusColor: focusColor,
                    fontFam: fontFam,
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Portfolio Theme has been updated :)");
                    window.setTimeout(() => {
                        location.reload();
                    }, 400);
                } else {
                    errorAlert("Invalid input, Input error!!!")
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

(function () {
    let upPortTheme = document.getElementById("changeseventhTheme");
    let fontColor = document.getElementById("sportFontColor");
    let headColor = document.getElementById("sportHeadColor");
    let secHead = document.getElementById("sportSecHeadColor");
    let focusColor = document.getElementById("sportFocusColor");
    let backColor = document.getElementById("sportBackColor");
    let fontFam = document.getElementById("sportFontFam");
    let id = document.getElementById('seventhid').innerText;

    upPortTheme.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/portfolio/${id}/updatePortfolioTheme`
        try {
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    fontColor: fontColor.value,
                    headColor: headColor.value,
                    secHeadColor: secHead.value,
                    backColor: backColor.value,
                    focusColor: focusColor.value,
                    fontFam: fontFam.value,
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Portfolio Theme has been updated :)");
                    window.setTimeout(() => {
                        location.reload();
                    }, 400);
                } else {
                    errorAlert("Invalid input, Input error!!!")
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

