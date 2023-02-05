(function () {
    let msgCont = document.querySelector(".message__user");
    let socket = io();
    let logUser = document.querySelector(".logUserId").innerText;
    let alrt = document.getElementById("msgalert");

    socket.on("usermessage", (name, user, message, id) => {
        let msgun = document.querySelector(".message__user__name").innerText;
        if (user === logUser || id === logUser) {
            msgCont.innerHTML = "";
            alrt.play();
            getAllMessageFromUser()
            getMsgByUser();
            if (msgun == name) {
                getMsg(name)
            }
        }

    });
})();

async function getAllMessageFromUser() {
    let curLogUser = document.querySelector(".logUserName").innerText;
    let curLogUserId = document.querySelector(".logUserId").innerText;
    let theme = document.querySelector(".curtheme").innerText;
    let msgCont = document.querySelector(".message__user");
    msgCont.innerHTML = "";

    const endpoint = `/api/v1/message/messagesAll/${curLogUserId}`
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
                    let data = item.messages;
                    let comMsg = item.comMsg;

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
                    let small = document.querySelectorAll(".message__user__small");
                    if (theme == "white") {
                        small.forEach(item => {
                            item.style.backgroundColor = "white";
                        })
                    }
                    if (theme == "red") {
                        small.forEach(item => {
                            item.style.backgroundColor = "crimson";
                        })
                    }
                    if (theme == "dark") {
                        small.forEach(item => {
                            item.style.backgroundColor = "black";
                        })
                    }
                    let msgUsr = document.querySelectorAll(".messageUserName");
                    for (let i = 0; i < msgUsr.length; i++) {
                        let msg = msgUsr[i]
                        let msgVal = msg.innerText;
                        let dotval = msg.parentElement.childNodes[3];
                        let counter = 0;
                        for (let msgs of comMsg) {
                            if (msgs.sentBy == msgVal && msgs.received === false) {
                                counter++;
                            }
                        }
                        if (dotval.classList.contains("hidden")) {
                            dotval.classList.remove("hidden");
                        }
                        dotval.innerText = counter;
                        if (counter === 0) {
                            dotval.classList.add("hidden");
                        }
                    }
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
    let usrId = document.querySelector('.logUserId').innerText;
    let useridCont = document.querySelector(".msgboxUserId");
    let userId = document.querySelector(".msgboxUser");
    useridCont.innerText = userName
    msgMCont.innerHTML = "";
    const endpoint = `/api/v1/message/messageby/${usrId}/user/${userName}`
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
                        if (el.user !== usrId) {
                            userId.innerText = el.user
                        }
                        let date = el.sentAt
                        let time = date.slice(0, 5);
                        if (usrId === el.user) {
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
                                            <h4 class="sender__name">${userName}</h4>
    
                                        </div>
                                        <p class="sender__msg">${el.message}</p>
                                        <p class="timestamp">${time}</p>
                                    </div>
                                `
                        }
                    })
                })
            }
            else if (response.status == 404) {
                errorAlert("User With This Name Doesnot Exists!!!")
            }
            else {
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
                let dotSec = item.childNodes[3]
                dotSec.classList.add("hidden");
                let mesSec = document.querySelector(".message__msg");
                mesSec.classList.remove("hidden");
                let usernameTag = document.querySelector(".message__user__name");
                usernameTag.innerText = "";
                let replySec = document.querySelector(".message__reply");
                let userid = document.querySelector(".msgboxUserId");
                replySec.classList.remove("hidden");
                let userName = item.childNodes[1].innerText;
                usernameTag.innerText = userName;
                getMsg(userName);
                updateMsg();
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
        let usrID = msgbackBtn.parentElement.childNodes[1].innerText
        let current = new Date();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        if (msg.value == "") {
            return false;
        }
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
                    userName: usrID,
                    user: logUserId,
                    message: msg.value,
                    sentBy: logUserName,
                    sentAt: cTime,
                    createdAt: Date.now()
                })
            }).then((response) => {
                if (response.status === 201) {
                    let socket = io();
                    socket.emit('usermessagereply', logUserName, usrID, msg.value, logUserId);
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

async function updateMsg() {
    let msgbackBtn = document.getElementById("messagebackbtn");
    let usrName = msgbackBtn.parentElement.childNodes[0].innerText
    let logUserName = document.querySelector(".logUserId").innerText;

    const endpoint = `/api/v1/message/update/${logUserName}/msg/${usrName}`
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
            })
        }).then((response) => {
            if (response.status === 200) {
                // let socket = io();
                // socket.emit('usermessagereply', usrName, logUserName, msg.value, logUserId);
                // getMsg(usrName)
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
};

(function () {
    let theme = document.querySelector(".curtheme").innerText;
    let msgbod = document.querySelector(".message__bod__sec ");
    let td = document.querySelector(".head");
    let small = document.querySelector(".message__user__small");
    let inpt = document.querySelector("#messageback");

    if (theme == "red") {
        document.body.style.backgroundColor = "crimson";
        msgbod.style.backgroundColor = "crimson";
        small.forEach(item => {
            item.style.backgroundColor = "crimson"
        })
    }
    else if (theme == "dark") {
        document.body.style.backgroundColor = "black";
        msgbod.style.backgroundColor = "black";
        small.forEach(item => {
            item.style.backgroundColor = "black"
        })
    }
    else if (theme == "white") {
        document.body.style.backgroundColor = "white";
        msgbod.style.backgroundColor = "white";
        msgbod.style.color = "black";
        td.style.color = "black";
        inpt.style.color = "black";
    }
    else {
        return;
    }
})();