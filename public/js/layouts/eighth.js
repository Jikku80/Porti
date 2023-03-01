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
    let secHead = "#674ea7";
    let focusColor = "white";
    let backColor = "#2c2c2c";
    let fontFam = "Cabin Sketch";
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

(function () {
    let fontColor = document.querySelector(".fontColor").innerText;
    let focusColor = document.querySelector(".focusColor").innerText;
    let headColor = document.querySelector(".headColor").innerText;
    let secHeadColor = document.querySelector(".secHeadColor").innerText;
    let backColor = document.querySelector(".backColor").innerText;
    let fontFam = document.querySelector(".fontFam").innerText;

    let head = document.querySelectorAll(".headFont");
    let ans = document.querySelectorAll(".ansFont");
    let sevbod = document.querySelector(".eighth__bod__section");
    let namefont = document.querySelector(".namefont");
    let about = document.querySelector(".eighth__about__bod");
    let cusmail = document.querySelector(".mail");

    cusmail.style.color = fontColor;

    namefont.style.color = headColor;

    sevbod.style.backgroundColor = backColor;
    sevbod.style.fontFamily = fontFam;

    about.style.backgroundColor = focusColor
    about.style.borderColor = focusColor

    head.forEach(item => {
        item.style.color = secHeadColor;
    })

    ans.forEach(item => {
        item.style.color = fontColor;
    })
})();

window.addEventListener("load", async () => {
    let userid = document.querySelector(".prof__user__id").innerText
    let subItems = document.querySelector(".eighth__img__cont")
    let watermark = document.querySelector(".portfoliowatermark").innerText;
    let usrname = document.querySelector(".portfoliouser").innerText;

    let pg = 1;
    try {
        subItems.innerHTML = "";
        const endpoint = `/api/v1/portfolio/${userid}/pagination/${pg}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result
                    if (items.length !== 0) {
                        items.forEach(el => {
                            if (watermark !== "true") {
                                subItems.innerHTML +=
                                    `
                                        <div class="imgeightcont open_full"> 
                                            <img class="eighth__bod__img imgFull pointer" src="${el.addImage}", loading="lazy" alt="eigth_img", srcset="" />
                                            <h3 class="headFont">${el.name}</h3>
                                        </div>
                                    `
                            }
                            else {
                                subItems.innerHTML +=
                                    `
                                        <div class="imgeightcont open_full"> 
                                            <img class="eighth__bod__img imgFull pointer" src="${el.addImage}", loading="lazy" alt="eigth_img", srcset="" />
                                            <h3 class="headFont">${el.name}</h3>
                                            <div class="smallwatermark">
                                                <p>${usrname} vPor</p>
                                                    <span class="grn">t</span>
                                                    <span class="nocaps">i</span>
                                            </div>
                                        </div>
                                    `
                            }
                        });
                    }
                    else {
                        subItems.innerHTML +=
                            `
                        <div class="imgeightcont">
                            <img class="eighth__bod__img" src="/images/bg.png" alt="noimg"/>
                            <h3 class="headFont">vPorti(You havent added your images)</h3>
                        </div>
                        <div class="imgeightcont">
                            <img class="eighth__bod__img" src="/images/noimg.png" alt="noimg"/>
                            <h3 class="headFont">vPorti(You havent added your images)</h3>
                        </div>
                        <div class="imgeightcont">
                            <img class="eighth__bod__img" src="/images/rbg.png" alt="noimg"/>
                            <h3 class="headFont">vPorti(You havent added your images)</h3>
                        </div>
                        `
                    }
                    let hdfnt = document.querySelectorAll(".headFont");
                    let fontColor = document.querySelector(".secHeadColor").innerText;
                    hdfnt.forEach(item => {
                        item.style.color = fontColor;
                    })
                    openFullImg();
                    let next = document.querySelector(".firstNext");
                    if (subItems.children.length == 20) {
                        next.classList.remove("hidden");
                    }
                    if (subItems.innerHTML == "") {
                        subItems.innerHTML = `<h3 class="go__back center">Oops!! No items so far :)</h3>`
                    }
                })
            } else {
                console.log(response);
                errorAlert("Error")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
});
