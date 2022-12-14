async function getOneCatalougeItem() {

    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let id = document.querySelector(".itemid");
        let catalougeCard = document.querySelector(".catalouge__card");
        const endpoint = `/api/v1/catalouge/${id.innerText}/getItem`
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
                    catalougeCard.innerHTML =
                        `
                            <img class="catalouge__card__img" src="/images/catalouge/${item.coverImage}" alt="catalouge__item__image">
                            <div class="catalouge__card__det">
                                <h3 class="catalouge__card__head goldn">${item.name}</h3>
                                <p class="catalouge__card__price goldn">${item.serialno}</p>
                                <p class="catalouge__card__price goldn">${item.price}</p>
                                <p class="catalouge__card__cat goldn">${item.category}</p>
                                <p class="catalouge__card__cat goldn">${item.subcategory}</p>
                                <p class="catalouge__card__detail goldn">${item.detail}</p>
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
    getOneCatalougeItem();
});

(function () {
    let upitmDet = document.querySelector(".up__items__detail");
    let upitmImg = document.querySelector(".up__items__img");
    let delItmSec = document.querySelector(".del__items__sec");
    let id = document.querySelector(".itemid");

    let upItemBtn = document.getElementById("upcatalItemBtn");

    if (location.search == "?update") {
        delItmSec.classList.add("hidden");
    }

    if (location.search == "?delete") {
        upitmDet.classList.add("hidden");
        upitmImg.classList.add("hidden");
    }

    let name = document.getElementById("upcatalitemname");
    let serialno = document.getElementById("upcatalitemserialno");
    let price = document.getElementById("upcatalitemprice");
    let cat = document.getElementById("upcatalitemcat");
    let subcat = document.getElementById("upcatalitemsubcat");
    let detail = document.getElementById("upcatalitemdetail");
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
            const endpoint = `/api/v1/catalouge/${id.innerText}/updateItemDetail`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    serialno: serialno.value,
                    price: price.value,
                    category: cat.value,
                    subcategory: subcat.value,
                    detail: detail.value
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Item Updated Successfully :)");
                    getOneCatalougeItem();
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

    let upImItemBtn = document.getElementById("upcatalImgItemBtn");

    let imgItem = document.getElementById("upcatalcoverimage");
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
            const endpoint = `/api/v1/catalouge/${id.innerText}/updateItemImage`
            await fetch(endpoint, {
                body: formData,
                method: 'PATCH'
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Item Image Updated Successfully :)");
                    getOneCatalougeItem();
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

    let delItemBtn = document.getElementById("delcatalItemBtn");
    let curId = document.querySelector('.curusrid');

    delItemBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/catalouge/${id.innerText}/deleteItem`
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
                    location.assign(`/catalouge/${curId.innerText}/additems`)
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
    let theme = document.querySelector(".themeUssr").innerText;
    let label = document.querySelectorAll(".form__label");
    let inpt = document.querySelectorAll(".form__input");

    if (theme == "red") {
        document.body.style.backgroundColor = "crimson";
        inpt.forEach(item => {
            item.style.borderColor = "white";
        })
    }
    else if (theme == "dark") {
        document.body.style.backgroundColor = "black";

    }
    else if (theme == "white") {
        document.body.style.backgroundColor = "white";
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
