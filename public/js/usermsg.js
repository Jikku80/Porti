(function () {
    let dumbtn = document.querySelector(".msg__user__btn");
    let msgSec = document.querySelector(".msg__user__sec");
    let cancelsec = document.querySelector(".cancelmsgusersec");
    let usermsg = document.querySelector(".curusermessage");
    let sendBtn = document.querySelector(".sendusermessagebtn");
    let portfolioUser = document.querySelector(".portfoliouser").innerText;
    let portiUserId = document.querySelector(".portiuserid").innerText;
    let curLogUser = document.querySelector(".curlogusername").innerText;
    let curLogUserId = document.querySelector(".curloguser").innerText;
    let dot = document.querySelector(".msg__dot");
    let alrt = document.querySelector(".usermsgalert");

    let socket = io();

    socket.on('usermessagereply', (name, user, message) => {
        if (user === curLogUserId) {
            alrt.play();
            if (dot.classList.contains("hidden") && msgSec.classList.contains("hidden")) {
                dot.classList.remove("hidden");
            }
            getAllMessageFromUser();
        }
    })

    dumbtn.addEventListener("click", () => {
        msgSec.classList.remove("hidden");
        if (!dot.classList.contains("hidden")) {
            dot.classList.add("hidden");
        }
        sendBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            if (usermsg.value == "") {
                return false;
            }
            socket.emit('usermessage', curLogUser, portiUserId, usermsg.value, curLogUserId);
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
                        name: portfolioUser,
                        userName: portiUserId,
                        user: curLogUserId,
                        message: usermsg.value,
                        sentBy: curLogUser,
                        sentAt: cTime,
                        createdAt: Date.now()
                    })
                }).then((response) => {
                    if (response.status === 201) {
                        getAllMessageFromUser()
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
            usermsg.value = "";
        })
    })

    cancelsec.addEventListener("click", () => {
        msgSec.classList.add("hidden");
    })
})();

async function getAllMessageFromUser() {
    let curLogUser = document.querySelector(".curloguser").innerText;
    let portUser = document.querySelector(".portiuserid").innerText;
    let portUserName = document.querySelector(".portfoliouser").innerText;
    let curUserMsgSec = document.querySelector(".cur__user__msg");
    curUserMsgSec.innerHTML = "";
    const endpoint = `/api/v1/message/user/${portUser}/message/${curLogUser}`
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
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    }
                    data = data.sort(comp)
                    data.forEach(el => {
                        let date = el.sentAt
                        let time = date.slice(0, 5);
                        if (el.user === curLogUser) {
                            curUserMsgSec.innerHTML +=
                                `
                            <div class="cur__user__newmsg">
                            <h4 class="me">me</h4>
                            <p class="mymessage">${el.message}</p>
                            <p class="timstamp">${time}</p>
                            </div>
                        `
                        }
                        else {
                            curUserMsgSec.innerHTML +=
                                `
                                <div class="cur__user__newmsg">
                                <h4 class="mytext">${portUserName}</h4>
                                <p class="mymessage">${el.message}</p>
                                <p class="timstamp">${time}</p>
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

let curLogusr = document.querySelector(".curlogusername");
let curLogusrid = document.querySelector(".curloguser");
if (curLogusr.innerText !== "" && curLogusrid.innerText !== "") {
    getAllMessageFromUser()
}


let goLogin = document.querySelector(".goToLoginPage");
if (goLogin !== null) {
    goLogin.addEventListener("click", () => {
        window.open("/account/login")
    })
}