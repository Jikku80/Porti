async function getOneItem() {

    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let id = document.querySelector(".itemid");
        let menuCard = document.querySelector(".menu__card");
        const endpoint = `/api/v1/menu/${id.innerText}/getItem`
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
                    let item = result.data.data
                    menuCard.innerHTML =
                        `
                            <img class="menu__card__img" src="/images/menu-pic/${item.coverImage}" alt="item__image">
                            <div class="menu__card__det">
                                <h3 class="menu__card__head">${item.name}</h3>
                                <p class="menu__card__price">${item.price}</p>
                                <p class="menu__card__cat">${item.category}</p>
                                <p class="menu__card__detail">${item.detail}</p>
                            </div>
                            `
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
    getOneItem();
});

(function () {
    let upitmDet = document.querySelector(".up__items__detail");
    let upitmImg = document.querySelector(".up__items__img");
    let delItmSec = document.querySelector(".del__items__sec");
    let id = document.querySelector(".itemid");

    let upItemBtn = document.getElementById("upItemBtn");

    if (location.search == "?update") {
        delItmSec.classList.add("hidden");
    }

    if (location.search == "?delete") {
        upitmDet.classList.add("hidden");
        upitmImg.classList.add("hidden");
    }

    let name = document.getElementById("upitemname");
    let price = document.getElementById("upitemprice");
    let cat = document.getElementById("upitemcat");
    let detail = document.getElementById("upitemdetail");
    let theme = document.getElementById("upitemtheme");
    upItemBtn.addEventListener("click", async (e) => {
        if (name.value < 1 || name.value == "" || name.value == null) {
            return false;
        }
        if (price.value < 1 || price.value == "" || price.value == null) {
            return false;
        }
        if (cat.value < 1 || cat.value == "" || cat.value == null) {
            return false;
        }
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/menu/${id.innerText}/updateItemDetail`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    price: price.value,
                    category: cat.value,
                    detail: detail.value,
                    theme: theme.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Item Updated Successfully :)");
                    getOneItem();
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

    let upImItemBtn = document.getElementById("upImgItemBtn");

    let imgItem = document.getElementById("upcoverimage");
    upImItemBtn.addEventListener("click", async (e) => {
        if (imgItem.files[0] < 1 || imgItem.files[0] == "" || imgItem.files[0] == null) {
            return false;
        }
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const formData = new FormData();
            formData.append("coverImage", imgItem.files[0]);
            const endpoint = `/api/v1/menu/${id.innerText}/updateItemImage`
            await fetch(endpoint, {
                body: formData,
                method: 'PATCH'
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Item Image Updated Successfully :)");
                    getOneItem();
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

    let delItemBtn = document.getElementById("delItemBtn");
    let curId = document.querySelector('.curid');

    delItemBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/menu/${id.innerText}/deleteItem`
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
                    successAlert("Item deleted Successfully :)");
                    location.assign(`/menu/${curId.innerText}/additemstomenu`)
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

