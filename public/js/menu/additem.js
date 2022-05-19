let iname = document.getElementById("itemname");
let iprice = document.getElementById('itemprice');
let icat = document.getElementById("itemcat");
let idetail = document.getElementById("itemdetail");
let icimg = document.getElementById("coverimage");
let additembtn = document.getElementById("addItemBtn");
let itheme = "40bd001563085fc35165329ea1ff5c5ecbdbbeef"

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
    formData.append("price", iprice.value);
    formData.append("category", icat.value);
    formData.append("detail", idetail.value);
    formData.append("theme", itheme);
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
                // window.setTimeout(() => {
                //     location.assign(`/`);
                // }, 400);
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

if (sub.children.length === 2) {
    next.classList.remove("hidden");
} else {
    next.classList.add("hidden");
}

if (sub.children.length == 0) {
    sub.innerHTML = `<h3>Oopsie!!! No Items Found!!! :(</h3>`
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
                                        <a href="/${el._id}/tweaks?update" class="ygbtn">Update</a>
                                        <a href="/${el._id}/tweaks?delete" class="redbtn">Delete</a>
                                    </div>
                                </div>
                            `
                    });
                    if (sub.children.length === 2) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
                    }
                    if (subItems.innerHTML == "") {
                        next.classList.add("hidden");
                        subItems.innerHTML = `<h3 class="go__back">Oops!! Thats All You've Added So Far :)</h3>`
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
                                        <a href="/${el._id}/tweaks?update" class="ygbtn">Update</a>
                                        <a href="/${el._id}/tweaks?delete" class="redbtn">Delete</a>
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