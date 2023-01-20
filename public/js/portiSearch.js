(function () {
    let SearchBar = document.getElementById("portisearch");
    let grps = document.querySelector(".search__groups");
    let cancel = document.getElementById("cancelSearch");

    SearchBar.addEventListener("click", () => {
        grps.classList.remove("hidden");
    })

    cancel.addEventListener("click", () => {
        grps.classList.add("hidden");
    })
})();
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
            let loadPort = document.querySelector(".load__portfolio");
            let loadMenu = document.querySelector(".load__menu");
            let loadCatalog = document.querySelector(".load__catalog");

            subItems.innerHTML = "";
            menuItems.innerHTML = "";
            compItems.innerHTML = "";
            try {
                e.preventDefault();
                let load = document.querySelector('.loader');
                load.classList.remove("hidden")
                subItems.innerHTML = "";
                const endpoint = `/search/${searchValue}`
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
                            if (profiles) {
                                profiles.forEach(el => {
                                    if (el.user.photo) {
                                        subItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/toprofile/${el.user._id}/portfolio">
                                                                        <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />
                                                                        ${el.name}
                                                                    </a> 
                                                                </div>   
                                            `
                                    }
                                    else {
                                        subItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/toprofile/${el.user._id}/portfolio">
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
                            }
                            if (restro) {
                                restro.forEach(el => {
                                    if (el.user.photo) {
                                        menuItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/toprofile/${el.user._id}/restro">
                                                                        <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />
                                                                        ${el.name}
                                                                    </a>    
                                                                </div>
                                        
                                        `
                                    }
                                    else {
                                        menuItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/toprofile/${el.user._id}/restro">
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


                            }
                            if (company) {
                                company.forEach(el => {
                                    if (el.user.photo) {
                                        compItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/toprofile/${el.user._id}/company">
                                                                        <img class="profPic satProf" src="${el.user.photo}", alt="prof__pic", title=${el.name} />   
                                                                        ${el.name} 
                                                                    </a>
                                                                </div>
                                        `
                                    }
                                    else {
                                        compItems.innerHTML += `<div class="search__results">
                                                                    <a class="anc" href="/toprofile/${el.user._id}/company">
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
            SearchBar.value = "";
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
        console.log("Hola from Porti")
    }
})();