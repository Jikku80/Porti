
(function () {

    SearchBar = document.getElementById("portisearch");

    SearchBar.addEventListener("keypress", async (e) => {
        if (SearchBar.value < 1 || SearchBar.value == "" || SearchBar.value == null) {
            return false;
        }
        if (e.key == "Enter" || e.key == "Search") {
            let searchValue = SearchBar.value;
            let subItems = document.querySelector(".found__values");
            let menuItems = document.querySelector(".found__menu__values");
            let compItems = document.querySelector(".found__catalog__values");
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
                                    subItems.innerHTML += `<div class="search__results">
                                                                <a class="anc" href="/toprofile/${el.user._id}/portfolio">
                                                                    <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />
                                                                    <p>${el.name}</p>
                                                                </a> 
                                                            </div>   
                                        `
                                });
                                if (subItems.children.length == 0) {
                                    subItems.innerHTML += `
                                    <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
                                }
                            }
                            if (restro) {
                                restro.forEach(el => {
                                    menuItems.innerHTML += `<div class="search__results">
                                                                <a class="anc" href="/toprofile/${el.user._id}/restro">
                                                                    <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />
                                                                    ${el.name}
                                                                </a>    
                                                            </div>
                                    
                                    `
                                });
                                if (menuItems.children.length == 0) {
                                    menuItems.innerHTML += `
                                    <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
                                }
                            }
                            if (company) {
                                company.forEach(el => {
                                    compItems.innerHTML += `<div class="search__results">
                                                                <a class="anc" href="/toprofile/${el.user._id}/company">
                                                                    <img class="profPic satProf" src="/images/bighitman.png", alt="prof__pic", title=${el.name} />   
                                                                    ${el.name} 
                                                                </a>
                                                            </div>
                                    `
                                });
                                if (compItems.children.length == 0) {
                                    compItems.innerHTML += `
                                    <h3 class="center">Oopsie!!! No Items Found!!! :(</h3>`
                                }
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