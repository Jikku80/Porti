let clickme = document.getElementById("signup");
let signup = document.querySelector(".btn__signup");
let mname = document.querySelector("#m_name");
let memail = document.getElementById("m_email");
let mpassword = document.getElementById("m_password");
let pwdConfirm = document.getElementById("passwordConfirm");

let sign__up = document.querySelector(".sign__up")
let signCancel = document.getElementById("signCancel");

clickme.addEventListener('click', () => {
    sign__up.classList.remove('hidden');
})

signCancel.addEventListener("click", () => {
    sign__up.classList.add('hidden');
})

signup.addEventListener('click', async (e) => {
    if (mname.value < 1 || mname.value == "" || mname.value == null) {
        return false;
    }
    if (memail.value < 1 || memail.value == "" || memail.value == null) {
        return false;
    }
    if (mpassword.value < 1 || mpassword.value == "" || mpassword.value == null) {
        return false;
    }
    if (pwdConfirm.value < 1 || pwdConfirm.value == "" || pwdConfirm.value == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = '/api/users/signup'
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: mname.value,
                email: memail.value,
                password: mpassword.value,
                passwordConfirm: pwdConfirm.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 201) {
                successAlert("Congrats! You have been hooked ;)");
                window.setTimeout(() => {
                    location.assign('/me');
                }, 400);
            } else {
                errorAlert("Email or Password is not Valid!! Use a different One")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    mname.value = "";
    memail.value = "";
    mpassword.value = "";
    pwdConfirm.value = "";
})

