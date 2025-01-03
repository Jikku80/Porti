let catalougeSearchBar = document.querySelector("#catalougeSearch");
let compColor = document.querySelector(".comp__color").innerText;
let focusColor = document.querySelector(".focus__color").innerText;
let fontColor = document.querySelector(".font__color").innerText;
let fontFam = document.querySelector(".font__fam").innerText;
let catalogeUserId = document.querySelector(".comp__user__id").innerText;

catalougeSearchBar.addEventListener("keypress", async (e) => {
    if (catalougeSearchBar.value < 1 || catalougeSearchBar.value == "" || catalougeSearchBar.value == null) {
        return false;
    }
    if (e.key == "Enter" || e.key == "Search") {
        let searchValue = catalougeSearchBar.value;
        let searchLowNam = searchValue.toLowerCase();
        let subItems = document.querySelector(".catalouge__items");
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
                            addCardElem(el);
                        });
                        openimg();
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
        catalougeSearchBar.value = "";
    }
});

(function () {
    allItems = document.querySelector('.get__all__items');
    allItems.style.backgroundColor = focusColor;
    allItems.addEventListener("click", () => {
        location.reload();
    })
})();

window.addEventListener("load", async () => {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let subItemModel = document.querySelector(".sub__cat__list");
        subItemModel.classList.add("hidden");
        let pagi = document.querySelector(".paginate");
        if (pagi.classList.contains("hidden")) {
            pagi.classList.remove("hidden");
        }
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
                    let menuItm = document.querySelector(".categories__catalouge");
                    result.forEach(item => {
                        menuItm.innerHTML += `<h3 class="catalouge__cate__list">${item}</h3>`
                    })

                    let catalougeItems = document.querySelectorAll(".catalouge__cate__list");

                    catalougeItems.forEach(item => {
                        item.style.backgroundColor = focusColor;
                        item.style.color = fontColor;
                        item.style.fontFamily = fontFam;
                        item.addEventListener("click", async (e) => {
                            e.preventDefault();
                            let cate = item.innerText;
                            try {
                                let load = document.querySelector('.loader');
                                load.classList.remove("hidden")
                                let subItm = document.querySelector(".sub__categories__catalouge");
                                subItm.innerHTML = "";
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
                                        let catalougeItems = document.querySelector(".catalouge__items");
                                        catalougeItems.innerHTML = "";
                                        res.then(result => {
                                            result.forEach(item => {
                                                if (typeof (item) !== "object") {
                                                    subItemModel.classList.remove("hidden");
                                                    let subItemHeader = document.querySelector(".sub__cat__head ");
                                                    subItemHeader.innerText = cate + " Sub Categories | SGroup"
                                                    subItm.innerHTML += `<h3 class="catalouge__subcate__list">${item}</h3>`
                                                    subItemHeader.style.color = focusColor;
                                                }
                                                else {
                                                    subItemModel.classList.add('hidden');
                                                    addCardElem(item);
                                                    openimg();
                                                }
                                            })
                                            let subCateList = document.querySelectorAll(".catalouge__subcate__list")
                                            subCateList.forEach(item => {
                                                item.style.fontFamily = fontFam;
                                                item.addEventListener("mouseover", () => {
                                                    item.style.color = focusColor;
                                                })
                                                item.addEventListener("mouseout", () => {
                                                    item.style.color = fontColor;
                                                })
                                                item.addEventListener("click", async (e) => {
                                                    e.preventDefault();
                                                    subItemModel.classList.add("hidden");
                                                    let subcate = item.innerText;
                                                    try {
                                                        load.classList.remove("hidden");
                                                        let catalougeItems = document.querySelector(".catalouge__items");
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
                                                                        addCardElem(item)
                                                                    })
                                                                    openimg();
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
})

function addCardElem(el) {
    let catalougeItems = document.querySelector(".catalouge__items");
    if (el.coverImage) {
        catalougeItems.innerHTML +=
            `
            <div class="catal__card">
                <img class="catal__card__img imgFull pointer" src="${el.coverImage}" alt="catalouge__item__image">
                <div class="catal__card__det">
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">Name: </p>
                        <p class="card__dark__text catal__name cardtxt">${el.name}</p>
                    </div>
                    <div class="card__sub__sec serialsec">
                        <p class="catal__card__head cardtxt">S.No: </p>
                        <p class="card__dark__text catal__sno">${el.serialno}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">Price: </p>
                        <p class="card__dark__text catal__price">${el.currency} ${el.price}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">Group: </p>
                        <p class="card__dark__text catal__category cardtxt">${el.category}</p>
                    </div>
                    <div class="card__sub__sec subcatsec">
                        <p class="catal__card__head cardtxt">SGroup: </p>
                        <p class="card__dark__text catal__subcategory cardtxt">${el.subcategory}</p>
                    </div>
                    <div class="card__sub__sec detailsec">
                        <p class="catal__card__head cardtxt">Detail: </p>
                        <p class="card__dark__text catal__detail cardtxt">${el.detail}</p>
                    </div>
                </div>
            </div>
        `
    }
    else {
        catalougeItems.innerHTML +=
            `
            <div class="catal__card">
                <img class="catal__card__img imgFull pointer" src="/images/upload.png" alt="catalouge__item__image">
                <div class="catal__card__det">
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">Name: </p>
                        <p class="card__dark__text catal__name cardtxt">${el.name}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">S.No: </p>
                        <p class="card__dark__text catal__sno">${el.serialno}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">Price: </p>
                        <p class="card__dark__text catal__price">${el.currency} ${el.price}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">Group: </p>
                        <p class="card__dark__text catal__category cardtxt">${el.category}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">SGroup: </p>
                        <p class="card__dark__text catal__subcategory cardtxt">${el.subcategory}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head cardtxt">Detail: </p>
                        <p class="card__dark__text catal__detail cardtxt">${el.detail}</p>
                    </div>
                </div>
            </div>
        `
    }
    openimg();
    let catCard = document.querySelectorAll(".catal__card");
    let catTxt = document.querySelectorAll(".cardtxt")
    catCard.forEach(item => {
        item.style.backgroundColor = focusColor
        item.style.fontFamily = fontFam
    })

    catTxt.forEach(item => {
        item.style.color = fontColor
    })
}

let modelCanceler = document.querySelector(".cancel__subModel")
modelCanceler.addEventListener("click", () => {
    let subModel = document.querySelector(".sub__cat__list ");
    subModel.classList.add('hidden');
});

(function () {
    let subItems = document.querySelector(".catalouge__items")
    let next = document.querySelector(".next__catal");

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
    let page = document.querySelector(".paginate");
    let next = document.querySelector(".next__catal");
    let prev = document.querySelector(".prev__catal");
    let pgC = window.sessionStorage.getItem('secpaginate');

    window.addEventListener("load", async () => {
        let pg;
        if (pgC === null) {
            pg = 1
        }
        else {
            pg = pgC
        }
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            let subItems = document.querySelector(".catalouge__items")
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
                            addCardElem(el)
                        });
                        openimg();
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
        window.sessionStorage.setItem("secpaginate", pg);
        location.hash = "#"
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            let subItems = document.querySelector(".catalouge__items")
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
                            addCardElem(el)
                        });
                        openimg();
                        window.setTimeout(() => {
                            location.hash = "#compcatalouge"
                        }, 200)
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
        window.sessionStorage.setItem("secpaginate", pg);
        try {
            let load = document.querySelector('.loader');
            location.hash = "#"
            load.classList.remove("hidden")
            if (x == 1) {
                prev.classList.add("hidden")
            }
            next.classList.remove("hidden");
            let subItems = document.querySelector(".catalouge__items")
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
                            addCardElem(el);
                        });
                        openimg();
                        window.setTimeout(() => {
                            location.hash = "#compcatalouge"
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
})();

(function () {
    let defaultBtn = document.getElementById("defaultfirstCatTheme");
    let fontColor = "gray";
    let focusColor = "rgb(243, 243, 243)";
    let backColor = "white";
    let fontFam = "Arial";
    let id = document.getElementById('firstCatid').innerText;

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
                    themecolor: backColor,
                    focusColor: focusColor,
                    fontFam: fontFam
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
    let upPortTheme = document.getElementById("changefirstCatTheme");
    let fontColor = document.getElementById("firstCatFontColor");
    let focusColor = document.getElementById("firstCatFocusColor");
    let backColor = document.getElementById("firstCatBackColor");
    let fontFam = document.getElementById("firstCatFontFam");
    let id = document.getElementById('firstCatid').innerText;

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
                    themecolor: backColor.value,
                    focusColor: focusColor.value,
                    fontFam: fontFam.value
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
    let footer = document.querySelector(".company__footer");
    let btns = document.querySelectorAll(".pag__btn");
    let card = document.querySelectorAll(".catal__card");
    let ctxt = document.querySelectorAll(".cardtxt")
    let sec = document.querySelector(".catalouge__one__sec");

    sec.style.backgroundColor = compColor;

    card.forEach(item => {
        item.style.backgroundColor = focusColor;
        item.style.fontFamily = fontFam
    })

    ctxt.forEach(item => {
        item.style.color = fontColor;
        item.style.fontFamily = fontFam;
    })

    btns.forEach(item => {
        item.style.color = focusColor;
        item.style.border = `2px solid ${focusColor}`;

        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = focusColor;
            item.style.color = fontColor;
        })

        item.addEventListener("mouseout", () => {
            item.style.color = focusColor;
            item.style.backgroundColor = "transparent"
        })
    })

    catalougeSearchBar.style.color = fontColor;
    catalougeSearchBar.style.borderBottom = `2px solid ${focusColor}`;
    footer.style.backgroundColor = focusColor;
})();

window.addEventListener("load", async () => {
    let pgCount = document.querySelector(".pageCount");
    let orgId = document.querySelector(".cpid").innerText;
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
            window.sessionStorage.setItem('pageCounter', newCount);
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
});

(function () {
    let terms = document.querySelector(".sec__terms");
    let policies = document.querySelector(".sec__policies");
    let termbod = document.querySelector(".terms__sec");
    let privbod = document.querySelector(".policies__sec");
    let cancelterm = document.querySelector(".hideterms");
    let cancelpriv = document.querySelector(".hideprivacypolicies");

    cancelterm.addEventListener("click", () => {
        termbod.classList.add("hidden");
    })

    cancelpriv.addEventListener("click", () => {
        privbod.classList.add("hidden");
    })

    terms.addEventListener("click", () => {
        termbod.classList.remove("hidden");
    });

    policies.addEventListener("click", () => {
        privbod.classList.remove("hidden");
    });
})();

function openimg() {
    const fullImg = document.querySelectorAll('.imgFull');
    let imgsec = document.querySelector(".fullimg__sec");
    let imgbod = document.querySelector(".fullimg__bod");
    let cancelimgsec = document.querySelector(".cancelimgsec");

    fullImg.forEach(img => {
        img.addEventListener("click", () => {
            imgsec.classList.remove("hidden");
            imgbod.innerHTML = "";
            imgbod.innerHTML =
                `
                    <img class="fullimgmode" draggable="false" src="${img.src}" alt="img" />
                `
        })
    });

    cancelimgsec.addEventListener("click", () => {
        imgsec.classList.add("hidden");
        imgbod.innerHTML = "";
    })
}