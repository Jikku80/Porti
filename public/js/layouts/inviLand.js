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
<p class="invi_link">${location.protocol}://${location.host}/${inviteName}/invitation/${endinvi}</p>
`

openinvite = document.getElementById("openinvite");

openinvite.addEventListener("click", () => {
    let myurl = `/${inviteName}/invitation/${endinvi}`
    window.open(myurl);
})

let copyinviLink = document.getElementById("copyinviteLink");
let inviLink = document.querySelector(".invi_link");

copyinviLink.addEventListener("click", () => {
    inink = inviLink.innerText;

    navigator.clipboard.writeText(inink);

    successAlert("Link Copied")
})

let invigen = document.querySelector("#geninviqr");
let inviqrurl = document.querySelector(".invi_link").innerText;
let downinviQr = document.querySelector("#downinviqr")

invigen.addEventListener("click", async () => {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/scan`
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
