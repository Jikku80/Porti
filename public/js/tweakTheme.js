(function () {
    let yourname = document.querySelector("#themename");
    let aboutyou = document.querySelector("#themeId");
    let what = document.getElementById("themeprice");
    let why = document.getElementById("themeCategory");
    let yourno = document.getElementById("themeType");
    let paid = document.getElementById("paid");
    let img1 = document.getElementById("pictur");
    let submit = document.getElementById("crTheme");
    let validUser = "";
    let validInviUser = "";
    let validMenuUser = "";
    let validCatalogeUser = "";
    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const formData = new FormData();
        formData.append("themename", yourname.value);
        formData.append("themeId", aboutyou.value);
        formData.append("themeType", yourno.value);
        formData.append("themeCategory", why.value);
        formData.append("themeprice", what.value);
        formData.append("paid", paid.value);
        formData.append("validUser", validUser);
        formData.append("validInviUser", validInviUser);
        formData.append("validMenuUser", validMenuUser);
        formData.append("validCatalogeUser", validCatalogeUser);
        formData.append("picture", img1.files[0]);
        const endpoint = '/api/themes'
        try {
            await fetch((endpoint), {
                body: formData,
                method: 'POST'
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Theme has been created :)");
                } else {
                    errorAlert("invalid Input you dumbass!!!")
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