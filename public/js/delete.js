let landCont = document.querySelector(".land__content");
let dlcf = document.querySelector(".dt__cf")
let delPorti = document.getElementById("delPort");
let deel = document.querySelector(".del__port");
let landPorti = document.querySelector(".land__update")
let addPrevSec = document.querySelector(".portfolio__tweaks");
let tweakHead = document.querySelector(".tweak__head");
let portidelid = document.getElementById("portidelid").innerText;

delPorti.addEventListener("click", () => {
    landCont.classList.add("hidden");
    deel.classList.add("hidden");
    landPorti.classList.add("hidden");
    addPrevSec.classList.add("hidden");
    tweakHead.classList.add("hidden");
    dlcf.classList.remove("hidden");
})

let abrt = document.querySelector(".noDelete")
abrt.addEventListener("click", () => {
    dlcf.classList.add("hidden");
    landCont.classList.remove("hidden");
    landPorti.classList.remove("hidden");
    addPrevSec.classList.remove("hidden");
    tweakHead.classList.remove("hidden");
    deel.classList.remove("hidden");
})

let yesConfirm = document.querySelector(".yesDelete");

yesConfirm.addEventListener('click', async function (e) {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    const endpoint = `/api/v1/portfolio/${yesConfirm.id}/deletePorti`
    try {
        await fetch((endpoint), {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: portidelid
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Portfolio has been deleted :)");
                window.setTimeout(() => {
                    location.assign('/porti');
                }, 400);

            } else {
                console.log(response);
                errorAlert("Deletion Error!!!")
            }

        })
    }
    catch (err) {
        errorAlert('Sorry! Something went wrong', err);
        console.log(err);
    };
})

