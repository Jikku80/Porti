let updateInvi2 = document.getElementById('update_invi2');
let updateInviForm2 = document.getElementById('update_inviform2');
let hdGo2 = document.querySelector(".land__goto");
let ldNav2 = document.querySelector(".land__nav__main");
let updateInviImgForm2 = document.getElementById('update_ImgInviForm2');
let updateInviImg2 = document.getElementById("update_InviImg2");
let delInvi2 = document.getElementById("delinvi");
let inviqrsec2 = document.querySelector(".qr__sec");

updateInvi2.addEventListener('click', () => {
    hdGo2.classList.add('hidden');
    ldNav2.classList.add('hidden');
    updateInvi2.classList.add('hidden');
    updateInviImg2.classList.add("hidden");
    delInvi2.classList.add("hidden");
    inviqrsec2.classList.add("hidden");
    updateInviForm2.classList.remove('hidden');
    location.hash = "#"
})

updateInviImg2.addEventListener("click", () => {
    hdGo2.classList.add('hidden');
    ldNav2.classList.add('hidden');
    updateInvi2.classList.add('hidden');
    updateInviImg2.classList.add("hidden");
    delInvi2.classList.add("hidden");
    inviqrsec2.classList.add("hidden");
    updateInviImgForm2.classList.remove('hidden');
    location.hash = "#"
})

let cancelInvi2 = document.querySelector(".cancelInvi2");
let canclInvi2 = document.querySelector(".canclInvi2");

cancelInvi2.addEventListener("click", () => {
    hdGo2.classList.remove('hidden');
    ldNav2.classList.remove('hidden');
    updateInvi2.classList.remove('hidden');
    updateInviImg2.classList.remove("hidden");
    delInvi2.classList.remove("hidden");
    inviqrsec2.classList.remove("hidden");
    updateInviForm2.classList.add('hidden');
})

canclInvi2.addEventListener("click", () => {
    hdGo2.classList.remove('hidden');
    ldNav2.classList.remove('hidden');
    updateInvi2.classList.remove('hidden');
    updateInviImg2.classList.remove("hidden");
    delInvi2.classList.remove("hidden");
    inviqrsec2.classList.remove("hidden");
    updateInviImgForm2.classList.add('hidden');
})

// let upForm = document.getElementById("upForm");

let upinname2 = document.querySelector("#upinname2");
let upinsname2 = document.querySelector("#upinsname2");
let upinabout2 = document.getElementById("upinabout2");
let upinwhat2 = document.getElementById('upinwhat2');
let upinwhy2 = document.getElementById("upinwhy2");
let upinwork2 = document.getElementById("upinwork2");
let upintheme2 = document.getElementById("upinTheme2")
let updinBtn2 = document.getElementById("updateinBtn2");
let upinImgBtn2 = document.getElementById("updateinImgBtn2");
let in2img = document.querySelector('#in2img');
let inid2 = document.getElementById('inviteendpoint').innerText;
let inthemes2 = document.getElementById("inthemes2");

updinBtn2.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let invitationName = document.getElementById("invite_name");
    const endpoint = `/api/v1/invite/${inid2}`
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                fname: upinname2.value,
                sname: upinsname2.value,
                about: upinabout2.value,
                address: upinwhat2.value,
                pdate: upinwhy2.value,
                ptime: upinwork2.value,
                theme: upintheme2.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Invitation has been updated :)");
                let result = response.json();
                result.then(item => {
                    let invite = item.data.data
                    invitationName.innerHTML = `${invite.fname} and ${invite.sname}`
                })
                window.setTimeout(() => {
                    hdGo2.classList.remove('hidden');
                    ldNav2.classList.remove('hidden');
                    updateInvi2.classList.remove('hidden');
                    updateInviImg2.classList.remove("hidden");
                    delInvi2.classList.remove("hidden");
                    updateInviForm2.classList.add('hidden');
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

upinImgBtn2.addEventListener("click", async (e) => {
    if (in2img.files[0] < 1 || in2img.files[0] == "" || in2img.files[0] == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    const formData = new FormData();
    formData.append("id", inid2);
    formData.append("imgs", in2img.files[0]);
    const endpoint = '/api/v1/invite/updateInviImgCollec'
    try {
        await fetch(endpoint, {
            body: formData,
            method: 'PATCH'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Cover Image has been updated :)");
                window.setTimeout(() => {
                    hdGo2.classList.remove('hidden');
                    ldNav2.classList.remove('hidden');
                    updateInvi2.classList.remove('hidden');
                    updateInviImg2.classList.remove("hidden");
                    delInvi2.classList.remove("hidden");
                    updateInviImgForm2.classList.add('hidden');
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


