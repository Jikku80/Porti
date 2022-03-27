let btnReset = document.querySelector('.btn__reset');
let resetToken = document.getElementById("rtoken");
let rpwd = document.getElementById("rpwd");
let rpwdC = document.getElementById('rpwdC');

btnReset.addEventListener('click', async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = '/passwordreset'
        await fetch((endpoint), {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                token: resetToken.value,
                password: rpwd.value,
                passwordConfirm: rpwdC.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Password has been Reseted, Loggin In... :)");
                window.setTimeout(() => {
                    location.assign('/me');
                }, 400);
            } else {
                errorAlert("Token or Password is not Valid!! Use a different One")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    resetToken.value = "";
    rpwd.value = "";
    rpwdC.value = "";
})

