let fullpath = location.pathname
let resultpath = document.querySelector(".menu__user__id").innerText;
let page = document.querySelector(".paginate");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let sub = document.querySelector(".sub__items");
let pgC = window.sessionStorage.getItem('secpaginate');

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

    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let subItems = document.querySelector(".sub__items")
        subItems.innerHTML = "";
        window.location.hash = "#"
        const endpoint = `/api/v1/menu/${resultpath}/paginate/${pg}`
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
                            subItems.innerHTML +=
                                `
                                    <div class="menu__card">
                                        <img class="menu__card__img imgFull pointer" src="${el.coverImage}" alt="menu__item__image">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head">${el.name}</h3>
                                            <p class="menu__card__price">${el.price}</p>
                                            <p class="menu__card__detail">${el.detail}</p>
                                        </div>
                                    </div>
                                `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                <div class="menu__card">
                                    <img class="menu__card__img imgFull pointer" src="/images/noimg.png" alt="menu__item__image">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head">${el.name}</h3>
                                        <p class="menu__card__price">${el.price}</p>
                                        <p class="menu__card__detail">${el.detail}</p>
                                    </div>
                                </div>
                            `
                        }
                    });
                    openimg();
                    window.setTimeout(() => {
                        window.location.hash = "#foodItem"
                    }, 200)
                    if (sub.children.length === 12) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
                    }
                    if (subItems.innerHTML == "") {
                        next.classList.add("hidden");
                        subItems.innerHTML = `<h3 class="go__back">Oops!! Thats All We Got, Please Go Back To Order Sometihng Yummy :)</h3>`
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
        load.classList.remove("hidden")
        if (x == 1) {
            prev.classList.add("hidden")
        }
        next.classList.remove("hidden");
        let subItems = document.querySelector(".sub__items")
        subItems.innerHTML = "";
        window.location.hash = "#"
        const endpoint = `/api/v1/menu/${resultpath}/paginate/${pg}`
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
                            subItems.innerHTML +=
                                `
                                    <div class="menu__card">
                                        <img class="menu__card__img imgFull pointer" src="${el.coverImage}" alt="menu__item__image">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head">${el.name}</h3>
                                            <p class="menu__card__price">${el.price}</p>
                                            <p class="menu__card__detail">${el.detail}</p>
                                        </div>
                                    </div>
                                `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                    <div class="menu__card">
                                        <img class="menu__card__img imgFull pointer" src="/images/noimg.png" alt="menu__item__image">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head">${el.name}</h3>
                                            <p class="menu__card__price">${el.price}</p>
                                            <p class="menu__card__detail">${el.detail}</p>
                                        </div>
                                    </div>
                                `
                        }
                    });
                    openimg();
                    window.setTimeout(() => {
                        window.location.hash = "#foodItem"
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

window.addEventListener("load", async () => {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/menu/allCategories/${resultpath}`
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
                    let menuItm = document.querySelector(".category");
                    result.forEach(item => {
                        menuItm.innerHTML += `<h3 class="menu__items">${item}</h3>`
                    })

                    let menItems = document.querySelectorAll(".menu__items");
                    let subItems = document.querySelector(".sub__items")

                    menItems.forEach(item => {
                        item.addEventListener("click", async (e) => {
                            e.preventDefault();
                            let cate = item.innerText;
                            try {
                                let load = document.querySelector('.loader');
                                load.classList.remove("hidden")
                                page.classList.add("hidden");
                                subItems.innerHTML = "";
                                const endpoint = `/api/v1/menu/${resultpath}/findbycate/${cate}`
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
                                                if (el.coverImage) {
                                                    subItems.innerHTML +=
                                                        `
                                                            <div class="menu__card">
                                                                <img class="menu__card__img imgFull pointer" src="${el.coverImage}" alt="menu__item__image">
                                                                <div class="menu__card__det">
                                                                    <h3 class="menu__card__head">${el.name}</h3>
                                                                    <p class="menu__card__price">${el.price}</p>
                                                                    <p class="menu__card__detail">${el.detail}</p>
                                                                </div>
                                                            </div>
                                                        `
                                                }
                                                else {
                                                    subItems.innerHTML +=
                                                        `
                                                        <div class="menu__card">
                                                            <img class="menu__card__img imgFull pointer" src="/images/noimg.png" alt="menu__item__image">
                                                            <div class="menu__card__det">
                                                                <h3 class="menu__card__head">${el.name}</h3>
                                                                <p class="menu__card__price">${el.price}</p>
                                                                <p class="menu__card__detail">${el.detail}</p>
                                                            </div>
                                                        </div>
                                                    `
                                                }
                                            });
                                            openimg();
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

let searchBar = document.querySelector(".searchbar");

searchBar.addEventListener("keypress", async (e) => {
    if (searchBar.value < 1 || searchBar.value == "" || searchBar.value == null) {
        return false;
    }
    if (e.key == "Enter" || e.key == "Search") {
        let searchValue = searchBar.value;
        let searchLowNam = searchValue.toLowerCase();
        page.classList.add("hidden")
        let subItems = document.querySelector(".sub__items");
        try {
            e.preventDefault();
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            subItems.innerHTML = "";
            const endpoint = `/api/v1/menu/${resultpath}/searchItems`
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
                            let name = el.name
                            let cat = el.category
                            let lowCat = cat.toLowerCase();
                            let lowNam = name.toLowerCase();
                            if (lowNam == searchLowNam || lowCat == searchLowNam) {
                                if (el.coverImage) {
                                    subItems.innerHTML +=
                                        `
                                        <div class="menu__card">
                                            <img class="menu__card__img imgFull pointer" src="${el.coverImage}" alt="menu__item__image">
                                            <div class="menu__card__det">
                                                <h3 class="menu__card__head">${el.name}</h3>
                                                <p class="menu__card__price">${el.price}</p>
                                                <p class="menu__card__detail">${el.detail}</p>
                                            </div>
                                        </div>
                                    `
                                }
                                else {
                                    subItems.innerHTML +=
                                        `
                                        <div class="menu__card">
                                            <img class="menu__card__img imgFull pointer" src="/images/noimg.png" alt="menu__item__image">
                                            <div class="menu__card__det">
                                                <h3 class="menu__card__head">${el.name}</h3>
                                                <p class="menu__card__price">${el.price}</p>
                                                <p class="menu__card__detail">${el.detail}</p>
                                            </div>
                                        </div>
                                    `
                                }
                            }
                        });
                        openimg();
                        if (sub.children.length == 0) {
                            sub.innerHTML = `<h3>Oopsie!!! No Items Found!!! :(</h3>`
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
})

let grabAll = document.querySelector(".grab__all");
grabAll.addEventListener("click", () => {
    location.reload()
})
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
        page.classList.remove("hidden");
        let subItems = document.querySelector(".sub__items")
        subItems.innerHTML = "";
        const endpoint = `/api/v1/menu/${resultpath}/paginate/${pg}`
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
                            subItems.innerHTML +=
                                `
                                    <div class="menu__card">
                                        <img class="menu__card__img imgFull pointer" src="${el.coverImage}" alt="menu__item__image">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head">${el.name}</h3>
                                            <p class="menu__card__price">${el.currency}${el.price}</p>
                                            <p class="menu__card__detail">${el.detail}</p>
                                        </div>
                                    </div>
                                `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                    <div class="menu__card">
                                        <img class="menu__card__img imgFull pointer" src="/images/noimg.png" alt="menu__item__image">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head">${el.name}</h3>
                                            <p class="menu__card__price">${el.currency}${el.price}</p>
                                            <p class="menu__card__detail">${el.detail}</p>
                                        </div>
                                    </div>
                                `
                        }
                    });
                    openimg();
                    if (sub.children.length == 0) {
                        sub.innerHTML = `<h3>Oopsie!!! No Items Found!!! :(</h3>`
                    }
                    if (sub.children.length === 12) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
                    }

                    if (sub.children.length == 0) {
                        sub.innerHTML = `<h3>Oopsie!!! No Items Found!!! :(</h3>`
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


let dark = document.querySelector(".darkmode");
let bod = document.querySelector(".first__menu__bod")
dark.addEventListener("click", () => {
    if (!bod.classList.contains('white__bg')) {
        bod.classList.add('white__bg');
        bod.style.color = "chocolate";
        dark.innerHTML = `<img src="/images/off.png" />`
    } else {
        bod.classList.remove('white__bg');
        bod.style.color = "goldenrod"
        dark.innerHTML = `<img src="/images/on.png" />`
    }
})

window.addEventListener("load", async () => {
    let pgCount = document.querySelector(".pageCount");
    let orgId = document.querySelector(".rsid").innerText;
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
            console.log("click")
            imgsec.classList.remove("hidden");
            imgbod.innerHTML = "";
            imgbod.innerHTML =
                `
                    <img class="fullimgmode" src="${img.src}" alt="img" />
                `
        })
    });

    cancelimgsec.addEventListener("click", () => {
        imgsec.classList.add("hidden");
        imgbod.innerHTML = "";
    })
}