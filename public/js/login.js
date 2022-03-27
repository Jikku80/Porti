let loginBtn = document.querySelector('.btn__login');
let emailAdd = document.querySelector('#email_add');
let pwd = document.querySelector("#password");
let username = document.querySelector(".username");

loginBtn.addEventListener('click', async function (e) {
    e.preventDefault();
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

