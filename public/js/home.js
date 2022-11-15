bgChanger = document.getElementById("go__create");
homelogin = document.getElementById("log");
homeCont = document.querySelector(".main__content");
homebod = document.querySelector(".bod");
prest = document.querySelector(".presents");

bgChanger.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("crim");
    prest.classList.remove("hidden");
})

bgChanger.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("crim");
    prest.classList.add("hidden");
})

homelogin.addEventListener("mouseover", () => {
    homeCont.classList.add("bg__changer");
    homebod.classList.add("crim");
})

homelogin.addEventListener("mouseout", () => {
    homeCont.classList.remove("bg__changer");
    homebod.classList.remove("crim");
});


(function () {
    let loadIt = document.getElementById("becomeDeveloper");
    loadIt.addEventListener("click", async () => {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        try {
            const foldName = "my-folder"
            const fileName = "home.pug"
            const endpoint = `/api/themes/${fileName}/createFolder/${foldName}`

            await fetch((endpoint), {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            }).then((response) => {

                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Folder has been Added :)");
                }
                else if (response.status === 409) {
                    errorAlert("Folder with name already exists, Use other")
                }
                else {
                    console.log(response);
                    errorAlert("Addition Error!!!")
                }

            })
        } catch (err) {
            errorAlert("Ooops, System Error")
            console.log(err);
        }
    })
})();

let futbtn = document.querySelector('.futuristic-button');
let tp = document.querySelector(".top");
let bottom = document.querySelector(".bottom");
let parallelogramleft = document.querySelector(".parallelogram-left");
let parallelogramright = document.querySelector(".parallelogram-right");

futbtn.addEventListener("mouseover", (function () {
    tp.classList.add('active');
    bottom.classList.add('active');
    parallelogramleft.classList.add('active');
    parallelogramright.classList.add('active');
}));
futbtn.addEventListener("mouseout", (function () {
    tp.classList.remove('active');
    bottom.classList.remove('active');
    parallelogramleft.classList.remove('active');
    parallelogramright.classList.remove('active');
}));

