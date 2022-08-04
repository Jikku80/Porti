(function () {
    let esewaBtn = document.getElementById("esewa__btn");
    let itemPrice = document.querySelector(".item__price").innerText;
    let itemId = document.querySelector(".item__id").id;
    let userId = document.querySelector(".__usrid").id;
    let now = Date.now();
    let pid = itemId + userId + now

    var pth = "https://uat.esewa.com.np/epay/main";
    var params = {
        amt: itemPrice,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: itemPrice,
        pid: pid,
        scd: "EPAYTEST",
        su: `http://localhost:3000/paywith/esewa/${itemId}`,
        fu: "http://localhost:3000/paywith/failure/esewa"
    }

    function post(pth, params) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", pth);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }

    esewaBtn.addEventListener("click", () => {
        post(pth, params);
    })
})();

function successFunc() {
    successAlert("Payment Successfull :)");
    window.setTimeout(() => {
        location.assign(`/porti`);
    }, 400);
}

function errFunc() {
    errorAlert("Sorry! Payment UnSuccessfull :)");
}