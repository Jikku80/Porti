(function () {
    let fontColor = document.querySelector(".main__cont").id;
    let fontFam = document.querySelector(".main__fifth__head").id;
    let backColor = document.querySelector(".main__fifth__sub").id;
    let headColor = document.querySelector(".ppname").id;
    let focusColor = document.querySelector(".main__pic").id;
    let secHeadColor = document.querySelector(".ppabt").id;
    let mainSec = document.querySelector(".main__cont");
    let nav = document.querySelectorAll(".headTop");
    let about = document.querySelectorAll(".fifth");
    let headers = document.querySelectorAll(".headFont");
    let ans = document.querySelectorAll(".ansFont");
    let contbox = document.querySelectorAll(".fif__box");
    let mainbodsec = document.querySelector(".main__bod__sec");

    mainbodsec.style.backgroundColor = headColor;

    mainSec.style.backgroundColor = secHeadColor;

    about.forEach(item => {
        item.style.fontFamily = fontFam;
        item.style.backgroundColor = backColor;
    })

    contbox.forEach(item => {
        item.style.color = headColor;
        item.style.borderColor = focusColor;

        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = focusColor;
        })

        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "transparent";
        })

    })

    nav.forEach(item => {
        item.style.color = focusColor;
        item.style.fontFamily = fontFam;
    })

    mainSec.style.color = fontColor;
    mainSec.style.fontFamily = fontFam;

    headers.forEach(items => {
        items.style.color = headColor;
    })

    ans.forEach(items => {
        items.style.color = fontColor;
    })
})();

window.addEventListener("load", async () => {
    let userid = document.querySelector(".portiuserid").innerText;
    let subItems = document.querySelector(".main__pic");
    let watermark = document.querySelector(".portfoliowatermark").innerText;
    let usrname = document.querySelector(".portfoliouser").innerText;

    try {
        subItems.innerHTML = "";
        const endpoint = `/api/v1/portfolio/getone/${userid}`
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
                    let items = result.img
                    items.forEach(el => {
                        if (watermark !== "true") {
                            subItems.innerHTML +=
                                `
                                    <div class="picture-box open_full"> 
                                        <img class="picture-box__img imgFull pointer" src="${el}", loading="lazy" alt="your_img", srcset="" />
                                    </div>
                                `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                    <div class="picture-box open_full"> 
                                        <img class="picture-box__img imgFull pointer" src="${el}", loading="lazy" alt="your_img", srcset="" />
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