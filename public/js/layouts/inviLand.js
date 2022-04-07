let inviteurl = document.getElementById('inviteurlLink');
let inviteName = document.getElementById('invite_name');
inviteName = inviteName.innerText;
let endI = document.getElementById('inviteendpoint');
let endinvi = endI.innerText;
endinvi = btoa(endinvi);

let invithemepoint = document.getElementById('invitetheme').innerText;
// let invisearchPoint = location.search.slice(1);

inviteurl.innerHTML = `
<button id="openinvite" class="redbtn" href="">My Invitation</button>
<p>Share your Invitation with the link below</p>
<p class="invi_link">${location.protocol}://${location.host}/${inviteName}/invitation/${endinvi}/${invithemepoint}</p>
`

openinvite = document.getElementById("openinvite");

openinvite.addEventListener("click", () => {
    let myurl = `/${inviteName}/invitation/${endinvi}/${invithemepoint}`
    window.open(myurl);
})

let copyinviLink = document.getElementById("copyinviteLink");
let inviLink = document.querySelector(".invi_link");

copyinviLink.addEventListener("click", () => {
    inink = inviLink.innerText;

    navigator.clipboard.writeText(inink);

    successAlert("Link Copied")
})
