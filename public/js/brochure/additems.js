(function () {
    let shareLink = document.querySelector(".share__catal__link");
    let nm = document.querySelector(".uname__catal").innerText;

    shareLink.innerHTML += `
        <div class="catalouge__link">
            <p class="head form__label">Your Brochure Link</p>
            <p class="catalouge__link__displayer catalqrLink">${location.host}/${nm}</p>
            <button class="copy__catalouge ygbtn smallbtn">Copy Link</button>
            <button class="ygbtn smallbtn" id="openmycatal">My Brochure</button>
            <button class="ygbtn smallbtn" id="qrcatalouge">Generate QRCode</button>
            <button class="ygbtn smallbtn hidden" id="dqrcatalouge">Download QRCode</button>
        </div>
    `
    let openMenu = document.getElementById("openmycatal");
    openMenu.addEventListener("click", () => {
        window.open(`/${nm}`)
    })

    let menuLinkDis = document.querySelector(".catalouge__link__displayer");
    let copyLink = document.querySelector(".copy__catalouge");
    copyLink.addEventListener("click", () => {
        plink = menuLinkDis.innerText;

        navigator.clipboard.writeText(plink);

        successAlert("Link Copied")
    })
})();

(function () {
    let qgen = document.querySelector("#qrcatalouge");
    let qrurl = document.querySelector(".catalqrLink").innerText;
    let downQr = document.querySelector("#dqrcatalouge")

    qgen.addEventListener("click", async () => {
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            // page.classList.remove("hidden");
            const endpoint = `/scan/qr`
            await fetch((endpoint), {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    qrurl: qrurl
                })
            }).then((response) => {
                load.classList.add("hidden");
                let res = response.json();
                if (response.status === 201) {
                    getQRCode(res);
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

    async function getQRCode(resdata) {
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            // page.classList.remove("hidden");
            window.location.hash = "#catalqrcode";
            let qrItem = document.getElementById("catalqrcode");
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
                qgen.classList.add("hidden");
                downQr.classList.remove("hidden");
                downQr.addEventListener("click", () => {
                    downloadQRCode(item.src);
                })
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    }

    function downloadQRCode(file) {
        const qrimg = document.createElement('a')
        qrimg.href = file
        qrimg.download = 'qrcode.png'
        document.body.appendChild(qrimg)
        qrimg.click()
        successAlert('Your QRCode Has Been Downloaded! :)')
        document.body.removeChild(qrimg);
    }

})();

(function () {
    let updateRestroBtn = document.getElementById("updateCompBtn");
    let restroId = document.querySelector(".comp__id").innerText;
    let resName = document.getElementById("compname");
    let resAddress = document.getElementById("compaddress");
    let compcontact = document.getElementById("compcontact");
    let resSlogan = document.getElementById("compslogan");
    let compemail = document.getElementById("compemail");
    let compsocial = document.getElementById("compsocial");
    let comploc = document.getElementById("complocationLink");
    let compTheme = document.getElementById("compTheme");
    let compType = document.getElementById("compType");

    updateRestroBtn.addEventListener("click", async (e) => {
        if (resName.value < 1 || resName.value == "" || resName.value == null) {
            return false;
        }
        if (compemail.value < 1 || compemail.value == "" || compemail.value == null) {
            return false;
        }
        if (resAddress.value < 1 || resAddress.value == "" || resAddress.value == null) {
            return false;
        }
        if (compcontact.value < 1 || compcontact.value == "" || compcontact.value == null) {
            return false;
        }
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/brochure/${restroId}/updateOrganization`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: resName.value,
                    email: compemail.value,
                    social: compsocial.value,
                    locationLink: comploc.value,
                    slogan: resSlogan.value,
                    Address: resAddress.value,
                    contact: compcontact.value,
                    theme: compTheme.value,
                    orgType: compType.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Company Details Updated Successfully :)");
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Duplication Input error!!!")
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
    let theme = document.querySelector(".themeUsr").innerText;
    let bodsec = document.querySelector(".whole__menu__sec");
    let label = document.querySelectorAll(".form__label");
    let inpt = document.querySelectorAll(".form__input");
    let td = document.querySelectorAll(".td");
    let lbtn = document.querySelector(".lbtn");
    let lod = document.querySelector(".loader");
    let delsec = document.querySelector(".delete__sec");

    if (theme == "red") {
        bodsec.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        document.body.style.backgroundColor = "crimson";
        inpt.forEach(item => {
            item.style.borderColor = "white";
        })

        delsec.style.backgroundColor = "rgba(0, 0, 0, 0.411)"
    }
    else if (theme == "dark") {
        bodsec.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
        document.body.style.backgroundColor = "black";

    }
    else if (theme == "white") {
        bodsec.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        td.forEach(item => {
            item.style.color = "black";
        })
        lbtn.style.color = "black";
        label.forEach(item => {
            item.style.color = "black";
        })
        inpt.forEach(item => {
            item.style.color = "black";
        })

    }
    else {
        return;
    }
})();

(function () {
    let banerInfo = document.getElementById("catalogbannerInfo");
    let discountpercent = document.getElementById("discountpercent");
    let banerBtn = document.getElementById("catalogbannerbtn");
    let deletebanner = document.getElementById("catalogdeletebanner");
    let bannerId = document.getElementById("catalogbannerId").innerText;

    banerBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (banerInfo.value == "") {
            return false;
        }
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/brochure/brochurebanner`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    bannerInfo: banerInfo.value,
                    discountpercent: discountpercent.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Banner Created Successfully :)");
                    banerInfo.value = "";
                    discountpercent.value = "";
                    setTimeout(() => {
                        location.reload();
                    }, 300)
                } else {
                    console.log(response);
                    errorAlert("Creation error, You Can't Have more than one banner!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })

    deletebanner.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/brochure/brochurebanner/${bannerId}`
            await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Banner Has been Deleted !!!");
                    setTimeout(() => {
                        location.reload();
                    }, 300)
                } else {
                    console.log(response);
                    errorAlert("Deletion error!!!")
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
    let delBtn = document.getElementById("deleteOrganization");
    let id = document.querySelector(".delcompid").innerText;
    let user = document.querySelector(".delcatalid").innerText;

    delBtn.addEventListener("click", async () => {
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/brochure/${id}/deleteOrganization/${user}`
            await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                })
            }).then((response) => {
                load.classList.add("hidden");
                console.log(response);
                if (response.status === 200) {
                    successAlert("Your Organization Has been Deleted :(");
                    window.setTimeout(() => {
                        location.assign(`/layouts/porti`);
                    }, 300)
                }
                else if (response.status === 404) {
                    errorAlert("No Organization Found!!!")
                }
                else {
                    console.log(response);
                    errorAlert("Deletion Error!!!")
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
    const socket = io();

    let menuMsgSec = document.querySelector(".menu__message__secetion");
    let dummybtn = document.querySelector(".menu__messages__btn");
    let curcatid = document.querySelector(".curcatid");
    let openMsgBod = document.querySelector(".menu__messages__btn");
    let cancelMsgBod = document.querySelector(".cancel__msg__sec");
    let dot = document.querySelector(".new__menu__msg");

    let alrt = document.getElementById("catmsgalert");

    openMsgBod.addEventListener("click", () => {
        menuMsgSec.classList.remove("hidden");
        dummybtn.classList.add("hidden");
        dot.classList.add("hidden");
        getAllCatMsg();
    })

    socket.on("brobooking", (catid) => {
        if (curcatid.innerText == catid) {
            getAllCatMsg();
            alrt.play();
            dot.classList.remove("hidden");
        }
    });
    cancelMsgBod.addEventListener("click", () => {
        menuMsgSec.classList.add("hidden");
        dummybtn.classList.remove("hidden");
        let dotnoti = document.querySelector(".dotnoti");
        if (dotnoti) {
            dot.classList.remove("hidden");
        }
        else {
            dot.classList.add("hidden");
        }
    })
})();

async function getAllCatMsg() {
    let curcatid = document.querySelector(".curcatid").innerText;
    let menuMsgBod = document.querySelector(".menu__message__bod__prev");

    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        menuMsgBod.innerHTML = "";
        const endpoint = `/api/v1/brochure/broBooking/${curcatid}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                let res = response.json();
                res.then((item) => {
                    let usrorders = item.comorders
                    usrorders.forEach(el => {
                        if (el.bookingInfo) {
                            menuMsgBod.innerHTML +=
                                `
                                <div class="menu__msg__table__list">
                                    <div class="msg__table__bod">
                                        <p class="tabledet">${el.name}</p>
                                        <p class="ordermsg hidden">${el.numberPeople}</p>
                                    </div>
                                    <p class="hidden">${el.total}</p>
                                    <p class="usersmalltag">${el.date}</p>
                                    <p class="hidden">${el.phn_no}</p>
                                    <p class="hidden msgid">${el._id}</p>
                                    <p class="hidden ordinfoo">${el.bookingInfo}</p>
                                    <p class="hidden">${el.organization}</p>
                                    <p class="hidden">${el.userId}</p>
                                    <p class="hidden">${el.time}</p>
                                </div>
                            `
                        }
                        else {
                            menuMsgBod.innerHTML +=
                                `
                                <div class="menu__msg__table__list">
                                    <div class="msg__table__bod">
                                        <p class="tabledet">${el.name}</p>
                                        <p class="ordermsg hidden">${el.numberPeople}</p>
                                        <p class="dotnoti"></p>
                                    </div>
                                    <p class="hidden">${el.total}</p>
                                    <p class="usersmalltag">${el.date}</p>
                                    <p class="hidden">${el.phn_no}</p>
                                    <p class="hidden msgid">${el._id}</p>
                                    <p class="hidden ordinfoo">${el.bookingInfo}</p>
                                    <p class="hidden">${el.organization}</p>
                                    <p class="hidden">${el.userId}</p>
                                    <p class="hidden">${el.time}</p>
                                </div>
                            `
                        }
                    })

                    let msgTab = document.querySelectorAll(".menu__msg__table__list");
                    let msgRev = document.querySelector(".menu__reveived__msg");
                    let tablePlace = document.querySelector(".tablename");
                    let msgRevbod = document.querySelector(".menu__reveived__msg__bod");
                    let cancelmsgtab = document.querySelector(".cancel__reveived__msg");
                    let msgmidsec = document.querySelector(".menu__message__mid__sec");

                    cancelmsgtab.addEventListener("click", () => {
                        msgRev.classList.add("hidden");
                        msgmidsec.classList.remove("hidden");
                    })

                    msgTab.forEach(item => {
                        item.addEventListener("click", () => {
                            let numPeople = item.childNodes[1].childNodes[3].innerText;
                            let usr = item.childNodes[1].childNodes[1].innerText;
                            let total = item.childNodes[3].innerText;
                            let date = item.childNodes[5].innerText;
                            let phn = item.childNodes[7].innerText;
                            let mid = item.childNodes[9].innerText;
                            let bookInfo = item.childNodes[11].innerText;
                            let orgID = item.childNodes[13].innerText;
                            let usrID = item.childNodes[15].innerText;
                            let time = item.childNodes[17].innerText;

                            msgmidsec.classList.add("hidden");
                            msgRev.classList.remove("hidden");
                            tablePlace.innerText = usr;
                            if (bookInfo !== "undefined") {
                                msgRevbod.innerHTML =
                                    `
                                        <div class="oder__mesg">
                                        <p>Total number of People : </p>
                                        <p class="ordermsg">${numPeople}</p>
                                        <p>Date : </p>
                                        <p class="ordermsg">${date}</p>
                                        <p>Time : </p>
                                        <p class="ordermsg">${time}</p>
                                        <p>Phone No : </p>
                                        <p class="ordermsg">${phn}</p>
                                        <p class="rdorng hidden">Total Order Price : ${total}</p>
                                            <div class="grp__button hidden">
                                                <button class="confirmord ordbtn">Confirm</button>
                                                <button class="cancelord ordbtn">Cancel</button>
                                            </div>
                                            <p class="rdorng">${bookInfo}</p>
                                        </div>
                                    `
                            }
                            else {
                                msgRevbod.innerHTML =
                                    `
                                        <div class="oder__mesg">
                                            <p>Total number of People : </p>
                                            <p class="ordermsg">${numPeople}</p>
                                            <p>Date : </p>
                                            <p class="ordermsg">${date}</p>
                                            <p>Time : </p>
                                            <p class="ordermsg">${time}</p>
                                            <p>Phone No : </p>
                                            <p class="ordermsg">${phn}</p>
                                            <p class="rdorng hidden">Order Total : ${total} </p>
                                            <div class="grp__button">
                                                <button class="confirmord ordbtn">Confirm</button>
                                                <button class="cancelord ordbtn">Cancel</button>
                                            </div>
                                        </div>
                                    `
                            }
                            let confirmord = document.querySelector(".confirmord");
                            let cancelord = document.querySelector(".cancelord");
                            let grpbtn = document.querySelector(".grp__button");
                            const socket = io();

                            confirmord.addEventListener("click", (e) => {
                                e.preventDefault();
                                itemorderConfirmed(grpbtn, mid);
                                socket.emit("brobookingreply", orgID, usr, usrID);
                                menuMsgBod.innerHTML = "";
                                getAllCatMsg();
                            })

                            cancelord.addEventListener("click", (e) => {
                                e.preventDefault();
                                itemorderCanceled(grpbtn, mid);
                                socket.emit("brobookingreply", orgID, usr, usrID);
                                menuMsgBod.innerHTML = "";
                                getAllCatMsg();
                            })
                        })
                    })
                })
            } else {
                console.log(response);
                errorAlert("Fetching Data Failure!!!")

            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

async function itemorderConfirmed(val, usr) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/brochure/itemBookingById/${usr}`
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                bookingInfo: "confirmed"
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("You Accepted a Order :)");
                val.innerHTML = "";
                val.innerHTML = `<p class="grncf">Order Accepted</p>`
            }
            else if (response.status === 404) {
                errorAlert("Order Has been Deleted By Sender !!!")
            }
            else {
                console.log(response);
                errorAlert("Creation error, You Can't Have more than one banner!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

async function itemorderCanceled(val, usr) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/brochure/itemBookingById/${usr}`
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                bookingInfo: "canceled"
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("You cancelled a order :(");
                val.innerHTML = "";
                val.innerHTML = `<p class="grncf">Order Cancelled</p>`
            }
            else if (response.status === 404) {
                errorAlert("Order Has been Deleted By Sender !!!")
            }
            else {
                console.log(response);
                errorAlert("Creation error, You Can't Have more than one banner!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

