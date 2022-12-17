let iname = document.getElementById("itemname");
let iprice = document.getElementById('itemprice');
let icat = document.getElementById("itemcat");
let idetail = document.getElementById("itemdetail");
let icimg = document.getElementById("coverimage");
let additembtn = document.getElementById("addItemBtn");
// let itheme = "40bd001563085fc35165329ea1ff5c5ecbdbbeef"

additembtn.addEventListener("click", async (e) => {
    if (iname.value < 1 || iname.value == "" || iname.value == null) {
        return false;
    }
    if (iprice.value < 1 || iprice.value == "" || iprice.value == null) {
        return false;
    }
    if (icat.value < 1 || icat.value == "" || icat.value == null) {
        return false;
    }
    if (icimg.value < 1 || icimg.value == "" || icimg.value == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let subItems = document.querySelector(".sub__items")
    const formData = new FormData();
    formData.append("name", iname.value);
    formData.append("price", iprice.value);
    formData.append("category", icat.value);
    formData.append("detail", idetail.value);
    formData.append("coverImage", icimg.files[0]);
    const endpoint = '/api/v1/menu'
    try {
        await fetch((endpoint), {
            body: formData,
            method: 'POST'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 201) {
                successAlert("You Just Added a Item to your Menu :)");
                let result = response.json();
                result.then(item => {
                    let fResult = item.data.data
                    subItems.innerHTML += `
                                <div class="menu__card">
                                    <img class="menu__card__img" src="/images/menu-pic/${fResult.coverImage}" alt="food_item_pic">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head goldn">${fResult.name}</h3>
                                        <p class="menu__card__price goldn">${fResult.price}</p>
                                        <p class="menu__card__cat goldn">${fResult.category}</p>
                                        <p class="menu__card__detail goldn">${fResult.detail}</p>
                                        <a href="/tweaks/${fResult._id}?update" class="ygbtn">Update</a>
                                        <a href="/tweaks/${fResult._id}?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                        `
                })
            } else {
                console.log(response)
                errorAlert("Duplication Input error!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    iname.value = "",
        iprice.value = "",
        icat.value = "",
        idetail.value = "",
        icimg.value = ""
});


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
                        if (el.user._id === uid.innerText)
                            subItems.innerHTML +=
                                `
                                <div class="menu__card">
                                    <img class="menu__card__img" loading="lazy" src="/images/menu-pic/${el.coverImage}" alt="food_item_pic">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head goldn">${el.name}</h3>
                                        <p class="menu__card__price goldn">${el.price}</p>
                                        <p class="menu__card__cat goldn">${el.category}</p>
                                        <p class="menu__card__detail goldn">${el.detail}</p>
                                        <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                        <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
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
        const endpoint = `/api/v1/menu/${resultpath[1]}/paginate/${pg}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            load.classList.add("hidden");
            window.location.hash = "#";
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result
                    items.forEach(el => {
                        subItems.innerHTML +=
                            `
                                <div class="menu__card">
                                    <img class="menu__card__img" loading="lazy" src="/images/menu-pic/${el.coverImage}" alt="food_item_pic">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head goldn">${el.name}</h3>
                                        <p class="menu__card__price goldn">${el.price}</p>
                                        <p class="menu__card__cat goldn">${el.category}</p>
                                        <p class="menu__card__detail goldn">${el.detail}</p>
                                        <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                        <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
                    });
                    window.location.hash = "#foodItemSec"
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
        const endpoint = `/api/v1/menu/${resultpath[1]}/paginate/${pg}`
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
                                <div class="menu__card">
                                    <img class="menu__card__img" loading="lazy" src="/images/menu-pic/${el.coverImage}" alt="food_item_pic">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head goldn">${el.name}</h3>
                                        <p class="menu__card__price goldn">${el.price}</p>
                                        <p class="menu__card__cat goldn">${el.category}</p>
                                        <p class="menu__card__detail goldn">${el.detail}</p>
                                        <a href="/tweaks/${el._id}?update" class="ygbtn">Update</a>
                                        <a href="/tweaks/${el._id}?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
                    });
                    window.location.hash = "#foodItemSec"
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
            <p class="menu__link__displayer qrLink">${location.protocol}//${location.host}/menu/${nm}</p>
            <button class="copy__menu ygbtn smallbtn">Copy Link</button>
            <button class="ygbtn smallbtn" id="openMenu">My Menu</button>
            <button class="ygbtn smallbtn qrGen" id="qrmenu">Generate QRCode</button>
            <button class="ygbtn smallbtn downQr hidden" id="dqr">Download QRCode</button>
        </div>
    `
    let openMenu = document.getElementById("openMenu");
    openMenu.addEventListener("click", () => {
        window.open(`/menu/${nm}`)
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
                    resType: resType.value
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
        console.log("Hola from Porti")
    }
})();
