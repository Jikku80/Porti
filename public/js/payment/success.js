(async function () {
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    successAlert("Payment With Esewa Successfull!")
    let itemId = document.querySelector(".item__uid").id;
    const endpoint = `/api/themes/updateTheme/${itemId}`
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Theme has been unlocked :)");
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
})();