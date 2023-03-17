let url = document.getElementById('urlLink');
let portName = document.getElementById('user__nam').innerText;
// let searchPoint = location.search.slice(1);

url.innerHTML = `
<button id="openport" class="redbtn">My Portfolio</button>
<p class="xsf">Share your portfolio with the link below</p>
<p class="port_link nocaps">${location.host}/${portName}</p>
`

openport = document.getElementById("openport");

openport.addEventListener("click", () => {
    let myurl = `/${portName}`
    window.open(myurl);
})

let copyLink = document.getElementById("copyLink");
let portLink = document.querySelector(".port_link");

copyLink.addEventListener("click", () => {
    plink = portLink.innerText;

    navigator.clipboard.writeText(plink);

    successAlert("Link Copied")
})

let fbbtn = document.querySelector(".fbbtn");
fbbtn.addEventListener("click", () => {
    let params;
    let url = portLink.innerText;
    let shareUrl = `http://www.facebook.com/sharer/sharer.phpu=${url}`;
    window.open(shareUrl, "NewWindow", params);
})


let portigen = document.querySelector("#genportiqr");
let portiqrurl = document.querySelector(".port_link").innerText;
let downportiQr = document.querySelector("#downportiqr")

portigen.addEventListener("click", async () => {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/scan/qr`
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                qrurl: portiqrurl
            })
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 201) {
                getportiQRCode(res);
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
})

async function getportiQRCode(resdata) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        window.location.hash = "#qrLanding"
        let qrItem = document.querySelector(".qr__sec");
        await resdata.then(item => {
            load.classList.add('hidden');
            if (item.status !== 'success') {
                errorAlert('Error, Link might be broken ! :(')
                return;
            }
            qrItem.innerHTML = `
                <div class="qr__displayer">
                    <img class="qr__img" src="${item.src}" alt="qrcode" />
                </div>
            `
            successAlert('QRCode Generated Successfully :)')
            portigen.classList.add("hidden");
            downportiQr.classList.remove("hidden");
            downportiQr.addEventListener("click", () => {
                downloadportiQRCode(item.src);
            })
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

function downloadportiQRCode(file) {
    const qrimg = document.createElement('a')
    qrimg.href = file
    qrimg.download = 'qrcode.png'
    document.body.appendChild(qrimg)
    qrimg.click()
    successAlert('Your QRCode Has Been Downloaded! :)')
    document.body.removeChild(qrimg);
};

(function () {
    let next = document.querySelector(".next__addimg");
    let prev = document.querySelector(".prev__addimg");
    let subItems = document.querySelector(".port__card__main")

    if (subItems !== null) {
        if (subItems.children.length < 20) {
            next.classList.add("hidden");
        }
    }

    let x = 1;
    if (prev) {
        if (x == 1) {
            prev.classList.add("hidden")
        }
    }
    next.addEventListener("click", async () => {
        let pg = ++x
        prev.classList.remove("hidden");
        try {

            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            subItems.innerHTML = "";
            let resultpath = document.querySelector(".urthemeurs").innerText;
            const endpoint = `/api/v1/portfolio/${resultpath}/paginate/${pg}`
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'image/jpeg/png')
            myHeaders.get('Content-Type');
            await fetch((endpoint), {
                method: 'GET',
                headers: myHeaders
            }).then((response) => {
                load.classList.add("hidden");
                window.location.hash = "#"
                let res = response.json();
                if (response.status === 200) {
                    res.then(result => {
                        let items = result
                        items.forEach(el => {
                            subItems.innerHTML +=
                                `
                                <div class="port__images"> 
                                    <img class="port_img imgFull" src="${el.addImage}", loading="lazy" alt="second_img", srcset="" />
                                    <h3 class="first__head portfolio__item__name">${el.name}</h3>
                                    <div class="group__btn">
                                        <button type="button" id="${el._id}" name="${el.name}" class="upPortImageBtn ygbtn">Update</button>
                                        <button type="button" id="${el._id}" class="delPortImageBtn redbtn">Delete</button>
                                    </div>
                                </div>
                            `
                        });
                        if (subItems.children.length === 20) {
                            next.classList.remove("hidden");
                        } else {
                            next.classList.add("hidden");
                        }
                        if (subItems.innerHTML == "") {
                            next.classList.add("hidden");
                            subItems.innerHTML = `<h3 class="go__back center">Oops!! Thats All You've Added So Far :)</h3>`
                        }
                        window.setTimeout(() => {
                            window.location.hash = "#PrevSection"
                        }, 200)
                        upImgItem();
                        delImgItem();
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
    })

    prev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                prev.classList.add("hidden")
            }
            next.classList.remove("hidden");
            subItems.innerHTML = "";
            window.location.hash = "#"
            let resultpath = document.querySelector(".urthemeurs").innerText;
            const endpoint = `/api/v1/portfolio/${resultpath}/paginate/${pg}`
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'image/jpeg/png')
            myHeaders.get('Content-Type');
            await fetch((endpoint), {
                method: 'GET',
                headers: myHeaders
            }).then((response) => {
                load.classList.add("hidden");
                let res = response.json();
                if (response.status === 200) {
                    res.then(result => {
                        let items = result
                        items.forEach(el => {
                            subItems.innerHTML +=
                                `
                                <div class="port__images"> 
                                    <img class="port_img imgFull" src="${el.addImage}", alt="second_img", loading="lazy" srcset="" />
                                    <h3 class="first__head portfolio__item__name">${el.name}</h3>
                                    <div class="group__btn">
                                        <button type="button" id="${el._id}" name="${el.name}" class="upPortImageBtn ygbtn">Update</button>
                                        <button type="button" id="${el._id}" class="delPortImageBtn redbtn">Delete</button>
                                    </div>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#PrevSection"
                        }, 200)
                        upImgItem();
                        delImgItem();
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
})();

function upImgItem() {
    let toUpdateItemImg = document.querySelectorAll(".upPortImageBtn");
    let addImg = document.getElementById("addPortImg");
    let updateImg = document.getElementById("upPortImg");
    let id = document.getElementById("upId");
    toUpdateItemImg.forEach(item => {
        item.addEventListener("click", () => {
            location.href = "#addImageToPortfolio"
            addImg.classList.add("hidden");
            updateImg.classList.remove("hidden");
            id.value = item.id
        })
    })
}
upImgItem();


function delImgItem() {
    let delImageBtn = document.querySelectorAll(".delPortImageBtn");
    let cancelDel = document.getElementById("cancelImgDelete");
    let delSec = document.querySelector(".del__img__sec");
    let confirmDel = document.getElementById("confirmImgDelete");
    cancelDel.addEventListener("click", () => {
        location.reload();
    })

    delImageBtn.forEach(item => {
        item.addEventListener("click", () => {
            delSec.classList.remove("hidden");
            confirmDel.addEventListener("click", async () => {
                let load = document.querySelector('.loader');
                load.classList.remove("hidden")
                const endpoint = `/api/v1/portfolio/${item.id}/deletePortiImage`
                try {
                    await fetch(endpoint, {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                        })
                    }).then((response) => {
                        load.classList.add("hidden");
                        if (response.status === 200) {
                            successAlert("Image Deleted Successfully :)");
                            setTimeout(() => {
                                location.reload();
                            }, 400)
                        } else {
                            errorAlert("Deletion Failed!!!")
                        }
                    })

                }
                catch (err) {
                    console.log(err);
                    errorAlert('Sorry! Something went wrong', err);
                };
            })

        })
    })
}
delImgItem();

(function () {
    let sharesec = document.querySelector(".sharesec");
    let shareqr = document.querySelector(".shareqrsec");
    let additemsec = document.querySelector(".additemsection");
    let updatesec = document.querySelector(".updatesection");
    let bannersec = document.querySelector(".addbannersec");
    let delsec = document.querySelector(".delete__sec");
    let porthead = document.querySelector(".tweak__head");

    let sharebtn = document.querySelector(".sharevporti");
    let addbtn = document.querySelector(".gotoaddsec");
    let upbtn = document.querySelector(".gotoupdate");
    let banbtn = document.querySelector(".gotobanner");
    let delbtn = document.querySelector(".gotodel");

    let sec = window.sessionStorage.getItem('section');

    if (sec === "additemstomenu") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.remove("hidden");
        updatesec.classList.add("hidden");
        bannersec.classList.add("hidden");
        porthead.classList.add("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec === "sharesec") {
        sharesec.classList.remove("hidden");
        shareqr.classList.remove("hidden");
        additemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        bannersec.classList.add("hidden");
        porthead.classList.add("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec === "updatedatasec") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        updatesec.classList.remove("hidden");
        bannersec.classList.add("hidden");
        porthead.classList.remove("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec === "createbannersec") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        bannersec.classList.remove("hidden");
        porthead.classList.add("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec == "deletesec") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        bannersec.classList.add("hidden");
        porthead.classList.add("hidden");
        delsec.classList.remove("hidden");
    }
    else {
        window.sessionStorage.setItem("section", "");
    }


    sharebtn.addEventListener("click", () => {
        sharesec.classList.remove("hidden");
        shareqr.classList.remove("hidden");
        additemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        bannersec.classList.add("hidden");
        delsec.classList.add("hidden");
        porthead.classList.add("hidden");
        window.sessionStorage.setItem("section", "sharesec");
    });

    addbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.remove("hidden");
        updatesec.classList.add("hidden");
        bannersec.classList.add("hidden");
        delsec.classList.add("hidden");
        porthead.classList.add("hidden");
        window.sessionStorage.setItem("section", "additemstomenu");
    });

    upbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        updatesec.classList.remove("hidden");
        bannersec.classList.add("hidden");
        delsec.classList.add("hidden");
        porthead.classList.remove("hidden");
        window.sessionStorage.setItem("section", "updatedatasec");
    });

    banbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        bannersec.classList.remove("hidden");
        delsec.classList.add("hidden");
        porthead.classList.add("hidden");
        window.sessionStorage.setItem("section", "createbannersec");
    });

    delbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        bannersec.classList.add("hidden");
        delsec.classList.remove("hidden");
        porthead.classList.add("hidden");
        window.sessionStorage.setItem("section", "deletesec");
    });
})();
