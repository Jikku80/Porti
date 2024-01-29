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
    let socket = io();

    socket.on("brobookingreply", (broid, orguser, orguserid) => {
        if (orgid === broid) {
            if (userId === orguserid) {
                alrt.play();
                getAllUserBookings();
            }
        }
    })

    bookBtn.addEventListener("click", async (e) => {
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
            let load = document.querySelector('.loader');
            let totalprice = document.querySelector(".packagetotal").innerText;
            let discountpercent = document.querySelector(".packagediscount").innerText;
            let total;
            if (discountpercent !== "") {
                let disper = (discountpercent * 1) / 100
                let newp = (totalprice * 1) * disper;
                total = (totalprice * 1) - newp;
            } else {
                total = (totalprice * 1)
            }
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
                    total: total,
                    createdAt: Date.now()
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    getAllUserBookings()
                    successAlert("Booking Requested Successfully :)");
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
                                    <p>Service For : ${el.numberPeople}</p>
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
                                    <p>Service For : ${el.numberPeople}</p>
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
                                    <p>Service For : ${el.numberPeople}</p>
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
                                        <p>Service For : ${el.numberPeople}</p>
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
    let bannerinfo = document.querySelector(".bannerinfo").innerText;
    if (bannerinfo !== "") {
        if (hideBanner == "true") {
            banner.classList.add("hidden");
        }
        else {
            banner.classList.remove("hidden");
        }
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

let next = document.querySelector(".next__bro");
let prev = document.querySelector(".prev__bro");
let pgC = window.sessionStorage.getItem('paginate');

let x;
if (pgC === null) {
    x = 1
}
else {
    x = pgC
};

(async function () {
    let subItems = document.querySelector("#section")
    let pg;
    if (pgC === null) {
        pg = 1
    }
    else {
        pg = pgC
    }
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        subItems.innerHTML = "";
        let resultpath = document.querySelector(".portiuserid").innerText;
        const endpoint = `/api/v1/brochure/${resultpath}/pagination?bro=${pg}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result.brochures
                    items.forEach(el => {
                        if (!el.coverImage) {
                            subItems.innerHTML +=
                                `
                                <div class="first__bro__sec__section">
                                    <div class="first__bro__sec__half">
                                    <img class="section__img" loading="lazy" src="/images/upload.png" alt="catalouge__item__img">
                                    </div>
                                    <div class="first__bro__sec__other">
                                        <h2 class="">${el.name}</h1>
                                        <pre>${el.detail}</pre>
                                    </div>
                                </div>
                            `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                <div class="first__bro__sec__section">
                                    <div class="first__bro__sec__half">
                                    <img class="section__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                    </div>
                                    <div class="first__bro__sec__other">
                                        <h2 class="">${el.name}</h1>
                                        <pre>${el.detail}</pre>
                                    </div>
                                </div>
                            `
                        }
                    });
                    if (subItems.children.length === 20) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
                    }
                    if (subItems.innerHTML == "") {
                        next.classList.add("hidden");
                        subItems.innerHTML = `<h3 class="go__back center goldn">Oops!! Thats All You've Added So Far :)</h3>`
                    }
                })
            } else {
                console.log(response);
                errorAlert("Error")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };

    if (pg == 1) {
        prev.classList.add("hidden")
    }
    else {
        prev.classList.remove("hidden");
    }

})();

next.addEventListener("click", async () => {
    let pg = ++x;
    prev.classList.remove("hidden");
    window.sessionStorage.setItem("paginate", pg);
    window.location.hash = "#"
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let subItems = document.querySelector("#section")
        subItems.innerHTML = "";
        let resultpath = document.querySelector(".portiuserid").innerText;
        const endpoint = `/api/v1/brochure/${resultpath}/pagination?bro=${pg}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result.brochures
                    items.forEach(el => {
                        if (!el.coverImage) {
                            subItems.innerHTML +=
                                `
                                <div class="first__bro__sec__section">
                                    <div class="first__bro__sec__half">
                                    <img class="section__img" loading="lazy" src="/images/upload.png" alt="catalouge__item__img">
                                    </div>
                                    <div class="first__bro__sec__other">
                                        <h2 class="">${el.name}</h1>
                                        <pre>${el.detail}</pre>
                                    </div>
                                </div>
                            `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                <div class="first__bro__sec__section">
                                    <div class="first__bro__sec__half">
                                    <img class="section__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                    </div>
                                    <div class="first__bro__sec__other">
                                        <h2 class="">${el.name}</h1>
                                        <pre>${el.detail}</pre>
                                    </div>
                                </div>
                            `
                        }
                    });
                    window.setTimeout(() => {
                        location.hash = "#section"
                    }, 200)
                    if (subItems.children.length === 20) {
                        next.classList.remove("hidden");
                    } else {
                        next.classList.add("hidden");
                    }
                    if (subItems.innerHTML == "") {
                        next.classList.add("hidden");
                        subItems.innerHTML = `<h3 class="go__back center goldn">Oops!! Thats All You've Added So Far :)</h3>`
                    }
                })
            } else {
                console.log(response);
                errorAlert("Error")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
})

prev.addEventListener("click", async () => {
    let pg = --x
    window.sessionStorage.setItem("paginate", pg);
    try {
        let load = document.querySelector('.loader');
        window.location.hash = "#"
        load.classList.remove("hidden")
        if (x == 1) {
            prev.classList.add("hidden")
        }
        next.classList.remove("hidden");
        let subItems = document.querySelector("#section")
        subItems.innerHTML = "";
        let resultpath = document.querySelector(".portiuserid").innerText;
        const endpoint = `/api/v1/brochure/${resultpath}/pagination?bro=${pg}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let items = result.brochures
                    items.forEach(el => {
                        if (!el.coverImage) {
                            subItems.innerHTML +=
                                `
                                <div class="first__bro__sec__section">
                                    <div class="first__bro__sec__half">
                                    <img class="section__img" loading="lazy" src="/images/upload.png" alt="catalouge__item__img">
                                    </div>
                                    <div class="first__bro__sec__other">
                                        <h2 class="">${el.name}</h1>
                                        <pre>${el.detail}</pre>
                                    </div>
                                </div>
                            `
                        }
                        else {
                            subItems.innerHTML +=
                                `
                                <div class="first__bro__sec__section">
                                    <div class="first__bro__sec__half">
                                    <img class="section__img" loading="lazy" src="${el.coverImage}" alt="catalouge__item__img">
                                    </div>
                                    <div class="first__bro__sec__other">
                                        <h2 class="">${el.name}</h1>
                                        <pre>${el.detail}</pre>
                                    </div>
                                </div>
                            `
                        }
                    });
                })
                window.setTimeout(() => {
                    location.hash = "#section"
                }, 200)
            } else {
                console.log(response);
                errorAlert("Error")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
});

(function () {
    let hamnav = document.querySelector(".hamnav");
    let nav = document.querySelector(".first__bro__nav");
    let closenav = document.querySelector(".closenavbar");

    hamnav.addEventListener("click", () => {
        nav.style.display = "inline-block";
    })

    closenav.addEventListener("click", () => {
        nav.style.display = "none";
    })
})();