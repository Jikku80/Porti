
sendMsg = document.querySelector(".send__msg");
let msgfullName = document.querySelector("#msgname");
let msgemail = document.querySelector("#msgemail");
let msgsiteType = document.querySelector("#siteType");
let msgmessage = document.querySelector("#msgmessage");
let ok = document.getElementById("ok");

sendMsg.addEventListener("click", async (e) => {
    if (msgfullName.value < 1 || msgfullName.value == "" || msgfullName.value == null) {
        return false;
    }
    if (msgemail.value < 1 || msgemail.value == "" || msgemail.value == null) {
        return false;
    }
    if (msgmessage.value < 1 || msgmessage.value == "" || msgmessage.value == null) {
        return false;
    }
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
                name: msgfullName.value,
                email: msgemail.value,
                queryType: msgsiteType.value,
                message: msgmessage.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                ok.classList.remove("hidden");
                setTimeout(() => {
                    ok.classList.add("hidden");
                }, 3000)
                // successAlert("Message Sent, TechMafia will get back to you soon :)");
            } else {
                errorAlert("OOPS!! something went wrong!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        erroralert('Sorry! Something went wrong', err);
    };
    msgfullName.value = "";
    msgemail.value = "";
    msgsiteType.value = "E-commerce";
    msgmessage.value = "";
})
