(function () {
    let SearchBar = document.getElementById("portisearch");
    let grps = document.querySelector(".search__history");
    let cancel = document.getElementById("cancelSearch");
    let searchbod = document.querySelector(".search__body");


    SearchBar.addEventListener("click", () => {
        grps.classList.remove("hidden");
    })

    cancel.addEventListener("click", () => {
        grps.classList.add("hidden");
    })
})();
let catalogvalsec = document.querySelector(".catalogvalsec")
let menuvalsec = document.querySelector(".menuvalsec");
let portvalsec = document.querySelector(".portfoliovalsec");
let brovalsec = document.querySelector(".brochurevalsec");
(function () {

    let SearchBar = document.getElementById("portisearch");

    SearchBar.addEventListener("keypress", async (e) => {
        if (SearchBar.value < 1 || SearchBar.value == "" || SearchBar.value == null) {
            return false;
        }
        if (e.key == "Enter" || e.key == "Search") {
            let searchValue = SearchBar.value;
            let subItems = document.querySelector(".found__values");
            let menuItems = document.querySelector(".found__menu__values");
            let compItems = document.querySelector(".found__catalog__values");
            let orgItems = document.querySelector(".found__org__values");

            subItems.innerHTML = "";
            menuItems.innerHTML = "";
            compItems.innerHTML = "";
            orgItems.innerHTML = "";
            try {
                e.preventDefault();
                let load = document.querySelector('.loader');
                load.classList.remove("hidden")
                subItems.innerHTML = "";
                const endpoint = `/search/${searchValue}/bar`
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
                            let profiles = items.portfolio;
                            let company = items.company;
                            let restro = items.restro;
                            let organization = items.organization;
                            if (profiles) {
                                profiles.forEach(el => {
                                    if (el.user.photo) {
                                        subItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/${el.user.name}">
                                                                        <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />
                                                                        ${el.name}
                                                                    </a> 
                                                                </div>   
                                            `
                                    }
                                    else {
                                        subItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/${el.user.name}">
                                                                        <img class="profPic satProf" src="/images/bighitman.png", alt="hit__pic", title=${el.name} />
                                                                        ${el.name}
                                                                    </a> 
                                                                </div>   
                                            `
                                    }
                                });
                                if (profiles.length == 0) {
                                    subItems.innerHTML += `
                                    <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
                                }
                                portvalsec.classList.remove("hidden");
                                menuvalsec.classList.add('hidden');
                                brovalsec.classList.add("hidden");
                                catalogvalsec.classList.add("hidden");
                                let portfolionext = document.querySelector(".portfolionext");
                                if (profiles.length == 20) {
                                    portfolionext.classList.remove("hidden");
                                }
                            }
                            if (restro) {
                                restro.forEach(el => {
                                    if (el.user.photo) {
                                        menuItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/${el.user.name}">
                                                                        <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />
                                                                        ${el.name}
                                                                    </a>    
                                                                </div>
                                        
                                        `
                                    }
                                    else {
                                        menuItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/${el.user.name}">
                                                                        <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />
                                                                        ${el.name}
                                                                    </a>    
                                                                </div>
                                        
                                        `
                                    }
                                });
                                if (restro.length == 0) {
                                    menuItems.innerHTML += `
                                    <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
                                }
                                portvalsec.classList.add("hidden");
                                menuvalsec.classList.remove('hidden');
                                brovalsec.classList.add("hidden");
                                catalogvalsec.classList.add("hidden");
                                let restronext = document.querySelector(".restronext");
                                if (restro.length == 20) {
                                    restronext.classList.remove("hidden");
                                }

                            }
                            if (company) {
                                company.forEach(el => {
                                    if (el.user.photo) {
                                        compItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/${el.user.name}">
                                                                        <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                        ${el.name} 
                                                                    </a>
                                                                </div>
                                        `
                                    }
                                    else {
                                        compItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/${el.user.name}">
                                                                        <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                        ${el.name} 
                                                                    </a>
                                                                </div>
                                        `
                                    }
                                });
                                if (company.length == 0) {
                                    compItems.innerHTML += `
                                    <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
                                }
                                portvalsec.classList.add("hidden");
                                menuvalsec.classList.add('hidden');
                                brovalsec.classList.add("hidden");
                                catalogvalsec.classList.remove("hidden");
                                let catalognext = document.querySelector(".catalognext");
                                if (company.length == 20) {
                                    catalognext.classList.remove("hidden");
                                }

                            }
                            if (organization) {
                                organization.forEach(el => {
                                    if (el.user.photo) {
                                        orgItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/${el.user.name}">
                                                                        <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                        ${el.name} 
                                                                    </a>
                                                                </div>
                                        `
                                    }
                                    else {
                                        orgItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/${el.user.name}">
                                                                        <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                        ${el.name} 
                                                                    </a>
                                                                </div>
                                        `
                                    }
                                });
                                if (organization.length == 0) {
                                    orgItems.innerHTML += `
                                    <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
                                }
                                portvalsec.classList.add("hidden");
                                menuvalsec.classList.add('hidden');
                                brovalsec.classList.remove("hidden");
                                catalogvalsec.classList.add("hidden");
                                let brochurenext = document.querySelector(".brochurenext");
                                if (organization.length == 20) {
                                    brochurenext.classList.remove("hidden");
                                }
                            }
                            if (!profiles) {
                                subItems.innerHTML = `
                                        <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`

                            }
                            if (!restro) {
                                menuItems.innerHTML = `
                                        <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`

                            }
                            if (!company) {
                                compItems.innerHTML = `
                                        <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`

                            }
                            if (!organization) {
                                orgItems.innerHTML = `
                                        <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`

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
        }
    });
})();

(function () {
    let theme = document.querySelector(".themeIid").innerText;
    let srch = document.querySelector(".search__groups");
    let res = document.querySelectorAll(".res");
    let bar = document.querySelector(".search_bar");
    let anc = document.querySelectorAll(".anc");
    let lod = document.querySelector(".loader");

    if (theme == "red") {
        document.body.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        srch.style.animation = "blackShine 4s ease-in-out forwards infinite";
    }
    else if (theme == "dark") {
        document.body.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
    }
    else if (theme == "white") {
        document.body.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        srch.style.animation = "blackShine 4s ease-in-out forwards infinite";
        res.forEach(item => {
            item.style.color = "black";
        })
        anc.forEach(item => {
            item.style.color = "black";
        })
        bar.style.color = "crimson";
        bar.style.borderColor = "crimson";
    }
    else {
        return;
    }
})();

(function () {
    let x = 1;
    let catalognext = document.querySelector(".catalognext");
    let catalogprev = document.querySelector(".catalogprev");
    let portfolionext = document.querySelector(".portfolionext");
    let portfolioprev = document.querySelector(".portfolioprev");
    let menunext = document.querySelector(".menunext");
    let menuprev = document.querySelector(".menuprev");
    let brochurenext = document.querySelector(".brochurenext");
    let brochureprev = document.querySelector(".brochureprev");

    let subItems = document.querySelector(".found__values");
    let menuItems = document.querySelector(".found__menu__values");
    let compItems = document.querySelector(".found__catalog__values");
    let orgItems = document.querySelector(".found__org__values");
    let SearchBar = document.getElementById("portisearch");

    catalognext.addEventListener("click", async () => {
        let searchValue = SearchBar.value;
        let pg = ++x
        catalogprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            compItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/search/${searchValue}/bar?comp=${pg}`
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
                        let items = result.company
                        items.forEach(el => {
                            if (el.user.photo) {
                                compItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                            else {
                                compItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#catalsec";
                        }, 200)
                        if (compItems.children.length === 20) {
                            catalognext.classList.remove("hidden");
                        } else {
                            catalognext.classList.add("hidden");
                        }
                        if (compItems.innerHTML == "") {
                            catalognext.classList.add("hidden");
                            compItems.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Catalogs So Far :)</p>`
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

    catalogprev.addEventListener("click", async () => {
        let pg = --x
        let searchValue = SearchBar.value;
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                catalogprev.classList.add("hidden")
            }
            catalognext.classList.remove("hidden");
            compItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/search/${searchValue}/bar?comp=${pg}`
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
                        let items = result.company
                        items.forEach(el => {
                            if (el.user.photo) {
                                compItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                            else {
                                compItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#catalsec";
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

    brochurenext.addEventListener("click", async () => {
        let searchValue = SearchBar.value;
        let pg = ++x
        brochureprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            orgItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/search/${searchValue}/bar?org=${pg}`
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
                        let items = result.organization
                        items.forEach(el => {
                            if (el.user.photo) {
                                orgItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                            else {
                                orgItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#brosec";
                        }, 200)
                        if (orgItems.children.length === 20) {
                            brochurenext.classList.remove("hidden");
                        } else {
                            brochurenext.classList.add("hidden");
                        }
                        if (orgItems.innerHTML == "") {
                            brochurenext.classList.add("hidden");
                            orgItems.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Brochures So Far :)</p>`
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

    brochureprev.addEventListener("click", async () => {
        let pg = --x
        let searchValue = SearchBar.value;
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                brochureprev.classList.add("hidden")
            }
            brochurenext.classList.remove("hidden");
            orgItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/search/${searchValue}/bar?org=${pg}`
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
                        let items = result.organization
                        items.forEach(el => {
                            if (el.user.photo) {
                                orgItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                            else {
                                orgItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#brosec";
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

    menunext.addEventListener("click", async () => {
        let searchValue = SearchBar.value;
        let pg = ++x
        menuprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            menuItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/search/${searchValue}/bar?resto=${pg}`
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
                        let items = result.restro
                        items.forEach(el => {
                            if (el.user.photo) {
                                menuItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                            else {
                                menuItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#menusec";
                        }, 200)
                        if (menuItems.children.length === 20) {
                            menunext.classList.remove("hidden");
                        } else {
                            menunext.classList.add("hidden");
                        }
                        if (menuItems.innerHTML == "") {
                            menunext.classList.add("hidden");
                            menuItems.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Menus So Far :)</p>`
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

    menuprev.addEventListener("click", async () => {
        let pg = --x
        let searchValue = SearchBar.value;
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                menuprev.classList.add("hidden")
            }
            menunext.classList.remove("hidden");
            menuItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/search/${searchValue}/bar?resto=${pg}`
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
                        let items = result.restro
                        items.forEach(el => {
                            if (el.user.photo) {
                                menuItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                            else {
                                menuItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#menusec";
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

    portfolionext.addEventListener("click", async () => {
        let searchValue = SearchBar.value;
        let pg = ++x
        portfolioprev.classList.remove("hidden");
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            subItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/search/${searchValue}/bar?port=${pg}`
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
                        let items = result.portfolio
                        items.forEach(el => {
                            if (el.user.photo) {
                                subItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                            else {
                                subItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#portsec";
                        }, 200)
                        if (subItems.children.length === 20) {
                            portfolionext.classList.remove("hidden");
                        } else {
                            portfolionext.classList.add("hidden");
                        }
                        if (subItems.innerHTML == "") {
                            portfolionext.classList.add("hidden");
                            subItems.innerHTML = `<p class="go__back cnt">Oops!! Thats All of the Portfolios So Far :)</p>`
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

    portfolioprev.addEventListener("click", async () => {
        let pg = --x
        let searchValue = SearchBar.value;
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            if (x == 1) {
                portfolioprev.classList.add("hidden")
            }
            portfolionext.classList.remove("hidden");
            subItems.innerHTML = "";
            window.location.hash = "#"
            const endpoint = `/search/${searchValue}/bar?port=${pg}`
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
                        let items = result.portfolio
                        items.forEach(el => {
                            if (el.user.photo) {
                                subItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                            else {
                                subItems.innerHTML += `<div class="search__results">
                                                            <a class="anc" href="/${el.user.name}">
                                                                <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                ${el.name} 
                                                            </a>
                                                        </div>
                                `
                            }
                        });
                        window.setTimeout(() => {
                            window.location.hash = "#portsec";
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

geoFindMe();

function geoFindMe() {
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        return;
    }
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude + "-" + longitude)
        // reverseGeocodingWithGoogle(latitude, longitude)
    }
    function error() {
        console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
}