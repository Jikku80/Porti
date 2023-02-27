let inviteurl = document.getElementById('inviteurlLink');
let inviteName = document.getElementById('invite_name').innerText;
inviteName = inviteName.replace(/\s/g, '');
let endI = document.getElementById('inviteendpoint');
let endinvi = endI.innerText;
endinvi = btoa(endinvi);

// let invithemepoint = document.getElementById('invitetheme').innerText;
// let invisearchPoint = location.search.slice(1);

inviteurl.innerHTML = `
<button id="openinvite" class="redbtn">My Invitation</button>
<p class="xsf">Share your Invitation with the link below</p>
<p class="invi_link nocaps">${location.host}/invitation/${inviteName}/${endinvi}</p>
`

openinvite = document.getElementById("openinvite");

openinvite.addEventListener("click", () => {
    let myurl = `/invitation/${inviteName}/${endinvi}`
    window.open(myurl);
})

let copyinviLink = document.getElementById("copyinviteLink");
let inviLink = document.querySelector(".invi_link");

copyinviLink.addEventListener("click", () => {
    inink = inviLink.innerText;

    navigator.clipboard.writeText(inink);

    successAlert("Link Copied")
})

let fbbtn = document.querySelector(".fbbtn");
fbbtn.addEventListener("click", () => {
    let params;
    let url = inviLink.innerText;
    let shareUrl = `http://www.facebook.com/sharer/sharer.phpu=${url}`;
    window.open(shareUrl, "NewWindow", params);
})

let invigen = document.querySelector("#geninviqr");
let inviqrurl = document.querySelector(".invi_link").innerText;
let downinviQr = document.querySelector("#downinviqr")

invigen.addEventListener("click", async () => {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/scan/qr`
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                qrurl: inviqrurl
            })
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 201) {
                getinviQRCode(res);
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

async function getinviQRCode(resdata) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        window.location.hash = "#qrLandingSec"
        let qrItem = document.querySelector(".qr__sec");
        await resdata.then(item => {
            load.classList.add('hidden');
            if (item.status !== 'success') {
                errorAlert('Error, Link might be broken ! :(')
                return;
            }
            qrItem.innerHTML = `
                <div class="qr__displayer">
                    <img class="qr__img" src="${item.src}" alt="qrcode" />
                </div>
            `
            successAlert('QRCode Generated Successfully :)')
            invigen.classList.add("hidden");
            downinviQr.classList.remove("hidden");
            downinviQr.addEventListener("click", () => {
                downloadinviQRCode(item.src);
            })
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

function downloadinviQRCode(file) {
    const qrimg = document.createElement('a')
    qrimg.href = file
    qrimg.download = 'qrcode.png'
    document.body.appendChild(qrimg)
    qrimg.click()
    successAlert('Your QRCode Has Been Downloaded! :)')
    document.body.removeChild(qrimg);
}

(function () {
    let theme = document.querySelector(".useerTheme").innerText;
    let bodsec = document.querySelector(".whole__invi__content");
    let sec = document.querySelectorAll(".redbtn");
    let label = document.querySelectorAll(".form__label");
    let inpt = document.querySelectorAll(".form__input");
    let lod = document.querySelector(".loader");
    let td = document.querySelectorAll(".td");

    if (theme == "red") {
        bodsec.style.backgroundColor = "crimson";
        lod.style.backgroundColor = "crimson";
        document.body.style.backgroundColor = "crimson";
        inpt.forEach(item => {
            item.style.borderColor = "white";
        })
        sec.forEach(item => {
            item.style.borderColor = "white";
        })
    }
    else if (theme == "dark") {
        bodsec.style.backgroundColor = "black";
        lod.style.backgroundColor = "black";
        document.body.style.backgroundColor = "black";

    }
    else if (theme == "porti") {
        document.body.style.backgroundColor = "rgb(0, 26,0)"
    }
    else if (theme == "white") {
        bodsec.style.backgroundColor = "white";
        lod.style.backgroundColor = "white";
        document.body.style.backgroundColor = "white";
        sec.forEach(item => {
            item.style.color = "black";
        })
        label.forEach(item => {
            item.style.color = "black";
        })
        inpt.forEach(item => {
            item.style.color = "black";
        })
        td.forEach(item => {
            item.style.color = "black";
        })

    }
    else {
        console.log("Hola from Porti")
    }
})();
