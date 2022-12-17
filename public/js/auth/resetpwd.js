let btnReset = document.querySelector('.btn__reset');
let rpwd = document.getElementById("rpwd");
let rpwdC = document.getElementById('rpwdC');
let tokenId = window.location.search.replace('?', '');

btnReset.addEventListener('click', async (e) => {
    let resetPwdLen = rpwd.value.length
    if (rpwd.value < 1 || rpwd.value == "" || rpwd.value == null) {
        return false;
    }
    if (rpwdC.value < 1 || rpwdC.value == "" || rpwdC.value == null) {
        return false;
    }
    if (resetPwdLen < 9) {
        e.preventDefault();
        errorAlert("password must be 9 characters long");
        return false;
    }
    if (rpwd.value !== rpwdC.value) {
        e.preventDefault();
        errorAlert("passwords doesn't match please check again!!!")
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = `/passwordreset/${tokenId}`
        await fetch((endpoint), {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
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
                errorAlert("Token is not Valid!! Use a different One")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})


