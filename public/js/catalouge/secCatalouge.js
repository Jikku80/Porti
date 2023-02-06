window.addEventListener("load", () => {
    let display = document.querySelector(".form__item__display__sec");
    let cartCard = document.querySelector(".cart__card");
    let fill = document.querySelector(".resorderfill");

    if (display.contains(cartCard)) {
        fill.classList.remove("hidden");
    }
    else {
        fill.classList.add("hidden");
    }
});

let bannerDiscount = document.querySelector(".bannerDisc").innerText;

let jar = [];

(function () {
    let editDummy = document.querySelector(".edit__sec__cat");
    let editFeat = document.querySelector(".edit__features__sec");
    let cancelDummy = document.querySelector(".cancel__edit__dummy");

    cancelDummy.addEventListener("click", () => {
        editFeat.classList.add('hidden');
        editDummy.classList.remove("hidden");
    })

    editDummy.addEventListener("click", () => {
        editFeat.classList.remove("hidden");
        editDummy.classList.add("hidden");
    })

    let detailbtn = document.querySelector(".resdetail");
    let cancelDetail = document.querySelector(".cancel__detail");
    let details = document.querySelector('.restro__info');
    let catalogeUserId = document.querySelector(".seccataluserid").innerText;

    let getAll = document.querySelector(".getAllSecCatItem");
    getAll.addEventListener("click", () => {
        location.reload();
    })

    cancelDetail.addEventListener("click", () => {
        details.classList.add("hidden");
    })

    detailbtn.addEventListener("click", async () => {
        details.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            let headColor = document.querySelector(".seccatHeadColor").innerText;
            let secHeadColor = document.querySelector(".seccatSecHeadColor").innerText;
            let menuItm = document.querySelector(".restro__info__bod");
            let midsec = document.querySelector(".catdeatilmidsec");
            let subItemModel = document.querySelector(".sec__sub__item__modal");

            subItemModel.classList.add("hidden");
            if (details.classList.contains("hidden")) {
                details.classList.remove("hidden");
            }
            if (midsec.classList.contains("hidden")) {
                midsec.classList.remove("hidden");
            }
            menuItm.innerHTML = "";

            const endpoint = `/api/v1/catalouge/allCatalougeCategories/${catalogeUserId}`
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
                        result.forEach(item => {
                            menuItm.innerHTML += `<h3 class="sec__cat__categories cateHead">${item}</h3>`
                        })

                        let catalougeItems = document.querySelectorAll(".sec__cat__categories");
                        catalougeItems.forEach(item => {
                            item.style.cursor = "pointer";
                            item.style.color = headColor;
                            item.addEventListener("mouseover", () => {
                                item.style.color = secHeadColor;
                            })
                            item.addEventListener("mouseout", () => {
                                item.style.color = headColor;
                            })
                            item.addEventListener("click", async (e) => {
                                e.preventDefault();
                                let cate = item.innerText;
                                try {
                                    let load = document.querySelector('.loader');
                                    load.classList.remove("hidden")
                                    let subItm = document.querySelector(".sec__cat__sub");
                                    subItm.innerHTML = "";
                                    location.hash = "#";
                                    midsec.classList.add("hidden");
                                    const endpoint = `/api/v1/catalouge/${catalogeUserId}/findsubcate/${cate}`
                                    let myHeaders = new Headers();
                                    let pagi = document.querySelector(".paginate");
                                    pagi.classList.add("hidden");
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
                                                result.forEach(item => {
                                                    if (typeof (item) !== "object") {
                                                        // subItemHeader.style.color = compColor;
                                                        subItemModel.classList.remove("hidden");
                                                        let subItemHeader = document.querySelector(".sec__sub__head__info");
                                                        subItemHeader.innerText = cate + " Sub Categories | SGroup"
                                                        subItm.innerHTML += `<h3 class="catalouge__subcate__list cateHead">${item}</h3>`
                                                    }
                                                    else {
                                                        let catalougeItems = document.querySelector(".sec__cat__items");
                                                        catalougeItems.innerHTML = "";
                                                        subItemModel.classList.add("hidden");
                                                        details.classList.add("hidden");
                                                        smallCardElem(item);
                                                        btnCard()
                                                        window.setTimeout(() => {
                                                            location.hash = "#secCatItems"
                                                        }, 200)
                                                    }
                                                })
                                                let cancelSub = document.querySelector(".cancel__sub");
                                                cancelSub.addEventListener("click", () => {
                                                    subItemModel.classList.add("hidden");
                                                    midsec.classList.remove("hidden");
                                                })
                                                let subCateList = document.querySelectorAll(".catalouge__subcate__list")
                                                subCateList.forEach(item => {
                                                    item.style.color = headColor;
                                                    item.addEventListener("mouseover", () => {
                                                        item.style.color = secHeadColor;
                                                    })
                                                    item.addEventListener("mouseout", () => {
                                                        item.style.color = headColor;
                                                    })
                                                    item.addEventListener("click", async (e) => {
                                                        e.preventDefault();
                                                        subItemModel.classList.add("hidden");
                                                        pagi.classList.add("hidden");
                                                        location.hash = "#";
                                                        details.classList.add("hidden");
                                                        let subcate = item.innerText;
                                                        try {
                                                            load.classList.remove("hidden");
                                                            let catalougeItems = document.querySelector(".sec__cat__items");
                                                            catalougeItems.innerHTML = "";
                                                            const endpoint = `/api/v1/catalouge/${catalogeUserId}/finditems/${subcate}/${cate}`
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
                                                                        result = result.items
                                                                        result.forEach(item => {
                                                                            smallCardElem(item);
                                                                        })
                                                                        btnCard()
                                                                        window.setTimeout(() => {
                                                                            location.hash = "#secCatItems"
                                                                        }, 200)
                                                                    })
                                                                }
                                                                else {
                                                                    console.log(response);
                                                                    errorAlert("Error")
                                                                }
                                                            })
                                                        }
                                                        catch (err) {
                                                            console.log(err);
                                                            errorAlert('Sorry! Something went wrong', err)
                                                        }
                                                    })
                                                })
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
                        })
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

    let resorder = document.querySelector(".resorder");
    let resordersec = document.querySelector(".resorder__info");
    let cancelorder = document.querySelector(".cancel__order");
    let resmsg = document.getElementById("comordermsg");
    let fill = document.querySelector(".resorderfill");

    resorder.addEventListener("click", () => {
        resordersec.classList.remove("hidden");
        fill.classList.add("hidden");
        resorder.classList.add("hidden");
        getUserCompMsg();
        let catalusrName = document.querySelector("#thiscurrentcompusrname").innerText;
        let curLogUserName = document.getElementById("uniquecompusername").innerText;
        let usrName = catalusrName + "-" + curLogUserName
        let products = usrName.toLowerCase();
        let productsName = usrName.toUpperCase();
        products = localStorage.getItem(productsName);
        if (products == null) {
            jar = []
        } else {
            jar = JSON.parse(products);
        }
        let updateitem = document.querySelectorAll(".updateQuan");
        updateitem.forEach(item => {
            item.addEventListener("click", () => {
                let uid = item.parentElement.childNodes[9].innerText;
                let coverImage = item.parentElement.childNodes[3].childNodes[1].src;
                let name = item.parentElement.childNodes[3].childNodes[3].innerText;
                let price = item.parentElement.childNodes[3].childNodes[5].innerText;
                let itemId = item.parentElement.childNodes[3].childNodes[7].innerText;
                let stockQ = item.parentElement.childNodes[3].childNodes[9].innerText;
                let quantity = item.parentElement.childNodes[7].value

                let newValue = ({ coverImage, name, price, quantity, uid, itemId, stockQ });
                jar.filter((el, i) => {
                    if (el.uid == uid) {
                        jar.splice(i, 1, newValue)
                        localStorage.setItem(productsName, JSON.stringify(jar));
                        successAlert("Quantity Updated!!!")
                    }
                })
            })
        })
        let cancelPd = document.querySelectorAll(".cancelCartProduct");
        cancelPd.forEach((item) => {
            item.addEventListener("click", () => {
                let curcard = item.parentElement;
                let curId = item.parentElement.childNodes[9].innerText;
                jar.filter((el, i) => {
                    if (el.uid == curId) {
                        curcard.remove();
                        jar.splice(i, 1)
                        localStorage.setItem(productsName, JSON.stringify(jar));
                        successAlert("Product has been removed")
                    }
                })
            })
        })
    })
    let display = document.querySelector(".form__item__display__sec");
    let cartCard = document.querySelector(".cart__card");

    if (display.contains(cartCard)) {
        fill.classList.remove("hidden");
    }
    else {
        fill.classList.add("hidden");
    }

    cancelorder.addEventListener("click", () => {
        resordersec.classList.add("hidden");
        resorder.classList.remove("hidden");
        if (display.contains(cartCard)) {
            fill.classList.remove("hidden");
        }
    })

    const socket = io();
    let sendOrderbtn = document.getElementById("sendcomorderreq");
    let userno = document.getElementById("userno")
    let compid = document.getElementById("uniquecompname");
    let orderuser = document.getElementById("uniquecompusername");
    let orderadd = document.getElementById("comordadd");
    let orderphn = document.getElementById("comordphn");
    let secalrt = document.getElementById("seccompmsgalert");
    let usrId = document.getElementById("uniquecompuserid").innerText;
    let homeDel;

    socket.on("catorderreply", (catid, oderuser, oderuserid) => {
        if (compid.value == catid) {
            if (usrId == oderuserid) {
                secalrt.play();
                fill.classList.remove("hidden");
                getUserCompMsg();
            }
        }
    });

    sendOrderbtn.addEventListener("click", async (e) => {
        e.preventDefault();
        resmsg.value = "";
        let displaySec = document.querySelector(".form__item__display__sec");
        let cartCard = document.querySelectorAll(".cart__card");
        let catalusrName = document.querySelector("#thiscurrentcompusrname").innerText;
        let curLogUserName = document.getElementById("uniquecompusername").innerText;
        let curLogUserId = document.getElementById("uniquecompuserid").innerText;
        let curComName = document.querySelector(".pageName").innerText;

        let usrName = catalusrName + "-" + curLogUserName
        let itemPriceList = [];
        let qList = [];

        if (displaySec !== null) {
            cartCard.forEach(item => {
                let quantity = item.childNodes[7].value
                let product = item.childNodes[3].childNodes[3].innerText
                let price = item.childNodes[3].childNodes[5].innerText
                let itemStock = item.childNodes[3].childNodes[9].innerText

                let msg = quantity + " " + product + ", ";
                resmsg.value += msg
                qList.push(quantity);
                perItemTotal = (quantity * 1) * (price * 1);
                itemPriceList.push(perItemTotal);
            })
        }

        if (qList.includes("")) {
            return false;
        }
        let sumTotal = itemPriceList.reduce((a, b) => a + b, 0);

        if (resmsg.value == "") {
            return false;
        }
        if (orderadd.value == "") {
            return false;
        }
        if (orderphn.value == "") {
            return false;
        }
        fill.classList.add("hidden");
        socket.emit("catorders", compid.value, orderuser.innerText);
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/message/orderItem`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    company: compid.value,
                    companyName: curComName,
                    message: resmsg.value,
                    name: orderuser.innerText,
                    userId: curLogUserId,
                    address: orderadd.value,
                    phn_no: orderphn.value,
                    total: sumTotal,
                    createdAt: Date.now()
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Order has been placed :)");
                    resmsg.value = "";
                    orderadd.value = "";
                    orderphn.value = "";
                    getUserCompMsg();
                    cartCard.forEach(item => {
                        item.remove();
                    })
                    let products = usrName.toLowerCase();
                    let productsName = usrName.toUpperCase();
                    products = localStorage.getItem(productsName);
                    if (products == null) {
                        jar = []
                    } else {
                        jar = JSON.parse(products);
                    }
                    jar.forEach(item => {
                        let newQuantity = (item.stockQ * 1) - (item.quantity * 1)
                        updateProductQuantity(item.itemId, newQuantity);
                    })
                    jar.splice(0);
                    localStorage.setItem(productsName, JSON.stringify(jar));
                    window.setTimeout(() => {
                        location.reload();
                    }, 2000)
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

    let goTOLoginSecMenu = document.getElementById("gotoLoginComp");

    goTOLoginSecMenu.addEventListener("click", () => {
        window.open(`/account/login`)
    })

    let cancelbanner = document.querySelector(".removebanner");

    let bansec = document.querySelector(".sec__menu__banner ");

    cancelbanner.addEventListener("click", () => {
        bansec.remove();
    })
})();

async function getUserCompMsg() {
    let resid = document.getElementById("thiscurrentcompid").innerText;
    let usr = document.getElementById("uniquecompusername").innerText;
    let hisOrder = document.querySelector(".foods__order__his");
    let socket = io();

    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        hisOrder.innerHTML = "";
        const endpoint = `/api/v1/message/${resid}/selectedUserOrders/${usr}`
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
                    let usrorders = item.usrcomorders
                    usrorders.forEach(el => {
                        let dt = el.createdAt
                        dt = dt.toLocaleString()
                        let newdate = dt.slice(0, 10)
                        if (el.orderInfo) {
                            hisOrder.innerHTML +=
                                `
                                        <div class="food__order__list homeone">
                                            <h3>${el.name}</h3>
                                            <p class="faded">Your Order : </p>
                                            <p>${el.message}</p>
                                            <p class="faded">Address : </p>
                                            <p>${el.address}</p>
                                            <p class="faded">Phone No : </p>
                                            <p>${el.phn_no}</p>
                                            <p class="faded">Total Amount : </p>
                                            <p>${el.total}</p>
                                            <p class="faded">Purchased Date : </p>
                                            <p>${newdate}</p>
                                            <p class="info">Your Order has been ${el.orderInfo}</p>
                                            <button class="hidden delreqbtn" id="${el._id}"></button>
                                        </div>
                                    `
                        }
                        else {
                            hisOrder.innerHTML +=
                                `
                                        <div class="food__order__list homeone">
                                            <h3>${el.name}</h3>
                                            <p class="faded">Your Order : </p>
                                            <p>${el.message}</p>
                                            <p class="faded">Address : </p>
                                            <p>${el.address}</p>
                                            <p class="faded">Phone No : </p>
                                            <p>${el.phn_no}</p>
                                            <p class="faded">Total Amount : </p>
                                            <p>${el.total}</p>
                                            <p class="faded">Purchased Date : </p>
                                            <p>${newdate}</p>
                                            <p class="faded wait">Waiting for Response...</p>
                                            <button class="seccatbtn delreqbtn" id="${el._id}">Delete</button>
                                        </div>
                                    `
                        }
                    })
                    let delBtn = document.querySelectorAll(".delreqbtn");

                    delBtn.forEach(item => {
                        item.addEventListener("click", async () => {
                            try {
                                let load = document.querySelector('.loader');
                                load.classList.remove("hidden")
                                const endpoint = `/api/v1/message/deleteComOrder/${item.id}`
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
                                        successAlert("Your order has ben deleted :(");
                                        getUserCompMsg();
                                        socket.emit("catorders", resid, usr);
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
                    })
                })
            }
            else if (response.status === 401) {
                errorAlert("You Are Not Logged In !!! Please Sign In To Order")
            }
            else {
                console.log(response);
                errorAlert("Fetching Data Failure!!!")

            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

(function () {
    let defaultBtn = document.getElementById("defaultsecCatTheme");
    let fontColor = "white";
    let headColor = "white";
    let secHead = "white";
    let focusColor = "rgb(122, 220, 233)";
    let backColor = "#2c2c2c";
    let fontFam = "Arial";
    let polygn = "crack";
    let covHeight = "70vh";
    let covWidth = "100vw";
    let id = document.getElementById('secCatid').innerText;

    defaultBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/${id}/updateCompany`
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
                    themecolor: backColor,
                    focusColor: focusColor,
                    fontFam: fontFam,
                    polygon: polygn,
                    covWidth: covWidth,
                    covHeight: covHeight
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Catalog Theme has been updated to default :)");
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
    let upPortTheme = document.getElementById("changesecCatTheme");
    let fontColor = document.getElementById("secCatFontColor");
    let headColor = document.getElementById("secCatHeadColor");
    let secHead = document.getElementById("secCatSecHeadColor");
    let focusColor = document.getElementById("secCatFocusColor");
    let backColor = document.getElementById("secCatBackColor");
    let fontFam = document.getElementById("secCatFontFam");
    let polygn = document.getElementById("secCatPolygon");
    let covHeight = document.getElementById("secCatCovHeight");
    let covWidth = document.getElementById("secCatCovWidth");
    let id = document.getElementById('secCatid').innerText;

    upPortTheme.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");

        const endpoint = `/api/v1/catalouge/${id}/updateCompany`
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
                    themecolor: backColor.value,
                    focusColor: focusColor.value,
                    fontFam: fontFam.value,
                    polygon: polygn.value,
                    covWidth: covWidth.value,
                    covHeight: covHeight.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Catalog Theme has been updated :)");
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
    let fontColor = document.querySelector(".seccatFontColor").innerText;
    let focusColor = document.querySelector(".seccatfocusColor").innerText;
    let headColor = document.querySelector(".seccatHeadColor").innerText;
    let secHeadColor = document.querySelector(".seccatSecHeadColor").innerText;
    let backColor = document.querySelector(".seccatThemeColor").innerText;
    let fontFam = document.querySelector(".seccatFontFam").innerText;
    let polygn = document.querySelector(".seccatPolygon").innerText;
    let covWidth = document.querySelector(".seccatCovWidth").innerText;
    let covHeight = document.querySelector(".seccatCovHeight").innerText;

    let head = document.querySelectorAll(".headFont");
    let ans = document.querySelectorAll(".ansFont");
    let sevbod = document.querySelector(".sec__cat");
    let namefont = document.querySelector(".namefont");
    let imgStyl = document.querySelector(".sec__cat__coverpic");
    let contactSec = document.querySelector(".contact__sec__catal__sec");
    let search = document.querySelector(".secSearchInput");
    let formFont = document.querySelectorAll(".formFont");
    let indisc = document.querySelector(".form__item__display__sec ");

    contactSec.style.backgroundColor = focusColor;

    search.style.color = fontColor;
    search.style.borderColor = fontColor;

    indisc.style.color = headColor

    formFont.forEach(item => {
        item.style.color = headColor;
    })

    sevbod.style.backgroundColor = backColor;
    sevbod.style.fontFamily = fontFam;

    head.forEach(item => {
        item.style.color = secHeadColor;
    })

    if (covWidth == "hundred") {
        imgStyl.style.width = "100vw";
    }
    if (covWidth == "seventy") {
        imgStyl.style.width = "70vw";
    }
    if (covWidth == "fifty") {
        imgStyl.style.width = "50vw";
    }
    if (covWidth == "thirty") {
        imgStyl.style.width = "30vw";
    }
    if (covWidth == "remove") {
        imgStyl.style.width = "0vw";
    }

    if (covHeight == "hundred") {
        imgStyl.style.height = "100vh";
    }
    if (covHeight == "seventy") {
        imgStyl.style.height = "70vh";
    }
    if (covHeight == "fifty") {
        imgStyl.style.height = "50vh";
    }
    if (covHeight == "thirty") {
        imgStyl.style.height = "30vh";
    }
    if (covHeight == "remove") {
        imgStyl.style.height = "0vh";
    }

    if (polygn == "full") {
        imgStyl.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
        imgStyl.style.webkitClipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
    }
    else if (polygn == "right") {
        imgStyl.style.clipPath = "polygon(0 0, 0% 100%, 100% 0)"
        imgStyl.style.webkitClipPath = "polygon(0 0, 0% 100%, 100% 0)"
    }
    else if (polygn == "parallel") {
        imgStyl.style.clipPath = "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)"
        imgStyl.style.webkitClipPath = "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)"
    }
    else if (polygn == "hexa") {
        imgStyl.style.clipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        imgStyl.style.webkitClipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
    }
    else {
        return;
    }
})();

function btnCard() {
    let fontColor = document.querySelector(".seccatFontColor").innerText;
    let focusColor = document.querySelector(".seccatfocusColor").innerText;
    let secCard = document.querySelectorAll(".sec__cat__item__card");
    let btn = document.querySelectorAll(".seccatbtn");

    secCard.forEach(item => {
        item.style.backgroundColor = focusColor;
        item.style.color = fontColor;
        item.style.border = `1px solid ${fontColor}`
    })

    btn.forEach(item => {
        item.style.color = fontColor;
        item.style.borderColor = fontColor;
        item.style.boxShadow = "none";
        item.style.textShadow = "none";

        item.addEventListener("mouseover", () => {
            item.style.color = focusColor;
            item.style.backgroundColor = fontColor;
        })

        item.addEventListener("mouseout", () => {
            item.style.color = fontColor;
            item.style.backgroundColor = "transparent";
        })
    })
}

btnCard();

function smallCardElem(el) {
    let catalougeItems = document.querySelector(".sec__cat__items");
    if (el.applydiscount === true) {
        if (el.coverImage) {
            if (el.stockQuantity === 0 || el.stockQuantity === null) {
                catalougeItems.innerHTML +=
                    `
                    <div class="sec__cat__item__card">
                        <img class="sec__cat__img" src="${el.coverImage}" alt="catalouge__item__image">
                        <div class="sec__cat__item__info">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.price}</h3>
                                <h3 class="itemDiscPercent">Discount : ${bannerDiscount}%</h3>
                                <h3 class="stock rdstock">Out Of Stock</h3>
                        </div>
                        <div class="sec__cat__btn__grp">
                            <button name=${el._id} class="seccatbtn addToCart" disabled>Add To Cart</button>
                            <button id="${el._id}" class="seccatbtn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
            else {
                catalougeItems.innerHTML +=
                    `
                    <div class="sec__cat__item__card">
                        <img class="sec__cat__img" src="${el.coverImage}" alt="catalouge__item__image">
                        <div class="sec__cat__item__info">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.price}</h3>
                                <h3 class="itemDiscPercent">Discount : ${bannerDiscount}%</h3>
                                <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                        </div>
                        <div class="sec__cat__btn__grp">
                            <button name=${el._id} class="seccatbtn addToCart">Add To Cart</button>
                            <button id="${el._id}" class="seccatbtn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
        }
        else {
            if (el.stockQuantity === 0 || el.stockQuantity === null) {
                catalougeItems.innerHTML +=
                    `
                <div class="sec__cat__item__card">
                    <img class="sec__cat__img" src="/images/noimg.png" alt="catalouge__item__image">
                    <div class="sec__cat__item__info">
                            <h3>Name : ${el.name}</h3>
                            <h3>Price : ${el.price}</h3>
                            <h3 class="itemDiscPercent">Discount : ${bannerDiscount}%</h3>
                            <h3 class="stock rdstock">Out Of Stock</h3>
                    </div>
                    <div class="sec__cat__btn__grp">
                        <button name=${el._id} class="seccatbtn addToCart" disabled>Add To Cart</button>
                        <button id="${el._id}" class="seccatbtn viewProduct viewProdCard">View</button>
                    </div>
                </div>
            `
            }
            else {
                catalougeItems.innerHTML +=
                    `
                    <div class="sec__cat__item__card">
                        <img class="sec__cat__img" src="/images/noimg.png" alt="catalouge__item__image">
                        <div class="sec__cat__item__info">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.price}</h3>
                                <h3 class="itemDiscPercent">Discount : ${bannerDiscount}%</h3>
                                <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                        </div>
                        <div class="sec__cat__btn__grp">
                            <button name=${el._id} class="seccatbtn addToCart">Add To Cart</button>
                            <button id="${el._id}" class="seccatbtn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
        }
    } else {
        if (el.coverImage) {
            if (el.stockQuantity === 0 || el.stockQuantity === null) {
                catalougeItems.innerHTML +=
                    `
                <div class="sec__cat__item__card">
                    <img class="sec__cat__img" src="${el.coverImage}" alt="catalouge__item__image">
                    <div class="sec__cat__item__info">
                            <h3>Name : ${el.name}</h3>
                            <h3>Price : ${el.price}</h3>
                            <h3 class="stock rdstock">Out Of Stock</h3>
                    </div>
                    <div class="sec__cat__btn__grp">
                        <button name=${el._id} class="seccatbtn addToCart" disabled>Add To Cart</button>
                        <button id="${el._id}" class="seccatbtn viewProduct viewProdCard">View</button>
                    </div>
                </div>
            `
            } else {
                catalougeItems.innerHTML +=
                    `
                    <div class="sec__cat__item__card">
                        <img class="sec__cat__img" src="${el.coverImage}" alt="catalouge__item__image">
                        <div class="sec__cat__item__info">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.price}</h3>
                                <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                        </div>
                        <div class="sec__cat__btn__grp">
                            <button name=${el._id} class="seccatbtn addToCart">Add To Cart</button>
                            <button id="${el._id}" class="seccatbtn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
        }
        else {
            if (el.stockQuantity === 0 || el.stockQuantity === null) {
                catalougeItems.innerHTML +=
                    `
                <div class="sec__cat__item__card">
                    <img class="sec__cat__img" src="/images/noimg.png" alt="catalouge__item__image">
                    <div class="sec__cat__item__info">
                            <h3>Name : ${el.name}</h3>
                            <h3>Price : ${el.price}</h3>
                            <h3 class="stock rdstock">Out Of Stock</h3>
                    </div>
                    <div class="sec__cat__btn__grp">
                        <button name=${el._id} class="seccatbtn addToCart" disabled>Add To Cart</button>
                        <button id="${el._id}" class="seccatbtn viewProduct viewProdCard">View</button>
                    </div>
                </div>
            `
            } else {
                catalougeItems.innerHTML +=
                    `
                    <div class="sec__cat__item__card">
                        <img class="sec__cat__img" src="/images/noimg.png" alt="catalouge__item__image">
                        <div class="sec__cat__item__info">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.price}</h3>
                                <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                        </div>
                        <div class="sec__cat__btn__grp">
                            <button name=${el._id} class="seccatbtn addToCart">Add To Cart</button>
                            <button id="${el._id}" class="seccatbtn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
        }
    }

    let viewProd = document.querySelectorAll(".viewProdCard");

    viewProd.forEach(item => {
        item.addEventListener("click", async () => {

            openProdMid(item)

            getComments(el._id)
        })
    })
    let addTo = document.querySelectorAll(".addToCart");
    addTo.forEach(item => {
        item.addEventListener("click", () => {
            addPiece(item)
        })
    })
};

(function () {
    let subItems = document.querySelector(".sec__cat__items")
    let next = document.querySelector(".next__seccatal");

    if (subItems.children.length == 0) {
        subItems.innerHTML = `<h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
    }

    if (subItems.children.length === 12) {
        next.classList.remove("hidden");
    } else {
        next.classList.add("hidden");
    }
})();


(function () {
    let next = document.querySelector(".next__seccatal");
    let prev = document.querySelector(".prev__seccatal");
    let catalogeUserId = document.querySelector(".seccataluserid").innerText;

    let x = 1;

    if (x == 1) {
        prev.classList.add("hidden")
    }

    next.addEventListener("click", async () => {
        let pg = ++x
        prev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            location.hash = "#"
            let subItems = document.querySelector(".sec__cat__items")
            subItems.innerHTML = "";
            const endpoint = `/api/v1/catalouge/${catalogeUserId}/paginate/${pg}`
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
                            smallCardElem(el);
                        });
                        if (subItems.children.length === 12) {
                            next.classList.remove("hidden");
                        } else {
                            next.classList.add("hidden");
                        }
                        if (subItems.innerHTML == "") {
                            next.classList.add("hidden");
                            subItems.innerHTML = `<h3 class="go__back center">Oops!! Thats All You've Added So Far :)</h3>`
                        }
                        btnCard()
                        window.setTimeout(() => {
                            location.hash = "#secCatItems"
                        }, 200)
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
            location.hash = "#"
            load.classList.remove("hidden")
            if (x == 1) {
                prev.classList.add("hidden")
            }
            next.classList.remove("hidden");
            let subItems = document.querySelector(".sec__cat__items")
            subItems.innerHTML = "";
            const endpoint = `/api/v1/catalouge/${catalogeUserId}/paginate/${pg}`
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
                            smallCardElem(el)
                        });
                        btnCard()
                        window.setTimeout(() => {
                            location.hash = "#secCatItems"
                        }, 200)
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

function openProductDetail() {
    let viewProduct = document.querySelectorAll(".viewProduct");
    viewProduct.forEach(item => {
        item.addEventListener("click", async () => {

            openProdMid(item)

            getComments(item.id)

        })
    })
};

cmt()
function cmt() {
    let addcmt = document.getElementById("createComment");

    addcmt.addEventListener("click", (e) => {
        e.preventDefault();
        let parent = addcmt.parentElement.parentElement.parentElement;
        let id = parent.childNodes[1].childNodes[1].childNodes[9].name;
        createComment(id)
    })
}

async function openProdMid(item) {
    let cancelProduct = document.querySelector(".cancelProduct");
    let productModal = document.querySelector(".productModal");
    let headColor = document.querySelector(".seccatHeadColor").innerText;
    let secHeadColor = document.querySelector(".seccatSecHeadColor").innerText;

    try {
        let productHead = document.querySelector(".productHead");
        let productId = item.id;
        productModal.classList.remove("hidden");
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let productbod = document.querySelector(".product__bod");
        const endpoint = `/api/v1/catalouge/${productId}/getItem`
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
                    let item = result.data.data
                    let disper = bannerDiscount / 100
                    let newp = item.price * disper;
                    let newprice = item.price - newp;
                    productHead.innerHTML = `<h2>${item.name}</h2>`
                    productbod.innerHTML =
                        `
                            <div class="product__bod__info">
                                <img class="product__card__img" src="/images/noimg.png" alt="catalouge__item__image">
                                <div class="product__card__det">
                                    <h3 class="product__card__head">${item.name}</h3>
                                    <p class="product__card__price">Serial No : ${item.serialno}</p>
                                    <p class="product__card__price">Price : ${item.currency} ${item.price}</p>
                                    <p class="productDiscount hidden">Discount : ${bannerDiscount}%</p>
                                    <p class="afterDiscPrice hidden">After Discount Price : ${newprice}</p>
                                    <p class="product__card__cat productCategory">Category : ${item.category}</p>
                                    <p class="product__card__cat">Sub-Category : ${item.subcategory}</p>
                                    <p class="product__card__cat instock">Stock Quantity : ${item.stockQuantity}</p>
                                    <p class="product__card__cat hidden outofStock rdstock">Item is Out of Stock</p>
                                    <pre class="product__card__detail">${item.detail}</pre>
                                </div>
                                <label>Quantity : </label>
                                <input class="quantityInpt" type="number" placeholder="1" required/>
                                <button name=${item._id} class="seccatbtn addToCart viewAdd">Add To Cart</button>
                            </div>
                            `
                    if (item.coverImage) {
                        let catalimgcard = document.querySelector(".product__card__img");
                        catalimgcard.src = item.coverImage;
                    }
                    if (item.applydiscount === true) {
                        let productDisc = document.querySelector(".productDiscount");
                        let afterDiscPrice = document.querySelector(".afterDiscPrice");
                        productDisc.classList.remove("hidden");
                        afterDiscPrice.classList.remove("hidden");
                    }
                    let instock = document.querySelector(".instock");

                    if (item.stockQuantity == undefined) {
                        instock.innerText = "Stock Quantity Not Specified"
                    }
                    if (item.stockQuantity === 0 || item.stockQuantity === null) {
                        let outofStock = document.querySelector(".outofStock");
                        instock.classList.add("hidden");
                        outofStock.classList.remove("hidden");
                        let viewadd = document.querySelector(".viewAdd");
                        viewadd.classList.add("hidden");
                    }
                    let prodInfoBod = document.querySelector(".product__bod__info");
                    prodInfoBod.style.color = headColor;

                    similarItems(item.category, item._id)

                    let addCart = document.querySelectorAll(".viewAdd");
                    let quant = document.querySelector(".quantityInpt");
                    quant.style.borderColor = headColor;
                    addCart.forEach(item => {
                        item.style.color = headColor;
                        item.style.borderColor = headColor;
                        item.addEventListener("mouseover", () => {
                            item.style.color = secHeadColor;
                            item.style.backgroundColor = headColor;
                        })
                        item.addEventListener("mouseout", () => {
                            item.style.color = headColor;
                            item.style.backgroundColor = "transparent"
                        })
                        item.addEventListener("click", () => {
                            if (quant.value == null || quant.value == "") {
                                return false;
                            }
                            addPiece(item)
                        })
                    })
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

    cancelProduct.addEventListener("click", () => {
        productModal.classList.add("hidden");
    })
}

openProductDetail();


function addItemToCart() {
    let addItemBtn = document.querySelectorAll(".addToCart");
    addItemBtn.forEach(item => {
        item.addEventListener("click", () => {
            addPiece(item)
        })
    })
}

addItemToCart()

async function addPiece(val) {
    let itemDisplaySec = document.querySelector(".form__item__display__sec");
    let catalusrName = document.querySelector("#thiscurrentcompusrname").innerText;
    let curLogUserName = document.getElementById("uniquecompusername").innerText;
    let usrName = catalusrName + "-" + curLogUserName
    let quanty = document.querySelector(".quantityInpt")
    let qt;
    let productId = val.name;
    let fill = document.querySelector(".resorderfill");
    itemDisplaySec.innerHTML = "";
    if (fill.classList.contains("hidden")) {
        fill.classList.remove("hidden");
    }
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");

        if (quanty == null || quanty.value == "") {
            qt = 1;
        }
        else {
            qt = quanty.value;
        }
        const endpoint = `/api/v1/catalouge/${productId}/getItem`
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
                    let item = result.data.data
                    let products = usrName.toLowerCase();
                    let productsName = usrName.toUpperCase();
                    products = localStorage.getItem(productsName);
                    if (products == null) {
                        jar = []
                    } else {
                        jar = JSON.parse(products);
                    }
                    let coverImage = item.coverImage
                    let name = item.name
                    let itemId = item._id;
                    let stockQ = item.stockQuantity
                    let price;
                    if (item.applydiscount === true) {
                        let disper = bannerDiscount / 100
                        let newp = item.price * disper;
                        price = item.price - newp;
                    } else {
                        price = item.price
                    }
                    let quantity = qt
                    let current = new Date();
                    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
                    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
                    let uq = cDate + "|" + cTime;
                    let uid = name + uq;
                    jar.push({ coverImage, name, price, quantity, uid, itemId, stockQ });
                    localStorage.setItem(productsName, JSON.stringify(jar))
                    jar.forEach(item => {

                        itemDisplaySec.innerHTML +=
                            `  
                                                <div class="cart__card">
                                                    <img class="cancelCartProduct point" src="/images/cancel.png" alt="cancel__btn"/>
                                                    <div class="cart__card__item">
                                                        <img src="/images/noimg.png" class="cart__card__img"/>
                                                        <p class="cart__product__name">${item.name}</p>
                                                        <p class="hidden cart__product__price">${item.price}</p>
                                                        <p class="hidden cart__product__id">${item.itemId}</p>
                                                        <p class="hidden">${item.stockQ}</p>
                                                    </div>
                                                    <label>Quantity : </label>
                                                    <input type="number" value="${item.quantity}" class="cartItemQuantity cart__product__quantity" required />
                                                    <p class="hidden uniqueItemId">${item.uid}</p>
                                                    <button class="seccatbtn updateQuan">Update</button>
                                                </div>
                                            `
                        if (item.coverImage) {
                            let catalimgcard = document.querySelector(".cart__card__img");
                            catalimgcard.src = item.coverImage;
                        }
                    })
                    successAlert(`${item.name} has been added to cart :)`)
                    if (quanty !== null) {
                        quanty.value = "";
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
}

showItems();

function showItems() {
    let itemDSec = document.querySelector(".form__item__display__sec")
    let catalusrName = document.querySelector("#thiscurrentcompusrname").innerText;
    let curLogUserName = document.getElementById("uniquecompusername").innerText;
    let usrName = catalusrName + "-" + curLogUserName
    let products = usrName.toLowerCase();
    let productsName = usrName.toUpperCase();

    products = localStorage.getItem(productsName);
    if (products == null) {
        jar = []
    } else {
        jar = JSON.parse(products);
    }

    jar.forEach((item) => {

        itemDSec.innerHTML +=
            `  
                                    <div class="cart__card">
                                        <img class="cancelCartProduct point" src="/images/cancel.png" alt="cancel__btn"/>
                                        <div class="cart__card__item">
                                            <img src="/images/noimg.png" class="cart__card__img"/>
                                            <p class="cart__product__name">${item.name}</p>
                                            <p class="hidden cart__product__price">${item.price}</p>
                                            <p class="hidden cart__product__id">${item.itemId}</p>
                                            <p class="hidden">${item.stockQ}</p>
                                        </div>
                                        <label>Quantity : </label>
                                        <input type="number" value="${item.quantity}" class="cartItemQuantity cart__product__quantity" required />
                                        <p class="hidden uniqueItemId">${item.uid}</p>
                                        <button class="seccatbtn updateQuan">Update</button>
                                    </div>
                                `
        if (item.coverImage) {
            let catalimgcard = document.querySelector(".cart__card__img");
            catalimgcard.src = item.coverImage;
        }
    })
}

let searchBar = document.querySelector(".secSearchInput");

searchBar.addEventListener("keypress", async (e) => {
    if (searchBar.value < 1 || searchBar.value == "" || searchBar.value == null) {
        return false;
    }
    if (e.key == "Enter" || e.key == "Search") {
        let searchValue = searchBar.value;
        let searchLowNam = searchValue.toLowerCase();
        let subItems = document.querySelector(".sec__cat__items");
        let catalogeUserId = document.querySelector(".seccataluserid").innerText;
        let pagi = document.querySelector(".paginate");
        pagi.classList.add("hidden");
        try {
            e.preventDefault();
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            subItems.innerHTML = "";
            const endpoint = `/api/v1/catalouge/${catalogeUserId}/searchCatalouge/${searchLowNam}`
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
                            smallCardElem(el);
                        });
                        btnCard()
                        window.setTimeout(() => {
                            location.hash = "#secCatItems"
                        }, 200)
                        if (subItems.children.length == 0) {
                            subItems.innerHTML = `<h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
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
        searchBar.value = "";
    }
});

async function similarItems(category, itemId) {

    let userId = document.querySelector(".seccataluserid").innerText;
    try {
        let similarSec = document.querySelector(".similar__bod");
        similarSec.innerHTML = "";
        const endpoint = `/api/v1/catalouge/${userId}/similar/${category}/item/${itemId}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            let res = response.json();
            if (response.status === 200) {
                res.then(item => {
                    item.forEach(el => {
                        if (el.applydiscount === true) {
                            if (el.coverImage) {
                                if (el.stockQuantity === 0 || el.stockQuantity === null) {
                                    similarSec.innerHTML +=
                                        `
                                        <div class="sec__cat__item__card similarcard">
                                            <img class="sec__cat__img simimg" src="${el.coverImage}" alt="catalouge__item__image">
                                            <div class="sec__cat__item__info">
                                                    <h3>Name : ${el.name}</h3>
                                                    <h3>Price : ${el.price}</h3>
                                                    <h3>Discount : ${bannerDiscount}%</h3>
                                                    <h3 class="stock rdstock">Out Of Stock</h3>
                                            </div>
                                            <div class="sec__cat__btn__grp">
                                                <button name=${el._id} class="seccatbtn addToCart simiAdd" disabled>Add To Cart</button>
                                                <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                            </div>
                                        </div>
                                    `
                                }
                                else {
                                    similarSec.innerHTML +=
                                        `
                                            <div class="sec__cat__item__card similarcard">
                                                <img class="sec__cat__img simimg" src="${el.coverImage}" alt="catalouge__item__image">
                                                <div class="sec__cat__item__info">
                                                        <h3>Name : ${el.name}</h3>
                                                        <h3>Price : ${el.price}</h3>
                                                        <h3>Discount : ${bannerDiscount}%</h3>
                                                        <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                                                </div>
                                                <div class="sec__cat__btn__grp">
                                                    <button name=${el._id} class="seccatbtn addToCart simiAdd">Add To Cart</button>
                                                    <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                                </div>
                                            </div>
                                        `
                                }
                            }
                            else {
                                if (el.stockQuantity === 0 || el.stockQuantity === null) {
                                    similarSec.innerHTML +=
                                        `
                                        <div class="sec__cat__item__card similarcard">
                                            <img class="sec__cat__img simimg" src="/images/noimg.png" alt="catalouge__item__image">
                                            <div class="sec__cat__item__info">
                                                    <h3>Name : ${el.name}</h3>
                                                    <h3>Price : ${el.price}</h3>
                                                    <h3>Discount : ${bannerDiscount}%</h3>
                                                    <h3 class="stock rdstock">Out Of Stock</h3>
                                            </div>
                                            <div class="sec__cat__btn__grp">
                                                <button name=${el._id} class="seccatbtn addToCart simiAdd" disabled>Add To Cart</button>
                                                <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                            </div>
                                        </div>
                                    `
                                } else {
                                    similarSec.innerHTML +=
                                        `
                                            <div class="sec__cat__item__card similarcard">
                                                <img class="sec__cat__img simimg" src="/images/noimg.png" alt="catalouge__item__image">
                                                <div class="sec__cat__item__info">
                                                        <h3>Name : ${el.name}</h3>
                                                        <h3>Price : ${el.price}</h3>
                                                        <h3>Discount : ${bannerDiscount}%</h3>
                                                        <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                                                </div>
                                                <div class="sec__cat__btn__grp">
                                                    <button name=${el._id} class="seccatbtn addToCart simiAdd">Add To Cart</button>
                                                    <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                                </div>
                                            </div>
                                        `
                                }
                            }
                        } else {
                            if (el.coverImage) {
                                if (el.stockQuantity === 0 || el.stockQuantity === null) {
                                    similarSec.innerHTML +=
                                        `
                                        <div class="sec__cat__item__card similarcard">
                                            <img class="sec__cat__img simimg" src="${el.coverImage}" alt="catalouge__item__image">
                                            <div class="sec__cat__item__info">
                                                    <h3>Name : ${el.name}</h3>
                                                    <h3>Price : ${el.price}</h3>
                                                    <h3 class="stock rdstock">Out Of Stock</h3>
                                            </div>
                                            <div class="sec__cat__btn__grp">
                                                <button name=${el._id} class="seccatbtn addToCart simiAdd" disabled>Add To Cart</button>
                                                <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                            </div>
                                        </div>
                                    `
                                } else {
                                    similarSec.innerHTML +=
                                        `
                                            <div class="sec__cat__item__card similarcard">
                                                <img class="sec__cat__img simimg" src="${el.coverImage}" alt="catalouge__item__image">
                                                <div class="sec__cat__item__info">
                                                        <h3>Name : ${el.name}</h3>
                                                        <h3>Price : ${el.price}</h3>
                                                        <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                                                </div>
                                                <div class="sec__cat__btn__grp">
                                                    <button name=${el._id} class="seccatbtn addToCart simiAdd">Add To Cart</button>
                                                    <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                                </div>
                                            </div>
                                        `
                                }
                            }
                            else {
                                if (el.stockQuantity === 0 || el.stockQuantity === null) {
                                    similarSec.innerHTML +=
                                        `
                                        <div class="sec__cat__item__card similarcard">
                                            <img class="sec__cat__img simimg" src="/images/noimg.png" alt="catalouge__item__image">
                                            <div class="sec__cat__item__info">
                                                    <h3>Name : ${el.name}</h3>
                                                    <h3>Price : ${el.price}</h3>
                                                    <h3 class="stock rdstock">Out Of Stock</h3>
                                            </div>
                                            <div class="sec__cat__btn__grp">
                                                <button name=${el._id} class="seccatbtn addToCart simiAdd" disabled>Add To Cart</button>
                                                <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                            </div>
                                        </div>
                                    `
                                } else {
                                    similarSec.innerHTML +=
                                        `
                                            <div class="sec__cat__item__card similarcard">
                                                <img class="sec__cat__img simimg" src="/images/noimg.png" alt="catalouge__item__image">
                                                <div class="sec__cat__item__info">
                                                        <h3>Name : ${el.name}</h3>
                                                        <h3>Price : ${el.price}</h3>
                                                        <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                                                </div>
                                                <div class="sec__cat__btn__grp">
                                                    <button name=${el._id} class="seccatbtn addToCart simiAdd">Add To Cart</button>
                                                    <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                                </div>
                                            </div>
                                        `
                                }
                            }
                        }
                    })
                    btnCard()
                    let addCart = document.querySelectorAll(".simiAdd");
                    addCart.forEach(item => {
                        item.addEventListener("click", () => {
                            addPiece(item)
                        })
                    })
                    let viewProd = document.querySelectorAll(".simiView");

                    viewProd.forEach(item => {
                        item.addEventListener("click", async () => {
                            location.hash = "#"
                            openProdMid(item)
                            window.setTimeout(() => {
                                location.hash = "#prodBod"
                            }, 200)
                        })
                    })
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
};

async function createComment(productId) {
    let user = document.getElementById("uniquecompusername").innerText;
    let company = document.getElementById("thiscurrentcompuserid").innerText;
    let comment = document.getElementById("newComment");
    let usrId = document.getElementById("uniquecompuserid").innerText;

    if (comment.value == "") {
        return false;
    }
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/newcomment`
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: user,
                userId: usrId,
                companyUserId: company,
                productId: productId,
                comment: comment.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 201) {
                getComments(productId);
                successAlert("Your Comment Has Been Added !!!")
                comment.value = "";
            } else {
                console.log(response);
                errorAlert("Error Adding Comment Try Again")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

async function getComments(productId) {
    let user = document.getElementById("uniquecompusername").innerText;
    let curuser = document.querySelector(".thisuserid").innerText;
    let usrId = document.getElementById("uniquecompuserid").innerText;
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        let commentSec = document.querySelector(".all__comment__sec");
        commentSec.innerHTML = "";
        const endpoint = `/api/v1/catalouge/comments/${productId}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            load.classList.add("hidden");

            if (response.status === 200) {
                res = response.json();
                res.then(items => {
                    let item = items.comments
                    item.forEach(el => {
                        if (el.userId === usrId || el.companyUserId === curuser) {
                            commentSec.innerHTML += `
                                <div class="comment__card">
                                <div class="comment__head">
                                <h4>${el.name}</h4>
                                <button class="deleteCommentbtn seccatbtn" id=${el._id}>Delete</button>
                                </div>
                                <p>${el.comment}</p>
                                </div>
                            `
                        }
                        else {
                            commentSec.innerHTML += `
                                <div class="comment__card">
                                <h4>${el.name}</h4>
                                <p>${el.comment}</p>
                                <button class="deleteCommentbtn hidden"></button>
                                </div>
                            `
                        }
                    })

                    if (item.length == 0) {
                        commentSec.innerHTML += `
                                <h4>No Comments Yet!!!</h4>
                            `
                    }
                    let delCmt = document.querySelectorAll(".deleteCommentbtn");
                    delCmt.forEach(item => {
                        item.addEventListener("click", () => {
                            deleteComment(item.id, productId)
                        })
                    })
                })
            }
            else {
                console.log(response);
                errorAlert("Error Fetching Data")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

async function deleteComment(id, productId) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/delcomments/${id}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify({
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                getComments(productId);
                successAlert("Comment Has Been Deleted !!!")
            } else {
                console.log(response);
                errorAlert("Error Adding Comment Try Again")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

async function updateProductQuantity(id, quantity) {
    try {
        const endpoint = `/api/v1/catalouge/${id}/updateItemDetail`
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                stockQuantity: quantity
            })
        }).then((response) => {
            if (response.status === 200) {
            } else {
                console.log(response);
                errorAlert("Error Updating Item error!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

(function () {
    let usr = document.getElementById("returnuser");
    let usrId = document.getElementById("returnuserid").innerText;
    let restroId = document.getElementById("returncompid").innerText;
    let date = document.getElementById("returndate");
    let returnmsg = document.getElementById("returnmsg");
    let phn = document.getElementById("returnphn");
    let returnname = document.getElementById("returnname");
    let reservebtn = document.getElementById("returnreq");
    let curComName = document.querySelector(".pageName").innerText;
    let socket = io();

    let reserveDummybtn = document.querySelector(".return__btn");
    let cancelbtn = document.querySelector(".returncancel");
    let reserveformsec = document.querySelector(".return__sec");
    let resfill = document.querySelector(".return__fill");
    let secalrt = document.getElementById('seccompmsgalert');

    reserveDummybtn.addEventListener("click", () => {
        reserveformsec.classList.remove("hidden");
        getReservation();
    })

    cancelbtn.addEventListener("click", () => {
        reserveformsec.classList.add("hidden")
    })

    socket.on("returnreply", (restoID, userID) => {
        if (restroId === restoID) {
            if (usrId === userID) {
                resfill.classList.remove("hidden")
                secalrt.play();
                getReservation();
            }
        }
    })


    reservebtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (usr.value == "") {
            return false;
        }

        if (returnname.value == "") {
            return false;
        }

        if (phn.value == "") {
            return false;
        }

        if (date.value == "") {
            return false;
        }

        if (returnmsg.value == "") {
            return false
        }

        socket.emit("return", restroId, usrId)
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/return`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    company: restroId,
                    companyName: curComName,
                    name: usr.value,
                    message: returnmsg.value,
                    date: date.value,
                    product: returnname.value,
                    phn_no: phn.value,
                    userId: usrId,
                    createdAt: Date.now()
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Product Return Requested :)");
                    getReservation();
                    date.value = "";
                    returnmsg.value = "";
                    returnname.value = "";
                    phn.value = "";
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

async function getReservation() {
    let usrId = document.getElementById("returnuserid").innerText;
    let restroId = document.getElementById("returncompid").innerText;
    let reserveCont = document.querySelector(".returns");
    reserveCont.innerHTML = "";
    try {
        const endpoint = `/api/v1/catalouge/get/${restroId}/return/${usrId}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                let res = response.json();
                res.then(items => {
                    let item = items.resreserve;
                    item.forEach(el => {

                        if (el.returnInfo) {
                            reserveCont.innerHTML +=
                                `
                                        <div class="food__order__list homeone">
                                            <h3>${el.name}</h3>
                                            <p class="faded">Product  : </p>
                                            <p>${el.product}</p>
                                            <p class="faded">Purchased Date : </p>
                                            <p>${el.date}</p>
                                            <p class="faded">Message : </p>
                                            <p>${el.message}</p>
                                            <p class="faded">Phone No : </p>
                                            <p>${el.phn_no}</p>
                                            <p class="info">Your Return Request has been ${el.returnInfo}</p>
                                            <button class="hidden delreturnbtn"></button>
                                        </div>
                                    `
                        }
                        else {
                            reserveCont.innerHTML +=
                                `
                                        <div class="food__order__list homeone">
                                            <h3>${el.name}</h3>
                                            <p class="faded">Product  : </p>
                                            <p>${el.product}</p>
                                            <p class="faded">Purchased Date : </p>
                                            <p>${el.date}</p>
                                            <p class="faded">Message : </p>
                                            <p>${el.message}</p>
                                            <p class="faded">Phone No : </p>
                                            <p>${el.phn_no}</p>
                                            <p class="faded wait">Waiting for Response...</p>
                                            <button class="seccatbtn delreturnbtn" id="${el._id}">Cancel</button>
                                        </div>
                                    `
                        }
                        let delReserve = document.querySelectorAll(".delreturnbtn");
                        delReserve.forEach(item => {
                            item.addEventListener("click", () => {
                                deleteReservation(item.id);
                            })
                        })
                    })
                })
            }
            else if (response.status === 401) {
                errorAlert("Log In To Make Reservation!!!")
            }
            else {
                console.log(response);
                errorAlert("Reservation Fetching Error!!!")

            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

async function deleteReservation(id) {
    let usrId = document.getElementById("returnuserid").innerText;
    let restroId = document.getElementById("returncompid").innerText;
    let socket = io();
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/delreturn/${id}`
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
                successAlert("Return Canceled :)");
                socket.emit("return", restroId, usrId)
                getReservation();

            } else {
                console.log(response);
                errorAlert("Error Deleting Reservation!!!")

            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

(function () {
    let log = document.querySelector(".acclog");

    log.addEventListener("click", () => {
        window.open("/account/login")
    })
})();

window.addEventListener("load", async () => {
    let pgCount = document.querySelector(".pageCount");
    let orgId = document.querySelector("#thiscurrentcompid").innerText;
    let orgUsrId = document.querySelector(".portiuserid").innerText;
    let usrId = document.querySelector(".curloguser").innerText;
    if (pgCount.innerText === "") {
        pgCount.innerText = 0;
    }
    if (orgUsrId !== "" && usrId !== "") {
        if (orgUsrId !== usrId) {
            let newCount = (pgCount.innerText * 1) + 1;
            try {
                let load = document.querySelector('.loader');
                load.classList.remove("hidden")
                const endpoint = `/api/v1/catalouge/${orgId}/updateCompanyPg`
                await fetch(endpoint, {
                    method: 'PATCH',
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        pageCount: newCount
                    })
                }).then((response) => {
                    load.classList.add("hidden");
                    if (response.status === 200) {
                    } else {
                        console.log(response);
                        errorAlert("Error Pg!!!")
                    }
                })
            }
            catch (err) {
                console.log(err);
                errorAlert('Sorry! Something went wrong', err);
            };
        }
    }
    else {
        let newCount = (pgCount.innerText * 1) + 1;
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/${orgId}/updateCompanyPg`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    pageCount: newCount
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                } else {
                    console.log(response);
                    errorAlert("Error Pg!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    }
})