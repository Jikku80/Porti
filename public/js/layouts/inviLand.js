let inviteurl = document.getElementById('inviteurlLink');
let inviteName = document.getElementById('invite_name');
inviteName = inviteName.innerText;
let endI = document.getElementById('inviteendpoint');
let endinvi = endI.innerText;
endinvi = btoa(endinvi);

let invisearchPoint = location.search.slice(1);

inviteurl.innerHTML = `
<button id="openinvite" class="redbtn" href="">My Invitation</button>
<p>Share your Invitation with the link below</p>
<p class="invi_link">${location.protocol}://${location.host}/${inviteName}/invitation/${endinvi}/${(location.search).slice(1)}</p>
`

openinvite = document.getElementById("openinvite");

openinvite.addEventListener("click", () => {
    let myurl = `/${inviteName}/invitation/${endinvi}/${invisearchPoint}`
    window.open(myurl);
})

let copyinviLink = document.getElementById("copyinviteLink");
let inviLink = document.querySelector(".invi_link");

copyinviLink.addEventListener("click", () => {
    inink = inviLink.innerText;

    navigator.clipboard.writeText(inink);

    successAlert("Link Copied")
})

gotoPortf = document.getElementById("goto__portfolio");

gotoPortf.addEventListener("click", (e) => {
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