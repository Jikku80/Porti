(function () {
    let msgCont = document.querySelector(".message__user");
    let socket = io();
    // userList = [];
    // usrMsgList = [];
    // let msgUserCont = document.querySelectorAll(".message__user__small");
    let logUser = document.querySelector(".logUserName").innerText;
    socket.on("usermessage", (name, user, message) => {
        // if (msgUserCont !== null) {
        //     msgUserCont.forEach(item => {
        //         let oldUsers = item.childNodes[1].innerText;
        //         userList.push(oldUsers);
        //     })
        // }
        // userList.push(user);
        // // let data = {
        // //     "user": user,
        // //     "message": message
        // // }
        // // usrMsgList.push(data);
        // let distinctList = userList.filter(function (value, index, self) {
        //     return self.indexOf(value) === index;
        // });
        // distinctList.forEach(item => {
        //     if (item === logUser) {
        //         msgCont.innerHTML += "";
        //     }
        //     else {
        //         if (user === logUser) {
        //             msgCont.innerHTML +=
        //                 `
        //                 <div class="message__user__small">
        //                 <p class="messageUserName">${item}</p>
        //                 <div class="dot"></div>
        //                 </div>
        //             `
        //         }
        //     }
        // })

        if (user === logUser || name === logUser) {
            msgCont.innerHTML = "";
            getAllMessageFromUser()
            getMsgByUser();
            getMsg(user)
        }

    });
})();

async function getAllMessageFromUser() {
    let curLogUser = document.querySelector(".logUserName").innerText;
    let msgCont = document.querySelector(".message__user");

    const endpoint = `/api/v1/message/messagesAll/${curLogUser}`
    try {
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {

            if (response.status === 200) {
                let res = response.json();
                res.then(item => {
                    let data = item.messages
                    data.forEach(el => {
                        if (el === curLogUser) {
                            msgCont.innerHTML += ""
                        }
                        else {
                            msgCont.innerHTML +=
                                `
                                <div class="message__user__small">
                                <p class="messageUserName">${el}</p>
                                <div class="dot"></div>
                                </div>
                            `
                        }
                    })
                    getMsgByUser();
                })
            } else {
                errorAlert("Couldnt Fetch Messages!!!")
                console.log(response);
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

getAllMessageFromUser()

async function getMsg(userName) {
    let msgMCont = document.querySelector(".message__msg");
    let usrname = document.querySelector(".logUserName").innerText;
    let useridCont = document.querySelector(".msgboxUserId");
    useridCont.innerText = userName
    msgMCont.innerHTML = "";
    const endpoint = `/api/v1/message/messageby/${usrname}/user/${userName}`
    try {
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {

            if (response.status === 200) {
                let res = response.json();
                res.then(item => {
                    let data = item.messages
                    function comp(a, b) {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    }
                    data = data.sort(comp)
                    data.forEach(el => {
                        let date = el.sentAt
                        let time = date.slice(0, 5);
                        if (usrname === el.sentBy) {
                            msgMCont.innerHTML +=
                                `
                                <div class="message__byuser__sec">
                                    <div class="message__byuser__sec__head">
                                        <h4 class="me">me</h4>
                                    </div>
                                    <p class="sender__msg">${el.message}</p>
                                    <p class="timestamp">${time}</p>
                                </div>
                            `
                        }
                        else {
                            msgMCont.innerHTML +=
                                `
                                    <div class="message__byuser__sec">
                                        <div class="message__byuser__sec__head">
                                            <h4 class="sender__name">${el.sentBy}</h4>
    
                                        </div>
                                        <p class="sender__msg">${el.message}</p>
                                        <p class="timestamp">${time}</p>
                                    </div>
                                `
                        }
                    })
                })
            } else {
                errorAlert("Couldnt Fetch Messages!!!")
                console.log(response);
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

function getMsgByUser() {
    let msgUserCont = document.querySelectorAll(".message__user__small");
    if (msgUserCont !== null) {
        msgUserCont.forEach(item => {
            item.addEventListener("click", () => {
                let usernameTag = document.querySelector(".message__user__name");
                usernameTag.innerText = "";
                let replySec = document.querySelector(".message__reply");
                let userid = document.querySelector(".msgboxUserId");
                replySec.classList.remove("hidden");
                let userName = item.childNodes[1].innerText;
                usernameTag.innerText = userName;
                getMsg(userName);
            })
        })
    }
}

function sendReply() {
    let logUserName = document.querySelector(".logUserName").innerText;
    let logUserId = document.querySelector(".logUserId").innerText
    let msg = document.getElementById("messageback");
    // let usrName = document.querySelector(".message__user__name").innerText
    let msgbackBtn = document.getElementById("messagebackbtn");
    msgbackBtn.addEventListener("click", async () => {
        let usrName = msgbackBtn.parentElement.childNodes[0].innerText
        let current = new Date();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        const endpoint = `/api/v1/message/usermessage`
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: usrName,
                    userName: logUserName,
                    user: logUserId,
                    message: msg.value,
                    sentBy: logUserName,
                    sentAt: cTime,
                    createdAt: Date.now()
                })
            }).then((response) => {
                if (response.status === 201) {
                    let socket = io();
                    socket.emit('usermessagereply', usrName, logUserName, msg.value, logUserId);
                    getMsg(usrName)
                } else {
                    errorAlert("Message Wasnt Sent!!!")
                    console.log(response);
                }
            })

        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
        msg.value = "";

    })
}

window.addEventListener("load", () => {
    sendReply();
})