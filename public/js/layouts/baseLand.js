let url = document.getElementById('urlLink');
let portName = document.getElementById('port_name');
portName = portName.innerText;
let endP = document.getElementById('endpoint');
let end = endP.innerText;
end = btoa(end);

let searchPoint = location.search.slice(1);

url.innerHTML = `
<button id="openport" class="redbtn" href="">My Portfolio</button>
<p>Share your potfolio with the link below</p>
<p class="port_link">${location.protocol}://${location.host}/${portName}/portfolio/${end}/${(location.search).slice(1)}</p>
`

openport = document.getElementById("openport");

openport.addEventListener("click", () => {
    let myurl = `/${portName}/portfolio/${end}/${searchPoint}`
    window.open(myurl);
})

let copyLink = document.getElementById("copyLink");
let portLink = document.querySelector(".port_link");

copyLink.addEventListener("click", () => {
    plink = portLink.innerText;

    navigator.clipboard.writeText(plink);

    successAlert("Link Copied")
})

gotoviewIn = document.getElementById("goto__viewInvites");

gotoviewIn.addEventListener("click", (e) => {
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