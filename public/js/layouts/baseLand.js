let url = document.getElementById('urlLink');
let portName = document.getElementById('port_name').innerText;
portName = portName.replace(/\s/g, '');
let endP = document.getElementById('endpoint');
let end = endP.innerText;
end = btoa(end);
let portithemepoint = document.getElementById('portitheme').innerText;

let user__id = document.getElementById('user__id').innerText;
let user_id = btoa(user__id)
// let searchPoint = location.search.slice(1);

url.innerHTML = `
<button id="openport" class="redbtn">My Portfolio</button>
<p class="xsf">Share your potfolio with the link below</p>
<p class="port_link">${location.protocol}://${location.host}/${portName}/portfolio/${user_id}/tm/${portithemepoint}/${end}</p>
`

openport = document.getElementById("openport");

openport.addEventListener("click", () => {
    let myurl = `/${portName}/portfolio/${user_id}/tm/${portithemepoint}/${end}`
    window.open(myurl);
})

let copyLink = document.getElementById("copyLink");
let portLink = document.querySelector(".port_link");

copyLink.addEventListener("click", () => {
    plink = portLink.innerText;

    navigator.clipboard.writeText(plink);

    successAlert("Link Copied")
})


let portigen = document.querySelector("#genportiqr");
let portiqrurl = document.querySelector(".port_link").innerText;
let downportiQr = document.querySelector("#downportiqr")

portigen.addEventListener("click", async () => {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/scan`
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

// (async function () {
//     try {
//         let load = document.querySelector('.loader');
//         load.classList.remove("hidden")
//         const endpoint = `/urlShortner`
//         await fetch((endpoint), {
//             method: 'POST',
//             headers: {
//                 Accept: "application/json, text/plain, */*",
//                 'Content-type': 'application/json',
//             },
//             body: JSON.stringify({
//                 longurl: portiqrurl
//             })
//         }).then((response) => {
//             load.classList.add("hidden");
//             let res = response.json();
//             if (response.status === 201) {
//                 console.log(res);
//             } else {
//                 console.log(response);
//                 errorAlert("Error")
//             }
//         })
//     }
//     catch (err) {
//         console.log(err);
//         errorAlert('Sorry! Something went wrong', err);
//     };
// })();


(function () {
    let next = document.querySelector(".next__addimg");
    let prev = document.querySelector(".prev__addimg");
    let subItems = document.querySelector(".port__card__main")

    if (subItems !== null) {
        if (subItems.children.length < 4) {
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
            let fullpath = location.pathname
            let resultpath = fullpath.match("/myportfolio/(.*)")
            const endpoint = `/api/v1/portfolio/${resultpath[1]}/paginate/${pg}`
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
                                    <img class="port_img imgFull" src="/images/ports/addedImages/${el.addImage}", loading="lazy" alt="second_img", srcset="" />
                                    <h3 class="first__head portfolio__item__name">${el.name}</h3>
                                    <div class="group__btn">
                                        <button type="button" id="${el._id}" name="${el.name}" class="upPortImageBtn ygbtn">Update</button>
                                        <button type="button" id="${el._id}" class="delPortImageBtn redbtn">Delete</button>
                                    </div>
                                </div>
                            `
                        });
                        if (subItems.children.length === 4) {
                            next.classList.remove("hidden");
                        } else {
                            next.classList.add("hidden");
                        }
                        if (subItems.innerHTML == "") {
                            next.classList.add("hidden");
                            subItems.innerHTML = `<h3 class="go__back center">Oops!! Thats All You've Added So Far :)</h3>`
                        }
                        window.location.hash = "#PrevSection"
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
            let fullpath = location.pathname
            let resultpath = fullpath.match("/myportfolio/(.*)")
            const endpoint = `/api/v1/portfolio/${resultpath[1]}/paginate/${pg}`
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
                                    <img class="port_img imgFull" src="/images/ports/addedImages/${el.addImage}", alt="second_img", loading="lazy" srcset="" />
                                    <h3 class="first__head portfolio__item__name">${el.name}</h3>
                                    <div class="group__btn">
                                        <button type="button" id="${el._id}" name="${el.name}" class="upPortImageBtn ygbtn">Update</button>
                                        <button type="button" id="${el._id}" class="delPortImageBtn redbtn">Delete</button>
                                    </div>
                                </div>
                            `
                        });
                        window.location.hash = "#PrevSection"
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
    let addImgBtn = document.getElementById("addImageBtn");
    let updateImgBtn = document.getElementById("updatePortfolioImageBtn");
    let prevName = document.getElementById("addName");
    let prevImg = document.getElementById("addImg");
    toUpdateItemImg.forEach(item => {
        item.addEventListener("click", () => {
            location.href = "#addImageToPortfolio"
            addImgBtn.classList.add("hidden");
            updateImgBtn.classList.remove("hidden");
            prevName.value = item.name

            updateImgBtn.addEventListener("click", async (e) => {
                if (prevImg.files[0] < 1 || prevImg.files[0] == "" || prevImg.files[0] == null) {
                    return false;
                }
                e.preventDefault();
                let load = document.querySelector('.loader');
                load.classList.remove("hidden")
                const formData = new FormData();
                formData.append("addImage", prevImg.files[0]);
                formData.append("name", prevName.value);
                const endpoint = `/api/v1/portfolio/${item.id}/portfolioImage`
                try {
                    await fetch(endpoint, {
                        body: formData,
                        method: 'PATCH'
                    }).then((response) => {
                        load.classList.add("hidden");
                        if (response.status === 200) {
                            successAlert("Your Previous Accomplisment Image has been Updated :)");
                            setTimeout(() => {
                                location.reload();
                            }, 400)
                        } else {
                            errorAlert("Invalid input!!!")
                        }
                    })

                }
                catch (err) {
                    console.log(err);
                    errorAlert('Sorry! Something went wrong', err);
                };
                prevImg.value = "";
                prevName.value = "";
            })
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