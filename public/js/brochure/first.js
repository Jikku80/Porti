(function () {
    let broname = document.getElementById("broname");
    let brophn = document.getElementById("brophn_no");
    let bronum = document.getElementById("bronum");
    let brodate = document.getElementById("brodate");
    let brotodate = document.getElementById("brotodate");
    let brotime = document.getElementById("brotime");
    let bookBtn = document.getElementById("bookBtn");
    let userId = document.querySelector(".curUserId").innerText;
    let orgid = document.querySelector(".orgid").innerText;
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
        e.preventDefault();
        socket.emit("brobooking", orgid)
        try {
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
                    numberPeople: bronum.value,
                    date: brodate.value,
                    todate: brotodate.value,
                    time: brotime.value,
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
                    brotime.value = ""
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
            } else {
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
    })
})();