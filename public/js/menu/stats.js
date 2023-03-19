let restosec = document.querySelector(".restosec");
let reservesec = document.querySelector(".allreservesec");
let homesec = document.querySelector(".homesec");
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
            const endpoint = `/api/v1/menu/${restroid}/getToday`
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
                        let foodata = item.foodOrders;
                        ordcount.innerHTML = `
                        <h2 class="txtcent txt grntag">Total No. of Orders Today : ${data.length}</h2>
                        <h2 class="txtcent txt grntag">Total Confirmed Order Amount : ${item.totalConfirmedAmount}</h2>
                        <h2 class="txtcent txt rdtag">Total Canceled & Left Out Order Amount : ${item.totalUnConfirmedAmount}</h2>
                        `
                        foodata.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">   
                                            <p>By : ${item.table}</p>
                                            <p>Address: ${item.address}</p>
                                            <p>Contact: ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status: ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                        })
                        reservesec.classList.add("hidden");
                        restosec.classList.add("hidden");
                        homesec.classList.add("hidden");
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
                        <canvas class="pie" id="todaysrespie"></canvas>
                        </div>
                        `
                        getOrderPieChart(list, 'todays__pie');
                        let barList = [];
                        barList.push(item.totalResOrd);
                        barList.push(item.totalHomeOrd);
                        getOrderBar(barList, 'todaysBar')
                        getFilteredReserve("getResToday", restroid, "todaysrespie")
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
            const endpoint = `/api/v1/menu/${restroid}/getWeek`
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
                        let foodata = item.foodOrders;
                        ordcount.innerHTML = `
                        <h2 class="txtcent grntag">Total No. of Orders This Week : ${data.length}</h2>
                        <h2 class="txtcent grntag">Total Confirmed Order Amount : ${item.totalConfirmedAmount}</h2>
                        <h2 class="txtcent rdtag">Total Canceled & Left Out Order Amount : ${item.totalUnConfirmedAmount}</h2>
                        `
                        foodata.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                        })
                        reservesec.classList.add("hidden");
                        restosec.classList.add("hidden");
                        homesec.classList.add("hidden");
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
                        <canvas class="pie" id="weeksrespie"></canvas>
                        </div>
                        `
                        getOrderPieChart(list, 'weeks__pie');
                        let barList = [];
                        barList.push(item.totalResOrd);
                        barList.push(item.totalHomeOrd);
                        getOrderBar(barList, 'weeksBar')
                        getFilteredReserve("getResWeek", restroid, "weeksrespie")
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
            const endpoint = `/api/v1/menu/${restroid}/getMonth`
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
                        let foodata = item.foodOrders;
                        ordcount.innerHTML = `
                        <h2 class="txtcent grntag">Total No. of Orders Made In Last 30 Days : ${data.length}</h2>
                        <h2 class="txtcent grntag">Total Confirmed Order Amount : ${item.totalConfirmedAmount}</h2>
                        <h2 class="txtcent rdtag">Total Canceled & Left Out Order Amount : ${item.totalUnConfirmedAmount}</h2>
                        `
                        foodata.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address: ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                        })
                        reservesec.classList.add("hidden");
                        restosec.classList.add("hidden");
                        homesec.classList.add("hidden");
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
                        <canvas class="pie" id="monthsrespie"></canvas>
                        </div>
                        `
                        getOrderPieChart(list, 'months__pie');
                        let barList = [];
                        barList.push(item.totalResOrd);
                        barList.push(item.totalHomeOrd);
                        getOrderBar(barList, 'monthsBar')
                        getFilteredReserve("getResMonth", restroid, "monthsrespie")
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
            const endpoint = `/api/v1/menu/by/${restroid}/find/${val}/Month`
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
                        let foodata = item.foodOrders;
                        ordcount.innerHTML = `
                        <h2 class="txtcent grntag">Total No. of Orders made in ${val} : ${data.length}</h2>
                        <h2 class="txtcent grntag">Total Confirmed Order Amount : ${item.totalConfirmedAmount}</h2>
                        <h2 class="txtcent rdtag">Total Canceled & Left Out Order Amount : ${item.totalUnConfirmedAmount}</h2>
                        `
                        foodata.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address: ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                        })
                        reservesec.classList.add("hidden");
                        restosec.classList.add("hidden");
                        homesec.classList.add("hidden");
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
                        <canvas class="pie" id="monthlyResPie"></canvas>
                        </div>
                        `
                        getOrderPieChart(list, 'monthlyPie');
                        let barList = [];
                        barList.push(item.totalResOrd);
                        barList.push(item.totalHomeOrd);
                        getOrderBar(barList, 'monthlyBar')
                        byMonthReserve(restroid, val)
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
                label: 'No of Orders',
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
            labels: ["Orders Confirmed", "Orders Cancelled", "Orders Left Out"],
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

function getReservePieChart(data, elem) {
    const ctx = document.getElementById(elem);
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Reservation Confirmed", "Reservation Cancelled", "Reservation Left Out"],
            datasets: [{
                label: 'Reservation Chart',
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
            labels: ["Restaurant", "Home"],
            datasets: [{
                label: 'Order Type Chart',
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
                            size: 20
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
        const endpoint = `/api/v1/menu/perDay/${restroid}`
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
        const endpoint = `/api/v1/menu/orderDetails/${val}`
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
                    totaldisp.innerHTML = `
                    <h2 class="txtcent grntag">Total Number Of Orders : ${total}</h2>
                    <h2 class="txtcent grntag">Total Confirmed Order Amount : ${item.totalConfirmedAmount}</h2>
                    <h2 class="txtcent rdtag">Total Canceled & Left Out Order Amount : ${item.totalUnConfirmedAmount}</h2>
                    `
                    let barList = [];
                    barList.push(item.totalResOrd);
                    barList.push(item.totalHomeOrd);
                    getOrderBar(barList, 'myBar')
                    getAllReserveDetails(val)
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

async function getAllReserveDetails(val) {
    try {
        const endpoint = `/api/v1/menu/getreservedetails/${val}`
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
                    let list = [];
                    list.push(item.totalConfirm)
                    list.push(item.totalCanceled)
                    list.push(item.totalLeftOut)
                    getReservePieChart(list, 'resPie')
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
}

async function getFilteredReserve(route, val, elemid) {
    try {
        const endpoint = `/api/v1/menu/${route}/${val}`
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
                    reslist = []
                    reslist.push(item.totalConfirm);
                    reslist.push(item.totalCanceled);
                    reslist.push(item.totalLeftOut);
                    getReservePieChart(reslist, `${elemid}`)
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
}

async function byMonthReserve(restro, month) {
    try {
        const endpoint = `/api/v1/menu/byResMonth/${restro}/find/${month}`
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
                    reslist = []
                    reslist.push(item.totalConfirm);
                    reslist.push(item.totalCanceled);
                    reslist.push(item.totalLeftOut);
                    getReservePieChart(reslist, 'monthlyResPie')
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
}

(function () {
    let theme = document.querySelector(".statUserTheme").innerText;
    let bodsec = document.querySelector(".restro__stat__sec");
    let label = document.querySelectorAll(".txt");
    let btn = document.querySelectorAll(".statbtn");
    let inpt = document.getElementById("getyear");
    let selec = document.getElementById("months");
    let lod = document.querySelector(".loader");
    let cback = document.querySelector(".chart__back");
    let cgrp = document.querySelectorAll(".restro__graph__grp");
    let rdtag = document.querySelectorAll(".rdtag");

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
    let getReserve = document.getElementById("getAllReserve");

    getHome.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
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
            location.hash = "#";
            const endpoint = `/api/v1/menu/${restroid}/getHome`
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
                        ordcount.innerHTML = `<h2 class="txtcent grntag">Total No. of Home Orders : ${data.length}</h2>`
                        data.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                        })
                        reservesec.classList.add("hidden");
                        restosec.classList.add("hidden");
                        homesec.classList.remove("hidden");
                        bymonthsec.classList.add("hidden");
                        monthsec.classList.add("hidden");
                        weeksec.classList.add("hidden");
                        daysec.classList.add("hidden");
                        let homenext = document.querySelector(".homenext");
                        if (orderlistbod.children.length == 20) {
                            homenext.classList.remove("hidden");
                        }
                        window.setTimeout(() => {
                            location.hash = "#restro__order__data";
                        }, 200)
                        successAlert(`All Home Orders :)`);
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
            const endpoint = `/api/v1/menu/${restroid}/getRes`
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
                        ordcount.innerHTML = `<h2 class="txtcent grntag">Total No. of Restaurant Orders : ${data.length}</h2>`
                        data.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                        })
                        reservesec.classList.add("hidden");
                        restosec.classList.remove("hidden");
                        homesec.classList.add("hidden");
                        bymonthsec.classList.add("hidden");
                        monthsec.classList.add("hidden");
                        weeksec.classList.add("hidden");
                        daysec.classList.add("hidden");
                        let restonext = document.querySelector(".restonext");
                        if (orderlistbod.children.length == 20) {
                            restonext.classList.remove("hidden");
                        }
                        window.setTimeout(() => {
                            location.hash = "#restro__order__data";
                        }, 200)
                        successAlert(`All Home Orders :)`);
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

    getReserve.addEventListener("click", async (e) => {
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
            const endpoint = `/api/v1/menu/${restroid}/getAllReserve`
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
                        ordcount.innerHTML = `<h2 class="txtcent grntag">Total No. of Reservation : ${data.length}</h2>`
                        data.forEach(item => {
                            let dt = item.createdAt
                            dt = dt.toLocaleString();
                            let newdate = dt.slice(0, 10)
                            orderlistbod.innerHTML +=
                                `
                                <div class="order__card">
                                    <p>${item.name}</p>
                                    <div class="order__card__mid">
                                        <p>Date : ${item.date}</p>
                                        <p>Time : ${item.time}</p>
                                        <p>Contact : ${item.phn_no}</p>
                                        <p>Status : ${item.bookingInfo}</p>
                                    </div>
                                    <p class="gry">Created At: ${newdate}</p>
                                </div>
                                `
                        })
                        reservesec.classList.remove("hidden");
                        restosec.classList.add("hidden");
                        homesec.classList.add("hidden");
                        bymonthsec.classList.add("hidden");
                        monthsec.classList.add("hidden");
                        weeksec.classList.add("hidden");
                        daysec.classList.add("hidden");
                        let reservenext = document.querySelector(".allreservenext");
                        if (orderlistbod.children.length == 20) {
                            reservenext.classList.remove("hidden");
                        }
                        window.setTimeout(() => {
                            location.hash = "#restro__order__data";
                        }, 200)
                        successAlert(`All Reservations :)`);
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

async function mostLiked() {
    let likeCont = document.querySelector(".likedItem");
    let disLikeCont = document.querySelector(".disLikedItem");

    try {
        let restroid = document.querySelector(".currentusrid").innerText;
        const endpoint = `/api/v1/menu/mostLiked/${restroid}`
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
                    data = item.mostLiked;
                    data.forEach(item => {
                        likeCont.innerHTML +=
                            `
                            <h2 class="txtcent">${item.name}</h2>
                        `
                    })
                    disLikeData = item.mostDisLiked;
                    disLikeData.forEach(item => {
                        disLikeCont.innerHTML +=
                            `
                            <h2 class="txtcent">${item.name}</h2>
                        `
                    })
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
};
mostLiked();


(function () {
    let x = 1;
    let reservenext = document.querySelector(".allreservenext");
    let reserveprev = document.querySelector(".allreserveprev");
    let orderlistbod = document.querySelector(".restro__order__list");
    let restonext = document.querySelector('.restonext');
    let restoprev = document.querySelector('.restoprev');
    let homenext = document.querySelector('.homenext');
    let homeprev = document.querySelector('.homeprev');

    let bymonthnext = document.querySelector('.bymonthnext');
    let bymonthprev = document.querySelector('.bymonthprev');
    let monthnext = document.querySelector('.monthnext');
    let monthprev = document.querySelector('.monthprev');
    let weeknext = document.querySelector('.weeknext');
    let weekprev = document.querySelector('.weekprev');
    let daynext = document.querySelector('.daynext');
    let dayprev = document.querySelector('.dayprev');
    let restroid = document.querySelector(".currentrestroid").innerText;

    restonext.addEventListener("click", async () => {
        let pg = ++x
        restoprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/menu/${restroid}/getRes?order=${pg}`
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
                                                <p>By : ${item.table}</p>
                                                <p>Total : ${item.total}</p>
                                                <p>Status : ${item.orderInfo}</p>
                                            </div>
                                            <p>Order : ${item.message}</p>
                                            <p class="gry">Created At: ${newdate}</p>
                                        </div>
                                    `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
                        if (orderlistbod.children.length === 20) {
                            restonext.classList.remove("hidden");
                        } else {
                            restonext.classList.add("hidden");
                        }
                        if (orderlistbod.innerHTML == "") {
                            restonext.classList.add("hidden");
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Orders So Far :)</p>`
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

    restoprev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                restoprev.classList.add("hidden")
            }
            restonext.classList.remove("hidden");
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/menu/${restroid}/getRes?order=${pg}`
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
                                                <p>By : ${item.table}</p>
                                                <p>Total : ${item.total}</p>
                                                <p>Status : ${item.orderInfo}</p>
                                            </div>
                                            <p>Order : ${item.message}</p>
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

    homenext.addEventListener("click", async () => {
        let pg = ++x
        homeprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/menu/${restroid}/getHome?order=${pg}`
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
                                                <p>By : ${item.table}</p>
                                                <p>Total : ${item.total}</p>
                                                <p>Address : ${item.address}</p>
                                                <p>Contact : ${item.phn_no}</p>
                                                <p>Status : ${item.orderInfo}</p>
                                            </div>
                                            <p>Order : ${item.message}</p>
                                            <p class="gry">Created At: ${newdate}</p>
                                        </div>
                                    `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
                        if (orderlistbod.children.length === 20) {
                            homenext.classList.remove("hidden");
                        } else {
                            homenext.classList.add("hidden");
                        }
                        if (orderlistbod.innerHTML == "") {
                            homenext.classList.add("hidden");
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Orders So Far :)</p>`
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

    homeprev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                homeprev.classList.add("hidden")
            }
            homenext.classList.remove("hidden");
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/menu/${restroid}/getHome?order=${pg}`
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
                                                <p>By : ${item.table}</p>
                                                <p>Total : ${item.total}</p>
                                                <p>Address : ${item.address}</p>
                                                <p>Contact : ${item.phn_no}</p>
                                                <p>Status : ${item.orderInfo}</p>
                                            </div>
                                            <p>Order : ${item.message}</p>
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

    reservenext.addEventListener("click", async () => {
        let pg = ++x
        reserveprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/menu/${restroid}/getAllReserve?reserve=${pg}`
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
                                    <p>Date : ${item.date}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
                                <p class="gry">Created At: ${newdate}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#order_list";
                        }, 200)
                        if (orderlistbod.children.length === 20) {
                            reservenext.classList.remove("hidden");
                        } else {
                            reservenext.classList.add("hidden");
                        }
                        if (orderlistbod.innerHTML == "") {
                            reservenext.classList.add("hidden");
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Reservations So Far :)</p>`
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

    reserveprev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                reserveprev.classList.add("hidden")
            }
            reservenext.classList.remove("hidden");
            orderlistbod.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/menu/${restroid}/getAllReserve?reserve=${pg}`
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
                                    <p>Date : ${item.date}</p>
                                    <p>Time : ${item.time}</p>
                                    <p>Contact : ${item.phn_no}</p>
                                    <p>Status : ${item.bookingInfo}</p>
                                </div>
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
            const endpoint = `/api/v1/menu/by/${restroid}/find/${val}/Month?food=${pg}`
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
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
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
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Orders So Far :)</p>`
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
            const endpoint = `/api/v1/menu/by/${restroid}/find/${val}/Month?food=${pg}`
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
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
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
            const endpoint = `/api/v1/menu/${restroid}/getMonth?food=${pg}`
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
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
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
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Orders So Far :)</p>`
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
            const endpoint = `/api/v1/menu/${restroid}/getMonth?food=${pg}`
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
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
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
            const endpoint = `/api/v1/menu/${restroid}/getWeek?food=${pg}`
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
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
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
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Orders So Far :)</p>`
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
            const endpoint = `/api/v1/menu/${restroid}/getWeek?food=${pg}`
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
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
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
            const endpoint = `/api/v1/menu/${restroid}/getToday?food=${pg}`
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
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
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
                            orderlistbod.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Orders So Far :)</p>`
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
            const endpoint = `/api/v1/menu/${restroid}/getToday?food=${pg}`
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
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Address : ${item.address}</p>
                                            <p>Contact : ${item.phn_no}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>${item.name}</p>
                                        <div class="order__card__mid">
                                            <p>By : ${item.table}</p>
                                            <p>Total : ${item.total}</p>
                                            <p>Status : ${item.orderInfo}</p>
                                        </div>
                                        <p>Order : ${item.message}</p>
                                        <p class="gry">Created At: ${newdate}</p>
                                    </div>
                                `
                            }
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