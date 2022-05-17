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