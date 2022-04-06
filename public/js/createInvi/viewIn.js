viewIn = document.getElementById("viewInvites");

viewIn.addEventListener("click", (e) => {
    let numb = prompt("Enter Your Portfolio Phone Number!");
    let num = btoa(numb * 1)
    if (numb != null) {
        if (numb.length > 0) {
            window.setTimeout(() => {
                location.assign(`/confirmation/${num}`);
            }, 400);
        }
    }
})