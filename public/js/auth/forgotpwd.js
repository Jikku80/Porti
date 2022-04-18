let forgotpwd = document.querySelector('.btn__forgotPwd');
let forgotemail = document.querySelector('#forgot_email');
let fgPwd = document.getElementById("forgotPwd")
let fgtPwd = document.querySelector(".forgot_pwd")
let closeBtn = document.getElementById("closeBtn")

fgtPwd.addEventListener("click", () => {
    fgPwd.classList.remove("hidden");
})

closeBtn.addEventListener("click", () => {
    fgPwd.classList.add("hidden");
})

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
                successAlert("TechMafia has sent a Token! Please Check your Mail :)");
            } else {
                errorAlert("Email is not Valid!! Use a different One")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    forgotemail.value = "";
})