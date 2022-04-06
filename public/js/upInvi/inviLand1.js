let updateInvi = document.getElementById('update_invi');
let updateInviForm = document.getElementById('update_inviform');
let hdGo = document.querySelector(".land__goto");
let updateInviImgForm = document.getElementById('update_ImgInviForm');
let updateInviImg = document.getElementById("update_InviImg");
let delInviFirst = document.getElementById("delinvi");

updateInvi.addEventListener('click', () => {
    hdGo.classList.add('hidden');
    updateInvi.classList.add('hidden');
    updateInviImg.classList.add("hidden");
    delInviFirst.classList.add("hidden");
    updateInviForm.classList.remove('hidden');
})

updateInviImg.addEventListener("click", () => {
    hdGo.classList.add('hidden');
    updateInvi.classList.add('hidden');
    updateInviImg.classList.add("hidden");
    delInviFirst.classList.add("hidden");
    updateInviImgForm.classList.remove('hidden');
})

let cancelInvi = document.querySelector(".cancelInvi");
let canclInvi = document.querySelector(".canclInvi");

cancelInvi.addEventListener("click", () => {
    hdGo.classList.remove('hidden');
    updateInvi.classList.remove('hidden');
    updateInviImg.classList.remove("hidden");
    delInviFirst.classList.remove("hidden");
    updateInviForm.classList.add('hidden');
})

canclInvi.addEventListener("click", () => {
    hdGo.classList.remove('hidden');
    updateInvi.classList.remove('hidden');
    updateInviImg.classList.remove("hidden");
    delInviFirst.classList.remove("hidden");
    updateInviImgForm.classList.add('hidden');
})

// let upForm = document.getElementById("upForm");

let upinname = document.querySelector("#upinname");
let upinsname = document.querySelector("#upinsname");
let upinabout = document.getElementById("upinabout");
let upinwhat = document.getElementById('upinwhat');
let upinwhy = document.getElementById("upinwhy");
let upinno = document.getElementById("upinno");
let upinwork = document.getElementById("upinwork");
let updinBtn = document.getElementById("updateinBtn");
let upinImgBtn = document.getElementById("updateinImgBtn");
let inimg1 = document.querySelector('#inimg1');
let inimg2 = document.getElementById("inimg2");
let inimg3 = document.getElementById("inimg3");
let inimg4 = document.getElementById("inimg4");
let inimg5 = document.getElementById("inimg5")
let inid = document.getElementById('inviteendpoint').innerText;
let inthemes = document.getElementById("inthemes");

updinBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let num = btoa(upinno.value);
    const endpoint = '/api/v1/invite/updateInvi'
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: inid,
                fname: upinname.value,
                sname: upinsname.value,
                about: upinabout.value,
                address: upinwhat.value,
                pdate: upinwhy.value,
                phn_no: upinno.value,
                theme: inthemes.value,
                ptime: upinwork.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Invitation has been updated :)");
                window.setTimeout(() => {
                    location.assign(`/myinvi/${num}?${inthemes.value}`);
                }, 400);
            } else {
                errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    upinname.value = "",
        upinsname.value = "",
        upinno.value = "",
        upinabout.value = "",
        upinwhat.value = "",
        upinwhy.value = "",
        upinwork.value = ""
})

upinImgBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let num = btoa(upinno.value);
    const formData = new FormData();
    formData.append("id", inid);
    formData.append("imgCover", inimg1.files[0]);
    formData.append("imgSecond", inimg2.files[0]);
    formData.append("imgThird", inimg3.files[0]);
    formData.append("imgFourth", inimg4.files[0]);
    formData.append("imgFifth", inimg5.files[0]);
    const endpoint = '/api/v1/invite/updateInviImgCollec'
    try {
        await fetch(endpoint, {
            body: formData,
            method: 'PATCH'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Invitation Images has been updated :)");
                window.setTimeout(() => {
                    location.assign(`/myinvi/${num}?${searchPoint}`);
                }, 400);
            } else {
                errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    inimg1.value = "",
        inimg2.value = "",
        inimg3.value = "",
        inimg4.value = "",
        inimg5.value = ""
})


