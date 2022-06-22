let logout = document.querySelectorAll(".logout");

logout.forEach((logout) => {

    logout.addEventListener("click", async function (e) {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        endpoint = "/logout"
        try {
            const res = fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert('You just loggedOut :(');
                    window.setTimeout(() => {
                        location.assign('/');
                    }, 400);
                }
            })
        } catch (err) {
            console.warn('Something went wrong.', err);
        };
    })
})

window.addEventListener("load", () => {
    let loads = document.querySelector('.loader');
    loads.classList.add("hidden");
});