sendMsg = document.querySelector(".send__msg");
let msgfullName = document.querySelector("#msgname");
let msgemail = document.querySelector("#msgemail");
let msgsiteType = document.querySelector("#siteType");
let msgmessage = document.querySelector("#msgmessage");

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
        const endpoint = '/send/msg'
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
                setTimeout(() => {
                    successAlert("Your Message has been sent!");
                }, 3000)
            } else {
                errorAlert("OOPS!! something went wrong!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        erroralert('Sorry! Something went wrong', err);
    };
    msgsiteType.value = "query";
    msgmessage.value = "";
});