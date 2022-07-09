(function () {
    let next = document.querySelector(".next__addimgSec");
    let prev = document.querySelector(".prev__addimgSec");
    let fullpath = location.pathname
    let resultpath = fullpath.match("/portfolio/(.*)/tm")
    let user__id = atob(resultpath[1])
    let subItems = document.querySelector(".prev__cont__sub")

    if (subItems) {
        if (subItems.children.length < 4) {
            next.classList.add("hidden");
        }
    }
    let x = 1;

    if (x == 1) {
        prev.classList.add("hidden")
    }
    next.addEventListener("click", async () => {
        let pg = ++x
        prev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            subItems.innerHTML = "";
            const endpoint = `/api/v1/portfolio/${user__id}/pagination/${pg}`
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'image/jpeg/png')
            myHeaders.get('Content-Type');
            await fetch((endpoint), {
                method: 'GET',
                headers: myHeaders
            }).then((response) => {
                load.classList.add("hidden");
                window.location.hash = "#"
                let res = response.json();
                if (response.status === 200) {
                    res.then(result => {
                        let items = result
                        items.forEach(el => {
                            subItems.innerHTML +=
                                `
                                <div class="port__images"> 
                                    <img class="port_img imgFull" src="/images/ports/addedImages/${el.addImage}", loading="lazy" alt="second_img", srcset="" />
                                    <h3 class="first__head portfolio__item__name">${el.name}</h3>
                                </div>
                            `
                        });
                        window.location.hash = "#imgCont"
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
            const endpoint = `/api/v1/portfolio/${user__id}/pagination/${pg}`
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'image/jpeg/png')
            myHeaders.get('Content-Type');
            await fetch((endpoint), {
                method: 'GET',
                headers: myHeaders
            }).then((response) => {
                load.classList.add("hidden");
                window.location.hash = "#"
                let res = response.json();
                if (response.status === 200) {
                    res.then(result => {
                        let items = result
                        items.forEach(el => {
                            subItems.innerHTML +=
                                `
                                <div class="port__images"> 
                                    <img class="port_img imgFull" src="/images/ports/addedImages/${el.addImage}", alt="second_img", loading="lazy" srcset="" />
                                    <h3 class="first__head portfolio__item__name">${el.name}</h3>
                                </div>
                            `
                        });
                        window.location.hash = "#imgCont"
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