let loginBtn = document.querySelector('.btn__login');
let emailAdd = document.querySelector('#email_add');
let pwd = document.querySelector("#password");
let username = document.querySelector(".username");
let logFormId = document.querySelector(".log__form__id")
let formIdInpt = document.querySelectorAll(".frm__id")
let logFormPwd = document.querySelector(".log__form__pwd")
let formPwdInpt = document.querySelectorAll(".frm__pwd")

function Validate(inpt, cont, info) {
    for (item of inpt) {
        item.style.backgroundColor = "hotpink";
    }
    cont.innerHTML += `<p class="fwarn">${info} must have more than 8 letters</p>`
    return false;
}

loginBtn.addEventListener('click', async function (e) {
    if (emailAdd.value < 1 || emailAdd.value == "" || emailAdd.value == null) {
        return false;
    }
    if (pwd.value == "" || pwd.value == null) {
        return false;
    }
    e.preventDefault();
    console.log(emailAdd.value)
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    const endpoint = '/login'
    try {
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: emailAdd.value,
                password: pwd.value,
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (!(response.status === 200)) {
                errorAlert('Invalid Email or Password! :(');
            }
            else {
                successAlert("You are now LoggedIn :)");
                window.setTimeout(() => {
                    location.assign('/me');
                }, 400);
            }
        })
    }
    catch (err) {
        errorAlert('Sorry! Something went wrong', err);
    };
    emailAdd.value = "";
    pwd.value = "";
})
