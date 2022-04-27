let url = document.getElementById('urlLink');
let portName = document.getElementById('port_name');
portName = portName.innerText;
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

window.addEventListener("load", () => {
    let loads = document.querySelector('.loader');
    loads.classList.add("hidden");
})