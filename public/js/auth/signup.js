let clickme = document.getElementById("signup");
let signup = document.querySelector(".btn__signup");
let mname = document.querySelector("#m_name");
let memail = document.getElementById("m_email");
let mpassword = document.getElementById("m_password");
let pwdConfirm = document.getElementById("passwordConfirm");
let termbox = document.getElementById("termbox");

let sign__up = document.querySelector(".sign__up")
let signCancel = document.getElementById("signCancel");

clickme.addEventListener('click', () => {
    sign__up.classList.remove('hidden');
    window.location.hash = "#signUpForm"
})

signCancel.addEventListener("click", () => {
    sign__up.classList.add('hidden');
})

signup.addEventListener('click', async (e) => {
    let mpwdLen = mpassword.value.length;

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

    if (mpwdLen < 9) {
        e.preventDefault();
        errorAlert("Password must be 9 Characters long")
        return false;
    }

    if (mpassword.value !== pwdConfirm.value) {
        e.preventDefault();
        errorAlert("Password Does not Match!!! Check Again");
        return false;
    }

    if (termbox.checked === false) {
        e.preventDefault();
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
                passwordConfirm: pwdConfirm.value,
                termsandconditionagreed: termbox.checked
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 201) {
                successAlert("Congrats! You have been hooked ;)");
                window.setTimeout(() => {
                    location.assign('/me');
                }, 400);
            } else {
                errorAlert("The Given Email already has a account! Use Forget Password to change your password")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})


let termsandcond = document.getElementById("termsandcond");
let tac = document.querySelector(".termsandconditions");
let termcancel = document.getElementById("termCancel");

termsandcond.addEventListener("click", () => {
    tac.classList.remove("hidden");
})

termcancel.addEventListener("click", () => {
    tac.classList.add('hidden');
})