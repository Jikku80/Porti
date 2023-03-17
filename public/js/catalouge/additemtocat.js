let discountedPercent = document.querySelector(".itemdiscountpercent").innerText;
let pgC = window.sessionStorage.getItem('paginate')

async function getAllCatalougeItem() {
    let pg;
    if (pgC === null) {
        pg = 1
    }
    else {
        pg = pgC
    }
    let fullpath = location.pathname
    let resultpath = fullpath.match("/catalouge/(.*)/")
    let next = document.querySelector(".next__catal")
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let subItems = document.querySelector(".your__items")
        subItems.innerHTML = "";
        let uid = document.querySelector(".currentuid")
        const endpoint = `/api/v1/catalouge/${resultpath[1]}/paginate/${pg}`
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
                            if (!el.coverImage) {
                                if (el.applydiscount !== true) {
                                    subItems.innerHTML +=
                                        `
                                        <div class="catalouge__card">
                                            <img class="catalouge__card__img" loading="lazy" src="/images/noimg.png" alt="catalouge__item__img">
                                            <div class="catalouge__card__det">
                                                <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                                <p class="catalouge__card__head goldn">${el.serialno}</p>
                                                <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                                <p class="catalouge__card__disc hidden"></p>
                                                <p class="catalouge__card__cat goldn">${el.category}</p>
                                                <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                                <div class="grp__btn">
                                                <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                                <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }
                                else {
                                    let disper = discountedPercent / 100
                                    let newp = el.price * disper;
                                    let newprice = el.price - newp;
                                    subItems.innerHTML +=
                                        `
                                        <div class="catalouge__card">
                                            <img class="catalouge__card__img" loading="lazy" src="/images/noimg.png" alt="catalouge__item__img">
                                            <div class="catalouge__card__det">
                                                <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                                <p class="catalouge__card__head goldn">${el.serialno}</p>
                                                <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                                <p class="catalouge__card__dis__per goldn">Discount : ${discountedPercent}%</p> 
                                                <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                                <p class="catalouge__card__cat goldn">${el.category}</p>
                                                <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                                <div class="grp__btn">
                                                    <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                                    <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }
                            }
                            else {
                                if (el.applydiscount !== true) {
                                    subItems.innerHTML +=
                                        `
                                    <div class="catalouge__card">
                                        <img class="catalouge__card__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                        <div class="catalouge__card__det">
                                            <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                            <p class="catalouge__card__head goldn">${el.serialno}</p>
                                            <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__disc hidden"></p>
                                            <p class="catalouge__card__cat goldn">${el.category}</p>
                                            <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                            <div class="grp__btn">
                                            <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                `
                                }
                                else {
                                    let disper = discountedPercent / 100
                                    let newp = el.price * disper;
                                    let newprice = el.price - newp;
                                    subItems.innerHTML +=
                                        `
                                        <div class="catalouge__card">
                                            <img class="catalouge__card__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                            <div class="catalouge__card__det">
                                                <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                                <p class="catalouge__card__head goldn">${el.serialno}</p>
                                                <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                                <p class="catalouge__card__dis__per goldn">Discount : ${discountedPercent}%</p> 
                                                <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                                <p class="catalouge__card__cat goldn">${el.category}</p>
                                                <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                                <div class="grp__btn">
                                                <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                                <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }
                            }

                        }
                    });

                    if (subItems.children.length == 0) {
                        subItems.innerHTML = `<h3 class="center goldn">Oopsie!!! No Items Found!!! :(</h3>`
                    }

                    if (subItems.children.length === 12) {
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
};

getAllCatalougeItem();

let page = document.querySelector(".paginate");
let next = document.querySelector(".next__catal");
let prev = document.querySelector(".prev__catal");


let x;
if (pgC === null) {
    x = 1
}
else {
    x = pgC
}

if (x == 1) {
    prev.classList.add("hidden")
}

next.addEventListener("click", async () => {
    let pg = ++x
    prev.classList.remove("hidden");
    window.sessionStorage.setItem("paginate", pg);
    window.location.hash = "#"
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let subItems = document.querySelector(".your__items")
        subItems.innerHTML = "";
        let fullpath = location.pathname;
        let resultpath = fullpath.match("/catalouge/(.*)/")
        const endpoint = `/api/v1/catalouge/${resultpath[1]}/paginate/${pg}`
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
                        if (!el.coverImage) {
                            if (el.applydiscount !== true) {
                                subItems.innerHTML +=
                                    `
                                    <div class="catalouge__card">
                                        <img class="catalouge__card__img" loading="lazy" src="/images/noimg.png" alt="catalouge__item__img">
                                        <div class="catalouge__card__det">
                                            <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                            <p class="catalouge__card__head goldn">${el.serialno}</p>
                                            <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__disc hidden"></p>
                                            <p class="catalouge__card__cat goldn">${el.category}</p>
                                            <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                            <div class="grp__btn">
                                            <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                            else {
                                let disper = discountedPercent / 100
                                let newp = el.price * disper;
                                let newprice = el.price - newp;
                                subItems.innerHTML +=
                                    `
                                    <div class="catalouge__card">
                                        <img class="catalouge__card__img" loading="lazy" src="/images/noimg.png" alt="catalouge__item__img">
                                        <div class="catalouge__card__det">
                                            <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                            <p class="catalouge__card__head goldn">${el.serialno}</p>
                                            <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__dis__per goldn">Discount : ${discountedPercent}%</p> 
                                            <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                            <p class="catalouge__card__cat goldn">${el.category}</p>
                                            <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                            <div class="grp__btn">
                                            <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                        }
                        else {
                            if (el.applydiscount !== true) {
                                subItems.innerHTML +=
                                    `
                                <div class="catalouge__card">
                                    <img class="catalouge__card__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                    <div class="catalouge__card__det">
                                        <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                        <p class="catalouge__card__head goldn">${el.serialno}</p>
                                        <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                        <p class="catalouge__card__disc hidden"></p>
                                        <p class="catalouge__card__cat goldn">${el.category}</p>
                                        <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                        <div class="grp__btn">
                                        <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                        <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            `
                            }
                            else {
                                let disper = discountedPercent / 100
                                let newp = el.price * disper;
                                let newprice = el.price - newp;
                                subItems.innerHTML +=
                                    `
                                    <div class="catalouge__card">
                                        <img class="catalouge__card__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                        <div class="catalouge__card__det">
                                            <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                            <p class="catalouge__card__head goldn">${el.serialno}</p>
                                            <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__dis__per goldn">Discount : ${discountedPercent}%</p> 
                                            <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                            <p class="catalouge__card__cat goldn">${el.category}</p>
                                            <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                            <div class="grp__btn">
                                            <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                        }
                    });
                    window.setTimeout(() => {
                        location.hash = "#CatalogeItemSec"
                    }, 200)
                    if (subItems.children.length === 12) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
                    }
                    if (subItems.innerHTML == "") {
                        next.classList.add("hidden");
                        subItems.innerHTML = `<h3 class="go__back center goldn">Oops!! Thats All You've Added So Far :)</h3>`
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
    window.sessionStorage.setItem("paginate", pg);
    try {
        let load = document.querySelector('.loader');
        window.location.hash = "#"
        load.classList.remove("hidden")
        if (x == 1) {
            prev.classList.add("hidden")
        }
        next.classList.remove("hidden");
        let subItems = document.querySelector(".your__items")
        subItems.innerHTML = "";
        let fullpath = location.pathname
        let resultpath = fullpath.match("/catalouge/(.*)/");
        const endpoint = `/api/v1/catalouge/${resultpath[1]}/paginate/${pg}`
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
                        if (!el.coverImage) {
                            if (el.applydiscount !== true) {
                                subItems.innerHTML +=
                                    `
                                    <div class="catalouge__card">
                                        <img class="catalouge__card__img" loading="lazy" src="/images/noimg.png" alt="catalouge__item__img">
                                        <div class="catalouge__card__det">
                                            <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                            <p class="catalouge__card__head goldn">${el.serialno}</p>
                                            <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__disc hidden"></p>
                                            <p class="catalouge__card__cat goldn">${el.category}</p>
                                            <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                            <div class="grp__btn">
                                            <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                            else {
                                let disper = discountedPercent / 100
                                let newp = el.price * disper;
                                let newprice = el.price - newp;
                                subItems.innerHTML +=
                                    `
                                    <div class="catalouge__card">
                                        <img class="catalouge__card__img" loading="lazy" src="/images/noimg.png" alt="catalouge__item__img">
                                        <div class="catalouge__card__det">
                                            <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                            <p class="catalouge__card__head goldn">${el.serialno}</p>
                                            <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__dis__per goldn">Discount : ${discountedPercent}%</p> 
                                            <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                            <p class="catalouge__card__cat goldn">${el.category}</p>
                                            <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                            <div class="grp__btn">
                                            <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                        }
                        else {
                            if (el.applydiscount !== true) {
                                subItems.innerHTML +=
                                    `
                                <div class="catalouge__card">
                                    <img class="catalouge__card__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                    <div class="catalouge__card__det">
                                        <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                        <p class="catalouge__card__head goldn">${el.serialno}</p>
                                        <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                        <p class="catalouge__card__disc hidden"></p>
                                        <p class="catalouge__card__cat goldn">${el.category}</p>
                                        <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                        <div class="grp__btn">
                                        <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                        <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            `
                            }
                            else {
                                let disper = discountedPercent / 100
                                let newp = el.price * disper;
                                let newprice = el.price - newp;
                                subItems.innerHTML +=
                                    `
                                    <div class="catalouge__card">
                                        <img class="catalouge__card__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                        <div class="catalouge__card__det">
                                            <h3 class="catalouge__card__head goldn">${el.name}</h3>
                                            <p class="catalouge__card__head goldn">${el.serialno}</p>
                                            <p class="catalouge__card__price goldn">${el.currency} ${el.price}</p>
                                            <p class="catalouge__card__dis__per goldn">Discount : ${discountedPercent}%</p> 
                                            <p class="catalouge__card__disc">After Discount : ${el.currency} ${newprice}</p>
                                            <p class="catalouge__card__cat goldn">${el.category}</p>
                                            <p class="catalouge__card__cat goldn">${el.subcategory}</p>
                                            <div class="grp__btn">
                                            <a href="/catalougetweaks/${el._id}?update" class="ygbtn">Update</a>
                                            <a href="/catalougetweaks/${el._id}?delete" class="redbtn">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }
                        }
                    });
                    window.setTimeout(() => {
                        location.hash = "#CatalogeItemSec"
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
    let shareLink = document.querySelector(".share__catal__link");
    let nm = document.querySelector(".uname__catal").innerText;
    // let nm = uname.replace(/\s/g, '')

    shareLink.innerHTML += `
        <div class="catalouge__link">
            <p class="head form__label">Your Catalouge Link</p>
            <p class="head form__label">Your Endpoint / Username is Case-Insensitive</p>
            <p class="catalouge__link__displayer catalqrLink">${location.host}/${nm}</p>
            <button class="copy__catalouge blackbtn smallbtn">Copy Link</button>
            <button class="blackbtn smallbtn" id="openmycatal">My Catalouge</button>
            <button class="blackbtn smallbtn" id="qrcatalouge">Generate QRCode</button>
            <button class="blackbtn smallbtn hidden" id="dqrcatalouge">Download QRCode</button>
            <p>Share In Social Sites</p>
            <button class="blackbtn fbbtn">Facebook</button>
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

    let fbbtn = document.querySelector(".fbbtn");
    fbbtn.addEventListener("click", () => {
        let params;
        let url = menuLinkDis.innerText;
        let shareUrl = `http://www.facebook.com/sharer/sharer.phpu=${url}`;
        window.open(shareUrl, "NewWindow", params);
    })
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
    let compHome = document.getElementById("compHomeDel");

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
            const endpoint = `/api/v1/catalouge/${restroId}/updateCompany`
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
                    compType: compType.value,
                    homedelivery: compHome.checked
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Company Details Updated Successfully :)");
                    setTimeout(() => {
                        location.reload();
                    }, 300)
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
    let bigb = document.querySelectorAll(".bigb");

    if (theme == "red") {
        bodsec.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        document.body.style.backgroundColor = "crimson";
        inpt.forEach(item => {
            item.style.borderColor = "white";
        })
        bigb.forEach(item => {
            item.style.animation = "blackShine 4s ease-in-out forwards infinite";
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
        bigb.forEach(item => {
            item.style.color = "black";
            item.style.animation = "blackShine 4s ease-in-out forwards infinite";
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
            const endpoint = `/api/v1/catalouge/catalogbanner`
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
            const endpoint = `/api/v1/catalouge/catalogbanner/${bannerId}`
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

    socket.on("catorders", (catid) => {
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
        menuMsgBod.innerHTML = "";
        const endpoint = `/api/v1/message/catOrders/${curcatid}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                let res = response.json();
                res.then((item) => {
                    let usrorders = item.comorders
                    usrorders.forEach(el => {
                        if (el.orderInfo) {
                            menuMsgBod.innerHTML +=
                                `
                                <div class="menu__msg__table__list">
                                    <div class="msg__table__bod">
                                        <p class="tabledet" >${el.name}</p>
                                        <p class="ordermsg hidden">${el.message}</p>
                                    </div>
                                    <p class="usersmalltag">${el.total}</p>
                                    <p class="hidden">${el.address}</p>
                                    <p class="hidden">${el.phn_no}</p>
                                    <p class="hidden msgid">${el._id}</p>
                                    <p class="hidden ordinfoo">${el.orderInfo}</p>
                                    <p class="hidden">${el.company}</p>
                                    <p class="hidden">${el.userId}</p>
                                </div>
                            `
                        }
                        else {
                            menuMsgBod.innerHTML +=
                                `
                                <div class="menu__msg__table__list">
                                    <div class="msg__table__bod">
                                        <p class="tabledet">${el.name}</p>
                                        <p class="ordermsg hidden">${el.message}</p>
                                        <p class="dotnoti"></p>
                                    </div>
                                    <p class="usersmalltag">${el.total}</p>
                                    <p class="hidden">${el.address}</p>
                                    <p class="hidden">${el.phn_no}</p>
                                    <p class="hidden msgid">${el._id}</p>
                                    <p class="hidden ordinfoo">${el.orderInfo}</p>
                                    <p class="hidden">${el.company}</p>
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
                            let usr = item.childNodes[1].childNodes[1].innerText;
                            let total = item.childNodes[3].innerText;
                            let add = item.childNodes[5].innerText;
                            let phn = item.childNodes[7].innerText;
                            let mid = item.childNodes[9].innerText;
                            let ordInfo = item.childNodes[11].innerText;
                            let companyID = item.childNodes[13].innerText;
                            let usrID = item.childNodes[15].innerText;

                            msgmidsec.classList.add("hidden");
                            msgRev.classList.remove("hidden");
                            tablePlace.innerText = usr;
                            if (ordInfo !== "undefined") {
                                msgRevbod.innerHTML =
                                    `
                                        <div class="oder__mesg">
                                            <p class="rdorng">Total Order Price : ${total}</p>
                                            <p class="ordermsg">${msg}</p>
                                            <p>Address : </p>
                                            <p class="ordermsg">${add}</p>
                                            <p>Phone No : </p>
                                            <p class="ordermsg">${phn}</p>
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
                                            <p class="rdorng">Order Total : ${total} </p>
                                            <p class="ordermsg">${msg}</p>
                                            <p>Address : </p>
                                            <p class="ordermsg">${add}</p>
                                            <p>Phone No : </p>
                                            <p class="ordermsg">${phn}</p>
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
                                socket.emit("catorderreply", companyID, usr, usrID);
                                menuMsgBod.innerHTML = "";
                                getAllCatMsg();
                            })

                            cancelord.addEventListener("click", (e) => {
                                e.preventDefault();
                                itemorderCanceled(grpbtn, mid);
                                socket.emit("catorderreply", companyID, usr, usrID);
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
        const endpoint = `/api/v1/message/itemOrderById/${usr}`
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
}

async function itemorderCanceled(val, usr) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/message/itemOrderById/${usr}`
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
    let id = document.querySelector(".delcompid").innerText;
    let user = document.querySelector(".delcatalid").innerText;
    let delpop = document.querySelector(".close__confirm");
    let confirmdel = document.querySelector(".confirmclose");
    let canceldel = document.querySelector(".cancelclose");

    canceldel.addEventListener("click", () => {
        delpop.classList.add("hidden");
    })

    delBtn.addEventListener("click", () => {
        delpop.classList.remove("hidden");
    })

    confirmdel.addEventListener("click", async () => {
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/${id}/deleteCompany/${user}`
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
                    successAlert("Your Company Has been Deleted :(");
                    window.setTimeout(() => {
                        location.assign(`/layouts/porti`);
                    }, 300)
                }
                else if (response.status === 404) {
                    errorAlert("No Company Found!!!")
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
    let menuMsgBod = document.querySelector(".menu__reserve__bod");
    let menuMsgSec = document.querySelector(".menu__reserve__secetion");
    let dummybtn = document.querySelector(".menu__reserve__btn");
    let resid = document.querySelector(".curcatid");
    let openMsgBod = document.querySelector(".menu__reserve__btn");
    let cancelMsgBod = document.querySelector(".cancel__reserve__sec");
    let dot = document.querySelector(".new__menu__reserve");

    let alrt = document.getElementById("catmsgalert");

    openMsgBod.addEventListener("click", () => {
        menuMsgSec.classList.remove("hidden");
        dummybtn.classList.add("hidden");
        dot.classList.add("hidden");
        getAllResReserve();
    })

    socket.on("return", (restoid, userid) => {
        if (resid.innerText == restoid) {
            getAllResReserve();
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

async function getAllResReserve() {
    let id = document.querySelector(".curcatid").innerText;
    let menuReserveBod = document.querySelector(".menu__reserve__bod__prev")

    try {
        const endpoint = `/api/v1/catalouge/return/${id}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                let res = response.json();
                menuReserveBod.innerHTML = "";
                res.then(items => {
                    let item = items.resorders
                    item.forEach(el => {
                        if (el.returnInfo) {
                            menuReserveBod.innerHTML +=
                                `
                                <div class="menu__reserve__table__list">
                                    <div class="msg__table__bod">
                                        <p class="tabledet">${el.name}</p>
                                    </div>
                                    <p class="usersmalltag">${el.product}</p>
                                    <p class="hidden">${el.date}</p>
                                    <p class="hidden">${el.phn_no}</p>
                                    <p class="hidden msgid">${el._id}</p>
                                    <p class="hidden ordinfoo">${el.returnInfo}</p>
                                    <p class="hidden">${el.company}</p>
                                    <p class="hidden">${el.userId}</p>
                                    <p class="hidden">${el.message}</p>
                                </div>
                        `
                        }
                        else {
                            menuReserveBod.innerHTML +=
                                `
                                <div class="menu__reserve__table__list">
                                    <div class="msg__table__bod">
                                        <p class="tabledet">${el.name}</p>
                                        <p class="dotnoti"></p>
                                    </div>
                                    <p class="usersmalltag">${el.product}</p>
                                    <p class="hidden">${el.date}</p>
                                    <p class="hidden">${el.phn_no}</p>
                                    <p class="hidden msgid">${el._id}</p>
                                    <p class="hidden ordinfoo">${el.returnInfo}</p>
                                    <p class="hidden">${el.company}</p>
                                    <p class="hidden">${el.userId}</p>
                                    <p class="hidden">${el.message}</p>
                                </div>
                        `

                        }
                    })
                    let msgTab = document.querySelectorAll(".menu__reserve__table__list");
                    let msgRev = document.querySelector(".menu__reveived__reserve");
                    let tablePlace = document.querySelector(".reservename");
                    let msgRevbod = document.querySelector(".menu__reveived__reserve__bod");
                    let cancelmsgtab = document.querySelector(".cancel__reveived__reserve");
                    let msgmidsec = document.querySelector(".menu__reserve__mid__sec");
                    cancelmsgtab.addEventListener("click", () => {
                        msgRev.classList.add("hidden");
                        msgmidsec.classList.remove("hidden");
                    })

                    msgTab.forEach(item => {
                        item.addEventListener("click", () => {
                            let usr = item.childNodes[1].childNodes[1].innerText;
                            let product = item.childNodes[3].innerText;
                            let date = item.childNodes[5].innerText;
                            let phn = item.childNodes[7].innerText;
                            let mid = item.childNodes[9].innerText;
                            let bookInfo = item.childNodes[11].innerText;
                            let restroID = item.childNodes[13].innerText;
                            let usrId = item.childNodes[15].innerText;
                            let message = item.childNodes[17].innerText;
                            msgmidsec.classList.add("hidden");
                            msgRev.classList.remove("hidden");
                            tablePlace.innerText = usr;
                            if (bookInfo !== "undefined") {
                                msgRevbod.innerHTML =
                                    `
                                        <div class="oder__mesg">
                                            <p>${usr} Reservation : </p>
                                            <p>Returning Product</p>
                                            <p class="ordermsg">${product}</p>
                                            <p>Date : </p>
                                            <p class="rdorng">${date}</p>
                                            <p>Message : </p>
                                            <p class="rdorng">${message}</p>
                                            <p>Phone No : </p>
                                            <p class="rdorng">${phn}</p>
                                            <div class="grp__button hidden">
                                                <button class="confirmreserve ordbtn">Confirm</button>
                                                <button class="cancelreserve ordbtn">Cancel</button>
                                            </div>
                                            <p class="rdorng">${bookInfo}</p>
                                        </div>
                                    `
                            }
                            else {
                                msgRevbod.innerHTML =
                                    `
                                        <div class="oder__mesg">
                                            <p>${usr} Reservation : </p>
                                            <p>Returning Product : </p>
                                            <p class="ordermsg">${product}</p>
                                            <p>Date : </p>
                                            <p class="rdorng">${date}</p>
                                            <p>Message : </p>
                                            <p class="rdorng">${message}</p>
                                            <p>Phone No : </p>
                                            <p class="rdorng">${phn}</p>
                                            <div class="grp__button">
                                                <button class="confirmreserve ordbtn">Confirm</button>
                                                <button class="cancelreserve ordbtn">Cancel</button>
                                            </div>
                                        </div>
                                    `
                            }
                            let confirmord = document.querySelector(".confirmreserve");
                            let cancelord = document.querySelector(".cancelreserve");
                            let grpbtn = document.querySelector(".grp__button");
                            const socket = io();

                            confirmord.addEventListener("click", (e) => {
                                e.preventDefault();
                                reserveConfirmed(grpbtn, mid, "returnById");
                                socket.emit("returnreply", restroID, usrId);
                                menuReserveBod.innerHTML = "";
                                getAllResReserve()
                            })

                            cancelord.addEventListener("click", (e) => {
                                e.preventDefault();
                                reserveCanceled(grpbtn, mid, "returnById");
                                socket.emit("returnreply", restroID, usrId);
                                menuReserveBod.innerHTML = "";
                                getAllResReserve()
                            })
                        })
                    })
                })
            } else {
                console.log(response);
                errorAlert("Error Fetching Returns!!!")

            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

async function reserveConfirmed(val, usr, route) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/${route}/${usr}`
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                returnInfo: "confirmed"
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("You Confirmed A Return :)");
                val.innerHTML = "";
                val.innerHTML = `<p class="grncf">Return Accepted</p>`
            }
            else if (response.status === 404) {
                errorAlert("Return Has been Deleted By Sender !!!")
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

async function reserveCanceled(val, usr, route) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/${route}/${usr}`
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                returnInfo: "canceled"
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("You cancelled a return :(");
                val.innerHTML = "";
                val.innerHTML = `<p class="grncf">Return Cancelled</p>`
            }
            else if (response.status === 404) {
                errorAlert("Return Has been Deleted By Sender !!!")
            }
            else {
                console.log(response);
                errorAlert("Error Fetching return!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

(function () {
    let apply = document.querySelector("#updateDiscountToAll");
    let remve = document.querySelector("#removeDiscountToAll");
    let usr = document.querySelector(".currentuid").innerText;
    apply.addEventListener("click", async () => {
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/applydiscount/${usr}`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Discount Applied in all items :(");
                }
                else if (response.status === 404) {
                    errorAlert("No items found !!!")
                }
                else {
                    console.log(response);
                    errorAlert("Creation error, Update Failed!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })

    remve.addEventListener("click", async () => {
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/removediscount/${usr}`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Discount Removed in all items :(");
                }
                else if (response.status === 404) {
                    errorAlert("No items found !!!")
                }
                else {
                    console.log(response);
                    errorAlert("Creation error, Update Failed!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})();

(async function () {
    let userid = document.querySelector(".currentuid").innerText;
    let returnnoti = document.querySelector(".new__menu__reserve");
    let ordnoti = document.querySelector(".new__menu__msg");

    try {
        const endpoint = `/api/v1/catalouge/getnewordernoti/${userid}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {

            if (response.status === 200) {
                let res = response.json();
                res.then(item => {
                    let data = item.neworder
                    let secdata = item.newreturn
                    if (data.length !== 0) {
                        ordnoti.classList.remove("hidden");
                    }

                    if (secdata.length !== 0) {
                        returnnoti.classList.remove("hidden");
                    }
                })
            } else {
                errorAlert("Order fetching error!!!")
                console.log(response);
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})();

(function () {
    let termsModalbtn = document.getElementById("termsandcond");
    let privacypolmodalbtn = document.getElementById("privacypol");
    let termbod = document.querySelector(".termservice");
    let privbod = document.querySelector(".privacypolicies");
    let cancelterm = document.querySelector(".cancelterms");
    let cancelpriv = document.querySelector(".cancelprivacypolicies");

    termsModalbtn.addEventListener("click", () => {
        termbod.classList.remove("hidden");
    })

    cancelterm.addEventListener("click", () => {
        termbod.classList.add("hidden");
    })

    privacypolmodalbtn.addEventListener("click", () => {
        privbod.classList.remove("hidden");
    })

    cancelpriv.addEventListener("click", () => {
        privbod.classList.add("hidden");
    })

    let updateTerms = document.getElementById("updateTerms");
    let serviceTerms = document.getElementById("termsValue");
    let updatePolicies = document.getElementById("updatePolicies");
    let privacyPolicies = document.getElementById("policiesValue");

    let restroId = document.querySelector(".comp__id").innerText;

    updateTerms.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/${restroId}/updateCompany`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    serviceTerms: serviceTerms.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Terms and Conditions Updated Successfully :)");
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

    updatePolicies.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/${restroId}/updateCompany`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    privacyPolicies: privacyPolicies.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Privacy Policies Updated Successfully :)");
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