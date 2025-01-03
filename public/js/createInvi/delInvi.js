let landCon = document.querySelector(".land__content");
let lg = document.querySelector('.land__goto');
let delcrf = document.querySelector("#dt__cf")
let delinvi = document.getElementById("delinvi");
let delInv = document.getElementById("delInvite")
let ldup = document.querySelector(".land__update")

delInv.addEventListener("click", () => {
    landCon.classList.add("hidden");
    lg.classList.add("hidden");
    delinvi.classList.add("hidden");
    ldup.classList.add("hidden");
    delcrf.classList.remove("hidden");
})

let abr = document.querySelector("#nodel")
abr.addEventListener("click", () => {
    delcrf.classList.add("hidden");
    landCon.classList.remove("hidden");
    lg.classList.remove("hidden");
    ldup.classList.remove("hidden");
    delinvi.classList.remove("hidden");
})

let yesConfm = document.querySelector("#yesdel");
yesConfm.addEventListener('click', async function (e) {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let id = document.querySelector('.inviId.hidden').innerText;
    const endpoint = `/api/v1/invite/${id}/deleteInvi`
    try {
        await fetch((endpoint), {
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
                successAlert("Your Invitation has been deleted :)");
                window.setTimeout(() => {
                    location.assign('/layouts/porti');
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