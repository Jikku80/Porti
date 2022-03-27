let url = document.getElementById('urlLink');
let portName = document.getElementById('port_name');
portName = portName.innerText;
let endP = document.getElementById('endpoint');
let end = endP.innerText;
end = btoa(end);

let updateImg = document.getElementById("update_Img");

let searchPoint = location.search.slice(1);

url.innerHTML = `
<button id="openport" class="redbtn" href="">My Portfolio</button>
<p>Share your potfolio with the link below</p>
<p class="port_link">${location.protocol}://${location.host}/${portName}/portfolio/${end}/${(location.search).slice(1)}</p>
`

openport = document.getElementById("openport");

openport.addEventListener("click", () => {
    url = `/${portName}/portfolio/${end}/${searchPoint}`
    window.open(url);
})

let copyLink = document.getElementById("copyLink");
let portLink = document.querySelector(".port_link");

copyLink.addEventListener("click", () => {
    plink = portLink.innerText;

    navigator.clipboard.writeText(plink);

    successAlert("Link Copied")
})

let updatePort = document.getElementById('update_port');
let updateForm = document.getElementById('update_form');
let headGo = document.querySelector(".land__goto");
let updateImgForm = document.getElementById('update_ImgForm');

updatePort.addEventListener('click', () => {
    headGo.classList.add('hidden');
    updatePort.classList.add('hidden');
    updateImg.classList.add("hidden");
    updateForm.classList.remove('hidden');
})

updateImg.addEventListener("click", () => {
    headGo.classList.add('hidden');
    updatePort.classList.add('hidden');
    updateImg.classList.add("hidden");
    updateImgForm.classList.remove('hidden');
})

let cancel = document.querySelector(".cancel");
let cancl = document.querySelector(".cancl");

cancel.addEventListener("click", () => {
    headGo.classList.remove('hidden');
    updatePort.classList.remove('hidden');
    updateImg.classList.remove("hidden");
    updateForm.classList.add('hidden');
})

cancl.addEventListener("click", () => {
    headGo.classList.remove('hidden');
    updatePort.classList.remove('hidden');
    updateImg.classList.remove("hidden");
    updateImgForm.classList.add('hidden');
})

let upForm = document.getElementById("upForm");

let upname = document.querySelector("#upname");
let upabout = document.getElementById("upabout");
let upwhat = document.getElementById('upwhat');
let upwhy = document.getElementById("upwhy");
let upno = document.getElementById("upno");
let upshowNo = document.getElementById("upCheck");
let upemail = document.getElementById("upemail");
let upFb = document.getElementById("upFb");
let upwork = document.getElementById("upwork");
let updBtn = document.getElementById("updateBtn");
let upImgBtn = document.getElementById("updateImgBtn");
let img1 = document.querySelector('#img1');
let hd1 = document.getElementById("firstImg");
let img2 = document.getElementById("img2");
let hd2 = document.getElementById("secondImg");
let img3 = document.getElementById("img3");
let hd3 = document.getElementById("thirdImg");
let img4 = document.getElementById("img4");
let hd4 = document.getElementById("fourthImg");
let img5 = document.getElementById("img5")
let hd5 = document.getElementById("fifthImg");
let id = endP.innerText
let themes = document.getElementById("themes");

updBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let num = btoa(upno.value);
    const endpoint = '/updateport'
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: upname.value,
                about: upabout.value,
                what: upwhat.value,
                why: upwhy.value,
                showNo: upshowNo.checked,
                theme: themes.value,
                email: upemail.value,
                fb: upFb.value,
                previous: upwork.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Portfolio has been updated :)");
                window.setTimeout(() => {
                    location.assign(`/myportfolio/${num}?${themes.value}`);
                }, 400);
            } else {
                errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    upname.value = "",
        upemail.value = "",
        upFb.value = "",
        upno.value = "",
        upabout.value = "",
        upwhat.value = "",
        upwhy.value = "",
        upwork.value = ""
})

upImgBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let num = btoa(upno.value);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("firstImgHead", hd1.value);
    formData.append("secondImgHead", hd2.value);
    formData.append("thirdImgHead", hd3.value);
    formData.append("fourthImgHead", hd4.value);
    formData.append("fifthImgHead", hd5.value);
    formData.append("imageCover", img1.files[0]);
    formData.append("imageSecond", img2.files[0]);
    formData.append("imageThird", img3.files[0]);
    formData.append("imageFourth", img4.files[0]);
    formData.append("imageFifth", img5.files[0]);
    const endpoint = '/updateportImg'
    try {
        await fetch(endpoint, {
            body: formData,
            method: 'PATCH'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Portfolio Images has been updated :)");
                window.setTimeout(() => {
                    location.assign(`/myportfolio/${num}?${searchPoint}`);
                }, 400);
            } else {
                errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
    hd1.value = "",
        hd2.value = "",
        hd3.value = "",
        hd4.value = "",
        hd5.value = "",
        img1.value = "",
        img2.value = "",
        img3.value = "",
        img4.value = "",
        img5.value = ""
})


