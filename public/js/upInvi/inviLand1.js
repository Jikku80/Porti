let updateInvi = document.getElementById('update_invi');
let updateInviForm = document.getElementById('update_inviform');
let hdGo = document.querySelector(".land__goto");
let ldNav = document.querySelector(".land__nav__main");
let updateInviImgForm = document.getElementById('update_ImgInviForm');
let updateInviImg = document.getElementById("update_InviImg");
let delInviFirst = document.getElementById("delinvi");
let inviqrsec = document.querySelector(".qr__sec");


updateInvi.addEventListener('click', () => {
    hdGo.classList.add('hidden');
    ldNav.classList.add('hidden');
    updateInvi.classList.add('hidden');
    updateInviImg.classList.add("hidden");
    delInviFirst.classList.add("hidden");
    inviqrsec.classList.add("hidden");
    updateInviForm.classList.remove('hidden');
})

updateInviImg.addEventListener("click", () => {
    hdGo.classList.add('hidden');
    ldNav.classList.add('hidden');
    updateInvi.classList.add('hidden');
    updateInviImg.classList.add("hidden");
    delInviFirst.classList.add("hidden");
    inviqrsec.classList.add("hidden");
    updateInviImgForm.classList.remove('hidden');
})

let cancelInvi = document.querySelector(".cancelInvi");
let canclInvi = document.querySelector(".canclInvi");

cancelInvi.addEventListener("click", () => {
    hdGo.classList.remove('hidden');
    ldNav.classList.remove('hidden');
    updateInvi.classList.remove('hidden');
    updateInviImg.classList.remove("hidden");
    delInviFirst.classList.remove("hidden");
    inviqrsec.classList.remove("hidden");
    updateInviForm.classList.add('hidden');
})

canclInvi.addEventListener("click", () => {
    hdGo.classList.remove('hidden');
    ldNav.classList.remove('hidden');
    updateInvi.classList.remove('hidden');
    updateInviImg.classList.remove("hidden");
    delInviFirst.classList.remove("hidden");
    inviqrsec.classList.remove("hidden");
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
    let invitationName = document.getElementById("invite_name");
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
                let result = response.json();
                result.then(item => {
                    let invite = item.updatedInvite
                    invitationName.innerHTML = `${invite.fname} and ${invite.sname}`
                })
                window.setTimeout(() => {
                    hdGo.classList.remove('hidden');
                    ldNav.classList.remove('hidden');
                    updateInvi.classList.remove('hidden');
                    updateInviImg.classList.remove("hidden");
                    delInviFirst.classList.remove("hidden");
                    updateInviForm.classList.add('hidden');
                }, 400);
            } else {
                errorAlert("Invalid input, Duplication Input error!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})

upinImgBtn.addEventListener("click", async (e) => {
    if (inimg1.files[0] < 1 || inimg1.files[0] == "" || inimg1.files[0] == null) {
        return false;
    }
    if (inimg2.files[0] < 1 || inimg2.files[0] == "" || inimg2.files[0] == null) {
        return false;
    }
    if (inimg3.files[0] < 1 || inimg3.files[0] == "" || inimg3.files[0] == null) {
        return false;
    }
    if (inimg4.files[0] < 1 || inimg4.files[0] == "" || inimg4.files[0] == null) {
        return false;
    }
    if (inimg5.files[0] < 1 || inimg5.files[0] == "" || inimg5.files[0] == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    const formData = new FormData();
    formData.append("id", inid);
    formData.append("imgCover", inimg1.files[0]);
    formData.append("imgSecond", inimg2.files[0]);
    formData.append("imgThird", inimg3.files[0]);
    formData.append("imgFourth", inimg4.files[0]);
    formData.append("imgFifth", inimg5.files[0]);
    const endpoint = '/api/v1/invite/updateInviImg'
    try {
        await fetch(endpoint, {
            body: formData,
            method: 'PATCH'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Invitation Images has been updated :)");
                window.setTimeout(() => {
                    hdGo.classList.remove('hidden');
                    ldNav.classList.remove('hidden');
                    updateInvi.classList.remove('hidden');
                    updateInviImg.classList.remove("hidden");
                    delInviFirst.classList.remove("hidden");
                    updateInviImgForm.classList.add('hidden');
                }, 400);
            } else {
                errorAlert("Invalid input, Duplication Input error!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})


