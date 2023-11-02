(function() {
    let navpos = document.querySelector(".navpos").innerText;
    let navfontsize = document.querySelector(".navfontsize").innerText;
    let navfontfam = document.querySelector(".navfontfam").innerText;
    let navvisibility = document.querySelector(".navvisibility").innerText;
    let hamnav = document.querySelector(".hamnav").innerText;
    let navheight = document.querySelector(".navheight").innerText;
    let navwidth = document.querySelector(".navwidth").innerText;
    let navcontentpos = document.querySelector(".navcontentpos").innerText;
    let navbackcol = document.querySelector(".navbackcol").innerText;
    let navcol = document.querySelector(".navcol").innerText;
    let covpos = document.querySelector(".covpos").innerText;
    let covfilter = document.querySelector(".covfilter").innerText;
    let covfilterper = document.querySelector(".covfilterper").innerText;
    let covstyle = document.querySelector(".covstyle").innerText;
    let covvisibility = document.querySelector(".covvisibility").innerText;
    let covheight = document.querySelector(".covheight").innerText;
    let covwidth = document.querySelector(".covwidth").innerText;
    let covimg = document.querySelector(".covimg").innerText;
    let bodbackcol = document.querySelector(".bodbackcol").innerText;
    let bodcol = document.querySelector(".bodcol").innerText;
    let bodfontfam = document.querySelector(".bodfontfam").innerText;
    let bodalign = document.querySelector(".bodalign").innerText;
    let bodfontsize = document.querySelector(".bodfontsize").innerText;
    let bodwidth = document.querySelector(".bodwidth").innerText;
    let bodpos = document.querySelector(".bodpos").innerText;
    let searchvisibility = document.querySelector(".searchvisibility").innerText;
    let searchpos = document.querySelector(".searchpos").innerText;
    let searchwidth = document.querySelector(".searchwidth").innerText;
    let searchcol = document.querySelector(".searchcol").innerText;
    let itembackcol = document.querySelector(".itembackcol").innerText;
    let itemfontcol = document.querySelector(".itemfontcol").innerText;
    let flexitem = document.querySelector(".flexitem").innerText;
    let alignitem = document.querySelector(".alignitem").innerText;
    let itemfontsize = document.querySelector(".itemfontsize").innerText;
    let itemwidth = document.querySelector(".itemwidth").innerText;
    let itempos = document.querySelector(".itempos").innerText;
    let buttonbackcol = document.querySelector(".buttonbackcol").innerText;
    let buttoncol = document.querySelector(".buttoncol").innerText;
    let buttonradius = document.querySelector(".buttonradius").innerText;
    let itemmargin = document.querySelector(".itemmargin").innerText;
    let orderbackcol = document.querySelector(".orderbackcol").innerText;
    let orderfontcol = document.querySelector(".orderfontcol").innerText;
    let flexorder = document.querySelector(".flexorder").innerText;
    let alignorder = document.querySelector(".alignorder").innerText;
    let orderfontsize = document.querySelector(".orderfontsize").innerText;
    let orderwidth = document.querySelector(".orderwidth").innerText;
    let orderpos = document.querySelector(".orderpos").innerText;
    let ordermargin = document.querySelector(".ordermargin").innerText;
    let footerbackcol = document.querySelector(".footerbackcol").innerText;
    let footerfontcol = document.querySelector(".footerfontcol").innerText;
    let flexfooter = document.querySelector(".flexfooter").innerText;
    let alignfooter = document.querySelector(".alignfooter").innerText;
    let footerfontsize = document.querySelector(".footerfontsize").innerText;
    let footerwidth = document.querySelector(".footerwidth").innerText;
    let footerpos = document.querySelector(".footerpos").innerText;
    let footerpadding = document.querySelector(".footerpadding").innerText;
    let footerradius = document.querySelector(".footerradius").innerText;

    let navbar = document.querySelector(".custom__catal__nav");
    let customnav = document.querySelector(".custom__nav");
    let navicon = document.querySelector(".custom__ham");
    let navinside = document.querySelector(".custom__ham__inside");
    let closeham = document.querySelector(".close__ham");
    let cusanc = document.querySelectorAll(".cusanc");
    let dp = document.querySelector(".custom__dp");
    let backpicsec = document.querySelector(".custom__catal__backpic");

    if (navpos == "right"){
        customnav.style.position = "fixed";
        customnav.style.right = "0";
        navbar.style.display = "flex";
        navbar.style.flexDirection = "column";
        customnav.style.height = "100%";
        navbar.style.width = "20%";
    }else if (navpos == "left"){
        customnav.style.position = "fixed";
        customnav.style.left = "0";
        navbar.style.display = "flex";
        navbar.style.flexDirection = "column";
        customnav.style.height = "100%";
        navbar.style.width = "20%";
    }else if (navpos == "bottom"){
        navbar.style.position = "fixed";
        navbar.style.bottom = "0%";
        navbar.style.display = "flex";
        navbar.style.flexDirection = "row";
        navbar.style.width = "100%";
        navbar.style.height = "fit-content";
        navbar.style.top = "unset";
    }else{
        navbar.style.position = "fixed";
        navbar.style.top = "0";
        navbar.style.display = "flex";
        navbar.style.flexDirection = "row";
        navbar.style.width = "100%";
        navbar.style.height = "auto";
    }

    if (navfontsize !== ""){
        navbar.style.fontSize = navfontsize + `px`;
    }

    if (navfontfam !== ""){
        navbar.style.fontFamily = navfontfam; 
    }
    
    if (navvisibility == "none"){
        navbar.style.display = "none";
    }else{
        navbar.style.display = "flex";
        navicon.classList.add("hidden");
    }

    if (hamnav == "true"){
        navicon.classList.remove("hidden");
    }else{
        navicon.classList.add("hidden");
    }

    navicon.addEventListener("click", () => {
        navinside.classList.remove("hidden");
        navicon.classList.add("hidden");
    })

    closeham.addEventListener("click", () => {
        navinside.classList.add("hidden");
        navicon.classList.remove("hidden");
    })

    if (navheight !== ""){
        console.log(navheight)
        navbar.style.height = navheight;
    }

    if (navwidth !== ""){
        navbar.style.width = navwidth;
    }

    if (navcontentpos == "Left"){
        customnav.style.display = "flex";
        customnav.style.justifyContent = "left";
    }else if (navcontentpos == "Center"){
        customnav.style.display = "flex";
        customnav.style.justifyContent = "center";
    }else if (navcontentpos == "Right"){
        customnav.style.display = "flex";
        customnav.style.justifyContent = "right";
    }else if (navcontentpos == "Topper"){
        customnav.style.display = "flex";
        navbar.style.position = "relative";
        customnav.style.alignItems = "flex-start";
    }else if (navcontentpos == "Buttom"){
        customnav.style.display = "flex";
        navbar.style.position = "relative";
        customnav.style.alignItems = "flex-end";
    }else if (navcontentpos == "CenterVert"){
        customnav.style.display = "flex";
        navbar.style.position = "relative";
        customnav.style.alignItems = "center";
    }else{
        customnav.style.display = "flex";
        customnav.style.justifyContent = "center";
    }

    if (navbackcol !== ""){
        navbar.style.backgroundColor = navbackcol;
    }

    if (navcol !== ""){
        navbar.style.color = navcol;
        cusanc.forEach(item => {
            item.style.color = navcol;
        })
    }

    if (covimg == "doodle") {
        dp.src = "/images/doodle.jpg"
    }
    else if (covimg == "redblue") {
        dp.src = "/images/redblue.jpg"
    }
    else if (covimg == "mag") {
        dp.src = "/images/mag.jpg"
    }
    else if (covimg == "neon") {
        dp.src = "/images/neon.jpg"
    }
    else {
        if (covimg !== "" || covimg.length !== 0){
            dp.src = covpicval
        }
    }

    if (covfilter == "grayscale") {
        if (covfilterper !== ""){
            dp.style.filter = `grayscale(${covfilterper}%)`
        }else{
            dp.style.filter = `grayscale(100%)`
        }
    }
    else if (covfilter == "blur") {
        if (covfilterper !== ""){
            dp.style.filter = `blur(${covfilterper}px)`
        }else{
            dp.style.filter = `blur(5px)`
        }
    }
    else if (covfilter == "opacity") {
        if (covfilterper !== ""){
            dp.style.filter = `opacity(${covfilterper}%)`
        }else{
            dp.style.filter = `opacity(40%)`
        }
    }
    else if (covfilter == "saturate") {
        if (covfilterper !== ""){
            dp.style.filter = `saturate(${covfilterper}%)`
        }else{
            dp.style.filter = `saturate(50%)`
        }
    }
    else if (covfilter == "invert") {
        if (covfilterper !== ""){
            dp.style.filter = `invert(${covfilterper}%)`
        }else{
            dp.style.filter = `invert(100%)`
        }
    }
    else if (covfilter == "contrast") {
        if (covfilterper !== ""){
            dp.style.filter = `contrast(${covfilterper}%)`
        }else{
            dp.style.filter = `contrast(50%)`
        }
    }
    else {
        dp.style.filter = "none"
    }


    if (covstyle == "triangle") {
        dp.style.clipPath = `polygon(50% 0%, 0% 100%, 100% 100%)`
        dp.style.webkitClipPath = " polygon(50% 0%, 0% 100%, 100% 100%)"
    }
    else if (covstyle == "parallel") {
        dp.style.clipPath = `polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)`
        dp.style.webkitClipPath = "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)"
    }
    else if (covstyle == "star") {
        dp.style.clipPath = `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`
        dp.style.webkitClipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
    }
    else if (covstyle == "circle") {
        dp.style.clipPath = `circle(50% at 50% 50%)`
        dp.style.webkitClipPath = "circle(50% at 50% 50%)"
    }
    else if (covstyle == "crack") {
        dp.style.clipPath = `polygon(20% 0%, 58% 68%, 100% 20%, 66% 71%, 80% 100%, 43% 63%, 0% 80%, 41% 55%)`
        dp.style.webkitClipPath = "polygon(20% 0%, 58% 68%, 100% 20%, 66% 71%, 80% 100%, 43% 63%, 0% 80%, 41% 55%)"
    }
    else if (covstyle == "rhombus") {
        dp.style.clipPath = `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`
        dp.style.webkitClipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
    }
    else {
        dp.style.clipPath = "none";
    }

    if (covvisibility == "false"){
        dp.classList.add("hidden");
    }else{
        dp.classList.remove("hidden");
    }

    if (covheight !== ""){
        dp.style.height = covheight + "vh";
    }

    if (covwidth !== ""){
        dp.style.width = covwidth + "vw";
    }

    if (covpos == "right") {
        backpicsec.style.justifyContent = "right";
        backpicsec.style.alignItems = "";
    }
    else if (covpos == "left") {
        backpicsec.style.justifyContent = "left";
        backpicsec.style.alignItems = "";
    }
    else if (covpos == "center") {
        backpicsec.style.justifyContent = "center";
        backpicsec.style.alignItems = "";
    }
    else if (covpos == "top") {
        backpicsec.style.justifyContent = "";
        backpicsec.style.alignItems = "flex-start";
    }
    else if (covpos == "bottom") {
        backpicsec.style.justifyContent = "";
        backpicsec.style.alignItems = "flex-end";
    } else {
        console.log("")
    }

})();