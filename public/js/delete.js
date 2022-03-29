let landCont = document.querySelector(".land__content");
let dlcf = document.querySelector(".dt__cf")
let delPorti = document.getElementById("delPort");
let deel = document.querySelector(".del__port");

delPorti.addEventListener("click", () => {
    landCont.classList.add("hidden");
    deel.classList.add("hidden");
    dlcf.classList.remove("hidden");
})

let abrt = document.querySelector(".noDelete")
abrt.addEventListener("click", () => {
    dlcf.classList.add("hidden");
    landCont.classList.remove("hidden");
    deel.classList.remove("hidden");
})

let yesConfirm = document.querySelector(".yesDelete");
yesConfirm.addEventListener('click', async function (e) {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    const endpoint = '/api/v1/portfolio/deletePorti'
    try {
        await fetch((endpoint), {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        }).then((response) => {
            load.classList.add("hidden");
            successAlert("Your Portfolio has been deleted :)");
            window.setTimeout(() => {
                location.assign('/porti');
            }, 400);
        })
    }
    catch (err) {
        errorAlert('Sorry! Something went wrong', err);
    };
})

