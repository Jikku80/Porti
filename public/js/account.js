let updateBtn = document.querySelector('.update__account');
let upname = document.querySelector("#upname");
let upemail = document.querySelector("#upemail");

let pwdUpdate = document.querySelector(".btn__pwd");
let pwdCurrent = document.querySelector("#pwdCurrent");
let uppwd = document.getElementById("up_password");
let uppwdcfm = document.getElementById("up_passwordConfirm");

window.addEventListener("load", () => {
    let loads = document.querySelector('.loader');
    loads.classList.add("hidden");
})

updateBtn.addEventListener("click", async (e) => {
    let same = document.querySelector(".sami__user__warn");
    let whiteSpace = document.querySelector(".whiti__space");
    let specialCharac = document.querySelector(".onallowed__charc");
    let pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);


    same.classList.add("hidden");
    whiteSpace.classList.add("hidden");
    specialCharac.classList.add("hidden");

    if (upname.value < 1 || upname.value == "" || upname.value == null) {
        return false;
    }
    if (/\s/.test(upname.value)) {
        e.preventDefault();
        whiteSpace.classList.remove("hidden");
        return false;
    }
    if (pattern.test(upname.value)) {
        e.preventDefault();
        specialCharac.classList.remove("hidden");
        return false;
    }
    if (upemail.value < 1 || upemail.value == "" || upemail.value == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = '/submit-user-data'
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: upname.value,
                email: upemail.value,
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Information has been Updated :)");
                window.setTimeout(() => {
                    location.assign('/me');
                }, 400);
            }
            else if (response.status === 409) {
                errorAlert("User with this name already exists! Use Different Name!")
                same.classList.remove("hidden");
            }
            else {
                console.log(response)
                errorAlert("Email is not Valid!! Use a different One :(")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong :(', err);
    };
})

pwdUpdate.addEventListener("click", async (e) => {
    let uppwdLen = uppwd.value.length;
    let pwdCurLen = pwdCurrent.value.length;

    if (pwdCurrent.value < 1 || pwdCurrent.value == "" || pwdCurrent.value == null) {
        return false;
    }
    if (uppwd.value < 1 || uppwd.value == "" || uppwd.value == null) {
        return false;
    }
    if (uppwdcfm.value < 1 || uppwdcfm.value == "" || uppwdcfm.value == null) {
        return false;
    }

    if (uppwdLen < 9 || pwdCurLen < 9) {
        e.preventDefault();
        errorAlert("password must be 9 characters long!!!")
        return false
    }

    if (uppwd.value !== uppwdcfm.value) {
        e.preventDefault();
        errorAlert("your new passwords doesn't match, Please check again!!!")
        return false;
    }

    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = '/passwordUpdate'
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                passwordCurrent: pwdCurrent.value,
                password: uppwd.value,
                passwordConfirm: uppwdcfm.value,
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Password has been Updated :)");
                window.setTimeout(() => {
                    location.assign('/me');
                }, 400);
            } else {
                errorAlert("Your old password doesnt match!! Use your old password :(")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong :(', err);
    };
    pwdCurrent.value = "";
    uppwd.value = "";
    uppwdcfm.value = "";
})

let profPic = document.getElementById("upPic");
let upProfPic = document.getElementById("upProfPic");
upProfPic.addEventListener("click", async (e) => {
    if (profPic.files[0] < 1 || profPic.files[0] == "" || profPic.files[0] == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    const formData = new FormData();
    formData.append("photo", profPic.files[0]);
    const endpoint = '/api/users/updateDP'
    try {
        await fetch(endpoint, {
            body: formData,
            method: 'PATCH'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Profile Picture has been updated :)");
                window.setTimeout(() => {
                    location.assign(`/me`);
                }, 400);
            } else {
                errorAlert("Provide a Valid Image!!!")
                console.log(response);
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    profPic.value = ""
})