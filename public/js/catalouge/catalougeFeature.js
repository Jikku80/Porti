let catalougeSearchBar = document.querySelector("#catalougeSearch");
let compColor = document.querySelector(".comp__color").innerText;
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
    allItems.style.backgroundColor = compColor;
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
                        item.style.backgroundColor = compColor;
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
                                        res.then(result => {
                                            result.forEach(item => {
                                                if (typeof (item) !== "object") {
                                                    subItemModel.classList.remove("hidden");
                                                    let subItemHeader = document.querySelector(".sub__cat__head ");
                                                    subItemHeader.innerText = cate + " Sub Categories | SGroup"
                                                    subItm.innerHTML += `<h3 class="catalouge__subcate__list">${item}</h3>`
                                                    subItemHeader.style.color = compColor;
                                                }
                                                else {
                                                    let catalougeItems = document.querySelector(".catalouge__items");
                                                    catalougeItems.innerHTML = "";
                                                    subItemModel.classList.add('hidden');
                                                    addCardElem(item);
                                                }
                                            })
                                            let subCateList = document.querySelectorAll(".catalouge__subcate__list")
                                            subCateList.forEach(item => {
                                                item.addEventListener("mouseover", () => {
                                                    item.style.color = compColor;
                                                })
                                                item.addEventListener("mouseout", () => {
                                                    item.style.color = "white";
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
                <img class="catal__card__img imgFull" src="${el.coverImage}" alt="catalouge__item__image">
                <div class="catal__card__det">
                    <div class="card__sub__sec">
                        <p class="catal__card__head">Name: </p>
                        <p class="card__dark__text catal__name">${el.name}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">S.No: </p>
                        <p class="card__dark__text catal__sno">${el.serialno}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">Price: </p>
                        <p class="card__dark__text catal__price">${el.currency} ${el.price}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">Group: </p>
                        <p class="card__dark__text catal__category">${el.category}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">SGroup: </p>
                        <p class="card__dark__text catal__subcategory">${el.subcategory}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">Detail: </p>
                        <p class="card__dark__text catal__detail">${el.detail}</p>
                    </div>
                </div>
            </div>
        `
    }
    else {
        catalougeItems.innerHTML +=
            `
            <div class="catal__card">
                <img class="catal__card__img imgFull" src="/images/noimg.png" alt="catalouge__item__image">
                <div class="catal__card__det">
                    <div class="card__sub__sec">
                        <p class="catal__card__head">Name: </p>
                        <p class="card__dark__text catal__name">${el.name}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">S.No: </p>
                        <p class="card__dark__text catal__sno">${el.serialno}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">Price: </p>
                        <p class="card__dark__text catal__price">${el.currency} ${el.price}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">Group: </p>
                        <p class="card__dark__text catal__category">${el.category}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">SGroup: </p>
                        <p class="card__dark__text catal__subcategory">${el.subcategory}</p>
                    </div>
                    <div class="card__sub__sec">
                        <p class="catal__card__head">Detail: </p>
                        <p class="card__dark__text catal__detail">${el.detail}</p>
                    </div>
                </div>
            </div>
        `
    }
    fullPic()
}

function fullPic() {
    const fullImg = document.querySelectorAll('.imgFull');

    fullImg.forEach(img => {
        img.addEventListener("click", () => {
            window.open(img.src)
        })
    })
}
fullPic();

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


    let x = 1;

    if (x == 1) {
        prev.classList.add("hidden")
    }

    next.addEventListener("click", async () => {
        let pg = ++x
        prev.classList.remove("hidden");
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
                            addCardElem(el)
                        });
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
    let footer = document.querySelector(".company__footer");
    let btns = document.querySelectorAll(".pag__btn");

    btns.forEach(item => {
        item.style.color = compColor;
        item.style.border = `2px solid ${compColor}`;

        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = compColor;
            item.style.color = "white";
        })

        item.addEventListener("mouseout", () => {
            item.style.color = compColor;
            item.style.backgroundColor = "transparent"
        })
    })

    catalougeSearchBar.style.color = compColor;
    catalougeSearchBar.style.borderBottom = `2px solid ${compColor}`;
    footer.style.backgroundColor = compColor;
})();