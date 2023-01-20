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
            const endpoint = `/api/v1/catalouge/getToday/${restroid}`
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
                        ordcount.innerHTML = `<h2 class="txtcent">Total No. of Orders Today : ${data.length}</h2>`
                        data.forEach(item => {
                            orderlistbod.innerHTML +=
                                `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Type : ${item.total}</p>
                                        <p>Address: ${item.address}</p>
                                        <p>Phone Number: ${item.phn_no}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                        })
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
            const endpoint = `/api/v1/catalouge/getWeek/${restroid}`
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
                        ordcount.innerHTML = `<h2 class="txtcent">Total No. of Orders This Week : ${data.length}</h2>`
                        data.forEach(item => {
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Type : ${item.table}</p>
                                        <p>Address: ${item.address}</p>
                                        <p>Phone Number: ${item.phn_no}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Table : ${item.table}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                            }
                        })
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
            const endpoint = `/api/v1/catalouge/getMonth/${restroid}`
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
                        ordcount.innerHTML = `<h2 class="txtcent">Total No. of Orders Made In Last 30 Days : ${data.length}</h2>`
                        data.forEach(item => {
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Type : ${item.table}</p>
                                        <p>Address: ${item.address}</p>
                                        <p>Phone Number: ${item.phn_no}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Table : ${item.table}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                            }
                        })
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
            const endpoint = `/api/v1/catalouge/byMonth/${restroid}/find/${val}`
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
                        ordcount.innerHTML = `<h2 class="txtcent">Total No. of Orders made in ${val} : ${data.length}</h2>`
                        data.forEach(item => {
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Type : ${item.table}</p>
                                        <p>Address: ${item.address}</p>
                                        <p>Phone Number: ${item.phn_no}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Table : ${item.table}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                            }
                        })
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

function getOrderBar(data, elem) {
    const ctx = document.getElementById(elem);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Confirmed Amount", "Cancelled & Leftout Amount"],
            datasets: [{
                label: 'Order Amount Chart',
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
        const endpoint = `/api/v1/catalouge/perDay/${restroid}`
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
        const endpoint = `/api/v1/catalouge/orderDetails/${val}`
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
                    totaldisp.innerText = `Total Number Of Orders ${total}`
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
            const endpoint = `/api/v1/catalouge/getRes/${restroid}`
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
                        ordcount.innerHTML = `<h2 class="txtcent">Total No. of Restaurant Orders : ${data.length}</h2>`
                        data.forEach(item => {
                            if (item.address && item.phn_no) {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Type : ${item.table}</p>
                                        <p>Address: ${item.address}</p>
                                        <p>Phone Number: ${item.phn_no}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                            }
                            else {
                                orderlistbod.innerHTML +=
                                    `
                                    <div class="order__card">
                                        <p>From : ${item.name}</p>
                                        <p>Order : ${item.message}</p>
                                        <p>Table : ${item.table}</p>
                                        <p>Order info: ${item.orderInfo}</p>
                                        <p>Created At: ${item.createdAt}</p>
                                    </div>
                                `
                            }
                        })
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

})();