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

(function () {
    let viewall = document.querySelector(".viewallcate");
    let allcates = document.querySelector(".sec__menu__viewall");
    let cancel = document.querySelector('.cancel__Cat');
    let prevCates = document.querySelector(".sec__menu__cate");
    let catnames = document.querySelectorAll(".sec__menu__cate__names");
    let usrid = document.querySelector(".sec__menu__usr__id").innerText;

    let allfood = document.querySelector(".sec__menu__allfood__bod");
    let allfoodSec = document.querySelector(".sec__menu__allfood");
    let allfoodhead = document.querySelector(".sec__menu__allfood__head");

    cancel.addEventListener("click", () => {
        allcates.classList.add("hidden");
        prevCates.classList.remove("hidden");
        viewall.classList.remove('hidden');
    })

    viewall.addEventListener("click", () => {
        allcates.classList.remove("hidden");
        prevCates.classList.add("hidden");
    })

    catnames.forEach(items => {
        items.addEventListener("click", async () => {
            cate = items.innerText;
            try {
                let load = document.querySelector('.loader');
                load.classList.remove("hidden");
                viewall.classList.add("hidden");
                prevCates.classList.add("hidden");
                allcates.classList.add("hidden");
                allfoodhead.innerHTML = "";
                allfood.innerHTML = "";
                const endpoint = `/api/v1/menu/${usrid}/findbycate/${cate}`
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
                        allfoodSec.classList.remove("hidden");
                        allfoodhead.innerHTML += `
                                                    <p>${cate}</p>
                                                    <img class="cancel__allfood" src="/images/cancel.png" alt="cancel__btn" />
                        `
                        let cancelAllfood = document.querySelector(".cancel__allfood");

                        cancelAllfood.addEventListener("click", () => {
                            allfoodSec.classList.add("hidden");
                            allcates.classList.remove("hidden");
                            if (!prevCates.classList.contains("hidden")) {
                                prevCates.classList.remove("hidden");
                            }
                            if (!viewall.classList.contains("hidden")) {
                                viewall.classList.remove('hidden');
                            }
                        })
                        res.then(result => {
                            let item = result.data
                            item.forEach(el => {
                                allfood.innerHTML +=
                                    `
                                        <p class="sec__menu__food__names point">${el.name}</p>
                                    `
                            });
                            let foodItems = document.querySelectorAll(".sec__menu__food__names");
                            foodItems.forEach(item => {
                                item.addEventListener("click", () => {
                                    nam = item.innerText;
                                    getCurrentFoodItem(nam);
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
    });

    let jar = [];

    async function getCurrentFoodItem(val) {
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            let itemSec = document.querySelector(".sec__item__sec");
            let discountper = document.querySelector(".bannerpercent").innerText;
            prevCates.classList.add("hidden");
            allcates.classList.add("hidden");
            allfoodSec.classList.add("hidden");
            itemSec.classList.remove("hidden");
            itemSec.innerHTML = "";
            const endpoint = `/api/v1/menu/${usrid}/findbynam/${val}`
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
                        let items = result.data
                        items.forEach(el => {
                            if (el.available === false) {
                                if (el.applydiscount == true) {
                                    let disper = discountper / 100
                                    let newp = el.price * disper;
                                    let newprice = el.price - newp;
                                    itemSec.innerHTML +=
                                        `
                                            <img class="point cancelitembtn" title="go back" src="/images/cancel.png" loading="lazy" alt="cancel__btn" />
                                            <div class="menu_sec_card">
                                                <img class="menu_sec_card_img" src="/images/upload.png" alt="menu__item__image">
                                                <div class="menu_sec_card_det">
                                                    <div id="${el._id}" class="like__dislike">
                                                    </div>
                                                    <h3 class="menu_sec_card_head menu__food__name">${el.name}</h3>
                                                    <p class="menu_sec_card_price">${el.currency}
                                                    <span class="menu__price__val">${el.price}</span>
                                                    </p>
                                                    <p class="catalouge__card__dis__per goldn">Discount : ${discountper}%</p> 
                                                    <p class="catalouge__card__disc">After Discount : ${el.currency}
                                                        <span class="afterDiscountPrice">${newprice}</span>
                                                    </p>
                                                    <pre class="menu_sce_card_detail">${el.detail}</pre>
                                                    <p class="orgrd">Not Available For Today</p>
                                                    <div class="form__cont__label">
                                                        <label class="orgrd">Order Quantity :</label>
                                                        <input type="number" class="orderno orgrd" id="ordernoid" name="points" placeholder="0" required disabled>
                                                    </div>
                                                    <button id="addtoresorder" class="lonbtn orgrd addtoresorderbtn disabled">Add to Order</button>
                                                </div>
                                            </div>
                                        `
                                    if (el.coverImage) {
                                        let imgP = document.querySelector(".menu_sec_card_img");
                                        imgP.src = el.coverImage
                                    }
                                }
                                else {
                                    itemSec.innerHTML +=
                                        `
                                        <img class="point cancelitembtn" title="go back" src="/images/cancel.png" loading="lazy" alt="cancel__btn" />
                                        <div class="menu_sec_card">
                                            <img class="menu_sec_card_img" src="/images/upload.png" alt="menu__item__image">
                                            <div class="menu_sec_card_det">
                                                <div id="${el._id}" class="like__dislike">
                                                </div>
                                                <h3 class="menu_sec_card_head menu__food__name">${el.name}</h3>
                                                <p class="menu_sec_card_price">${el.currency}
                                                    <span class="menu__price__val">${el.price}</span>
                                                </p>
                                                <pre class="menu_sce_card_detail">${el.detail}</pre>
                                                <p class="orgrd">Not Available For Today</p>
                                                <div class="form__cont__label">
                                                    <label class="orgrd">Order Quantity :</label>
                                                    <input type="number" class="orderno orgrd" id="ordernoid" name="points" placeholder="0" required disabled>
                                                </div>
                                                <button id="addtoresorder" class="lonbtn orgrd addtoresorderbtn" disabled>Add to Order</button>
                                            </div>
                                        </div>
                                    `
                                    if (el.coverImage) {
                                        let imgP = document.querySelector(".menu_sec_card_img");
                                        imgP.src = el.coverImage
                                    }
                                }
                            }
                            else {
                                if (el.applydiscount == true) {
                                    let disper = discountper / 100
                                    let newp = el.price * disper;
                                    let newprice = el.price - newp;
                                    itemSec.innerHTML +=
                                        `
                                            <img class="point cancelitembtn" title="go back" src="/images/cancel.png" loading="lazy" alt="cancel__btn" />
                                            <div class="menu_sec_card">
                                                <img class="menu_sec_card_img" src="/images/upload.png" alt="menu__item__image">
                                                <div class="menu_sec_card_det">
                                                    <div id="${el._id}" class="like__dislike">
                                                    </div>
                                                    <h3 class="menu_sec_card_head menu__food__name">${el.name}</h3>
                                                    <p class="menu_sec_card_price">${el.currency}
                                                    <span class="menu__price__val">${el.price}</span>
                                                    </p>
                                                    <p class="catalouge__card__dis__per goldn">Discount : ${discountper}%</p> 
                                                    <p class="catalouge__card__disc">After Discount : ${el.currency}
                                                        <span class="afterDiscountPrice">${newprice}</span>
                                                    </p>
                                                    <pre class="menu_sce_card_detail">${el.detail}</pre>
                                                    <div class="form__cont__label">
                                                        <label>Order Quantity :</label>
                                                        <input type="number" class="orderno" id="ordernoid" name="points" placeholder="0" required>
                                                    </div>
                                                    <button id="addtoresorder" class="lonbtn addtoresorderbtn">Add to Order</button>
                                                </div>
                                            </div>
                                        `
                                    if (el.coverImage) {
                                        let imgP = document.querySelector(".menu_sec_card_img");
                                        imgP.src = el.coverImage
                                    }
                                }
                                else {
                                    itemSec.innerHTML +=
                                        `
                                        <img class="point cancelitembtn" title="go back" src="/images/cancel.png" loading="lazy" alt="cancel__btn" />
                                        <div class="menu_sec_card">
                                            <img class="menu_sec_card_img" src="/images/upload.png" alt="menu__item__image">
                                            <div class="menu_sec_card_det">
                                                <div id="${el._id}" class="like__dislike">
                                                </div>
                                                <h3 class="menu_sec_card_head menu__food__name">${el.name}</h3>
                                                <p class="menu_sec_card_price">${el.currency}
                                                    <span class="menu__price__val">${el.price}</span>
                                                </p>
                                                <pre class="menu_sce_card_detail">${el.detail}</pre>
                                                <div class="form__cont__label">
                                                    <label>Order Quantity :</label>
                                                    <input type="number" class="orderno" id="ordernoid" name="points" placeholder="0" required>
                                                </div>
                                                <button id="addtoresorder" class="lonbtn addtoresorderbtn">Add to Order</button>
                                            </div>
                                        </div>
                                    `
                                    if (el.coverImage) {
                                        let imgP = document.querySelector(".menu_sec_card_img");
                                        imgP.src = el.coverImage
                                    }
                                }
                            }
                        });
                        likeDislikeConfig()
                        let menuseccardsec = document.querySelector(".menu_sec_card");
                        let inptbx = document.querySelector(".orderno");
                        let foccol = document.querySelector(".seccatfocusColor").innerText;

                        menuseccardsec.style.color = foccol;
                        inptbx.style.borderColor = foccol;
                        inptbx.style.color = foccol;

                        let cancelitembtn = document.querySelectorAll(".cancelitembtn");
                        let foodname = document.querySelector(".menu__food__name")
                        let orderquan = document.querySelector(".orderno");
                        let addtoresorderbtn = document.querySelectorAll(".addtoresorderbtn");
                        let foodimg = document.querySelector(".menu_sec_card_img");
                        let foodPrice = document.querySelector(".menu__price__val");
                        let discPrice = document.querySelector(".afterDiscountPrice");
                        addtoresorderbtn.forEach(item => {
                            item.addEventListener("click", () => {
                                if (orderquan.value == "") {
                                    return false;
                                }
                                let orderval = orderquan.value + " " + foodname.innerText + ", ";
                                let itempic = foodimg.src;
                                let itemname = foodname.innerText;
                                let quantity = orderquan.value;
                                let price = foodPrice.innerText;
                                let discountPrice;
                                if (discPrice == null) {
                                    discountPrice = null;
                                }
                                else {
                                    discountPrice = discPrice.innerText;
                                }
                                msgSwap(orderval, itemname, itempic, quantity, price, discountPrice);
                                let fill = document.querySelector(".resorderfill");
                                if (fill.classList.contains("hidden")) {
                                    fill.classList.remove("hidden");
                                }
                                successAlert(`${itemname} has been added to order list :)`)
                                orderquan.value = "";
                            })
                        })
                        cancelitembtn.forEach(item => {
                            item.addEventListener("click", () => {
                                itemSec.classList.add("hidden");
                                allfoodSec.classList.remove("hidden");
                                if (!prevCates.classList.contains("hidden")) {
                                    prevCates.classList.remove("hidden");
                                }
                                if (!viewall.classList.contains("hidden")) {
                                    viewall.classList.remove('hidden');
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
    }

    let detailbtn = document.querySelector(".resdetail");
    let cancelDetail = document.querySelector(".cancel__detail");
    let details = document.querySelector('.restro__info');

    cancelDetail.addEventListener("click", () => {
        details.classList.add("hidden");
    })

    detailbtn.addEventListener("click", () => {

        details.classList.remove("hidden");
    })
})();

(function () {
    let resorder = document.querySelector(".resorder");
    let resordersec = document.querySelector(".resorder__info");
    let cancelorder = document.querySelector(".cancel__order");
    let resmsg = document.getElementById("resordermsg");
    let fill = document.querySelector(".resorderfill");

    let dsplay = document.querySelector(".form__item__display__sec");

    resorder.addEventListener("click", () => {
        resordersec.classList.remove("hidden");
        fill.classList.add("hidden");
        resorder.classList.add("hidden");
        getUserMsg();

        let displaysec = document.querySelector(".form__item__display__sec");
        let user = document.querySelector("#thiscurrentrestrouser").innerText;
        let menuCurUser = document.getElementById("uniqueusername").innerText;

        let usrName = `${user}foodorder` + "-" + menuCurUser

        let products = usrName.toLowerCase();
        let productsName = usrName.toUpperCase();
        products = localStorage.getItem(productsName);
        if (products == null) {
            jar = []
        } else {
            jar = JSON.parse(products);
        }

        let cancelitemresorder = document.querySelectorAll(".cancelItemresOrder");

        cancelitemresorder.forEach((item, i) => {
            item.addEventListener("click", () => {
                let parentEl = item.parentElement;
                let curId = item.parentElement.childNodes[9].innerText;
                jar.filter((el, i) => {
                    if (el.uid == curId) {
                        parentEl.remove();
                        jar.splice(i, 1)
                        localStorage.setItem(productsName, JSON.stringify(jar));
                        successAlert("Item has been removed")
                    }
                })
            })
        })
    })

    cancelorder.addEventListener("click", () => {
        resordersec.classList.add("hidden");
        resorder.classList.remove("hidden");
        let crtCard = document.querySelector(".cart__card");
        if (dsplay.contains(crtCard)) {
            fill.classList.remove("hidden");
        }
    })

    const socket = io();
    let sendOrderbtn = document.getElementById("sendorderreq");
    let tableno = document.getElementById("tableno")
    let restroid = document.getElementById("thiscurrentrestroid");
    let orderuser = document.getElementById("uniqueusername");
    let orderadd = document.getElementById("resordadd");
    let orderphn = document.getElementById("resordphn");
    let secalrt = document.getElementById("secmsgalert");
    let curResName = document.querySelector(".pageName").innerText;
    let orderuserid = document.getElementById("uniqueuserid");
    let homeDel;

    socket.on("resorderreply", (restoid, restouser, oderuserid) => {
        if (restroid.innerText == restoid) {
            if (orderuserid.innerText == oderuserid) {
                secalrt.play();
                fill.classList.remove("hidden");
                getUserMsg();
            }
        }
    });

    let homedelv = document.getElementById("showHomeDelOpt");
    let homedelform = document.querySelector(".showhomesec");
    if (homedelv !== null) {
        homedelv.addEventListener("click", (e) => {
            e.preventDefault();
            homedelform.classList.toggle("hidden");
        })
    }

    sendOrderbtn.addEventListener("click", async (e) => {
        e.preventDefault();
        resmsg.value = "";
        if (tableno.value == "") {
            return false;
        }
        let odval = orderadd.value;
        let odphnval = orderphn.value
        if (orderphn.value && orderadd.value) {
            if (odphnval.length > 1 && odval.length > 1) {
                homeDel = true;
            }
        }
        if (orderphn.value == "" || orderadd.value == "") {
            homeDel = false;
        }
        let displaySec = document.querySelector(".form__item__display__sec");
        let cartCard = document.querySelectorAll(".cart__card");
        let itemPriceList = [];
        let qList = [];
        if (displaySec !== null) {
            cartCard.forEach(item => {
                let quantity = item.childNodes[7].value
                let product = item.childNodes[3].childNodes[3].innerText
                let price = item.childNodes[3].childNodes[5].innerText

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
        fill.classList.add("hidden");
        let menuuid = document.querySelector(".portiuserid").innerText;
        socket.emit("resorders", restroid.innerText, orderuser.innerText, menuuid);
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            let inerdis = document.querySelectorAll(".form__inner__displayer");
            inerdis.forEach(item => {
                item.remove();
            })
            const endpoint = `/api/v1/message/orderfood`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    restro: restroid.innerText,
                    table: tableno.value,
                    message: resmsg.value,
                    name: orderuser.innerText,
                    userId: orderuserid.innerText,
                    address: orderadd.value,
                    phn_no: orderphn.value,
                    homedelivery: homeDel,
                    total: sumTotal,
                    retroName: curResName,
                    createdAt: Date.now()
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Order has been placed :)");
                    tableno.value = "";
                    resmsg.value = "";
                    orderadd.value = "";
                    orderphn.value = "";
                    getUserMsg();
                    let user = document.querySelector("#thiscurrentrestrouser").innerText;
                    cartCard.forEach(item => {
                        item.remove();
                    })
                    let menuCurUser = document.getElementById("uniqueusername").innerText;

                    let usrName = `${user}foodorder` + "-" + menuCurUser
                    let products = usrName.toLowerCase();
                    let productsName = usrName.toUpperCase();
                    products = localStorage.getItem(productsName);
                    if (products == null) {
                        jar = []
                    } else {
                        jar = JSON.parse(products);
                    }
                    jar.splice(0);
                    localStorage.setItem(productsName, JSON.stringify(jar));
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

function msgSwap(val, itemname, itemimg, quantity, price, afterDiscPrice) {
    let displaysec = document.querySelector(".form__item__display__sec");
    let fill = document.querySelector(".resorderfill");
    let user = document.querySelector("#thiscurrentrestrouser").innerText;
    let menuCurUser = document.getElementById("uniqueusername").innerText;

    let usrName = `${user}foodorder` + "-" + menuCurUser

    displaysec.innerHTML = "";

    let products = usrName.toLowerCase();
    let productsName = usrName.toUpperCase();
    products = localStorage.getItem(productsName);
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let uq = cDate + "|" + cTime;
    let uid = usrName + uq;

    if (products == null) {
        jar = []
    } else {
        jar = JSON.parse(products);
    }
    let coverImage = itemimg
    let name = itemname

    if (afterDiscPrice == null) {
        jar.push({ coverImage, name, price, quantity, uid });
    }
    else {
        price = afterDiscPrice;
        jar.push({ coverImage, name, price, quantity, uid });
    }
    localStorage.setItem(productsName, JSON.stringify(jar))


    if (fill.classList.contains("hidden")) {
        fill.classList.remove("hidden");
    }

    jar.forEach(item => {
        displaysec.innerHTML +=
            `
                <div class="cart__card">
                    <img class="cancelItemresOrder point" src="/images/cancel.png" alt="cancel" />
                    <div class="cart__card__item">
                        <img src="/images/upload.png" class="cart__card__img"/>
                        <p class="cart__product__name">${item.name}</p>
                        <p class="hidden cart__product__price">${item.price}</p>
                    </div>
                    <label>Quantity : </label>
                    <input type="number" value="${item.quantity}" class="cartItemQuantity cart__product__quantity" required />
                    <p class="hidden uniqueItemId">${item.uid}</p>
                </div>
            `
        if (item.coverImage) {
            let catalimgcard = document.querySelector(".cart__card__img");
            catalimgcard.src = item.coverImage;
        }
    })
}

showOrderItems();

function showOrderItems() {
    let displaysec = document.querySelector(".form__item__display__sec");
    let user = document.querySelector("#thiscurrentrestrouser").innerText;
    let menuCurUser = document.getElementById("uniqueusername").innerText;

    let usrName = `${user}foodorder` + "-" + menuCurUser
    displaysec.innerHTML = "";

    let products = usrName.toLowerCase();
    let productsName = usrName.toUpperCase();
    products = localStorage.getItem(productsName);
    if (products == null) {
        jar = []
    } else {
        jar = JSON.parse(products);
    }
    jar.forEach(item => {
        displaysec.innerHTML +=
            `
                <div class="cart__card">
                    <img class="cancelItemresOrder point" src="/images/cancel.png" alt="cancel" />
                    <div class="cart__card__item">
                        <img src="/images/upload.png" class="cart__card__img"/>
                        <p class="cart__product__name">${item.name}</p>
                        <p class="hidden cart__product__price">${item.price}</p>
                    </div>
                    <label>Quantity : </label>
                    <input type="number" value="${item.quantity}" class="cartItemQuantity cart__product__quantity" required/>
                    <p class="hidden uniqueItemId">${item.uid}</p>
                </div>
            `
        if (item.coverImage) {
            let catalimgcard = document.querySelector(".cart__card__img");
            catalimgcard.src = item.coverImage;
        }
    })
}

async function getUserMsg() {
    let resid = document.getElementById("thiscurrentrestroid").innerText;
    let usr = document.getElementById("uniqueusername").innerText;
    let hisOrder = document.querySelector(".foods__order__his");

    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        hisOrder.innerHTML = "";
        const endpoint = `/api/v1/message/${resid}/usrorders/${usr}`
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
                    let usrorders = item.usrresorders
                    usrorders.forEach(el => {
                        if (el.address && el.phn_no) {
                            if (el.orderInfo) {
                                hisOrder.innerHTML +=
                                    `
                                        <div class="food__order__list homeone">
                                            <h3>${el.table}</h3>
                                            <p class="faded">Your Order : </p>
                                            <p>${el.message}</p>
                                            <p class="faded">Address : </p>
                                            <p>${el.address}</p>
                                            <p class="faded">Phone No : </p>
                                            <p>${el.phn_no}</p>
                                            <p class="faded">Order Total : </p>
                                            <p>${el.total}</p>
                                            <p class="info">Your Order has been ${el.orderInfo}</p>
                                            <button class="hidden delreqbtn lonbtn" id="${el._id}"></button>
                                        </div>
                                    `
                            }
                            else {
                                hisOrder.innerHTML +=
                                    `
                                        <div class="food__order__list homeone">
                                            <h3>${el.table}</h3>
                                            <p class="faded">Your Order : </p>
                                            <p>${el.message}</p>
                                            <p class="faded">Address : </p>
                                            <p>${el.address}</p>
                                            <p class="faded">Phone No : </p>
                                            <p>${el.phn_no}</p>
                                            <p class="faded">Order Total : </p>
                                            <p>${el.total}</p>
                                            <p class="faded wait">Waiting for Response...</p>
                                            <button class="lonbtn delreqbtn" id="${el._id}">Delete</button>
                                        </div>
                                    `
                            }
                        }

                        else {
                            if (el.orderInfo) {
                                hisOrder.innerHTML +=
                                    `
                                        <div class="food__order__list">
                                            <h3>${el.table}</h3>
                                            <p class="faded">Your Order : </p>
                                            <p>${el.message}</p>
                                            <p class="faded">Order Total : </p>
                                            <p>${el.total}</p>
                                            <p class="info">Your Order has been ${el.orderInfo}</p>
                                            <button class="lonbtn delreqbtn hidden" id="${el._id}"></button>
                                        </div>
                                    `
                            }
                            else {
                                hisOrder.innerHTML +=
                                    `
                                        <div class="food__order__list">
                                            <h3>${el.table}</h3>
                                            <p class="faded">Your Order : </p>
                                            <p>${el.message}</p>
                                            <p class="faded">Order Total : </p>
                                            <p>${el.total}</p>
                                            <p class="faded wait">Waiting for Response...</p>
                                            <button class="lonbtn delreqbtn" id="${el._id}">Delete</button>
                                        </div>
                                    `
                            }
                        }

                    })

                    let foodordsec = document.querySelectorAll(".food__order__list");

                    let foccol = document.querySelector(".seccatfocusColor").innerText;
                    let fontcol = document.querySelector(".seccatFontColor").innerText;
                    let faded = document.querySelectorAll(".faded");
                    let fontfa = document.querySelector(".seccatFontFam").innerText;
                    let delBtn = document.querySelectorAll(".delreqbtn");

                    delBtn.forEach(item => {
                        item.style.color = foccol;
                        item.style.borderColor = foccol;
                        item.style.fontFamily = fontfa;
                    })

                    foodordsec.forEach(item => {
                        item.style.backgroundColor = fontcol;
                        item.style.color = foccol;
                    })

                    faded.forEach(item => {
                        item.style.fontWeight = "bolder";
                        item.style.color = foccol;
                    })

                    let socket = io();
                    delBtn.forEach(item => {
                        item.addEventListener("click", async () => {
                            try {
                                let load = document.querySelector('.loader');
                                load.classList.remove("hidden")
                                const endpoint = `/api/v1/message/deleteResOrder/${item.id}`
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
                                        successAlert("Your order has been deleted :(");
                                        getUserMsg();
                                        let menuuid = document.querySelector(".portiuserid").innerText;
                                        socket.emit("resorders", resid, usr, menuuid);
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

}

(function () {
    let cancelbanner = document.querySelector(".removebanner");

    let bansec = document.querySelector(".sec__menu__banner ");

    cancelbanner.addEventListener("click", () => {
        bansec.remove();
        window.sessionStorage.setItem("hideBanner", "true");
    })
})();

window.addEventListener("load", () => {
    let hideBanner = window.sessionStorage.getItem('hideBanner');
    let banner = document.querySelector(".sec__menu__banner");
    let bannerinfo = document.querySelector(".bannerinfo").innerText;
    if (bannerinfo !== "") {
        if (hideBanner == "true") {
            banner.classList.add("hidden");
        }
        else {
            banner.classList.remove("hidden");
        }
    }
})

let goTOLoginSecMenu = document.getElementById("gotoLogin");

goTOLoginSecMenu.addEventListener("click", () => {
    window.open(`/account/login`)
});

async function likeDislikeConfig() {
    let likeDislikeCont = document.querySelector(".like__dislike");
    let itemId = likeDislikeCont.id
    if (likeDislikeCont === null) {
        console.log("null");
    }
    else {
        try {
            let usr = document.querySelector("#thisusrid").innerText;

            const endpoint = `/api/v1/menu/${itemId}/getItem`
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
                        let item = result.data.data
                        let likeUsr = item.itemLike
                        let disLikeUsr = item.itemDisLike
                        if (likeUsr.includes(usr)) {
                            if (disLikeUsr.includes(usr)) {
                                likeDislikeCont.innerHTML =
                                    `
                                            <div class="like__sec">
                                                <button id="like" class="hidden"></button>
                                                <img src="/images/unlike.png" id="unlike" class="likedislikeimg" />
                                                <h4 class="likeCount"></h4>
                                            </div>
                                            <div class="dis__like__sec">
                                                <button class="hidden" id="disLike"></button>
                                                <img src="/images/undislike.png" id="unDisLike" class="likedislikeimg" />
                                                <h4 class="disLikeCount"></h4>
                                            </div>
                                        `
                            }
                            else {
                                likeDislikeCont.innerHTML =
                                    `
                                                <div class="like__sec">
                                                    <button id="like" class="hidden"></button>
                                                    <img src="/images/unlike.png" id="unlike" class="likedislikeimg" />
                                                    <h4 class="likeCount"></h4>
                                                </div>
                                                <div class="dis__like__sec">
                                                    <img src="/images/dislike.png" id="disLike" class="likedislikeimg" />
                                                    <button id="unDisLike" class="hidden"></button>
                                                    <h4 class="disLikeCount"></h4>
                                                </div>
                                            `
                            }
                        }
                        else {
                            if (disLikeUsr.includes(usr)) {
                                likeDislikeCont.innerHTML =
                                    `
                                    <div class="like__sec">
                                        <img src="/images/like.png" id="like" class="likedislikeimg" />
                                        <button id="unlike" class="hidden"></button>
                                        <h4 class="likeCount"></h4>
                                    </div>
                                    <div class="dis__like__sec">
                                        <button id="disLike" class="hidden"></button>
                                        <img src="/images/undislike.png" id="unDisLike" class="likedislikeimg" />
                                        <h4 class="disLikeCount"></h4>
                                    </div>
                                `
                            }
                            else {
                                likeDislikeCont.innerHTML =
                                    `
                                        <div class="like__sec">
                                            <img src="/images/like.png" id="like" class="likedislikeimg" />
                                            <button id="unlike" class="hidden"></button>
                                            <h4 class="likeCount"></h4>
                                        </div>
                                        <div class="dis__like__sec">
                                            <img src="/images/dislike.png" id="disLike" class="likedislikeimg" />
                                            <button id="unDisLike" class="hidden"></button>
                                            <h4 class="disLikeCount"></h4>
                                        </div>
                                    `
                            }
                        }
                        let like = document.querySelector("#like");
                        let unLike = document.querySelector("#unlike");
                        let disLike = document.querySelector("#disLike");
                        let unDisLike = document.querySelector("#unDisLike");
                        let likeCout = document.querySelector(".likeCount");
                        let disLikeCout = document.querySelector(".disLikeCount");

                        likeCout.innerText = item.itemLike.length

                        disLikeCout.innerText = item.itemDisLike.length

                        like.addEventListener("click", async (e) => {
                            e.preventDefault()

                            try {
                                const endpoint = `/api/v1/menu/updateLikes/${itemId}`
                                await fetch(endpoint, {
                                    method: 'PATCH',
                                    headers: {
                                        Accept: "application/json, text/plain, */*",
                                        'Content-type': 'application/json',
                                    },
                                    body: JSON.stringify({

                                    })
                                }).then((response) => {
                                    if (response.status === 200) {
                                        getAllLikeCount()
                                    }
                                    else if (response.status === 401) {
                                        errorAlert("You Are Not Logged In!!!")
                                    }
                                    else {
                                        console.log(response);
                                        errorAlert("Invalid input, Duplication Input error!!!")
                                    }
                                })
                            }
                            catch (err) {
                                console.log(err);
                                errorAlert('Sorry! Something went wrong', err);
                            };
                        });
                        unLike.addEventListener("click", async (e) => {
                            e.preventDefault()
                            try {
                                const endpoint = `/api/v1/menu/updateunLikes/${itemId}`
                                await fetch(endpoint, {
                                    method: 'PATCH',
                                    headers: {
                                        Accept: "application/json, text/plain, */*",
                                        'Content-type': 'application/json',
                                    },
                                    body: JSON.stringify({

                                    })
                                }).then((response) => {
                                    if (response.status === 200) {
                                        getAllLikeCount()
                                    } else {
                                        console.log(response);
                                        errorAlert("Invalid input, Duplication Input error!!!")
                                    }
                                })
                            }
                            catch (err) {
                                console.log(err);
                                errorAlert('Sorry! Something went wrong', err);
                            }
                        })

                        disLike.addEventListener("click", async (e) => {
                            e.preventDefault()
                            try {
                                const endpoint = `/api/v1/menu/updatedisLikes/${itemId}`
                                await fetch(endpoint, {
                                    method: 'PATCH',
                                    headers: {
                                        Accept: "application/json, text/plain, */*",
                                        'Content-type': 'application/json',
                                    },
                                    body: JSON.stringify({

                                    })
                                }).then((response) => {
                                    if (response.status === 200) {
                                        getAllLikeCount()
                                    }
                                    else if (response.status === 401) {
                                        errorAlert("You Are Not Logged In!!!")
                                    }
                                    else {
                                        console.log(response);
                                        errorAlert("Invalid input, Duplication Input error!!!")
                                    }
                                })
                            }
                            catch (err) {
                                console.log(err);
                                errorAlert('Sorry! Something went wrong', err);
                            }
                        })
                        unDisLike.addEventListener("click", async (e) => {
                            e.preventDefault()
                            try {
                                const endpoint = `/api/v1/menu/updateunDisLikes/${itemId}`
                                await fetch(endpoint, {
                                    method: 'PATCH',
                                    headers: {
                                        Accept: "application/json, text/plain, */*",
                                        'Content-type': 'application/json',
                                    },
                                    body: JSON.stringify({

                                    })
                                }).then((response) => {
                                    if (response.status === 200) {
                                        getAllLikeCount()
                                    } else {
                                        console.log(response);
                                        errorAlert("Invalid input, Duplication Input error!!!")
                                    }
                                })
                            }
                            catch (err) {
                                console.log(err);
                                errorAlert('Sorry! Something went wrong', err);
                            }
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
    }
};

async function getAllLikeCount() {
    let likeDislikeCont = document.querySelector(".like__dislike");
    let id = likeDislikeCont.id;
    let usr = document.querySelector("#thisusrid").innerText;

    try {
        const endpoint = `/api/v1/menu/${id}/getItem`
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
                    let item = result.data.data
                    let likeUsr = item.itemLike;
                    let disLikeUsr = item.itemDisLike;
                    if (likeUsr.includes(usr)) {
                        if (disLikeUsr.includes(usr)) {
                            likeDislikeCont.innerHTML =
                                `
                                        <div class="like__sec">
                                            <button id="like" class="hidden"></button>
                                            <img src="/images/unlike.png" id="unlike" class="likeDislikeimg" />
                                            <h4 class="likeCount"></h4>
                                        </div>
                                        <div class="dis__like__sec">
                                            <button class="hidden" id="disLike"></button>
                                            <img src="/images/undislike.png" id="unDisLike" class="likeDislikeimg" />
                                            <h4 class="disLikeCount"></h4>
                                        </div>
                                    `
                        }
                        else {
                            likeDislikeCont.innerHTML =
                                `
                                            <div class="like__sec">
                                                <button id="like" class="hidden"></button>
                                                <img src="/images/unlike.png" id="unlike" class="likeDislikeimg" />
                                                <h4 class="likeCount"></h4>
                                            </div>
                                            <div class="dis__like__sec">
                                                <img src="/images/dislike.png" id="disLike" class="likeDislikeimg" />
                                                <button id="unDisLike" class="hidden"></button>
                                                <h4 class="disLikeCount"></h4>
                                            </div>
                                        `
                        }
                    }
                    else {
                        if (disLikeUsr.includes(usr)) {
                            likeDislikeCont.innerHTML =
                                `
                                <div class="like__sec">
                                    <img src="/images/like.png" id="like" class="likeDislikeimg" />
                                    <button id="unlike" class="hidden"></button>
                                    <h4 class="likeCount"></h4>
                                </div>
                                <div class="dis__like__sec">
                                    <button id="disLike" class="hidden"></button>
                                    <img src="/images/undislike.png" id="unDisLike" class="likeDislikeimg" />
                                    <h4 class="disLikeCount"></h4>
                                </div>
                            `
                        }
                        else {
                            likeDislikeCont.innerHTML =
                                `
                                    <div class="like__sec">
                                        <img src="/images/like.png" id="like" class="likeDislikeimg" />
                                        <button id="unlike" class="hidden"></button>
                                        <h4 class="likeCount"></h4>
                                    </div>
                                    <div class="dis__like__sec">
                                        <img src="/images/dislike.png" id="disLike" class="likeDislikeimg" />
                                        <button id="unDisLike" class="hidden"></button>
                                        <h4 class="disLikeCount"></h4>
                                    </div>
                                `
                        }
                    }

                    let likeCout = document.querySelector(".likeCount");
                    let disLikeCout = document.querySelector(".disLikeCount");
                    likeCout.innerText = item.itemLike.length

                    disLikeCout.innerText = item.itemDisLike.length
                    likeDislikeConfig()
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

(function () {
    let usr = document.getElementById("reserveuser");
    let usrId = document.getElementById("reserveuserid").innerText;
    let restroId = document.getElementById("reserverestroid").innerText;
    let date = document.getElementById("reservedate");
    let time = document.getElementById("reservetime");
    let phn = document.getElementById("reservephn");
    let pep = document.getElementById("reserveno");
    let crResName = document.querySelector(".pageName").innerText;
    let reservebtn = document.getElementById("reservereq");
    let socket = io();

    let reserveDummybtn = document.querySelector(".reserve__btn");
    let cancelbtn = document.querySelector(".reservecancel");
    let reserveformsec = document.querySelector(".reserve__sec");
    let resfill = document.querySelector(".reserve__fill");
    let secalrt = document.getElementById('secmsgalert');

    reserveDummybtn.addEventListener("click", () => {
        reserveformsec.classList.remove("hidden");
        getReservation();
    })

    cancelbtn.addEventListener("click", () => {
        reserveformsec.classList.add("hidden")
    })

    socket.on("reservereply", (restoID, userID) => {
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

        if (pep.value == null) {
            return false;
        }

        if (phn.value == "") {
            return false;
        }

        if (date.value == "") {
            return false;
        }

        if (time.value == "") {
            return false
        }
        let menuuid = document.querySelector(".portiuserid").innerText;
        socket.emit("reserve", restroId, menuuid)
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/menu/reserve`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    restro: restroId,
                    name: usr.value,
                    numberPeople: pep.value,
                    date: date.value,
                    time: time.value,
                    phn_no: phn.value,
                    userId: usrId,
                    restroName: crResName,
                    createdAt: Date.now()
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Table Reservation Requested :)");
                    getReservation();
                    date.value = "";
                    pep.value = "";
                    time.value = "";
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
    let usrId = document.getElementById("reserveuserid").innerText;
    let restroId = document.getElementById("reserverestroid").innerText;
    let reserveCont = document.querySelector(".reservations");
    reserveCont.innerHTML = "";
    try {
        const endpoint = `/api/v1/menu/get/${restroId}/reserve/${usrId}`
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
                        if (el.bookingInfo) {
                            reserveCont.innerHTML +=
                                `
                                    <div class="food__order__list homeone">
                                        <h3>${el.name}</h3>
                                        <p class="faded">Date : </p>
                                        <p>${el.date}</p>
                                        <p class="faded">Time : </p>
                                        <p>${el.time}</p>
                                        <p class="faded">Phone No : </p>
                                        <p>${el.phn_no}</p>
                                        <p class="info">Your Order has been ${el.bookingInfo}</p>
                                        <button class="hidden delreservebtn"></button>
                                    </div>
                                `
                        }
                        else {
                            reserveCont.innerHTML +=
                                `
                                    <div class="food__order__list homeone">
                                        <h3>${el.name}</h3>
                                        <p class="faded">Date : </p>
                                        <p>${el.date}</p>
                                        <p class="faded">Time : </p>
                                        <p>${el.time}</p>
                                        <p class="faded">Phone No : </p>
                                        <p>${el.phn_no}</p>
                                        <p class="faded wait">Waiting for Response...</p>
                                        <button class="lonbtn delreservebtn" id="${el._id}">Cancel</button>
                                    </div>
                                `
                        }
                        let foodordsec = document.querySelectorAll(".food__order__list");

                        let foccol = document.querySelector(".seccatfocusColor").innerText;
                        let fontcol = document.querySelector(".seccatFontColor").innerText;
                        let faded = document.querySelectorAll(".faded");
                        let delReserve = document.querySelectorAll(".delreservebtn");
                        let fontfa = document.querySelector(".seccatFontFam").innerText;

                        delReserve.forEach(item => {
                            item.style.color = foccol;
                            item.style.borderColor = foccol;
                            item.style.fontFamily = fontfa;
                        })

                        foodordsec.forEach(item => {
                            item.style.backgroundColor = fontcol;
                            item.style.color = foccol;
                        })

                        faded.forEach(item => {
                            item.style.fontWeight = "bolder";
                            item.style.color = foccol;
                        })

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
    let usrId = document.getElementById("reserveuserid").innerText;
    let restroId = document.getElementById("reserverestroid").innerText;
    let socket = io();
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/menu/delreserve/${id}`
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
                successAlert("Reservation Deleted :)");
                let menuuid = document.querySelector(".portiuserid").innerText;
                socket.emit("reserve", restroId, menuuid)
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
    let orgId = document.querySelector("#thiscurrentrestroid").innerText;
    let orgUsrId = document.querySelector(".portiuserid").innerText;
    let usrId = document.querySelector(".curloguser").innerText;
    if (pgCount.innerText === "") {
        pgCount.innerText = 0;
    }
    let newCount = (pgCount.innerText * 1) + 1;
    let pgCounter = window.sessionStorage.getItem('pageCounter');
    if (pgCounter == null) {
        if (orgUsrId !== "" && usrId !== "") {
            if (orgUsrId !== usrId) {
                window.sessionStorage.setItem('pageCounter', newCount);
                try {
                    let load = document.querySelector('.loader');
                    load.classList.remove("hidden")
                    const endpoint = `/api/v1/menu/${orgId}/updateResPg`
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
            window.sessionStorage.setItem('pageCounter', newCount);
            try {
                let load = document.querySelector('.loader');
                load.classList.remove("hidden")
                const endpoint = `/api/v1/menu/${orgId}/updateResPg`
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
});

(function () {
    let terms = document.querySelector(".sec__terms");
    let policies = document.querySelector(".sec__policies");
    let msgusrbtn = document.querySelector(".msg__user__btn");
    let resord = document.querySelector(".resorder");
    let resvbtn = document.querySelector(".reserve__btn");
    let termbod = document.querySelector(".terms__sec");
    let privbod = document.querySelector(".policies__sec");
    let cancelterm = document.querySelector(".hideterms");
    let cancelpriv = document.querySelector(".hideprivacypolicies");

    cancelterm.addEventListener("click", () => {
        termbod.classList.add("hidden");
        msgusrbtn.classList.remove("hidden");
        resord.classList.remove("hidden");
        resvbtn.classList.remove("hidden");
    })

    cancelpriv.addEventListener("click", () => {
        privbod.classList.add("hidden");
        msgusrbtn.classList.remove("hidden");
        resord.classList.remove("hidden");
        resvbtn.classList.remove("hidden");
    })

    terms.addEventListener("click", () => {
        termbod.classList.remove("hidden");
        msgusrbtn.classList.add("hidden");
        resord.classList.add("hidden");
        resvbtn.classList.add("hidden");
    });

    policies.addEventListener("click", () => {
        privbod.classList.remove("hidden");
        msgusrbtn.classList.add("hidden");
        resord.classList.add("hidden");
        resvbtn.classList.add("hidden");
    });
})();

(function () {
    let editdum = document.querySelector(".edit__sec__cat");
    let editfeat = document.querySelector(".edit__features__sec");
    let canceledit = document.querySelector(".cancel__edit__dummy");
    let upPortTheme = document.getElementById("changesecCatTheme");
    let backColor = document.getElementById("secCatBackColor");
    let fontColor = document.getElementById("secCatFontColor");
    let focusColor = document.getElementById("secCatFocusColor");
    let fontFam = document.getElementById("secCatFontFam");
    let polygn = document.getElementById("secCatPolygon");
    let covHeight = document.getElementById("secCatCovHeight");
    let covWidth = document.getElementById("secCatCovWidth");
    let id = document.getElementById('secCatid').innerText;

    editdum.addEventListener("click", () => {
        editfeat.classList.remove("hidden");
    })

    canceledit.addEventListener("click", () => {
        editfeat.classList.add("hidden");
    })

    upPortTheme.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");

        const endpoint = `/api/v1/menu/${id}/updateRestaurant`
        try {
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    themecolor: backColor.value,
                    fontColor: fontColor.value,
                    focusColor: focusColor.value,
                    fontFam: fontFam.value,
                    polygon: polygn.value,
                    covWidth: covWidth.value,
                    covHeight: covHeight.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Menu Theme has been updated :)");
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
    let fontFam = document.querySelector(".seccatFontFam").innerText;
    let polygn = document.querySelector(".seccatPolygon").innerText;
    let covWidth = document.querySelector(".seccatCovWidth").innerText;
    let covHeight = document.querySelector(".seccatCovHeight").innerText;
    let backColor = document.querySelector(".seccatThemeColor").innerText;
    let focusColor = document.querySelector(".seccatfocusColor").innerText;
    let sevbod = document.querySelector(".sec__menu__sec");
    let txtfont = document.querySelectorAll(".txt");
    let imgStyl = document.querySelector(".sec__cat__coverpic");
    let focSec = document.querySelectorAll(".focusback");
    let focop = document.querySelectorAll(".focusbackop");
    let inpt = document.querySelectorAll("input");
    let lon = document.querySelectorAll(".lonbtn");

    lon.forEach(item => {
        item.style.borderColor = fontColor;
    })

    inpt.forEach(item => {
        item.style.borderColor = fontColor;
        item.style.color = fontColor;
    })

    sevbod.style.fontFamily = fontFam;
    sevbod.style.color = fontColor;
    sevbod.style.backgroundColor = backColor;

    focSec.forEach(item => {
        item.style.backgroundColor = focusColor;
        item.style.opacity = "0.8"
    })

    focop.forEach(item => {
        item.style.backgroundColor = focusColor;
    })

    txtfont.forEach(item => {
        item.style.color = fontColor;
        item.style.fontFamily = fontFam;
    })

    if (covWidth == "hundred") {
        imgStyl.style.width = "100vw";
        imgStyl.style.zIndex = "0";
    }
    if (covWidth == "seventy") {
        imgStyl.style.width = "70vw";
        imgStyl.style.zIndex = "0";
    }
    if (covWidth == "fifty") {
        imgStyl.style.width = "50vw";
        imgStyl.style.zIndex = "0";
    }
    if (covWidth == "thirty") {
        imgStyl.style.width = "30vw";
        imgStyl.style.zIndex = "0";
    }
    if (covWidth == "remove") {
        imgStyl.style.width = "0vw";
        imgStyl.style.zIndex = "0";
    }

    if (covHeight == "hundred") {
        imgStyl.style.height = "100vh";
        imgStyl.style.zIndex = "0";
    }
    if (covHeight == "seventy") {
        imgStyl.style.height = "70vh";
        imgStyl.style.zIndex = "0";
    }
    if (covHeight == "fifty") {
        imgStyl.style.height = "50vh";
        imgStyl.style.zIndex = "0";
    }
    if (covHeight == "thirty") {
        imgStyl.style.height = "30vh";
        imgStyl.style.zIndex = "0";
    }
    if (covHeight == "remove") {
        imgStyl.style.height = "0vh";
        imgStyl.style.zIndex = "0";
    }

    if (polygn == "full") {
        imgStyl.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
        imgStyl.style.webkitClipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
        imgStyl.style.zIndex = "0";
    }
    else if (polygn == "right") {
        imgStyl.style.clipPath = "polygon(0 0, 0% 100%, 100% 0)"
        imgStyl.style.webkitClipPath = "polygon(0 0, 0% 100%, 100% 0)"
        imgStyl.style.zIndex = "0";
    }
    else if (polygn == "parallel") {
        imgStyl.style.clipPath = "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)"
        imgStyl.style.webkitClipPath = "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)"
        imgStyl.style.zIndex = "0";
    }
    else if (polygn == "hexa") {
        imgStyl.style.clipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        imgStyl.style.webkitClipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        imgStyl.style.zIndex = "0";
    }
    else if (polygn == "crack") {
        imgStyl.style.webkitClipPath = "polygon(20% 0%, 58% 68%, 100% 20%, 66% 71%, 80% 100%, 43% 63%, 0% 80%, 41% 55%)";
        imgStyl.style.clipPath = "polygon(20% 0%, 58% 68%, 100% 20%, 66% 71%, 80% 100%, 43% 63%, 0% 80%, 41% 55%)"
        imgStyl.style.zIndex = "0";
    }
    else {
        return;
    }
})();