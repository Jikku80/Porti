window.addEventListener("load", async () => {
    let pgCount = document.querySelector(".pageCount");
    let orgId = document.querySelector(".unqid").innerText;
    let orgUsrId = document.querySelector(".portiuserid").innerText;
    let usrId = document.querySelector(".curloguser").innerText;
    if (pgCount.innerText === "") {
        pgCount.innerText = 0;
    }
    if (orgUsrId !== "" && usrId !== "") {
        if (orgUsrId !== usrId) {
            let newCount = (pgCount.innerText * 1) + 1;
            try {
                let load = document.querySelector('.loader');
                load.classList.remove("hidden")
                const endpoint = `/api/v1/portfolio/${orgId}/updatePortfolioPg`
                await fetch(endpoint, {
                    method: 'PATCH',
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        pageCount: newCount
                    })
                }).then((response) => {
                    load.classList.add("hidden");
                    if (response.status === 200) {
                    } else {
                        console.log(response);
                        errorAlert("Error Pg!!!")
                    }
                })
            }
            catch (err) {
                console.log(err);
                errorAlert('Sorry! Something went wrong', err);
            };
        }
    }
    else {
        let newCount = (pgCount.innerText * 1) + 1;
        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/portfolio/${orgId}/updatePortfolioPg`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    pageCount: newCount
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                } else {
                    console.log(response);
                    errorAlert("Error Pg!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    }
})