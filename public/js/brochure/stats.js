let allbooksec = document.querySelector(".allbooksec");
let returnsec = document.querySelector(".returnsec");
let bymonthsec = document.querySelector('.bymonthsec');
let monthsec = document.querySelector(".monthsec");
let weeksec = document.querySelector(".weeksec");
let daysec = document.querySelector(".daysec");

(function () {
    let perDayBtn = document.getElementById("getPerDay");
    let perWeekBtn = document.getElementById("getPerWeek");
    let perMonthBtn = document.getElementById("getPerMonth");
    let orderlistbod = document.querySelector(".restro__order__list");
    let restroid = document.querySelector(".currentrestroid").innerText;
    let ordcount = document.querySelector(".restro__order__count");

    perDayBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            location.hash = "#";
            const endpoint = `/api/v1/brochure/${restroid}/getToday`
            await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                }
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    let res = response.json();
                    res.then(item => {
                        data = item.resOrders;
                        ordcount.innerHTML = `<h2 class="txtcent grntag">Total No. of Booking Today : ${data.length}</h2>`
                        data.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        })
                        allbooksec.classList.add("hidden");
                        bymonthsec.classList.add("hidden");
                        monthsec.classList.add("hidden");
                        weeksec.classList.add("hidden");
                        daysec.classList.remove("hidden");
                        let daynext = document.querySelector(".daynext");
                        if (orderlistbod.children.length == 20) {
                            daynext.classList.remove("hidden");
                        }
                        list = []
                        list.push(item.totalConfirm);
                        list.push(item.totalCanceled);
                        list.push(item.totalLeftOut);
                        let curpie = document.getElementById("today__sec")
                        let curweekpie = document.getElementById("week__sec")
                        let curmonthpie = document.getElementById("month__sec")
                        let curbymonthpie = document.getElementById("bymonths__pie")

                        if (!curweekpie.classList.contains("hidden")) {
                            curweekpie.classList.add("hidden");
                        }
                        if (!curmonthpie.classList.contains("hidden")) {
                            curmonthpie.classList.add("hidden");
                        }
                        if (!curbymonthpie.classList.contains("hidden")) {
                            curbymonthpie.classList.add("hidden");
                        }
                        curpie.classList.remove("hidden");
                        curpie.innerHTML = ""
                        curpie.innerHTML = `
                        <canvas class="pie" id="todays__pie"></canvas>
                        <canvas class="bar" id="todaysBar"></canvas>
                        </div>
                        `
                        getOrderPieChart(list, 'todays__pie');
                        let barList = [];
                        barList.push(item.totalConfirmedAmount);
                        barList.push(item.totalUnConfirmedAmount);
                        getOrderBar(barList, 'todaysBar')
                        successAlert("Orders Made Today :)");
                        window.setTimeout(() => {
                            location.hash = "#restro__order__data";
                        }, 200)
                    })

                } else {
                    console.log(response);
                    errorAlert("Fetching data error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })

    perWeekBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            location.hash = "#";
            const endpoint = `/api/v1/brochure/${restroid}/getWeek`
            await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                }
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    let res = response.json();
                    res.then(item => {
                        let data = item.resOrders;
                        ordcount.innerHTML = `<h2 class="txtcent grntag">Total No. of Bookings This Week : ${data.length}</h2>`
                        let boodata = item.bookings;
                        boodata.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        })
                        allbooksec.classList.add("hidden");
                        bymonthsec.classList.add("hidden");
                        monthsec.classList.add("hidden");
                        weeksec.classList.remove("hidden");
                        daysec.classList.add("hidden");
                        let weeknext = document.querySelector(".weeknext");
                        if (orderlistbod.children.length == 20) {
                            weeknext.classList.remove("hidden");
                        }
                        successAlert("Last Week Orders :)");
                        window.setTimeout(() => {
                            location.hash = "#restro__order__data";
                        }, 200)
                        list = []
                        list.push(item.totalConfirm);
                        list.push(item.totalCanceled);
                        list.push(item.totalLeftOut);
                        let curpie = document.getElementById("today__sec")
                        let curweekpie = document.getElementById("week__sec")
                        let curmonthpie = document.getElementById("month__sec")
                        let curbymonthpie = document.getElementById("bymonths__pie")

                        if (!curpie.classList.contains("hidden")) {
                            curpie.classList.add("hidden");
                        }
                        if (!curmonthpie.classList.contains("hidden")) {
                            curmonthpie.classList.add("hidden");
                        }
                        if (!curbymonthpie.classList.contains("hidden")) {
                            curbymonthpie.classList.add("hidden");
                        }
                        curweekpie.classList.remove("hidden");
                        curweekpie.innerHTML = ""
                        curweekpie.innerHTML = `
                        <canvas class="pie" id="weeks__pie"></canvas>
                        <canvas class="bar" id="weeksBar"></canvas>
                        </div>
                        `
                        getOrderPieChart(list, 'weeks__pie');
                        let barList = [];
                        barList.push(item.totalConfirmedAmount);
                        barList.push(item.totalUnConfirmedAmount);
                        getOrderBar(barList, 'weeksBar')
                    })
                } else {
                    console.log(response);
                    errorAlert("Fetching data error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    });

    perMonthBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            location.hash = "#";
            const endpoint = `/api/v1/brochure/${restroid}/getMonth`
            await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                }
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    let res = response.json();
                    res.then(item => {
                        let data = item.resOrders;
                        ordcount.innerHTML = `<h2 class="txtcent grntag">Total No. of Bookings Made In Last 30 Days : ${data.length}</h2>`
                        let mndata = item.bookings
                        mndata.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        })
                        allbooksec.classList.add("hidden");
                        bymonthsec.classList.add("hidden");
                        monthsec.classList.remove("hidden");
                        weeksec.classList.add("hidden");
                        daysec.classList.add("hidden");
                        let monthnext = document.querySelector(".monthnext");
                        if (orderlistbod.children.length == 20) {
                            monthnext.classList.remove("hidden");
                        }
                        list = []
                        list.push(item.totalConfirm);
                        list.push(item.totalCanceled);
                        list.push(item.totalLeftOut);
                        let curpie = document.getElementById("today__sec")
                        let curweekpie = document.getElementById("week__sec")
                        let curmonthpie = document.getElementById("month__sec")
                        let curbymonthpie = document.getElementById("bymonths__pie")

                        if (!curweekpie.classList.contains("hidden")) {
                            curweekpie.classList.add("hidden");
                        }
                        if (!curpie.classList.contains("hidden")) {
                            curpie.classList.add("hidden");
                        }
                        if (!curbymonthpie.classList.contains("hidden")) {
                            curbymonthpie.classList.add("hidden");
                        }
                        curmonthpie.classList.remove("hidden");
                        curmonthpie.innerHTML = ""
                        curmonthpie.innerHTML = `
                        <canvas class="pie" id="months__pie"></canvas>
                        <canvas class="bar" id="monthsBar"></canvas>
                        </div>
                        `
                        getOrderPieChart(list, 'months__pie');
                        let barList = [];
                        barList.push(item.totalConfirmedAmount);
                        barList.push(item.totalUnConfirmedAmount);
                        getOrderBar(barList, 'monthsBar')
                        successAlert("Last 30 Days Orders :)");
                        window.setTimeout(() => {
                            location.hash = "#restro__order__data";
                        }, 200)
                    })
                } else {
                    console.log(response);
                    errorAlert("Fetching data error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })

    let yearVal = document.getElementById("getyear");
    let monthVal = document.getElementById("months");
    let byMonthBtn = document.getElementById("getByMonth");

    byMonthBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            location.hash = "#";
            let yrv = yearVal.value;
            let mtv = monthVal.value;
            let val = `${mtv}-${yrv}`;
            const endpoint = `/api/v1/brochure/by/${restroid}/find/${val}/Month`
            await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                }
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    let res = response.json();
                    res.then(item => {
                        data = item.resOrders;
                        ordcount.innerHTML = `<h2 class="txtcent grntag">Total No. of Bookings made in ${val} : ${data.length}</h2>`
                        let monthdata = item.foodOrders
                        monthdata.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        })
                        allbooksec.classList.add("hidden");
                        bymonthsec.classList.remove("hidden");
                        monthsec.classList.add("hidden");
                        weeksec.classList.add("hidden");
                        daysec.classList.add("hidden");
                        let bymonthnext = document.querySelector(".bymonthnext");
                        if (orderlistbod.children.length == 20) {
                            bymonthnext.classList.remove("hidden");
                        }
                        window.setTimeout(() => {
                            location.hash = "#restro__order__data";
                        }, 200)
                        list = []
                        list.push(item.totalConfirm);
                        list.push(item.totalCanceled);
                        list.push(item.totalLeftOut);
                        let curpie = document.getElementById("today__sec")
                        let curweekpie = document.getElementById("week__sec")
                        let curmonthpie = document.getElementById("month__sec")
                        let curbymonthpie = document.getElementById("bymonths__pie")
                        if (!curweekpie.classList.contains("hidden")) {
                            curweekpie.classList.add("hidden");
                        }
                        if (!curpie.classList.contains("hidden")) {
                            curpie.classList.add("hidden");
                        }
                        if (!curmonthpie.classList.contains("hidden")) {
                            curmonthpie.classList.add("hidden");
                        }
                        curbymonthpie.classList.remove("hidden");
                        curbymonthpie.innerHTML = ""
                        curbymonthpie.innerHTML = `
                        <canvas class="pie" id="monthlyPie"></canvas>
                        <canvas class="bar" id="monthlyBar"></canvas>
                        </div>
                        `
                        getOrderPieChart(list, 'monthlyPie');
                        let barList = [];
                        barList.push(item.totalConfirmedAmount);
                        barList.push(item.totalUnConfirmedAmount);
                        getOrderBar(barList, 'monthlyBar')
                        successAlert(`${val} Orders :)`);
                    })
                } else {
                    console.log(response);
                    errorAlert("Fetching data error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    })
})();

function getOrderGraph(data) {
    const ctx = document.getElementById('myChart');
    // let dates = [datToday.slice(0, 15)]
    let dates = [];
    let datToday = new Date();
    let timeofDay = 60 * 60 * 24 * 1000
    for (let i = 0; i < 30; i++) {
        let eachday = new Date(datToday.getTime() - i * timeofDay);
        let day = eachday.toString().slice(4, 10)
        dates.push(day)
    }
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'No of Bookings',
                data: data,
                borderWidth: 1,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

function getOrderPieChart(data, elem) {
    const ctx = document.getElementById(elem);
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Booking Confirmed", "Booking Cancelled", "Booking Left Out"],
            datasets: [{
                label: 'Orders Chart',
                data: data,
                backgroundColor: [
                    'rgb(0, 128, 0)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 99, 132)'
                ],
                hoverOffset: 4
            }]
        }
    });
};

function getOrderBar(data, elem) {
    const ctx = document.getElementById(elem);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Confirmed", "Cancel & Left"],
            datasets: [{
                label: 'Amount Chart',
                data: data,
                backgroundColor: [
                    'rgb(255, 205, 86)',
                    'rgb(54, 162, 235)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        font: { size: 20 }
                    }
                },
                x: {
                    ticks: {
                        font: { size: 20 }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });
};

window.addEventListener("load", async () => {
    let restroid = document.querySelector(".currentrestroid").innerText;
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        const endpoint = `/api/v1/brochure/perDay/${restroid}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                let res = response.json();
                res.then(item => {
                    getOrderGraph(item.itemlen);
                })
                successAlert("Your Last 30 Days in Graph");
            } else {
                console.log(response);
                errorAlert("Fetching data error!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };

    getOrderDetail(restroid);
})

async function getOrderDetail(val) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        let totaldisp = document.querySelector(".alltimetotalorder");
        const endpoint = `/api/v1/brochure/orderDetails/${val}`
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            }
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                let res = response.json();
                res.then(item => {
                    let list = []
                    list.push(item.totalConfirm);
                    list.push(item.totalCanceled);
                    list.push(item.totalLeftOut);
                    getOrderPieChart(list, 'myPie');
                    total = item.totalConfirm + item.totalCanceled + item.totalLeftOut;
                    totaldisp.innerText = `Total Number Of Bookings ${total}`
                    let barList = [];
                    barList.push(item.totalConfirmedAmount);
                    barList.push(item.totalUnConfirmedAmount);
                    getOrderBar(barList, 'myBar')
                })
                successAlert("Your Last 30 Days in Graph");
            } else {
                console.log(response);
                errorAlert("Fetching data error!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

(function () {
    let theme = document.querySelector(".statUserTheme").innerText;
    let bodsec = document.querySelector(".restro__stat__sec");
    let label = document.querySelectorAll(".txt");
    let btn = document.querySelectorAll(".statbtn");
    let inpt = document.getElementById("getyear");
    let selec = document.getElementById("months");
    let lod = document.querySelector(".loader");
    let cback = document.querySelector(".chart__back");
    let cgrp = document.querySelectorAll(".restro__graph__grp")

    if (theme == "red") {
        bodsec.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        document.body.style.backgroundColor = "crimson";
        btn.forEach(item => {
            item.style.border = "2px solid white";
            item.style.color = "white"
        })
        inpt.style.borderBottomColor = "white";
        selec.style.borderColor = "white";
        selec.style.color = "black";
    }
    else if (theme == "dark") {
        bodsec.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
        document.body.style.backgroundColor = "black";

    }
    else if (theme == "white") {
        bodsec.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        inpt.style.color = "black";
        cback.style.backgroundColor = "rgba(0, 0, 0, 0.822)";
        label.forEach(item => {
            item.style.color = "black";
        })
        cgrp.forEach(item => {
            item.style.backgroundColor = "rgba(0, 0, 0, 0.822)";
        })
        let footersec = document.querySelectorAll(".footer__anch");
        footersec.forEach(item => {
            item.style.color = "gray";
        })
    }
    else {
        return;
    }
})();

(function () {
    let getHome = document.getElementById("getAllHome");
    let getRes = document.getElementById("getAllRestro");
    let orderlistbod = document.querySelector(".restro__order__list");
    let restroid = document.querySelector(".currentrestroid").innerText;
    let ordcount = document.querySelector(".restro__order__count");
    let curpie = document.getElementById("today__sec")
    let curweekpie = document.getElementById("week__sec")
    let curmonthpie = document.getElementById("month__sec")
    let curbymonthpie = document.getElementById("bymonths__pie")

    getRes.addEventListener("click", async (e) => {
        e.preventDefault()
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            location.hash = "#";
            if (!curweekpie.classList.contains("hidden")) {
                curweekpie.classList.add("hidden");
            }
            if (!curpie.classList.contains("hidden")) {
                curpie.classList.add("hidden");
            }
            if (!curmonthpie.classList.contains("hidden")) {
                curmonthpie.classList.add("hidden");
            }
            if (!curbymonthpie.classList.contains("hidden")) {
                curbymonthpie.classList.add("hidden");
            }
            const endpoint = `/api/v1/brochure/${restroid}/getRes`
            await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                }
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    let res = response.json();
                    res.then(item => {
                        data = item.restroOrders;
                        ordcount.innerHTML = `<h2 class="txtcent grntag">Total No. of Bookings : ${data.length}</h2>`
                        data.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>Audience : ${item.numberPeople}</p>
                                            <p>From : ${item.date}</p>
                                            <p>To : ${item.todate}</p>
                                            <p>Time : ${item.time}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Status : ${item.bookingInfo}</p>
                                        </div>
                                        <p>Message : ${item.message}</p>
                                        <p>Total Booking Price: ${item.total}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                        })
                        allbooksec.classList.remove("hidden");
                        bymonthsec.classList.add("hidden");
                        monthsec.classList.add("hidden");
                        weeksec.classList.add("hidden");
                        daysec.classList.add("hidden");
                        let allnext = document.querySelector(".allbooknext");
                        if (orderlistbod.children.length == 20) {
                            allnext.classList.remove('hidden');
                        }
                        window.setTimeout(() => {
                            location.hash = "#restro__order__data";
                        }, 200)
                        successAlert(`All Bookings :)`);
                    })
                } else {
                    console.log(response);
                    errorAlert("Fetching data error!!!")
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
    let x = 1;
    let allnext = document.querySelector(".allbooknext");
    let allprev = document.querySelector(".allbookprev");
    let bymonthnext = document.querySelector(".bymonthnext");
    let bymonthprev = document.querySelector(".bymonthprev");
    let monthnext = document.querySelector(".monthnext");
    let monthprev = document.querySelector(".monthprev");
    let weeknext = document.querySelector(".weeknext");
    let weekprev = document.querySelector(".weekprev");
    let daynext = document.querySelector(".daynext");
    let dayprev = document.querySelector(".dayprev");
    let orderlistbod = document.querySelector(".restro__order__list");
    let restroid = document.querySelector(".currentrestroid").innerText;

    allnext.addEventListener("click", async () => {
        let pg = ++x
        allprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/brochure/${restroid}/getRes?book=${pg}`
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
                        let items = result.restroOrders
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
                        if (orderlistbod.children.length === 20) {
                            allnext.classList.remove("hidden");
                        } else {
                            allnext.classList.add("hidden");
                        }
                        if (orderlistbod.innerHTML == "") {
                            allnext.classList.add("hidden");
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Bookings So Far :)</p>`
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

    allprev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                allprev.classList.add("hidden")
            }
            allnext.classList.remove("hidden");
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/brochure/${restroid}/getRes?book=${pg}`
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
                        let items = result.restroOrders
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
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
    });

    bymonthnext.addEventListener("click", async () => {
        let pg = ++x
        bymonthprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            let yearVal = document.getElementById("getyear");
            let monthVal = document.getElementById("months");
            let yrv = yearVal.value;
            let mtv = monthVal.value;
            let val = `${mtv}-${yrv}`;
            const endpoint = `/api/v1/brochure/by/${restroid}/find/${val}/Month?book=${pg}`
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
                        let items = result.foodOrders
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
                        if (orderlistbod.children.length === 20) {
                            bymonthnext.classList.remove("hidden");
                        } else {
                            bymonthnext.classList.add("hidden");
                        }
                        if (orderlistbod.innerHTML == "") {
                            bymonthnext.classList.add("hidden");
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Bookings So Far :)</p>`
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

    bymonthprev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                bymonthprev.classList.add("hidden")
            }
            bymonthnext.classList.remove("hidden");
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            let yearVal = document.getElementById("getyear");
            let monthVal = document.getElementById("months");
            let yrv = yearVal.value;
            let mtv = monthVal.value;
            let val = `${mtv}-${yrv}`;
            const endpoint = `/api/v1/brochure/by/${restroid}/find/${val}/Month?book=${pg}`
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
                        let items = result.foodOrders
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
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
    });

    monthnext.addEventListener("click", async () => {
        let pg = ++x
        monthprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/brochure/${restroid}/getMonth?book=${pg}`
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
                        let items = result.bookings
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
                        if (orderlistbod.children.length === 20) {
                            monthnext.classList.remove("hidden");
                        } else {
                            monthnext.classList.add("hidden");
                        }
                        if (orderlistbod.innerHTML == "") {
                            monthnext.classList.add("hidden");
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Bookings So Far :)</p>`
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

    monthprev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                monthprev.classList.add("hidden")
            }
            monthnext.classList.remove("hidden");
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/brochure/${restroid}/getMonth?book=${pg}`
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
                        let items = result.bookings
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
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
    });

    weeknext.addEventListener("click", async () => {
        let pg = ++x
        weekprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/brochure/${restroid}/getWeek?book=${pg}`
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
                        let items = result.bookings
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
                        if (orderlistbod.children.length === 20) {
                            weeknext.classList.remove("hidden");
                        } else {
                            weeknext.classList.add("hidden");
                        }
                        if (orderlistbod.innerHTML == "") {
                            weeknext.classList.add("hidden");
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Bookings So Far :)</p>`
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

    weekprev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                weekprev.classList.add("hidden")
            }
            weeknext.classList.remove("hidden");
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/brochure/${restroid}/getWeek?book=${pg}`
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
                        let items = result.bookings
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
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
    });

    daynext.addEventListener("click", async () => {
        let pg = ++x
        dayprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/brochure/${restroid}/getToday?book=${pg}`
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
                        let items = result.bookings
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
                        if (orderlistbod.children.length === 20) {
                            daynext.classList.remove("hidden");
                        } else {
                            daynext.classList.add("hidden");
                        }
                        if (orderlistbod.innerHTML == "") {
                            daynext.classList.add("hidden");
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Bookings So Far :)</p>`
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

    dayprev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                dayprev.classList.add("hidden")
            }
            daynext.classList.remove("hidden");
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/brochure/${restroid}/getToday?book=${pg}`
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
                        let items = result.bookings
                        items.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                            <div class="order__card">
                                <p>${item.name}</p>
                                <div class="order__card__mid">
                                    <p>Audience : ${item.numberPeople}</p>
                                    <p>From : ${item.date}</p>
                                    <p>To : ${item.todate}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p>Message : ${item.message}</p>
                                <p>Total Booking Price: ${item.total}</p>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
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
    });
})();