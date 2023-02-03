function getOrderPieChart(data, elem) {
    const ctx = document.getElementById(elem);
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Foods", "Products", "Bookings", "Reservations", "Product Returns"],
            datasets: [{
                label: 'Orders within Porti',
                data: data,
                backgroundColor: [
                    'rgb(0, 128, 0)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 99, 132)',
                    'rgb(0, 191, 255)',
                    'rgb(255, 69, 0)'
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
            labels: ["Food", "Products"],
            datasets: [{
                label: 'Food & Products Order Amount Chart',
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


window.addEventListener("load", () => {
    let reslen = document.querySelector(".resorderslen").innerText;
    let comlen = document.querySelector(".comorderslen").innerText;
    let booklen = document.querySelector(".bookingslen").innerText;
    let reservelen = document.querySelector(".resreservelen").innerText;
    let returnlen = document.querySelector(".comreturnlen").innerText;
    let totalres = document.querySelector(".totalres").innerText;
    let totalcom = document.querySelector(".totalcom").innerText;
    let bardata = [];
    let piedata = []
    piedata.push(reslen);
    piedata.push(comlen);
    piedata.push(booklen);
    piedata.push(reservelen);
    piedata.push(returnlen);
    bardata.push(totalres);
    bardata.push(totalcom);
    getOrderPieChart(piedata, "expPie")
    getOrderBar(bardata, "expBar")
});

(function () {
    let x = 1;
    let id = document.querySelector(".curuserid").innerText;
    let next = document.querySelector(".bookNext");
    let prev = document.querySelector(".bookprev");
    let resNext = document.querySelector(".resNext");
    let resPrev = document.querySelector(".resprev");
    let comNext = document.querySelector(".comNext");
    let comPrev = document.querySelector(".comprev");
    let reserveNext = document.querySelector(".reserveNext");
    let reservePrev = document.querySelector(".reserveprev");
    let returnNext = document.querySelector(".returnNext");
    let returnPrev = document.querySelector(".returnprev");
    let orgsec = document.getElementById("exp__org__val");
    let ressec = document.getElementById("exp__res__val");
    let comsec = document.getElementById("exp__com__val");
    let reservesec = document.getElementById("exp__reserve__val");
    let returnsec = document.getElementById("exp__return__val");

    if (ressec.children.length == 10) {
        resNext.classList.remove('hidden');
    }
    if (comsec.children.length == 10) {
        comNext.classList.remove('hidden');
    }
    if (orgsec.children.length == 10) {
        next.classList.remove('hidden');
    }
    if (reservesec.children.length == 10) {
        reserveNext.classList.remove('hidden');
    }
    if (returnsec.children.length == 10) {
        returnNext.classList.remove('hidden');
    }

    resNext.addEventListener("click", async () => {
        let pg = ++x
        resPrev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            ressec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?food=${pg}`
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

                        let items = result.food
                        items.forEach(el => {
                            ressec.innerHTML +=
                                `
                                <div class="exp__items"> 
                                    <h4>${el.restroName}</h4>
                                    <p>Order : ${el.message}</p>
                                    <div class="exp__items__grp">
                                    <p>Total : ${el.total}</p>
                                    <p>Status : ${el.orderInfo}</p>
                                    </div>
                                    <p class="gry">${el.createdAt}</p>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#res__exp";
                        }, 200)
                        if (ressec.children.length === 10) {
                            resNext.classList.remove("hidden");
                        } else {
                            resNext.classList.add("hidden");
                        }
                        if (ressec.innerHTML == "") {
                            resNext.classList.add("hidden");
                            ressec.innerHTML = `<p class="go__back cnt">Oops!! Thats All You've Ordered So Far :)</p>`
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

    resPrev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                resPrev.classList.add("hidden")
            }
            resNext.classList.remove("hidden");
            ressec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?food=${pg}`
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
                        let items = result.food
                        items.forEach(el => {
                            ressec.innerHTML +=
                                `
                            <div class="exp__items"> 
                                <h4>${el.restroName}</h4>
                                <p>Order : ${el.message}</p>
                                <div class="exp__items__grp">
                                <p>Total : ${el.total}</p>
                                <p>Status : ${el.orderInfo}</p>
                                </div>
                                <p class="gry">${el.createdAt}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#res__exp";
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

    comNext.addEventListener("click", async () => {
        let pg = ++x
        comPrev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            comsec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?product=${pg}`
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

                        let items = result.product
                        items.forEach(el => {
                            comsec.innerHTML +=
                                `
                                <div class="exp__items"> 
                                    <h4>${el.companyName}</h4>
                                    <p>Order : ${el.message}</p>
                                    <div class="exp__items__grp">
                                    <p>Total : ${el.total}</p>
                                    <p>Status : ${el.orderInfo}</p>
                                    </div>
                                    <p class="gry">${el.createdAt}</p>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#com__exp";
                        }, 200)
                        if (comsec.children.length === 10) {
                            comNext.classList.remove("hidden");
                        } else {
                            comNext.classList.add("hidden");
                        }
                        if (comsec.innerHTML == "") {
                            comNext.classList.add("hidden");
                            comsec.innerHTML = `<p class="go__back cnt">Oops!! Thats All You've Ordered So Far :)</p>`
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

    comPrev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                comPrev.classList.add("hidden")
            }
            comNext.classList.remove("hidden");
            comsec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?product=${pg}`
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
                        let items = result.product
                        items.forEach(el => {
                            comsec.innerHTML +=
                                `
                            <div class="exp__items"> 
                                <h4>${el.companyName}</h4>
                                <p>Order : ${el.message}</p>
                                <div class="exp__items__grp">
                                <p>Total : ${el.total}</p>
                                <p>Status : ${el.orderInfo}</p>
                                </div>
                                <p class="gry">${el.createdAt}</p>
                            </div>
                        `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#com__exp";
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

    next.addEventListener("click", async () => {
        let pg = ++x
        prev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orgsec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?book=${pg}`
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

                        let items = result.book
                        items.forEach(el => {
                            orgsec.innerHTML +=
                                `
                                <div class="exp__items"> 
                                    <h4>${el.organizationName}</h4>
                                    <p>Message : ${el.message}</p>
                                    <div class="exp__items__grp">
                                        <p>Status : ${el.bookingInfo}</p>
                                        <p class="gry">From : ${el.date}</p>
                                        <p class="gry">To : ${el.todate}</p>
                                    </div>
                                    <p class="gry">${el.createdAt}</p>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#org__exp";
                        }, 200)

                        if (orgsec.children.length === 10) {
                            next.classList.remove("hidden");
                        } else {
                            next.classList.add("hidden");
                        }
                        if (orgsec.innerHTML == "") {
                            next.classList.add("hidden");
                            orgsec.innerHTML = `<p class="go__back cnt">Oops!! Thats All You've Booked So Far :)</p>`
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
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                prev.classList.add("hidden")
            }
            next.classList.remove("hidden");
            orgsec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?book=${pg}`
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
                        let items = result.book
                        items.forEach(el => {
                            orgsec.innerHTML +=
                                `
                                <div class="exp__items"> 
                                    <h4>${el.organizationName}</h4>
                                    <p>Message : ${el.message}</p>
                                    <div class="exp__items__grp">
                                        <p>Status : ${el.bookingInfo}</p>
                                        <p class="gry">From : ${el.date}</p>
                                        <p class="gry">To : ${el.todate}</p>
                                    </div>
                                    <p class="gry">${el.createdAt}</p>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#org__exp";
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

    reserveNext.addEventListener("click", async () => {
        let pg = ++x
        reservePrev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            reservesec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?table=${pg}`
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

                        let items = result.table
                        items.forEach(el => {
                            reservesec.innerHTML +=
                                `
                                <div class="exp__items"> 
                                    <h4>${el.restroName}</h4>
                                    <div class="exp__items__grp">
                                        <p>Status : ${el.bookingInfo}</p>
                                        <p class="gry">To : ${el.time}</p>
                                        <p class="gry">From : ${el.date}</p>
                                    </div>
                                    <p class="gry">${el.createdAt}</p>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#reserve__exp";
                        }, 200)
                        if (reservesec.children.length === 10) {
                            reserveNext.classList.remove("hidden");
                        } else {
                            reserveNext.classList.add("hidden");
                        }
                        if (reservesec.innerHTML == "") {
                            reserveNext.classList.add("hidden");
                            reservesec.innerHTML = `<p class="go__back cnt">Oops!! Thats All You've Reserved So Far :)</p>`
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

    reservePrev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                reservePrev.classList.add("hidden")
            }
            reserveNext.classList.remove("hidden");
            reservesec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?table=${pg}`
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
                        let items = result.table
                        items.forEach(el => {
                            reservesec.innerHTML +=
                                `
                                <div class="exp__items"> 
                                    <h4>${el.restroName}</h4>
                                    <div class="exp__items__grp">
                                        <p>Status : ${el.bookingInfo}</p>
                                        <p class="gry">To : ${el.time}</p>
                                        <p class="gry">From : ${el.date}</p>
                                    </div>
                                    <p class="gry">${el.createdAt}</p>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#reserve__exp";
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

    returnNext.addEventListener("click", async () => {
        let pg = ++x
        returnPrev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            returnsec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?itemreturn=${pg}`
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

                        let items = result.itemreturn
                        items.forEach(el => {
                            returnsec.innerHTML +=
                                `
                                <div class="exp__items"> 
                                    <h4>${el.companyName}</h4>
                                    <div class="exp__items__grp">
                                        <p>Product : ${el.product}</p>
                                        <p>Status : ${el.bookingInfo}</p>
                                        <p>Purchased Date : ${el.date}</p>
                                    </div>
                                    <p>Message : ${el.message}</p>
                                    <p class="gry">${el.createdAt}</p>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#return__exp";
                        }, 200)
                        if (returnsec.children.length === 10) {
                            returnNext.classList.remove("hidden");
                        } else {
                            returnNext.classList.add("hidden");
                        }
                        if (returnsec.innerHTML == "") {
                            returnNext.classList.add("hidden");
                            returnsec.innerHTML = `<p class="go__back cnt">Oops!! Thats All You've Returned So Far :)</p>`
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

    returnPrev.addEventListener("click", async () => {
        let pg = --x
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                returnPrev.classList.add("hidden")
            }
            returnNext.classList.remove("hidden");
            returnsec.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/activity/${id}/tracker?itemreturn=${pg}`
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
                        let items = result.itemreturn
                        items.forEach(el => {
                            returnsec.innerHTML +=
                                `
                                <div class="exp__items"> 
                                    <h4>${el.companyName}</h4>
                                    <div class="exp__items__grp">
                                        <p>Product : ${el.product}</p>
                                        <p>Status : ${el.bookingInfo}</p>
                                        <p>Purchased Date : ${el.date}</p>
                                    </div>
                                    <p>Message : ${el.message}</p>
                                    <p class="gry">${el.createdAt}</p>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#return__exp";
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