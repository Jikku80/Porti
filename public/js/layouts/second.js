(function () {
    let bgColor = document.querySelector(".sec").id;
    let headColor = document.querySelector(".main").id;
    let fontColor = document.querySelector(".bgCover").id;
    let focusColor = document.querySelector(".portName").id;
    let fontFam = document.querySelector(".fontFam").id;
    let secHeadColor = document.querySelector(".mid").id;
    let mainBod = document.querySelector(".main");
    let hm = document.querySelector(".home");
    let portName = document.querySelector(".portName");
    let aboutSec = document.getElementById("abt");
    let preWork = document.getElementById("prevWork");
    let preSec = document.getElementById("pre");
    let headFont = document.querySelectorAll(".headFont");
    let ansFont = document.querySelectorAll(".ansFont");
    let contBox = document.querySelectorAll(".cont__box");
    let prevBtn = document.querySelector(".prev__addimgSec");
    let nextBtn = document.querySelector(".next__addimgSec");

    mainBod.style.backgroundColor = bgColor;
    mainBod.style.fontFamily = fontFam;
    mainBod.style.color = fontColor;

    headFont.forEach(item => {
        item.style.color = headColor;
    })

    ansFont.forEach(item => {
        item.style.color = fontColor;
    });

    aboutSec.style.backgroundColor = focusColor;
    hm.style.color = focusColor;
    portName.style.color = focusColor;
    contBox.forEach(item => {
        item.style.borderColor = focusColor;
        item.style.color = focusColor;

        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = focusColor;
            item.style.color = headColor;
            item.style.borderColor = focusColor;
        })

        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = bgColor;
            item.style.color = focusColor;
            item.style.borderColor = focusColor;
        })
    })

    preWork.style.borderColor = focusColor;
    preWork.style.color = focusColor;
    preWork.addEventListener("mouseover", () => {
        preWork.style.backgroundColor = focusColor;
        preWork.style.color = headColor;
    })

    preWork.addEventListener("mouseout", () => {
        preWork.style.backgroundColor = "transparent";
        preWork.style.color = focusColor;
    })

    preSec.style.backgroundColor = secHeadColor;

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

paginate(".next__addimgSec", ".prev__addimgSec", ".prev__cont__sub", "port__images", "#imgCont");

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
    let secHead = "black";
    let focusColor = "rgb(14, 28, 65)";
    let backColor = "rgb(51, 51, 51)";
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