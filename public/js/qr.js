let qgen = document.querySelector(".qrGen");
let qrurl = document.querySelector(".qrLink").innerText;
let downQr = document.querySelector(".downQr")

qgen.addEventListener("click", async () => {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        // page.classList.remove("hidden");
        const endpoint = `/scan/qr`
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                qrurl: qrurl
            })
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 201) {
                getQRCode(res);
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

async function getQRCode(resdata) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        // page.classList.remove("hidden");
        window.location.hash = "#qrcode"
        let qrItem = document.getElementById("qrcode");
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
            qgen.classList.add("hidden");
            downQr.classList.remove("hidden");
            downQr.addEventListener("click", () => {
                downloadQRCode(item.src);
            })
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

function downloadQRCode(file) {
    const qrimg = document.createElement('a')
    qrimg.href = file
    qrimg.download = 'qrcode.png'
    document.body.appendChild(qrimg)
    qrimg.click()
    successAlert('Your QRCode Has Been Downloaded! :)')
    document.body.removeChild(qrimg);
}

