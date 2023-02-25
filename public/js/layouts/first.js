// const box = document.querySelector('.bgbox');
const cont = document.querySelector('#contact');
const abt = document.getElementById("about");
const abtbody = document.querySelector(".about__body");
const prv = document.getElementById("previous");
const prev = document.querySelector(".prev");


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const box = entry.target.querySelector(".bgbox");

        if (entry.isIntersecting) {
            box.classList.add('fadein-animation');
            return;
        }
        box.classList.remove('fadein-animation');
    })
})

observer.observe(cont, prv, abt);

(function () {
    let fontColor = document.querySelector(".main").id;
    let fontFam = document.querySelector(".navbar").id;
    let backColor = document.querySelector(".navbar__list").id;
    let headColor = document.querySelector(".portfoName").id;
    let focusColor = document.querySelector(".topFirst").id;
    let secHeadColor = document.querySelector(".about__body").id;
    let mainSec = document.querySelector(".main");
    let nav = document.querySelector(".navbar");
    let about = document.getElementById("about");
    let previous = document.getElementById("previous");
    let contact = document.getElementById("contact");
    let heds = document.querySelectorAll(".dyF");
    let headers = document.querySelectorAll(".headFont");
    let ans = document.querySelectorAll(".ansFont");
    let contbox = document.querySelectorAll(".contbox");
    let prevBtn = document.querySelector(".firstPrev");
    let nextBtn = document.querySelector(".firstNext");

    mainSec.style.backgroundColor = backColor;
    nav.style.backgroundColor = focusColor;
    previous.style.backgroundColor = focusColor;
    heds.forEach(item => {
        item.style.color = focusColor;
    })
    contbox.forEach(item => {
        item.style.backgroundColor = focusColor;
        item.style.color = headColor;
    })

    about.style.backgroundColor = secHeadColor;

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

window.addEventListener("load", async () => {
    let userid = document.querySelector(".prof__user__id").innerText
    let subItems = document.querySelector(".accomp__cont")
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
                                    <div class="accomp__cont__card open_full"> 
                                        <img class="port_img imgFull pointer" src="${el.addImage}", loading="lazy" alt="second_img", srcset="" />
                                        <h3 class="head portfolio__item__name">${el.name}</h3>
                                    </div>
                                `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                    <div class="accomp__cont__card open_full"> 
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

    paginate(".firstNext", ".firstPrev", ".accomp__cont", ".accomp__cont__card", "#firstImgCont", pgC);
});

