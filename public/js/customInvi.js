(function () {
    let csibtn = document.querySelectorAll(".csibtn");
    let leftcorn = document.querySelector(".crop-top-left-corner");
    let rightcorn = document.querySelector(".crop-top-right-corner");
    let leftbot = document.querySelector(".crop-bottom-left-corner");
    let rightbot = document.querySelector(".crop-bottom-right-corner");
    
    csibtn.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            item.classList.add("dragging");
            console.log("starting")
        })

        item.addEventListener("drag", (e) => {
            console.log("dragging")
        })

        item.addEventListener("dragend", (e) => {
            item.classList.remove("dragging");
            let cwidth = item.clientWidth;
            let cheight = item.clientHeight;
            let ileft = e.clientX - cwidth;
            let itop = e.clientY - cheight;

            item.style.position = "absolute";
            item.style.left = ileft + "px";
            item.style.top = itop + "px";
            console.log("dropped");
        })
        
    })

    rightbot.addEventListener('mousedown', function init() {
        csibtn.forEach(item => {
            item.style.resize = "both";
        })
    }, false);

    rightbot.addEventListener('mouseup', function init() {
        csibtn.forEach(item => {
        })
    }, false);
})();
