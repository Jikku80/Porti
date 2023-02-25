(function () {
    let btn = document.querySelector(".sev__btn");
    let cov__bod = document.querySelector(".seventh__coverimage");
    let abt__bod = document.querySelector(".seventh__about__sec");
    let load = document.querySelector(".lod");
    btn.addEventListener("click", () => {
        cov__bod.classList.add("hidden");
        btn.classList.add("hidden");
        load.classList.remove("hidden");
        abt__bod.classList.remove("hidden");
        setTimeout(() => {
            load.classList.add("hidden");
        }, 1500)
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

window.addEventListener("load", async () => {
    let userid = document.querySelector(".prof__user__id").innerText
    let subItems = document.querySelector(".prev__cont__sub")
    let watermark = document.querySelector(".portfoliowatermark").innerText;
    let usrname = document.querySelector(".portfoliouser").innerText;
    let pgC = window.sessionStorage.getItem('paginate');

    let pg;
    if (pgC === null) {
        pg = 1
    }
    else {
        pg = pgC
    }
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
                    items.forEach(el => {
                        if (watermark !== "true") {
                            subItems.innerHTML +=
                                `
                                    <div class="port__images open_full"> 
                                        <img class="port_img imgFull pointer" src="${el.addImage}", loading="lazy" alt="second_img", srcset="" />
                                        <h3 class="head portfolio__item__name">${el.name}</h3>
                                    </div>
                                `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                    <div class="port__images open_full"> 
                                        <img class="port_img imgFull pointer" src="${el.addImage}", loading="lazy" alt="second_img", srcset="" />
                                        <h3 class="head portfolio__item__name">${el.name}</h3>
                                        <div class="smallwatermark">
                                            <p>${usrname} vPor</p>
                                                <span class="grn">t</span>
                                                <span class="nocaps">i</span>
                                        </div>
                                    </div>
                                `
                        }
                    });
                    let hdfnt = document.querySelectorAll(".head");
                    let fontColor = document.querySelector(".secHeadColor").innerText;
                    hdfnt.forEach(item => {
                        item.style.color = fontColor;
                    })
                    openFullImg();
                    let next = document.querySelector(".next__addimgSec");
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

    paginate(".next__addimgSec", ".prev__addimgSec", ".prev__cont__sub", ".port__images", "#seventhimgcont", pgC);
});


(function () {
    let defaultBtn = document.getElementById("defaultseventhTheme");
    let fontColor = "gray";
    let headColor = "crimson";
    let secHead = "black";
    let focusColor = "#001f9c";
    let backColor = "white";
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

(function () {
    let fontColor = document.querySelector(".fontColor").innerText;
    let focusColor = document.querySelector(".focusColor").innerText;
    let headColor = document.querySelector(".headColor").innerText;
    let secHeadColor = document.querySelector(".secHeadColor").innerText;
    let backColor = document.querySelector(".backColor").innerText;
    let fontFam = document.querySelector(".fontFam").innerText;

    let head = document.querySelectorAll(".headFont");
    let ans = document.querySelectorAll(".ansFont");
    let sevbod = document.querySelector(".seventh__layout__body");
    let sevbtn = document.querySelector(".sev__btn");
    let showbtn = document.querySelector(".showeditbtn");
    let namefont = document.querySelector(".namefont");
    let about = document.querySelector(".seventh__about__sec");

    namefont.style.color = headColor;

    sevbod.style.backgroundColor = backColor;
    sevbod.style.fontFamily = fontFam;

    about.style.boxShadow = `-20px 20px 20px -20px ${focusColor} inset`

    sevbtn.style.borderColor = secHeadColor;
    sevbtn.style.backgroundColor = secHeadColor;
    sevbtn.style.color = backColor;

    sevbtn.addEventListener("mouseover", () => {
        sevbtn.style.borderColor = secHeadColor;
        sevbtn.style.backgroundColor = backColor;
        sevbtn.style.color = secHeadColor;
    })

    sevbtn.addEventListener("mouseout", () => {
        sevbtn.style.borderColor = secHeadColor;
        sevbtn.style.backgroundColor = secHeadColor;
        sevbtn.style.color = backColor;
    })

    showbtn.style.borderColor = secHeadColor;
    showbtn.style.backgroundColor = secHeadColor;
    showbtn.style.color = backColor;

    showbtn.addEventListener("mouseover", () => {
        showbtn.style.borderColor = secHeadColor;
        showbtn.style.backgroundColor = backColor;
        showbtn.style.color = secHeadColor;
    })

    showbtn.addEventListener("mouseout", () => {
        showbtn.style.borderColor = secHeadColor;
        showbtn.style.backgroundColor = secHeadColor;
        showbtn.style.color = backColor;
    })

    head.forEach(item => {
        item.style.color = secHeadColor;
    })

    ans.forEach(item => {
        item.style.color = fontColor;
    })
})();