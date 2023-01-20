(function () {
    let bgCol = document.querySelector(".main__sixth").id;
    let fcColor = document.querySelector(".fcolor").id;
    let fontCol = document.querySelector(".main__sixth__prev").id;
    let headCol = document.querySelector(".main__prev__bod").id;
    let secHeadColor = document.querySelector(".main__sixth__about").id;
    let fontFam = document.querySelector(".main__sixth__cont").id;
    let mainCont = document.querySelector(".main__sixth");
    let primeHead = document.querySelectorAll(".firstHalf");
    let subHead = document.querySelectorAll(".otherHalf");
    let secHead = document.querySelectorAll(".secHead");
    let touchCont = document.querySelector(".main__sixth__cont");
    let aboutCont = document.querySelector(".main__sixth__about");
    let prevCont = document.querySelector(".main__sixth__prev");
    let sixBox = document.querySelectorAll(".sixth__box");
    let cont = document.querySelectorAll(".ans");
    primeHead.forEach(items => {
        items.style.color = headCol;
    })
    subHead.forEach(items => {
        items.style.color = fcColor;
    })
    touchCont.style.borderColor = fcColor;
    aboutCont.style.borderColor = fcColor;
    prevCont.style.borderColor = fcColor;
    sixBox.forEach(items => {
        items.addEventListener("mouseover", () => {
            items.style.backgroundColor = fcColor;
            items.style.color = fontCol;
        })
        items.addEventListener("mouseout", () => {
            items.style.backgroundColor = bgCol;
            items.style.color = fontCol;
        })
        items.style.borderColor = fcColor;
    })
    mainCont.style.color = fontCol;
    mainCont.style.backgroundColor = bgCol;
    mainCont.style.fontFamily = fontFam;
    secHead.forEach(items => {
        items.style.color = secHeadColor;
    })
    cont.forEach(items => {
        items.style.color = fontCol;
    })
})();

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
    let secHead = "#ACA547";
    let focusColor = "#6B8E23";
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


