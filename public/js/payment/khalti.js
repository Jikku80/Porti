let itemName = document.querySelector(".item__name").innerText;
let itemPrice = document.querySelector(".item__price").innerText;

let itemId = document.querySelector(".item__id").id;

let itemUrl = "http://localhost:3000"
let khaltiKey = "test_public_key_30fc4345c4f44d3ca42657a3110bd5b1";

var config = {
    // replace the publicKey with yours
    "publicKey": khaltiKey,
    "productIdentity": itemId,
    "productName": itemName,
    "productUrl": itemUrl,
    "paymentPreference": [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
    ],
    "eventHandler": {
        onSuccess(payload) {
            // hit merchant api for initiating verfication
            // console.log(payload);
            buyIt();
            successAlert("Payment Successfull :)");
            window.setTimeout(() => {
                location.assign(`/porti`);
            }, 400);
        },
        onError(error) {
            console.log(error);
            errorAlert('Sorry! Payment Unsuccessful', error);
        },
        onClose() {
            console.log('widget is closing');
        }
    }
};

var checkout = new KhaltiCheckout(config);
var btn = document.getElementById("payment-button");
btn.onclick = function () {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    checkout.show({ amount: itemPrice * 100 });
}

async function buyIt() {
    let load = document.querySelector('.loader');
    load.classList.remove("hidden")
    let itemId = document.querySelector(".item__id").id;
    const endpoint = `/api/themes/updateTheme/${itemId}`
    try {
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Your Theme has been Unlocked :)");
            } else {
                errorAlert("Invalid input, Input error!!!")
                console.log(response);
            }
        })

    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};