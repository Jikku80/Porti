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
    let cusbod = document.querySelector(".custom__body__sec");
    let searchbar = document.querySelector(".custom__searchbar");
    let searchsec = document.querySelector(".custom__search__sec");
    let custombod = document.querySelector(".custom__body");
    let custommid = document.querySelector(".custom__body__mid");
    let products = document.querySelectorAll(".custom__products");
    let prodsec = document.querySelector(".custom__prod__sec");
    let custombtn = document.querySelectorAll(".custom__btn");
    let orders = document.querySelectorAll(".cusorders");
    let ordersec = document.querySelector(".custom__orders");
    let footer = document.querySelector(".footer__cont");
    let footersec = document.querySelector(".custom__footer");

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
        navbar.style.height = navheight;
    }

    if (navwidth !== ""){
        navbar.style.width = navwidth;
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

    if (bodbackcol !== ""){
        document.body.style.backgroundColor = bodbackcol;
    }

    if (bodcol !== ""){
        document.body.style.color = bodcol;
    }

    if (bodfontfam !== ""){
        cusbod.style.fontFamily = bodfontfam
        searchbar.style.fontFamily = bodfontfam
    }

    if (bodalign == "reverse"){
        cusbod.style.display = "flex";
        cusbod.style.flexDirection = "column-reverse";
    }else{
        cusbod.style.display = "flex";
        cusbod.style.flexDirection = "column";
    }

    if (bodfontsize !== ""){
        cusbod.style.fontSize = bodfontsize + "px";
        searchbar.style.fontSize = bodfontsize + "px";
    }

    if (bodwidth !== ""){
        custommid.style.width = bodwidth + "vw";
    }

    if (bodpos == "left"){
        custombod.style.display = "flex";
        custombod.style.justifyContent = "left"
    }else if (bodpos == "right"){
        custombod.style.display = "flex";
        custombod.style.justifyContent = "right"
    }else {
        custombod.style.display = "flex";
        custombod.style.justifyContent = "center"
    }

    if (searchvisibility == false || searchvisibility == "false"){
        searchsec.classList.add("hidden");
    }else{
        searchsec.classList.remove("hidden");
    }

    if (searchpos == "absolute"){
        searchsec.style.position = "absolute";
        searchsec.style.top = "50%";
        searchsec.style.left = "50%";
        searchsec.style.transform = "translate(-50%, -50%)";
    }

    if (searchwidth !== ""){
        searchbar.style.width = searchwidth ;
        let newwidth = searchwidth.slice(0, -1);
        newwidth = newwidth * 1;
        if (newwidth > 80){
            searchbar.style.transform = "unset";
        }
    }

    if (searchcol !== ""){
        searchbar.style.color = searchcol;
        searchbar.style.borderColor = searchcol; 
    }

    if (itembackcol !== ""){
        products.forEach(item => {
            item.style.backgroundColor = itembackcol
        })
    }

    if (itemfontcol !== ""){
        products.forEach(item => {
            item.style.color = itemfontcol
        })
    }

    if (flexitem == "column"){
        prodsec.style.flexDirection = "column";
    }else{
        prodsec.style.flexDirection = "row";
    }

    if (alignitem == "reverse"){
        if (flexitem == "column"){
            prodsec.style.flexDirection = "column-reverse";
        }else{
            prodsec.style.flexDirection = "row-reverse";
        }
    }else{
        if (flexitem == "column"){
            prodsec.style.flexDirection = "column";
        }else{
            prodsec.style.flexDirection = "row";
        }
    }

    if (itemfontsize !== ""){
        prodsec.style.fontSize = itemfontsize + "px";
    }

    if (itemwidth !== ""){
        products.forEach(item => {
            item.style.width = itemwidth + "vw";
        })
    }

    if (itempos == "left"){
        prodsec.style.justifyContent = "left";
        products.forEach(item => {
            item.style.margin = "1%";
        })
        if (flexitem == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "flex-start"
        }
    }else if (itempos == "right"){
        prodsec.style.justifyContent = "right";
        products.forEach(item => {
            item.style.margin = "1%";
        })
        if (flexitem == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "flex-end"
        }
    }else{
        prodsec.style.justifyContent = "center";
        products.forEach(item => {
            item.style.margin = "1%";
        })
        if (flexitem == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "center"
        }
    }

    if (buttonbackcol !== ""){
        custombtn.forEach(item => {
            item.style.backgroundColor = buttonbackcol;
        })
    }

    if (buttoncol !== ""){
        custombtn.forEach(item => {
            item.style.color = buttoncol;
            item.style.borderColor = buttoncol;
        })
    }

    if (buttonradius !== ""){
        custombtn.forEach(item => {
            item.style.borderRadius = buttonradius + "rem";
        })
    }

    if (itemmargin !== ""){
        products.forEach(item => {
            item.style.margin = itemmargin + "px";
        })
    }

    if (orderbackcol !== ""){
        orders.forEach(item => {
            item.style.backgroundColor = orderbackcol;
        })
    }

    if (orderfontcol !== ""){
        orders.forEach(item => {
            item.style.color = orderfontcol;
        })
    }

    if (flexorder == "column"){
        ordersec.style.flexDirection = "column";
    }else{
        ordersec.style.flexDirection = "row";
    }

    if (alignorder == "reverse"){
        if (flexorder == "column"){
            ordersec.style.flexDirection = "column-reverse";
        }else{
            ordersec.style.flexDirection = "row-reverse";
        }
    }else{
        if (flexorder == "column"){
            ordersec.style.flexDirection = "column";
        }else{
            ordersec.style.flexDirection = "row";
        }
    }

    if (orderfontsize !== ""){
        ordersec.style.fontSize = orderfontsize + "px";
    }

    if (orderwidth !== ""){
        orders.forEach(item => {
            item.style.width = orderwidth + "%";
        })
    }

    if (orderpos == "left"){
        ordersec.style.justifyContent = "left";
        orders.forEach(item => {
            item.style.margin = "1%";
        })
        if (flexorder == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "flex-start"
        }
    } else if (orderpos == "right"){
        ordersec.style.justifyContent = "right";
        orders.forEach(item => {
            item.style.margin = "1%";
        })
        if (flexorder == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "flex-end"
        }
    }else{
        ordersec.style.justifyContent = "center";
        orders.forEach(item => {
            item.style.margin = "1%";
        })
        if (flexorder == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "center"
        }
    }

    if (ordermargin !== ""){
        orders.forEach(item => {
            item.style.margin = ordermargin + "px";
        })
    }

    if (footerbackcol !== ""){
        footer.style.backgroundColor = footerbackcol;
    }

    if (footerfontcol !== ""){
        footer.style.color = footerfontcol;
    }

    if (flexfooter == "column"){
        footer.style.display = "flex";
        footer.style.flexDirection = "column";
    }else{
        footer.style.display = "flex";
        footer.style.flexDirection = "row";
    }

    if (alignfooter == "reverse"){
        if (flexfooter == "column"){
            footer.style.display = "flex";
            footer.style.flexDirection = "column-reverse";
        }else{
            footer.style.display = "flex";
            footer.style.flexDirection = "row-reverse";
        }
    }else{
        if (flexfooter == "column"){
            footer.style.display = "flex";
            footer.style.flexDirection = "column";
        }else{
            footer.style.display = "flex";
            footer.style.flexDirection = "row";
        }
    }

    if (footerfontsize !== ""){
        footer.style.fontSize = footerfontsize + "px";
    }

    if (footerwidth !== ""){
        footer.style.width = footerwidth + "vw";
    }

    if (footerpos == "left"){
        footersec.style.display = "flex";
        footersec.style.justifyContent = "left";
    }else if (footerpos == "right"){
        footersec.style.display = "flex";
        footersec.style.justifyContent = "right";
    }else{
        footersec.style.display = "flex";
        footersec.style.justifyContent = "center";
    }

    if (footerpadding !== ""){
        footer.style.paddingBottom = footerpadding + "px";
    }

    if (navpos == "bottom"){
        footer.style.paddingBottom = navbar.clientHeight + "px";
    }

    if (footerradius !== ""){
        footer.style.borderRadius = footerradius + "rem";
    }
})();