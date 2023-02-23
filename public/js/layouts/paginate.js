function paginate(nextVal, prevVal, contVal, cardVal, locVal) {
    let next = document.querySelector(nextVal);
    let prev = document.querySelector(prevVal);
    let user__id = document.querySelector(".prof__user__id").innerText
    let subItems = document.querySelector(contVal)

    if (subItems) {
        if (subItems.children.length == 12) {
            next.classList.remove("hidden");
        }
    }
    let x = 1;

    if (x == 1) {
        prev.classList.add("hidden")
    }
    else {
        prev.classList.remove("hidden")
    }
    next.addEventListener("click", async () => {
        let pg = ++x
        prev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            subItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/portfolio/${user__id}/pagination/${pg}`
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
                        let items = result
                        items.forEach(el => {
                            subItems.innerHTML +=
                                `
                                <div class=${cardVal}> 
                                    <img class="port_img imgFull" src="${el.addImage}", loading="lazy" alt="second_img", srcset="" />
                                    <h3 class="first__head portfolio__item__name">${el.name}</h3>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = locVal;
                        }, 200)
                        if (subItems.children.length === 12) {
                            next.classList.remove("hidden");
                        } else {
                            next.classList.add("hidden");
                        }
                        if (subItems.innerHTML == "") {
                            next.classList.add("hidden");
                            subItems.innerHTML = `<h3 class="go__back center">Oops!! Thats All You've Added So Far :)</h3>`
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
            subItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/api/v1/portfolio/${user__id}/pagination/${pg}`
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
                        let items = result
                        items.forEach(el => {
                            subItems.innerHTML +=
                                `
                                <div class=${cardVal}> 
                                    <img class="port_img imgFull" src="${el.addImage}", alt="second_img", loading="lazy" srcset="" />
                                    <h3 class="first__head portfolio__item__name">${el.name}</h3>
                                </div>
                            `
                        });
                        window.setTimeout(() => {
                            window.location.hash = locVal;
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
};