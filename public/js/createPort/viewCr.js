viewCr = document.getElementById("view");

viewCr.addEventListener("click", (e) => {
    let numb = prompt("Enter Your Portfolio Phone Number!");
    let num = btoa(numb * 1)
    if (numb != null) {
        if (numb.length > 0) {
            window.setTimeout(() => {
                location.assign(`/confirm/${num}`);
            }, 400);
        }
    }
})