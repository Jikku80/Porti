let updateBtn = document.querySelector('.update__account');
let upname = document.querySelector("#upname");
let upemail = document.querySelector("#upemail");

let pwdUpdate = document.querySelector(".btn__pwd");
let pwdCurrent = document.querySelector("#pwdCurrent");
let uppwd = document.getElementById("up_password");
let uppwdcfm = document.getElementById("up_passwordConfirm");

updateBtn.addEventListener("click", async (e) => {
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
            } else {
                errorAlert("Email or Name is not Valid!! Use a different One :(")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong :(', err);
    };
    upname.value = "";
    upemail.value = "";
})

pwdUpdate.addEventListener("click", async (e) => {
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
                errorAlert("Password not Valid!! Use a different One :(")
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