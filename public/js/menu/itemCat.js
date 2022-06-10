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
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result
                    items.forEach(el => {
                        subItems.innerHTML +=
                            `
                                <div class="menu__card">
                                    <img class="menu__card__img" src="/images/menu-pic/${el.coverImage}">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head">${el.name}</h3>
                                        <p class="menu__card__price">${el.price}</p>
                                        <p class="menu__card__detail">${el.detail}</p>
                                    </div>
                                </div>
                            `
                    });
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
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result
                    items.forEach(el => {
                        subItems.innerHTML +=
                            `
                                <div class="menu__card">
                                    <img class="menu__card__img" src="/images/menu-pic/${el.coverImage}">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head">${el.name}</h3>
                                        <p class="menu__card__price">${el.price}</p>
                                        <p class="menu__card__detail">${el.detail}</p>
                                    </div>
                                </div>
                            `
                    });
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
        const endpoint = `/api/v1/menu/allCategories/${resultpath[1]}`
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
                                const endpoint = `/api/v1/menu/${resultpath[1]}/findbycate/${cate}`
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
                                                subItems.innerHTML +=
                                                    `
                                                        <div class="menu__card">
                                                            <img class="menu__card__img" src="/images/menu-pic/${el.coverImage}">
                                                            <div class="menu__card__det">
                                                                <h3 class="menu__card__head">${el.name}</h3>
                                                                <p class="menu__card__price">${el.price}</p>
                                                                <p class="menu__card__detail">${el.detail}</p>
                                                            </div>
                                                        </div>
                                                    `
                                            });
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
            const endpoint = `/api/v1/menu/${resultpath[1]}/searchItems`
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
                                subItems.innerHTML +=
                                    `
                                    <div class="menu__card">
                                        <img class="menu__card__img" src="/images/menu-pic/${el.coverImage}">
                                        <div class="menu__card__det">
                                            <h3 class="menu__card__head">${el.name}</h3>
                                            <p class="menu__card__price">${el.price}</p>
                                            <p class="menu__card__detail">${el.detail}</p>
                                        </div>
                                    </div>
                                `
                            }
                        });
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
grabAll.addEventListener("click", async () => {
    let pg = 1
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        page.classList.remove("hidden");
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
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result
                    items.forEach(el => {
                        subItems.innerHTML +=
                            `
                                <div class="menu__card">
                                    <img class="menu__card__img" src="/images/menu-pic/${el.coverImage}">
                                    <div class="menu__card__det">
                                        <h3 class="menu__card__head">${el.name}</h3>
                                        <p class="menu__card__price">${el.price}</p>
                                        <p class="menu__card__detail">${el.detail}</p>
                                    </div>
                                </div>
                            `
                    });
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

if (sub.children.length === 12) {
    next.classList.remove("hidden");
} else {
    next.classList.add("hidden");
}

if (sub.children.length == 0) {
    sub.innerHTML = `<h3>Oopsie!!! No Items Found!!! :(</h3>`
}


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