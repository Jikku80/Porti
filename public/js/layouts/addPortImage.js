let addImageBtn = document.getElementById("addImageBtn");

addImageBtn.addEventListener("click", async (e) => {
    let img1 = document.getElementById("addImg");
    let name = document.getElementById('addName');
    let secAccess = document.querySelector(".second__access");
    if (img1.files[0] < 1 || img1.files[0] == "" || img1.files[0] == null) {
        return false;
    }
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    const formData = new FormData();
    formData.append("id", id);
    formData.append("addImage", img1.files[0]);
    formData.append("name", name.value);
    const endpoint = '/api/v1/portfolio/'
    try {
        await fetch(endpoint, {
            body: formData,
            method: 'POST'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 201) {
                successAlert("Your Previous Accomplisment Image has been added :)");
                setTimeout(() => {
                    location.reload();
                }, 400)
                if (secAccess) {
                    secAccess.classList.add("hidden");
                }

            } else {
                errorAlert("Invalid input!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    img1.value = "";
    name.value = "";
})