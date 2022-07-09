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
                // let result = response.json()
                // let addNewItem = document.querySelector(".port__card__main");
                // let rmNoimg = document.querySelector(".rm_no_img");
                // if (rmNoimg) {
                //     rmNoimg.classList.add("hidden");
                // }
                // result.then(item => {
                //     addNewItem.innerHTML += `<div class="port__images"> 
                //                                 <img class="port_img imgFull" src="/images/ports/addedImages/${item.addImage}", alt="second_img", srcset="" />
                //                                 <h3 class="first__head portfolio__item__name">${item.name}</h3>
                //                                 <div class="group__btn">
                //                                     <button type="button" id="${item._id}" name="${item.name}" class="upPortImageBtn ygbtn">Update</button>
                //                                     <button type="button" id="${item._id}" class="delPortImageBtn redbtn">Delete</button>
                //                                 </div>
                //                             </div>
                //                             `
                // })
                // if (addNewItem) {
                //     if (addNewItem.children.length === 4) {
                //         location.reload();
                //     }
                // }

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