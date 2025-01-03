let forgotpwd = document.querySelector('.btn__forgotPwd');
let forgotemail = document.querySelector('#forgot_email');

forgotpwd.addEventListener("click", async (e) => {
    if (forgotemail.value < 1 || forgotemail.value == "" || forgotemail.value == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = '/api/users/forgotpassword'
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: forgotemail.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("A Token Has been sent to your email address! Please Check your Mail :)");
            } else {
                errorAlert("Email is not Valid!! Use your Accounts Email Address")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    forgotemail.value = "";
})