let iname = document.getElementById("itemname");
let iprice = document.getElementById('itemprice');
let icat = document.getElementById("itemcat");
let idetail = document.getElementById("itemdetail");
let icimg = document.getElementById("coverimage");
let additembtn = document.getElementById("addItemBtn");
let disprcent = document.querySelector(".discountpercen").innerText;
async function getAllItem() {
    let pg = 1
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let subItems = document.querySelector(".sub__items")
        subItems.innerHTML = "";
        let uid = document.querySelector(".currentid")
        const endpoint = `/api/v1/menu/${resultpath[1]}/paginate/${pg}`
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
                        if (el.user._id === uid.innerText) {
                            if (el.coverImage) {
                                if (el.applydiscount == true) {
                                    let disper = disprcent / 100
                                    let newp = el.price * disper;
                                    let newprice = el.price - newp;
                                    subItems.innerHTML +=
                                        `
                                        <div class="menu__card">
                                            <img class="menu__card__img" loading="lazy" src="${el.coverImage}" alt="food_item_pic">
                                            <div class="menu__card__det">
                                                <h3 class="menu__card__head goldn">${el.name}</h3>
                                                <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                                <p class="catalouge__card__dis__per goldn">Discount : ${disprcent}%</p> 
                                                <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                                <p class="menu__card__cat goldn">${el.category}</p>
                                                <p class="menu__card__detail goldn">${el.detail}</p>
                                                <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                                <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    `
                                }
                                else {
                                    subItems.innerHTML +=
                                        `
                                        <div class="menu__card">
                                            <img class="menu__card__img" loading="lazy" src="${el.coverImage}" alt="food_item_pic">
                                            <div class="menu__card__det">
                                                <h3 class="menu__card__head goldn">${el.name}</h3>
                                                <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                                <p class="menu__card__cat goldn">${el.category}</p>
                                                <p class="menu__card__detail goldn">${el.detail}</p>
                                                <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                                <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    `
                                }
                            }
                            else {
                                if (el.applydiscount == true) {
                                    let disper = disprcent / 100
                                    let newp = el.price * disper;
                                    let newprice = el.price - newp;
                                    subItems.innerHTML +=
                                        `
                                        <div class="menu__card">
                                            <img class="menu__card__img" loading="lazy" src="/images/noimg.png" alt="food_item_pic">
                                            <div class="menu__card__det">
                                                <h3 class="menu__card__head goldn">${el.name}</h3>
                                                <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                                <p class="catalouge__card__dis__per goldn">Discount : ${disprcent}%</p> 
                                                <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                                <p class="menu__card__cat goldn">${el.category}</p>
                                                <p class="menu__card__detail goldn">${el.detail}</p>
                                                <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                                <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    `
                                }
                                else {
                                    subItems.innerHTML +=
                                        `
                                    <div class="menu__card">
                                        <img class="menu__card__img" loading="lazy" src="/images/noimg.png" alt="food_item_pic">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head goldn">${el.name}</h3>
                                            <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="menu__card__cat goldn">${el.category}</p>
                                            <p class="menu__card__detail goldn">${el.detail}</p>
                                            <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                `
                                }
                            }
                        }
                    });
                    if (subItems.children.length == 0) {
                        sub.innerHTML = `<h3 class="center items__head">Oopsie!!! No Items Found!!! :(</h3>`
                    }

                    if (sub.children.length === 12) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
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

window.addEventListener("load", async () => {
    getAllItem();
})

let fullpath = location.pathname
let resultpath = fullpath.match("/menu/(.*)/")
let page = document.querySelector(".paginate");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let sub = document.querySelector(".sub__items")

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
        let subItems = document.querySelector(".sub__items")
        subItems.innerHTML = "";
        window.location.hash = "#";
        const endpoint = `/api/v1/menu/${resultpath[1]}/paginate/${pg}`
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
                        if (el.coverImage) {
                            if (el.applydiscount == true) {
                                let disper = disprcent / 100
                                let newp = el.price * disper;
                                let newprice = el.price - newp;
                                subItems.innerHTML +=
                                    `
                                    <div class="menu__card">
                                        <img class="menu__card__img" loading="lazy" src="${el.coverImage}" alt="food_item_pic">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head goldn">${el.name}</h3>
                                            <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__dis__per goldn">Discount : ${disprcent}%</p> 
                                            <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                            <p class="menu__card__cat goldn">${el.category}</p>
                                            <p class="menu__card__detail goldn">${el.detail}</p>
                                            <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                `
                            }
                            else {
                                subItems.innerHTML +=
                                    `
                                    <div class="menu__card">
                                        <img class="menu__card__img" loading="lazy" src="${el.coverImage}" alt="food_item_pic">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head goldn">${el.name}</h3>
                                            <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="menu__card__cat goldn">${el.category}</p>
                                            <p class="menu__card__detail goldn">${el.detail}</p>
                                            <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                `
                            }
                        }
                        else {
                            if (el.applydiscount == true) {
                                let disper = disprcent / 100
                                let newp = el.price * disper;
                                let newprice = el.price - newp;
                                subItems.innerHTML +=
                                    `
                                    <div class="menu__card">
                                        <img class="menu__card__img" loading="lazy" src="/images/noimg.png" alt="food_item_pic">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head goldn">${el.name}</h3>
                                            <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__dis__per goldn">Discount : ${disprcent}%</p> 
                                            <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                            <p class="menu__card__cat goldn">${el.category}</p>
                                            <p class="menu__card__detail goldn">${el.detail}</p>
                                            <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                `
                            }
                            else {
                                subItems.innerHTML +=
                                    `
                                <div class="menu__card">
                                    <img class="menu__card__img" loading="lazy" src="/images/noimg.png" alt="food_item_pic">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head goldn">${el.name}</h3>
                                        <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                        <p class="menu__card__cat goldn">${el.category}</p>
                                        <p class="menu__card__detail goldn">${el.detail}</p>
                                        <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                        <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
                            }
                        }
                    });
                    window.setTimeout(() => {
                        window.location.hash = "#foodItemSec"
                    }, 200)
                    if (sub.children.length === 12) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
                    }
                    if (subItems.innerHTML == "") {
                        next.classList.add("hidden");
                        subItems.innerHTML = `<h3 class="go__back center items__head">Oops!! Thats All You've Added So Far :)</h3>`
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
        let subItems = document.querySelector(".sub__items")
        subItems.innerHTML = "";
        window.location.hash = "#"
        const endpoint = `/api/v1/menu/${resultpath[1]}/paginate/${pg}`
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
                        if (el.coverImage) {
                            if (el.applydiscount == true) {
                                let disper = disprcent / 100
                                let newp = el.price * disper;
                                let newprice = el.price - newp;
                                subItems.innerHTML +=
                                    `
                                    <div class="menu__card">
                                        <img class="menu__card__img" loading="lazy" src="${el.coverImage}" alt="food_item_pic">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head goldn">${el.name}</h3>
                                            <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__dis__per goldn">Discount : ${disprcent}%</p> 
                                            <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                            <p class="menu__card__cat goldn">${el.category}</p>
                                            <p class="menu__card__detail goldn">${el.detail}</p>
                                            <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                `
                            }
                            else {
                                subItems.innerHTML +=
                                    `
                                    <div class="menu__card">
                                        <img class="menu__card__img" loading="lazy" src="${el.coverImage}" alt="food_item_pic">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head goldn">${el.name}</h3>
                                            <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="menu__card__cat goldn">${el.category}</p>
                                            <p class="menu__card__detail goldn">${el.detail}</p>
                                            <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                `
                            }
                        }
                        else {
                            if (el.applydiscount == true) {
                                let disper = disprcent / 100
                                let newp = el.price * disper;
                                let newprice = el.price - newp;
                                subItems.innerHTML +=
                                    `
                                    <div class="menu__card">
                                        <img class="menu__card__img" loading="lazy" src="/images/noimg.png" alt="food_item_pic">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head goldn">${el.name}</h3>
                                            <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__dis__per goldn">Discount : ${disprcent}%</p> 
                                            <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                            <p class="menu__card__cat goldn">${el.category}</p>
                                            <p class="menu__card__detail goldn">${el.detail}</p>
                                            <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                `
                            }
                            else {
                                subItems.innerHTML +=
                                    `
                                <div class="menu__card">
                                    <img class="menu__card__img" loading="lazy" src="/images/noimg.png" alt="food_item_pic">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head goldn">${el.name}</h3>
                                        <p class="menu__card__price goldn">${el.currency} ${el.price}</p>
                                        <p class="menu__card__cat goldn">${el.category}</p>
                                        <p class="menu__card__detail goldn">${el.detail}</p>
                                        <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                        <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
                            }
                        }
                    });
                    window.setTimeout(() => {
                        window.location.hash = "#foodItemSec"
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

(function () {
    let shareLink = document.querySelector(".share__link");
    let nm = document.querySelector(".uname__menu").innerText;
    // let nm = uname.replace(/\s/g, '')
    shareLink.innerHTML += `
        <div class="menu__link">
            <p class="head form__label">Your Menu Link</p>
            <p class="menu__link__displayer qrLink">${location.host}/${nm}</p>
            <button class="copy__menu ygbtn smallbtn">Copy Link</button>
            <button class="ygbtn smallbtn" id="openMenu">My Menu</button>
            <button class="ygbtn smallbtn qrGen" id="qrmenu">Generate QRCode</button>
            <button class="ygbtn smallbtn downQr hidden" id="dqr">Download QRCode</button>
        </div>
    `
    let openMenu = document.getElementById("openMenu");
    openMenu.addEventListener("click", () => {
        window.open(`/${nm}`)
    })

    let menuLinkDis = document.querySelector(".menu__link__displayer");
    let copyLink = document.querySelector(".copy__menu");
    copyLink.addEventListener("click", () => {
        plink = menuLinkDis.innerText;

        navigator.clipboard.writeText(plink);

        successAlert("Link Copied")
    })
})();

(function () {
    let updateRestroBtn = document.getElementById("updateResBtn");
    let restroId = document.querySelector(".restro__id").innerText;
    let resName = document.getElementById("resname");
    let resAddress = document.getElementById("resaddress");
    let resSlogan = document.getElementById("resslogan");
    let resTheme = document.getElementById("menuThemes");
    let resContact = document.getElementById("resContact");
    let resType = document.getElementById("resType");
    let reshm = document.getElementById("reshomedel");

    updateRestroBtn.addEventListener("click", async (e) => {
        if (resName.value < 1 || resName.value == "" || resName.value == null) {
            return false;
        }
        if (resAddress.value < 1 || resAddress.value == "" || resAddress.value == null) {
            return false;
        }
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/menu/${restroId}/updateRestaurant`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: resName.value,
                    slogan: resSlogan.value,
                    Address: resAddress.value,
                    theme: resTheme.value,
                    phn_no: resContact.value,
                    resType: resType.value,
                    homedelivery: reshm.checked
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Restro Details Updated Successfully :)");
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
    let theme = document.querySelector(".themeUser").innerText;
    let bodsec = document.querySelector(".whole__menu__sec");
    let label = document.querySelectorAll(".form__label");
    let inpt = document.querySelectorAll(".form__input");
    let td = document.querySelectorAll(".td");
    let lbtn = document.querySelector(".lbtn");
    let lod = document.querySelector(".loader");

    if (theme == "red") {
        bodsec.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        document.body.style.backgroundColor = "crimson";
        inpt.forEach(item => {
            item.style.borderColor = "white";
        })
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
    const socket = io();
    let menuMsgBod = document.querySelector(".menu__message__bod");
    let menuMsgSec = document.querySelector(".menu__message__secetion");
    let dummybtn = document.querySelector(".menu__messages__btn");
    let resid = document.querySelector(".curressid");
    let openMsgBod = document.querySelector(".menu__messages__btn");
    let cancelMsgBod = document.querySelector(".cancel__msg__sec");
    let dot = document.querySelector(".new__menu__msg");

    let alrt = document.getElementById("msgalert");

    openMsgBod.addEventListener("click", () => {
        menuMsgSec.classList.remove("hidden");
        dummybtn.classList.add("hidden");
        dot.classList.add("hidden");
        getAllResMsg();
    })

    socket.on("resorders", (restoid, tablno, odermsg, oderuser, oderadd, oderphn) => {
        if (resid.innerText == restoid) {
            getAllResMsg();
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

async function getAllResMsg() {
    let resid = document.querySelector(".curressid").innerText;
    let menuMsgBod = document.querySelector(".menu__message__bod__prev");

    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        menuMsgBod.innerHTML = "";
        const endpoint = `/api/v1/message/${resid}`
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
                    let usrorders = item.resorders
                    usrorders.forEach(el => {
                        if (el.orderInfo) {
                            menuMsgBod.innerHTML +=
                                `
                                <div class="menu__msg__table__list">
                                    <div class="msg__table__bod">
                                        <p class="tabledet">${el.table}</p>
                                        <p class="ordermsg hidden">${el.message}</p>
                                        
                                    </div>
                                    <p class="usersmalltag">${el.name}</p>
                                    <p class="hidden">${el.address}</p>
                                    <p class="hidden">${el.phn_no}</p>
                                    <p class="hidden msgid">${el._id}</p>
                                    <p class="hidden ordinfoo">${el.orderInfo}</p>
                                    <p class="hidden">${el.restro}</p>
                                    <p class="hidden">${el.total}</p>
                                    <p class="hidden">${el.userId}</p>

                                </div>
                            `
                        }
                        else {
                            menuMsgBod.innerHTML +=
                                `
                                <div class="menu__msg__table__list">
                                    <div class="msg__table__bod">
                                        <p class="tabledet">${el.table}</p>
                                        <p class="ordermsg hidden">${el.message}</p>
                                        <p class="dotnoti"></p>
                                    </div>
                                    <p class="usersmalltag">${el.name}</p>
                                    <p class="hidden">${el.address}</p>
                                    <p class="hidden">${el.phn_no}</p>
                                    <p class="hidden msgid">${el._id}</p>
                                    <p class="hidden ordinfoo">${el.orderInfo}</p>
                                    <p class="hidden">${el.restro}</p>
                                    <p class="hidden">${el.total}</p>
                                    <p class="hidden">${el.userId}</p>
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
                            let msg = item.childNodes[1].childNodes[3].innerText;
                            let tabl = item.childNodes[1].childNodes[1].innerText;
                            let usr = item.childNodes[3].innerText;
                            let add = item.childNodes[5].innerText;
                            let phn = item.childNodes[7].innerText;
                            let mid = item.childNodes[9].innerText;
                            let ordInfo = item.childNodes[11].innerText;
                            let restroID = item.childNodes[13].innerText;
                            let total = item.childNodes[15].innerText;
                            let usrId = item.childNodes[17].innerText;
                            msgmidsec.classList.add("hidden");
                            msgRev.classList.remove("hidden");
                            tablePlace.innerText = tabl;
                            if ((add.length > 0 && phn !== "null")) {
                                if (ordInfo !== "undefined") {
                                    msgRevbod.innerHTML =
                                        `
                                        <div class="oder__mesg">
                                            <p>${usr} Order : </p>
                                            <p class="ordermsg">${msg}</p>
                                            <p>Address : </p>
                                            <p class="rdorng">${add}</p>
                                            <p>Phone No : </p>
                                            <p class="rdorng">${phn}</p>
                                            <p>Order Total Amount : </p>
                                            <p class="rdorng">${total}</p>
                                            <div class="grp__button hidden">
                                                <button class="confirmord ordbtn">Confirm</button>
                                                <button class="cancelord ordbtn">Cancel</button>
                                            </div>
                                            <p class="rdorng">${ordInfo}</p>
                                        </div>
                                    `
                                }
                                else {
                                    msgRevbod.innerHTML =
                                        `
                                        <div class="oder__mesg">
                                            <p>${usr} Order : </p>
                                            <p class="ordermsg">${msg}</p>
                                            <p>Address : </p>
                                            <p class="rdorng">${add}</p>
                                            <p>Phone No : </p>
                                            <p class="rdorng">${phn}</p>
                                            <p>Order Total Amount : </p>
                                            <p class="rdorng">${total}</p>
                                            <div class="grp__button">
                                                <button class="confirmord ordbtn">Confirm</button>
                                                <button class="cancelord ordbtn">Cancel</button>
                                            </div>
                                        </div>
                                    `
                                }
                            }
                            else {
                                if (ordInfo !== "undefined") {
                                    msgRevbod.innerHTML =
                                        `
                                        <div class="oder__mesg">
                                            <p>${usr} Order : </p>
                                            <p class="ordermsg">${msg}</p>
                                            <p>Order Total Amount : </p>
                                            <p class="rdorng">${total}</p>
                                            <div class="grp__button hidden">
                                                <button class="confirmord ordbtn">Confirm</button>
                                                <button class="cancelord ordbtn">Cancel</button>
                                            </div>
                                            <p class="rdorng">${ordInfo}</p>
                                        </div>
                                    `
                                }
                                else {
                                    msgRevbod.innerHTML =
                                        `
                                        <div class="oder__mesg">
                                            <p>${usr} Order : </p>
                                            <p class="ordermsg">${msg}</p>
                                            <p>Order Total Amount : </p>
                                            <p class="rdorng">${total}</p>
                                            <div class="grp__button">
                                                <button class="confirmord ordbtn">Confirm</button>
                                                <button class="cancelord ordbtn">Cancel</button>
                                            </div>
                                        </div>
                                    `
                                }
                            }
                            let confirmord = document.querySelector(".confirmord");
                            let cancelord = document.querySelector(".cancelord");
                            let grpbtn = document.querySelector(".grp__button");
                            const socket = io();

                            confirmord.addEventListener("click", (e) => {
                                e.preventDefault();
                                orderConfirmed(grpbtn, mid, "orderById");
                                socket.emit("resorderreply", restroID, usr, usrId);
                                menuMsgBod.innerHTML = "";
                                getAllResMsg();
                            })

                            cancelord.addEventListener("click", (e) => {
                                e.preventDefault();
                                orderCanceled(grpbtn, mid, "orderById");
                                socket.emit("resorderreply", restroID, usr, usrId);
                                menuMsgBod.innerHTML = "";
                                getAllResMsg();
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

};

(function () {
    let banerInfo = document.getElementById("bannerInfo");
    let banerBtn = document.getElementById("bannerbtn");
    let deletebanner = document.getElementById("deletebanner");
    let dscount = document.getElementById("dscountpercent");
    let bannerId = document.getElementById("bannerId").innerText;

    banerBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (banerInfo.value == "") {
            return false;
        }
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/menu/banner`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    bannerInfo: banerInfo.value,
                    discountpercent: dscount.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Banner Created Successfully :)");
                    banerInfo.value = "";
                    dscount.value = "";
                    setTimeout(() => {
                        location.reload();
                    }, 3000)
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
            const endpoint = `/api/v1/menu/banner/${bannerId}`
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
                    }, 3000)
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

async function orderConfirmed(val, usr, route) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/message/${route}/${usr}`
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                orderInfo: "confirmed"
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
};

async function orderCanceled(val, usr, route) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/message/${route}/${usr}`
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                orderInfo: "canceled"
            })
        }).then((response) => {
            load.classList.add("hidden");
            console.log(response);
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

(function () {
    let delBtn = document.getElementById("deleteCompany");
    let id = document.querySelector(".delrestroid").innerText;
    let user = document.querySelector(".delmenuid").innerText;

    delBtn.addEventListener("click", async () => {
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/menu/${id}/deleteRestro/${user}`
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
                    successAlert("Your Restaurant Has been Deleted :(");
                    window.setTimeout(() => {
                        location.assign(`/layouts/porti`);
                    }, 300)
                }
                else if (response.status === 404) {
                    errorAlert("No Resturant Found !!!")
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