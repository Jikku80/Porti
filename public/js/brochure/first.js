(function () {
    let broname = document.getElementById("broname");
    let brophn = document.getElementById("brophn_no");
    let bronum = document.getElementById("bronum");
    let brodate = document.getElementById("brodate");
    let brotodate = document.getElementById("brotodate");
    let brotime = document.getElementById("brotime");
    let bromsg = document.getElementById("bromsg");
    let bookBtn = document.getElementById("bookBtn");
    let userId = document.querySelector(".curUserId").innerText;
    let orgid = document.querySelector(".orgid").innerText;
    let curorgName = document.querySelector(".pageName").innerText;
    let alrt = document.querySelector(".bkalert")
    let addtobookbtn = document.querySelectorAll(".addtobooking");
    let formCont = document.querySelector(".form__items");
    let catalusrName = document.querySelector(".portfoliouser").innerText;
    let curLogUserName = document.querySelector(".curloguser").innerText;
    let usrName = catalusrName + "-" + curLogUserName
    let socket = io();

    socket.on("brobookingreply", (broid, orguser, orguserid) => {
        if (orgid === broid) {
            if (userId === orguserid) {
                alrt.play();
                getAllUserBookings();
            }
        }
    })

    let books = usrName.toLowerCase();
    let bookingsName = usrName.toUpperCase();

    books = localStorage.getItem(bookingsName);
    if (books == null) {
        jar = []
    } else {
        jar = JSON.parse(books);
    }
    addtobookbtn.forEach(item => {
        item.addEventListener("click", () => {
            formCont.innerHTML = "";
            let itemname = item.parentElement.childNodes[0].innerText;
            let itemprice = item.parentElement.childNodes[3].innerText;
            let itemdiscount = item.parentElement.childNodes[6].innerText;
            let price;
            if (itemdiscount !== "") {
                let disper = itemdiscount / 100
                let newp = (itemprice * 1) * disper;
                price = itemprice - newp;
            } else {
                price = (itemprice * 1)
            }
            let quantity = 1;
            let current = new Date();
            let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            let uq = cDate + "|" + cTime;
            let uid = itemname + uq;
            jar.push({ itemname, price, quantity, uid });
            localStorage.setItem(bookingsName, JSON.stringify(jar))
            jar.forEach(item => {
                formCont.innerHTML +=
                    `
                    <div class="form__item__bod">
                        <img src="/images/cancel.png" class="cancelitem" alt="cancel__btn"/>
                        <h6>${item.itemname}</h6>
                        <label>qnt:</label>
                        <input class="quantityinpt" type="text" value=${item.quantity} />
                        <button class="updateitem">Update</button>
                        <h4 class="hidden">${item.uid}</h4>
                        <h4 class="hidden price">${item.price}</h4>
                    </div>
                `
            })
            successAlert('Item has been added in selected booking items')
        })
    })
    formCont.innerHTML = "";
    jar.forEach(item => {
        formCont.innerHTML +=
            `
            <div class="form__item__bod">
                <img src="/images/cancel.png" class="cancelitem" alt="cancel__btn"/>
                <h6>${item.itemname}</h6>
                <label>qnt:</label>
                <input class="quantityinpt" type="text" value =${item.quantity} />
                <button class="updateitem">Update</button>
                <h4 class="hidden">${item.uid}</h4>
                <h4 class="hidden price">${item.price}</h4>
            </div>
        `
    })

    let cancelitem = document.querySelectorAll(".cancelitem");
    cancelitem.forEach(item => {
        item.addEventListener("click", () => {
            let curcard = item.parentElement;
            let curId = item.parentElement.childNodes[11].innerText;
            jar.filter((el, i) => {
                if (el.uid == curId) {
                    curcard.remove();
                    jar.splice(i, 1)
                    localStorage.setItem(bookingsName, JSON.stringify(jar));
                    successAlert("Product has been removed")
                }
            })
        });
    });

    let updateitem = document.querySelectorAll(".updateitem");
    updateitem.forEach(item => {
        item.addEventListener("click", () => {
            let quantity = item.parentElement.childNodes[7].value;
            let itemname = item.parentElement.childNodes[3].innerText;
            let price = item.parentElement.childNodes[13].innerText;
            let uid = item.parentElement.childNodes[11].innerText;

            let newValue = ({ itemname, price, quantity, uid });
            jar.filter((el, i) => {
                if (el.uid == uid) {
                    jar.splice(i, 1, newValue)
                    localStorage.setItem(bookingsName, JSON.stringify(jar));
                    successAlert("Quantity Updated!!!")
                }
            })
        })
    })

    bookBtn.addEventListener("click", async (e) => {
        let itemPriceList = [];
        let qList = [];
        let displaySec = document.querySelector(".form__items");
        let cartCard = document.querySelectorAll(".form__item__bod");

        if (displaySec !== null) {
            cartCard.forEach(item => {
                let quantity = item.childNodes[7].value;
                let product = item.childNodes[3].innerText;
                let price = item.childNodes[13].innerText;

                let msg = quantity + " " + product + ", ";
                bromsg.value += msg
                qList.push(quantity);
                perItemTotal = (quantity * 1) * (price * 1);
                itemPriceList.push(perItemTotal);
            })
        }

        if (qList.includes("")) {
            return false;
        }
        if (broname.value == "") {
            return false;
        }
        if (brophn.value == "") {
            return false
        }
        if (bronum.value == "") {
            return false;
        }
        if (brotime.value == "") {
            return false
        }
        if (brodate.value == "") {
            return false;
        }

        if (bromsg.value == "") {
            return false;
        }
        e.preventDefault();
        let orguid = document.querySelector(".portiuserid").innerText;
        socket.emit("brobooking", orgid, orguid)
        try {
            let sumTotal = itemPriceList.reduce((a, b) => a + b, 0);
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/brochure/book`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: broname.value,
                    userId: userId,
                    phn_no: brophn.value,
                    organization: orgid,
                    organizationName: curorgName,
                    numberPeople: bronum.value,
                    date: brodate.value,
                    todate: brotodate.value,
                    time: brotime.value,
                    message: bromsg.value,
                    total: sumTotal,
                    createdAt: Date.now()
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    getAllUserBookings()
                    successAlert("Booking Requested Successfully :)");
                    jar.splice(0);
                    localStorage.setItem(bookingsName, JSON.stringify(jar));
                    broname.value = "";
                    brophn.value = "";
                    bronum.value = "";
                    brodate.value = "";
                    brotodate.value = "";
                    brotime.value = "";
                    bromsg.value = "";
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Duplication Input error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})();

async function getAllUserBookings() {
    let usr = document.querySelector(".curUserId").innerText;
    let org = document.querySelector(".orgid").innerText;
    let bookCont = document.querySelector(".get__booked");
    bookCont.innerHTML = "";
    try {
        const endpoint = `/api/v1/brochure/${usr}/userbooking/${org}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                let res = response.json();
                res.then(items => {
                    let item = items.bookings
                    item.forEach(el => {
                        if (el.bookingInfo) {
                            if (el.todate) {
                                bookCont.innerHTML += `
                                <div class="book__card">
                                    <p>Name : ${el.name}</p>
                                    <p>Contact : ${el.phn_no}</p>
                                    <p>No. of people : ${el.numberPeople}</p>
                                    <p>Booking From : ${el.date}</p>
                                    <p>Booking Till : ${el.todate}</p>
                                    <p>Time : ${el.time}</p>
                                    <p>Total: ${el.total}</p>
                                    <p>Message : ${el.message}</p>
                                    <p class="bookinfo">Your Booking Has been ${el.bookingInfo}</p>
                                </div>
                            `
                            }
                            else {
                                bookCont.innerHTML += `
                                <div class="book__card">
                                    <p>Name : ${el.name}</p>
                                    <p>Contact : ${el.phn_no}</p>
                                    <p>No. of people : ${el.numberPeople}</p>
                                    <p>Date : ${el.date}</p>
                                    <p>Time : ${el.time}</p>
                                    <p>Total: ${el.total}</p>
                                    <p>Message : ${el.message}</p>
                                    <p class="bookinfo">Your Booking Has been ${el.bookingInfo}</p>
                                </div>
                            `
                            }
                        }
                        else {
                            if (el.todate) {
                                bookCont.innerHTML += `
                                <div class="book__card">
                                    <p>Name : ${el.name}</p>
                                    <p>Contact : ${el.phn_no}</p>
                                    <p>No. of people : ${el.numberPeople}</p>
                                    <p>Booking From : ${el.date}</p>
                                    <p>Booking Till : ${el.todate}</p>
                                    <p>Time : ${el.time}</p>
                                    <p>Total: ${el.total}</p>
                                    <p>Message : ${el.message}</p>
                                    <p class="bookinfo bink">Waiting for booking response...</p>
                                    <button id="${el._id}" class="blackbtn deleteBooking">Cancel Booking</button>
                                </div>
                            `
                            }
                            else {
                                bookCont.innerHTML += `
                                    <div class="book__card">
                                        <p>Name : ${el.name}</p>
                                        <p>Contact : ${el.phn_no}</p>
                                        <p>No. of people : ${el.numberPeople}</p>
                                        <p>Date : ${el.date}</p>
                                        <p>Time : ${el.time}</p>
                                        <p>Total: ${el.total}</p>
                                        <p>Message : ${el.message}</p>
                                        <p class="bookinfo bink">Waiting for booking response...</p>
                                        <button id="${el._id}" class="blackbtn deleteBooking">Cancel Booking</button>
                                    </div>
                                `
                            }
                        }
                        let del = document.querySelectorAll(".deleteBooking");
                        del.forEach(item => {
                            item.addEventListener("click", () => {
                                let delId = item.id
                                deleteBooking(delId)
                            })
                        })
                    })
                })
            }
            else if (response.status === 401) {
                errorAlert("You Are Not Logged In")
            }
            else {
                console.log(response);
                errorAlert("Error While fetching bookings!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

getAllUserBookings()

async function deleteBooking(delId) {
    let orgid = document.querySelector(".orgid").innerText;
    let socket = io();

    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/brochure/deletebook/${delId}`
        await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                let orguid = document.querySelector(".portiuserid").innerText;
                socket.emit("brobooking", orgid, orguid)
                getAllUserBookings()
                successAlert("Your Booking Has Been Deleted Successfully :)");
            } else {
                console.log(response);
                errorAlert("Invalid input, Duplication Input error!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

(function () {
    let cancelBanner = document.querySelector(".cancelbanner");
    let bannerSec = document.querySelector(".bro__banner__sec ");

    cancelBanner.addEventListener("click", () => {
        bannerSec.remove();
        window.sessionStorage.setItem("hideBanner", "true");
    })
})();

window.addEventListener("load", async () => {
    let pgCount = document.querySelector(".pageCount");
    let orgId = document.querySelector(".ogid").innerText;
    let orgUsrId = document.querySelector(".portiuserid").innerText;
    let usrId = document.querySelector(".curloguser").innerText;
    if (pgCount.innerText === "") {
        pgCount.innerText = 0;
    }
    let hideBanner = window.sessionStorage.getItem('hideBanner');
    let banner = document.querySelector(".bro__banner__sec");
    if (hideBanner == "true") {
        banner.classList.add("hidden");
    }
    else {
        banner.classList.remove("hidden");
    }
    let newCount = (pgCount.innerText * 1) + 1;
    let pgCounter = window.sessionStorage.getItem('pageCounter');
    if (pgCounter == null) {
        if (orgUsrId !== "" && usrId !== "") {
            if (orgUsrId !== usrId) {
                window.sessionStorage.setItem('pageCounter', newCount);
                try {
                    let load = document.querySelector('.loader');
                    load.classList.remove("hidden")
                    const endpoint = `/api/v1/brochure/${orgId}/updateOrg`
                    await fetch(endpoint, {
                        method: 'PATCH',
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            pageCount: newCount
                        })
                    }).then((response) => {
                        load.classList.add("hidden");
                        if (response.status === 200) {
                        } else {
                            console.log(response);
                            errorAlert("Error Pg!!!")
                        }
                    })
                }
                catch (err) {
                    console.log(err);
                    errorAlert('Sorry! Something went wrong', err);
                };
            }
        }
        else {
            window.sessionStorage.setItem('pageCounter', newCount);
            try {
                let load = document.querySelector('.loader');
                load.classList.remove("hidden")
                const endpoint = `/api/v1/brochure/${orgId}/updateOrg`
                await fetch(endpoint, {
                    method: 'PATCH',
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        pageCount: newCount
                    })
                }).then((response) => {
                    load.classList.add("hidden");
                    if (response.status === 200) {
                    } else {
                        console.log(response);
                        errorAlert("Error Pg!!!")
                    }
                })
            }
            catch (err) {
                console.log(err);
                errorAlert('Sorry! Something went wrong', err);
            };
        }
    }
});

(function () {
    let terms = document.querySelector(".terms");
    let policies = document.querySelector(".policies");

    let termbod = document.querySelector(".terms__sec");
    let privbod = document.querySelector(".policies__sec");
    let cancelterm = document.querySelector(".hideterms");
    let cancelpriv = document.querySelector(".hideprivacypolicies");

    cancelterm.addEventListener("click", () => {
        termbod.classList.add("hidden");
    })

    cancelpriv.addEventListener("click", () => {
        privbod.classList.add("hidden");
    })

    terms.addEventListener("click", () => {
        termbod.classList.remove("hidden");
    });

    policies.addEventListener("click", () => {
        privbod.classList.remove("hidden");
    });
})();