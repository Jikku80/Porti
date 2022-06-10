let url = document.getElementById('urlLink');
let portName = document.getElementById('port_name').innerText;
portName = portName.replace(/\s/g, '');
let endP = document.getElementById('endpoint');
let end = endP.innerText;
end = btoa(end);
let portithemepoint = document.getElementById('portitheme').innerText;

// let searchPoint = location.search.slice(1);

url.innerHTML = `
<button id="openport" class="redbtn" href="">My Portfolio</button>
<p class="xsf">Share your potfolio with the link below</p>
<p class="port_link">${location.protocol}://${location.host}/${portName}/portfolio/${end}/${portithemepoint}</p>
`

openport = document.getElementById("openport");

openport.addEventListener("click", () => {
    let myurl = `/${portName}/portfolio/${end}/${portithemepoint}`
    window.open(myurl);
})

let copyLink = document.getElementById("copyLink");
let portLink = document.querySelector(".port_link");

copyLink.addEventListener("click", () => {
    plink = portLink.innerText;

    navigator.clipboard.writeText(plink);

    successAlert("Link Copied")
})


let portigen = document.querySelector("#genportiqr");
let portiqrurl = document.querySelector(".port_link").innerText;
let downportiQr = document.querySelector("#downportiqr")

portigen.addEventListener("click", async () => {
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
                qrurl: portiqrurl
            })
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 201) {
                getportiQRCode(res);
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

async function getportiQRCode(resdata) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
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
            portigen.classList.add("hidden");
            downportiQr.classList.remove("hidden");
            downportiQr.addEventListener("click", () => {
                downloadportiQRCode(item.src);
            })
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

function downloadportiQRCode(file) {
    const qrimg = document.createElement('a')
    qrimg.href = file
    qrimg.download = 'qrcode.png'
    document.body.appendChild(qrimg)
    qrimg.click()
    successAlert('Your QRCode Has Been Downloaded! :)')
    document.body.removeChild(qrimg);
}
