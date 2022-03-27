
msgTm = document.getElementById("msgTM");
sender = document.querySelector(".sender")

msgTm.addEventListener('click', () => {
    sender.classList.remove('hidden');
})

sendMsg = document.querySelector(".send__msg");
let fullName = document.querySelector("#name");
let email = document.querySelector("#email");
let siteType = document.querySelector("#siteType");
let message = document.querySelector("#message");

sendMsg.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    try {
        const endpoint = '/sendmsg'
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: fullName.value,
                email: email.value,
                siteType: siteType.value,
                message: message.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Message Sent, TechMafia will get back to you soon :)");
            } else {
                errorAlert("OOPS!! something went wrong!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        alert('Sorry! Something went wrong', err);
    };
    fullName.value = "";
    email.value = "";
    siteType.value = "E-commerce";
    message.value = "";
})
