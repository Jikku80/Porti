(function () {
    let editBtn = document.querySelector(".showEdit");
    let seditBtn = document.querySelector(".showeditbtn");
    let clse = document.querySelector(".close__show");

    seditBtn.addEventListener("click", () => {
        clse.classList.remove('hidden');
        editBtn.classList.remove("hidden");
        seditBtn.classList.add("hidden");
    })

    clse.addEventListener("click", () => {
        editBtn.classList.add("hidden");
        clse.classList.add('hidden');
        seditBtn.classList.remove("hidden");
    })
})();


(function () {
    let defaultBtn = document.getElementById("defaultseventhTheme");
    let fontColor = "gray";
    let headColor = "white";
    let secHead = "#674ea7";
    let focusColor = "white";
    let backColor = "#2c2c2c";
    let fontFam = "Cabin Sketch";
    let id = document.getElementById('seventhid').innerText;

    defaultBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/portfolio/${id}/updatePortfolioTheme`
        try {
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    fontColor: fontColor,
                    headColor: headColor,
                    secHeadColor: secHead,
                    backColor: backColor,
                    focusColor: focusColor,
                    fontFam: fontFam,
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Portfolio Theme has been updated :)");
                    window.setTimeout(() => {
                        location.reload();
                    }, 400);
                } else {
                    errorAlert("Invalid input, Input error!!!")
                    console.log(response);
                }
            })

        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})();

(function () {
    let upPortTheme = document.getElementById("changeseventhTheme");
    let fontColor = document.getElementById("sportFontColor");
    let headColor = document.getElementById("sportHeadColor");
    let secHead = document.getElementById("sportSecHeadColor");
    let focusColor = document.getElementById("sportFocusColor");
    let backColor = document.getElementById("sportBackColor");
    let fontFam = document.getElementById("sportFontFam");
    let id = document.getElementById('seventhid').innerText;

    upPortTheme.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/portfolio/${id}/updatePortfolioTheme`
        try {
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    fontColor: fontColor.value,
                    headColor: headColor.value,
                    secHeadColor: secHead.value,
                    backColor: backColor.value,
                    focusColor: focusColor.value,
                    fontFam: fontFam.value,
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Portfolio Theme has been updated :)");
                    window.setTimeout(() => {
                        location.reload();
                    }, 400);
                } else {
                    errorAlert("Invalid input, Input error!!!")
                    console.log(response);
                }
            })

        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})();

(function () {
    let fontColor = document.querySelector(".fontColor").innerText;
    let focusColor = document.querySelector(".focusColor").innerText;
    let headColor = document.querySelector(".headColor").innerText;
    let secHeadColor = document.querySelector(".secHeadColor").innerText;
    let backColor = document.querySelector(".backColor").innerText;
    let fontFam = document.querySelector(".fontFam").innerText;

    let head = document.querySelectorAll(".headFont");
    let ans = document.querySelectorAll(".ansFont");
    let sevbod = document.querySelector(".eighth__bod__section");
    let namefont = document.querySelector(".namefont");
    let about = document.querySelector(".eighth__about__bod");

    namefont.style.color = headColor;

    sevbod.style.backgroundColor = backColor;
    sevbod.style.fontFamily = fontFam;

    about.style.backgroundColor = focusColor
    about.style.borderColor = focusColor

    head.forEach(item => {
        item.style.color = secHeadColor;
    })

    ans.forEach(item => {
        item.style.color = fontColor;
    })
})();

(function () {
    let dumbtn = document.querySelector(".msg__user__btn");
    let msgSec = document.querySelector(".msg__user__sec");
    let cancelsec = document.getElementById("cancelmsgusersec");
    let usermsg = document.getElementById("curusermessage");
    let sendBtn = document.getElementById("sendusermessagebtn");
    let portfolioUser = document.querySelector(".portfoliouser").innerText;
    let curLogUser = document.querySelector(".curlogusername").innerText;
    let curLogUserId = document.querySelector(".curloguser").innerText;

    let socket = io();

    socket.on('usermessagereply', (name, user, message) => {
        if (name === curLogUser) {
            getAllMessageFromUser();
        }
    })

    dumbtn.addEventListener("click", () => {
        msgSec.classList.remove("hidden");

        sendBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            socket.emit('usermessage', portfolioUser, curLogUser, usermsg.value, curLogUserId);

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
                        userName: curLogUser,
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
    let curLogUser = document.querySelector(".curlogusername").innerText;
    let portUser = document.querySelector(".portfoliouser").innerText;
    let curUserMsgSec = document.querySelector(".cur__user__msg");
    curUserMsgSec.innerHTML = "";
    const endpoint = `/api/v1/message/user/${curLogUser}/message/${portUser}`
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
                        if (el.sentBy === curLogUser) {
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
                                <h4 class="mytext">${el.sentBy}</h4>
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

getAllMessageFromUser()