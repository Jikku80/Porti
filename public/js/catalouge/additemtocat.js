(function () {
    let iname = document.getElementById("catitemname");
    let iprice = document.getElementById('catitemprice');
    let sn = document.getElementById('catitemsn');
    let icat = document.getElementById("catitemcat");
    let subcat = document.getElementById("subcatitemcat");
    let idetail = document.getElementById("catitemdetail");
    let icimg = document.getElementById("catcoverimage");
    let additembtn = document.getElementById("cataddItemBtn");
    let itheme = "51eac6b471a284d3341d8c0c63d0f1a286262a18"
    let yourItems = document.querySelector(".your__items");

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
        const formData = new FormData();
        formData.append("name", iname.value);
        formData.append("serialno", sn.value);
        formData.append("price", iprice.value);
        formData.append("category", icat.value);
        formData.append("subcategory", subcat.value);
        formData.append("detail", idetail.value);
        formData.append("theme", itheme);
        formData.append("coverImage", icimg.files[0]);
        const endpoint = '/api/v1/catalouge/'
        try {
            await fetch((endpoint), {
                body: formData,
                method: 'POST'
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("You Just Added a Item to your Catalouge :)");
                    let result = response.json();
                    result.then(item => {
                        let fResult = item.data.data
                        yourItems.innerHTML += `
                                <div class="catalouge__card">
                                    <img class="catalouge__card__img" loading="lazy" src="/images/catalouge/${fResult.coverImage}" alt="catalouge__item__img">
                                    <div class="catalouge__card__det">
                                        <h3 class="catalouge__card__head">${fResult.name}</h3>
                                        <p class="catalouge__card__head">${fResult.serialno}</p>
                                        <p class="catalouge__card__price">${fResult.price}</p>
                                        <p class="catalouge__card__cat">${fResult.category}</p>
                                        <p class="catalouge__card__cat">${fResult.subcategory}</p>
                                        <p class="catalouge__card__detail">${fResult.detail}</p>
                                        <a href="/${fResult._id}/catalougetweaks?update" class="ygbtn">Update</a>
                                        <a href="/${fResult._id}/catalougetweaks?delete" class="redbtn">Delete</a>
                                        </div>
                                    </div>
                        `
                    })
                } else {
                    console.log(response)
                    errorAlert("Invalid error!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
        iname.value = "",
            sn.value = "",
            iprice.value = "",
            icat.value = "",
            subcat.value = "",
            idetail.value = "",
            icimg.value = ""
    });
})();

async function getAllCatalougeItem() {
    let pg = 1
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
                        if (el.user._id === uid.innerText)
                            subItems.innerHTML +=
                                `
                                <div class="catalouge__card">
                                    <img class="catalouge__card__img" loading="lazy" src="/images/catalouge/${el.coverImage}" alt="catalouge__item__img">
                                    <div class="catalouge__card__det">
                                        <h3 class="catalouge__card__head">${el.name}</h3>
                                        <p class="catalouge__card__head">${el.serialno}</p>
                                        <p class="catalouge__card__price">${el.price}</p>
                                        <p class="catalouge__card__cat">${el.category}</p>
                                        <p class="catalouge__card__cat">${el.subcategory}</p>
                                        <p class="catalouge__card__detail">${el.detail}</p>
                                        <a href="/${el._id}/catalougetweaks?update" class="ygbtn">Update</a>
                                        <a href="/${el._id}/catalougetweaks?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
                    });

                    if (subItems.children.length == 0) {
                        subItems.innerHTML = `<h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
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

// (function () {
//     let subItems = document.querySelector(".your__items")

//     if (subItems.children.length == 0) {
//         subItems.innerHTML = `<h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
//     }
// })();

let page = document.querySelector(".paginate");
let next = document.querySelector(".next__catal");
let prev = document.querySelector(".prev__catal");


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
        let subItems = document.querySelector(".your__items")
        subItems.innerHTML = "";
        let fullpath = location.pathname
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
            window.location.hash = "#"
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result
                    items.forEach(el => {
                        subItems.innerHTML +=
                            `
                                <div class="catalouge__card">
                                    <img class="catalouge__card__img" loading="lazy" src="/images/catalouge/${el.coverImage}" alt="catalouge__item__img">
                                    <div class="catalouge__card__det">
                                        <h3 class="catalouge__card__head">${el.name}</h3>
                                        <p class="catalouge__card__head">${el.serialno}</p>
                                        <p class="catalouge__card__price">${el.price}</p>
                                        <p class="catalouge__card__cat">${el.category}</p>
                                        <p class="catalouge__card__cat">${el.subcategory}</p>
                                        <p class="catalouge__card__detail">${el.detail}</p>
                                        <a href="/${el._id}/catalougetweaks?update" class="ygbtn">Update</a>
                                        <a href="/${el._id}/catalougetweaks?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
                    });
                    window.location.hash = "#CatalougeItemSec"
                    if (subItems.children.length === 12) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
                    }
                    if (subItems.innerHTML == "") {
                        next.classList.add("hidden");
                        subItems.innerHTML = `<h3 class="go__back center">Oops!! Thats All You've Added So Far :)</h3>`
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
        let subItems = document.querySelector(".your__items")
        subItems.innerHTML = "";
        let fullpath = location.pathname
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
            window.location.hash = "#"
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result
                    items.forEach(el => {
                        subItems.innerHTML +=
                            `
                                <div class="catalouge__card">
                                    <img class="catalouge__card__img" loading="lazy" src="/images/catalouge/${el.coverImage}" alt="catalouge__item__img">
                                    <div class="catalouge__card__det">
                                        <h3 class="catalouge__card__head">${el.name}</h3>
                                        <p class="catalouge__card__head">${el.serialno}</p>
                                        <p class="catalouge__card__price">${el.price}</p>
                                        <p class="catalouge__card__cat">${el.category}</p>
                                        <p class="catalouge__card__cat">${el.subcategory}</p>
                                        <p class="catalouge__card__detail">${el.detail}</p>
                                        <a href="/${el._id}/catalougetweaks?update" class="ygbtn">Update</a>
                                        <a href="/${el._id}/catalougetweaks?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
                    });
                    window.location.hash = "#CatalougeItemSec"
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
    let fullpath = location.pathname
    let resultpath = fullpath.match("/catalouge/(.*)/")
    let uname = document.querySelector(".uname__catal").innerText;
    let nm = uname.replace(/\s/g, '')
    let itheme = "51eac6b471a284d3341d8c0c63d0f1a286262a18"

    shareLink.innerHTML += `
        <div class="catalouge__link">
            <p class="head">Your Catalouge Link</p>
            <p class="catalouge__link__displayer catalqrLink">${location.protocol}//${location.host}/${nm}/catalouge/${resultpath[1]}/${itheme}</p>
            <button class="copy__catalouge ygbtn smallbtn">Copy Link</button>
            <button class="ygbtn smallbtn" id="openmycatal">My Catalouge</button>
            <button class="ygbtn smallbtn" id="qrcatalouge">Generate QRCode</button>
            <button class="ygbtn smallbtn hidden" id="dqrcatalouge">Download QRCode</button>
        </div>
    `
    let openMenu = document.getElementById("openmycatal");
    openMenu.addEventListener("click", () => {
        window.open(`/${nm}/catalouge/${resultpath[1]}/${itheme}`)
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
    let restroId = document.querySelector(".comp__len").innerText;
    let updateRestroBtn = document.getElementById("updateCompBtn");
    let addRestroBtn = document.getElementById("addCompBtn");
    if (restroId >= 1) {
        addRestroBtn.classList.add("hidden")
        updateRestroBtn.classList.remove("hidden");
    } else {
        updateRestroBtn.classList.add("hidden");
        addRestroBtn.classList.remove('hidden');
    }
})();

(function () {
    let addRestroBtn = document.getElementById("addCompBtn");
    let resName = document.getElementById("compname");
    let compemail = document.getElementById("compemail");
    let compsocial = document.getElementById("compsocial");
    let comploc = document.getElementById("complocationLink");
    let resAddress = document.getElementById("compaddress");
    let compcontact = document.getElementById("compcontact");
    let resSlogan = document.getElementById("compslogan");
    let tmcolor = document.getElementById("companyColor");

    addRestroBtn.addEventListener("click", async (e) => {
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
            const endpoint = `/api/v1/catalouge/createCompany`
            await fetch(endpoint, {
                method: 'POST',
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
                    themecolor: tmcolor.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Company Details Updated Successfully :)");
                    window.setTimeout(() => {
                        location.reload();
                    }, 400);
                } else {
                    console.log(response);
                    errorAlert("Invalid input!!!")
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
    let updateRestroBtn = document.getElementById("updateCompBtn");
    let restroId = document.querySelector(".comp__id").innerText;
    let resName = document.getElementById("compname");
    let resAddress = document.getElementById("compaddress");
    let compcontact = document.getElementById("compcontact");
    let resSlogan = document.getElementById("compslogan");
    let compemail = document.getElementById("compemail");
    let compsocial = document.getElementById("compsocial");
    let comploc = document.getElementById("complocationLink");
    let compcolor = document.getElementById("companyColor");

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
                    themecolor: compcolor.value
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
    const upImg = document.getElementById("compUpdateImgBtn");
    const img = document.getElementById("compcoverimage");
    const id = document.querySelector(".compimg__id").innerText;
    upImg.addEventListener("click", async (e) => {
        if (img.files[0] < 1 || img.files[0] == "" || img.files[0] == null) {
            return false;
        }
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const formData = new FormData();
        formData.append("coverImage", img.files[0]);
        const endpoint = `/api/v1/catalouge/${id}/updateCompanyImage`
        try {
            await fetch(endpoint, {
                body: formData,
                method: 'PATCH'
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Company Cover Image has been updated :)");
                } else {
                    errorAlert("Invalid Image!!!")
                }
            })

        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})();