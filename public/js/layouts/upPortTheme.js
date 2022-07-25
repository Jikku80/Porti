(function () {
    let upPortTheme = document.getElementById("changeTheme");
    let fontColor = document.getElementById("portFontColor");
    let headColor = document.getElementById("portHeadColor");
    let secHead = document.getElementById("portSecHeadColor");
    let focusColor = document.getElementById("portFocusColor");
    let backColor = document.getElementById("portBackColor");
    let fontFam = document.getElementById("portFontFam");
    let id = document.getElementById('portidelid').innerText;

    upPortTheme.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/portfolio/${id}/updatePortfolioTheme`
        try {
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    fontColor: fontColor.value,
                    headColor: headColor.value,
                    secHeadColor: secHead.value,
                    backColor: backColor.value,
                    focusColor: focusColor.value,
                    fontFam: fontFam.value,
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Portfolio Theme has been updated :)");
                    // window.setTimeout(() => {
                    //     headGo.classList.remove('hidden');
                    //     landNav.classList.remove('hidden');
                    //     updatePort.classList.remove('hidden');
                    //     updateImg.classList.remove("hidden");
                    //     delFirst.classList.remove("hidden");
                    //     updateForm.classList.add('hidden');
                    // }, 400);
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