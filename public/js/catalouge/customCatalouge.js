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
        footer.style.fontFamily = bodfontfam
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

    if (buttoncol !== "" && buttonbackcol !== ""){
        custombtn.forEach(item => {
            item.addEventListener("mouseover", () => {
                item.style.backgroundColor = buttoncol;
                item.style.color = buttonbackcol;
            })
        })
    }

    if (buttoncol !== "" && buttonbackcol !== ""){
        custombtn.forEach(item => {
            item.addEventListener("mouseout", () => {
                item.style.color = buttoncol;
                item.style.backgroundColor = buttonbackcol;
            })
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
    openProductDetail();
})();

function openProductDetail() {
    let viewProduct = document.querySelectorAll(".viewProduct");
    viewProduct.forEach(item => {
        item.addEventListener("click", async () => {
            openProdMid(item)
            getComments(item.id)

        })
    })
};

let bannerDiscount = document.querySelector(".bannerdisc").innerText;
async function openProdMid(item) {
    let cancelProduct = document.querySelector(".cancelProduct");
    let productModal = document.querySelector(".productModal");
    let headColor = document.querySelector(".buttonbackcol").innerText;
    let secHeadColor = document.querySelector(".buttoncol").innerText;
    let itembackcol = document.querySelector(".itembackcol").innerText;
    let itemfontcol = document.querySelector(".itemfontcol").innerText;

    try {
        let productHead = document.querySelector(".productHead");
        let productId = item.id;
        bannerDiscount = bannerDiscount * 1;
        productModal.classList.remove("hidden");
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let productbod = document.querySelector(".product__bod");
        const endpoint = `/api/v1/catalouge/${productId}/getItem`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    let item = result.data.data
                    let disper = bannerDiscount / 100
                    let newp = item.price * disper;
                    let newprice = item.price - newp;
                    productHead.innerHTML = `<h2>${item.name}</h2>`
                    productbod.innerHTML =
                        `
                            <div class="product__bod__info">
                                <img class="product_card_img" src="/images/upload.png" alt="catalouge__item__image">
                                <div class="product__card__det">
                                    <h3 class="product__card__head">${item.name}</h3>
                                    <p class="product__card__price">Serial No : ${item.serialno}</p>
                                    <p class="product__card__price">Price : ${item.currency} ${item.price}</p>
                                    <p class="productDiscount hidden">Discount : ${bannerDiscount}%</p>
                                    <p class="afterDiscPrice hidden">After Discount Price : ${newprice}</p>
                                    <p class="product__card__cat productCategory">Category : ${item.category}</p>
                                    <p class="product__card__cat">Sub-Category : ${item.subcategory}</p>
                                    <p class="product__card__cat instock">Stock Quantity : ${item.stockQuantity}</p>
                                    <p class="product__card__cat hidden outofStock rdstock">Item is Out of Stock</p>
                                    <pre class="product__card__detail pretag">${item.detail}</pre>
                                </div>
                                <label>Quantity : </label>
                                <input class="quantityInpt" type="number" placeholder="1" required/>
                                <button name=${item._id} class="seccatbtn addToCart viewAdd">Add To Cart</button>
                            </div>
                            `
                    if (item.coverImage) {
                        let catalimgcard = document.querySelector(".product_card_img");
                        catalimgcard.classList.add("product__card__img");
                        catalimgcard.src = item.coverImage;
                    }
                    if (item.applydiscount === true) {
                        let productDisc = document.querySelector(".productDiscount");
                        let afterDiscPrice = document.querySelector(".afterDiscPrice");
                        productDisc.classList.remove("hidden");
                        afterDiscPrice.classList.remove("hidden");
                    }
                    let instock = document.querySelector(".instock");

                    if (item.stockQuantity == undefined) {
                        instock.innerText = "Stock Quantity Not Specified"
                    }
                    if (item.stockQuantity === 0 || item.stockQuantity === null) {
                        let outofStock = document.querySelector(".outofStock");
                        instock.classList.add("hidden");
                        outofStock.classList.remove("hidden");
                        let viewadd = document.querySelector(".viewAdd");
                        viewadd.classList.add("hidden");
                    }
                    let prodInfoBod = document.querySelector(".product__bod__info");
                    let bodfont = document.querySelector(".bodfontfam");
                    let proddet = document.querySelector(".pretag");
                    prodInfoBod.style.color = itemfontcol;
                    proddet.style.fontFamily = bodfont;
                    productModal.style.backgroundColor = itembackcol;

                    similarItems(item.category, item._id)

                    let addCart = document.querySelectorAll(".viewAdd");
                    let quant = document.querySelector(".quantityInpt");
                    quant.style.borderColor = secHeadColor;
                    addCart.forEach(item => {
                        item.style.color = secHeadColor;
                        item.style.borderColor = secHeadColor;
                        item.addEventListener("mouseover", () => {
                            item.style.color = headColor;
                            item.style.backgroundColor = secHeadColor;
                        })
                        item.addEventListener("mouseout", () => {
                            item.style.color = secHeadColor;
                            item.style.backgroundColor = "transparent"
                        })
                        item.addEventListener("click", () => {
                            if (quant.value == null || quant.value == "") {
                                return false;
                            }
                            addPiece(item)
                        })
                    })
                })
            } else {
                console.log(response);
                errorAlert("Error")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };

    cancelProduct.addEventListener("click", () => {
        productModal.classList.add("hidden");
    })
}

async function similarItems(category, itemId) {

    let userId = document.querySelector(".seccataluserid").innerText;
    try {
        let similarSec = document.querySelector(".similar__bod");
        similarSec.innerHTML = "";
        const endpoint = `/api/v1/catalouge/${userId}/similar/${category}/item/${itemId}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            let res = response.json();
            if (response.status === 200) {
                res.then(item => {
                    item.forEach(el => {
                        
                        if (el.applydiscount === true) {
                            if (el.coverImage) {
                                if (el.stockQuantity === 0 || el.stockQuantity === null) {
                                    similarSec.innerHTML +=
                                        `
                                        <div class="cus__cat__item__card similarcard">
                                            <img class="sec__cat__img simimg" src="${el.coverImage}" alt="catalouge__item__image">
                                            <div class="sec__cat__item__info">
                                                    <h3>Name : ${el.name}</h3>
                                                    <h3>Price : ${el.price}</h3>
                                                    <h3>Discount : ${bannerDiscount}%</h3>
                                                    <h3 class="stock rdstock">Out Of Stock</h3>
                                            </div>
                                            <div class="sec__cat__btn__grp">
                                                <button name=${el._id} class="seccatbtn addToCart simiAdd" disabled>Add To Cart</button>
                                                <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                            </div>
                                        </div>
                                    `
                                }
                                else {
                                    similarSec.innerHTML +=
                                        `
                                            <div class="cus__cat__item__card similarcard">
                                                <img class="sec__cat__img simimg" src="${el.coverImage}" alt="catalouge__item__image">
                                                <div class="sec__cat__item__info">
                                                        <h3>Name : ${el.name}</h3>
                                                        <h3>Price : ${el.price}</h3>
                                                        <h3>Discount : ${bannerDiscount}%</h3>
                                                        <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                                                </div>
                                                <div class="sec__cat__btn__grp">
                                                    <button name=${el._id} class="seccatbtn addToCart simiAdd">Add To Cart</button>
                                                    <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                                </div>
                                            </div>
                                        `
                                }
                            }
                            else {
                                if (el.stockQuantity === 0 || el.stockQuantity === null) {
                                    similarSec.innerHTML +=
                                        `
                                        <div class="cus__cat__item__card similarcard">
                                            <img class="sec__cat__img simimg simnoimg" src="/images/upload.png" alt="catalouge__item__image">
                                            <div class="sec__cat__item__info">
                                                    <h3>Name : ${el.name}</h3>
                                                    <h3>Price : ${el.price}</h3>
                                                    <h3>Discount : ${bannerDiscount}%</h3>
                                                    <h3 class="stock rdstock">Out Of Stock</h3>
                                            </div>
                                            <div class="sec__cat__btn__grp">
                                                <button name=${el._id} class="seccatbtn addToCart simiAdd" disabled>Add To Cart</button>
                                                <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                            </div>
                                        </div>
                                    `
                                } else {
                                    similarSec.innerHTML +=
                                        `
                                            <div class="cus__cat__item__card similarcard">
                                                <img class="sec__cat__img simimg simnoimg" src="/images/upload.png" alt="catalouge__item__image">
                                                <div class="sec__cat__item__info">
                                                        <h3>Name : ${el.name}</h3>
                                                        <h3>Price : ${el.price}</h3>
                                                        <h3>Discount : ${bannerDiscount}%</h3>
                                                        <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                                                </div>
                                                <div class="sec__cat__btn__grp">
                                                    <button name=${el._id} class="seccatbtn addToCart simiAdd">Add To Cart</button>
                                                    <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                                </div>
                                            </div>
                                        `
                                }
                            }
                        } else {
                            if (el.coverImage) {
                                if (el.stockQuantity === 0 || el.stockQuantity === null) {
                                    similarSec.innerHTML +=
                                        `
                                        <div class="cus__cat__item__card similarcard">
                                            <img class="sec__cat__img simimg" src="${el.coverImage}" alt="catalouge__item__image">
                                            <div class="sec__cat__item__info">
                                                    <h3>Name : ${el.name}</h3>
                                                    <h3>Price : ${el.price}</h3>
                                                    <h3 class="stock rdstock">Out Of Stock</h3>
                                            </div>
                                            <div class="sec__cat__btn__grp">
                                                <button name=${el._id} class="seccatbtn addToCart simiAdd" disabled>Add To Cart</button>
                                                <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                            </div>
                                        </div>
                                    `
                                } else {
                                    similarSec.innerHTML +=
                                        `
                                            <div class="cus__cat__item__card similarcard">
                                                <img class="sec__cat__img simimg" src="${el.coverImage}" alt="catalouge__item__image">
                                                <div class="sec__cat__item__info">
                                                        <h3>Name : ${el.name}</h3>
                                                        <h3>Price : ${el.price}</h3>
                                                        <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                                                </div>
                                                <div class="sec__cat__btn__grp">
                                                    <button name=${el._id} class="seccatbtn addToCart simiAdd">Add To Cart</button>
                                                    <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                                </div>
                                            </div>
                                        `
                                }
                            }
                            else {
                                if (el.stockQuantity === 0 || el.stockQuantity === null) {
                                    similarSec.innerHTML +=
                                        `
                                        <div class="cus__cat__item__card similarcard">
                                            <img class="sec__cat__img simimg simnoimg" src="/images/upload.png" alt="catalouge__item__image">
                                            <div class="sec__cat__item__info">
                                                    <h3>Name : ${el.name}</h3>
                                                    <h3>Price : ${el.price}</h3>
                                                    <h3 class="stock rdstock">Out Of Stock</h3>
                                            </div>
                                            <div class="sec__cat__btn__grp">
                                                <button name=${el._id} class="seccatbtn addToCart simiAdd" disabled>Add To Cart</button>
                                                <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                            </div>
                                        </div>
                                    `
                                } else {
                                    similarSec.innerHTML +=
                                        `
                                            <div class="cus__cat__item__card similarcard">
                                                <img class="sec__cat__img simimg simnoimg" src="/images/upload.png" alt="catalouge__item__image">
                                                <div class="sec__cat__item__info">
                                                        <h3>Name : ${el.name}</h3>
                                                        <h3>Price : ${el.price}</h3>
                                                        <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                                                </div>
                                                <div class="sec__cat__btn__grp">
                                                    <button name=${el._id} class="seccatbtn addToCart simiAdd">Add To Cart</button>
                                                    <button id="${el._id}" class="seccatbtn viewProduct simiView">View</button>
                                                </div>
                                            </div>
                                        `
                                }
                            }
                        }
                    })
                    btnCard()
                    let addCart = document.querySelectorAll(".simiAdd");
                    addCart.forEach(item => {
                        item.addEventListener("click", () => {
                            addPiece(item)
                        })
                    })
                    let viewProd = document.querySelectorAll(".simiView");

                    viewProd.forEach(item => {
                        item.addEventListener("click", async () => {
                            location.hash = "#"
                            openProdMid(item)
                            getComments(item.id)
                            window.setTimeout(() => {
                                location.hash = "#prodBod"
                            }, 200)
                        })
                    })
                })
            } else {
                console.log(response);
                errorAlert("Error")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
};

function btnCard() {
    let fontColor = document.querySelector(".itemfontcol").innerText;
    let focusColor = document.querySelector(".itembackcol").innerText;
    let btnbackcol = document.querySelector(".buttonbackcol").innerText;
    let btncol = document.querySelector(".buttoncol").innerText;
    let secCard = document.querySelectorAll(".cus__cat__item__card");
    let btn = document.querySelectorAll(".seccatbtn");

    secCard.forEach(item => {
        item.style.backgroundColor = focusColor;
        item.style.color = fontColor;
        item.style.border = `1px solid ${btncol}`
        item.style.padding = "1%"
    })

    btn.forEach(item => {
        item.style.color = btncol;
        item.style.borderColor = btncol;
        item.style.boxShadow = "none";
        item.style.textShadow = "none";

        item.addEventListener("mouseover", () => {
            item.style.color = btnbackcol;
            item.style.backgroundColor = btncol;
        })

        item.addEventListener("mouseout", () => {
            item.style.color = btncol;
            item.style.backgroundColor = "transparent";
        })
    })
}

cmt();
function cmt() {
    let addcmt = document.getElementById("createComment");

    addcmt.addEventListener("click", (e) => {
        e.preventDefault();
        let parent = addcmt.parentElement.parentElement.parentElement;
        let id = parent.childNodes[1].childNodes[1].childNodes[9].name;
        createComment(id)
    })
}

async function createComment(productId) {
    let user = document.getElementById("uniquecompusername").innerText;
    let company = document.querySelector(".seccataluserid").innerText;
    let comment = document.getElementById("newComment");
    let usrId = document.getElementById("uniquecompuserid").innerText;

    if (comment.value == "") {
        return false;
    }
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/newcomment`
        await fetch((endpoint), {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: user,
                userId: usrId,
                companyUserId: company,
                productId: productId,
                comment: comment.value
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 201) {
                getComments(productId);
                successAlert("Your Comment Has Been Added !!!")
                comment.value = "";
            } else {
                console.log(response);
                errorAlert("Error Adding Comment Try Again")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

async function getComments(productId) {
    let curuser = document.querySelector(".thisuserid").innerText;
    let usrId = document.getElementById("uniquecompuserid").innerText;
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden");
        let commentSec = document.querySelector(".all__comment__sec");
        commentSec.innerHTML = "";
        const endpoint = `/api/v1/catalouge/comments/${productId}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            load.classList.add("hidden");

            if (response.status === 200) {
                res = response.json();
                res.then(items => {
                    let item = items.comments
                    item.forEach(el => {
                        if (productId === el.productId){
                            if (el.userId === usrId || el.companyUserId === curuser) {
                                commentSec.innerHTML += `
                                    <div class="comment__card">
                                    <div class="comment__head">
                                    <h4>${el.name}</h4>
                                    <button class="deleteCommentbtn seccatbtn" id=${el._id}>Delete</button>
                                    </div>
                                    <p>${el.comment}</p>
                                    </div>
                                `
                            }
                            else {
                                commentSec.innerHTML += `
                                    <div class="comment__card">
                                    <h4>${el.name}</h4>
                                    <p>${el.comment}</p>
                                    <button class="deleteCommentbtn hidden"></button>
                                    </div>
                                `
                            }
                        }
                    })

                    if (item.length == 0) {
                        commentSec.innerHTML += `
                                <h4>No Comments Yet!!!</h4>
                            `
                    }
                    let delCmt = document.querySelectorAll(".deleteCommentbtn");
                    delCmt.forEach(item => {
                        item.addEventListener("click", () => {
                            deleteComment(item.id, productId)
                        })
                    })
                })
            }
            else {
                console.log(response);
                errorAlert("Error Fetching Data")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

async function deleteComment(id, productId) {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/catalouge/delcomments/${id}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify({
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                getComments(productId);
                successAlert("Comment Has Been Deleted !!!")
            } else {
                console.log(response);
                errorAlert("Error Adding Comment Try Again")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
}

let detailbtn = document.querySelector(".resdetail");
let cancelDetail = document.querySelector(".cancel__detail");
let details = document.querySelector('.restro__info');
let catalogeUserId = document.querySelector(".seccataluserid").innerText;

let getAll = document.querySelector(".getAllSecCatItem");
getAll.addEventListener("click", () => {
    location.reload();
})

cancelDetail.addEventListener("click", () => {
    details.classList.add("hidden");
})

detailbtn.addEventListener("click", async () => {
    details.classList.remove("hidden");
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let headColor = document.querySelector(".itemfontcol").innerText;
        let secHeadColor = document.querySelector(".buttoncol").innerText;
        let backcol = document.querySelector(".itembackcol").innerText;
        let menuItm = document.querySelector(".restro__info__bod");
        let midsec = document.querySelector(".catdeatilmidsec");
        let subItemModel = document.querySelector(".sec__sub__item__modal");

        midsec.style.backgroundColor = backcol;
        subItemModel.style.backgroundColor = backcol;

        subItemModel.classList.add("hidden");
        if (details.classList.contains("hidden")) {
            details.classList.remove("hidden");
        }
        if (midsec.classList.contains("hidden")) {
            midsec.classList.remove("hidden");
        }
        menuItm.innerHTML = "";

        const endpoint = `/api/v1/catalouge/allCatalougeCategories/${catalogeUserId}`
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'image/jpeg/png')
        myHeaders.get('Content-Type');
        await fetch((endpoint), {
            method: 'GET',
            headers: myHeaders
        }).then((response) => {
            load.classList.add("hidden");
            let res = response.json();
            if (response.status === 200) {
                res.then(result => {
                    result.forEach(item => {
                        menuItm.innerHTML += `<h3 class="sec__cat__categories cateHead">${item}</h3>`
                    })

                    let catalougeItems = document.querySelectorAll(".sec__cat__categories");
                    catalougeItems.forEach(item => {
                        item.style.cursor = "pointer";
                        item.style.color = headColor;
                        item.addEventListener("mouseover", () => {
                            item.style.color = secHeadColor;
                        })
                        item.addEventListener("mouseout", () => {
                            item.style.color = headColor;
                        })
                        item.addEventListener("click", async (e) => {
                            e.preventDefault();
                            let cate = item.innerText;
                            try {
                                let load = document.querySelector('.loader');
                                load.classList.remove("hidden")
                                let subItm = document.querySelector(".sec__cat__sub");
                                subItm.innerHTML = "";
                                location.hash = "#";
                                midsec.classList.add("hidden");
                                const endpoint = `/api/v1/catalouge/${catalogeUserId}/findsubcate/${cate}`
                                let myHeaders = new Headers();
                                let pagi = document.querySelector(".paginate");
                                pagi.classList.add("hidden");
                                myHeaders.append('Content-Type', 'image/jpeg/png')
                                myHeaders.get('Content-Type');
                                await fetch((endpoint), {
                                    method: 'GET',
                                    headers: myHeaders
                                }).then((response) => {
                                    load.classList.add("hidden");
                                    let res = response.json();
                                    if (response.status === 200) {
                                        res.then(result => {
                                            let catalougeItems = document.querySelector(".custom__prod__sec");
                                            catalougeItems.innerHTML = "";
                                            result.forEach(item => {
                                                if (typeof (item) !== "object") {
                                                    subItemModel.classList.remove("hidden");
                                                    let subItemHeader = document.querySelector(".sec__sub__head__info");
                                                    subItemHeader.innerText = cate + " Sub Categories | SGroup"
                                                    subItm.innerHTML += `<h3 class="catalouge__subcate__list cateHead">${item}</h3>`
                                                }
                                                else {
                                                    subItemModel.classList.add("hidden");
                                                    details.classList.add("hidden");
                                                    smallCardElem(item);
                                                    btnCard()
                                                    window.setTimeout(() => {
                                                        location.hash = "#secCatItems"
                                                    }, 200)
                                                }
                                            })
                                            let cancelSub = document.querySelector(".cancel__sub");
                                            cancelSub.addEventListener("click", () => {
                                                subItemModel.classList.add("hidden");
                                                midsec.classList.remove("hidden");
                                            })
                                            let subCateList = document.querySelectorAll(".catalouge__subcate__list")
                                            subCateList.forEach(item => {
                                                item.style.color = headColor;
                                                item.addEventListener("mouseover", () => {
                                                    item.style.color = secHeadColor;
                                                })
                                                item.addEventListener("mouseout", () => {
                                                    item.style.color = headColor;
                                                })
                                                item.addEventListener("click", async (e) => {
                                                    e.preventDefault();
                                                    subItemModel.classList.add("hidden");
                                                    pagi.classList.add("hidden");
                                                    location.hash = "#";
                                                    details.classList.add("hidden");
                                                    let subcate = item.innerText;
                                                    try {
                                                        load.classList.remove("hidden");
                                                        let catalougeItems = document.querySelector(".custom__prod__sec");
                                                        catalougeItems.innerHTML = "";
                                                        const endpoint = `/api/v1/catalouge/${catalogeUserId}/finditems/${subcate}/${cate}`
                                                        let myHeaders = new Headers();
                                                        myHeaders.append('Content-Type', 'image/jpeg/png')
                                                        myHeaders.get('Content-Type');
                                                        await fetch((endpoint), {
                                                            method: 'GET',
                                                            headers: myHeaders
                                                        }).then((response) => {
                                                            load.classList.add("hidden");
                                                            let res = response.json();
                                                            if (response.status === 200) {
                                                                res.then(result => {
                                                                    result = result.items
                                                                    result.forEach(item => {
                                                                        smallCardElem(item);
                                                                    })
                                                                    btnCard()
                                                                    window.setTimeout(() => {
                                                                        location.hash = "#secCatItems"
                                                                    }, 200)
                                                                })
                                                            }
                                                            else {
                                                                console.log(response);
                                                                errorAlert("Error")
                                                            }
                                                        })
                                                    }
                                                    catch (err) {
                                                        console.log(err);
                                                        errorAlert('Sorry! Something went wrong', err)
                                                    }
                                                })
                                            })
                                        })
                                    } else {
                                        console.log(response);
                                        errorAlert("Error")
                                    }
                                })
                            }
                            catch (err) {
                                console.log(err);
                                errorAlert('Sorry! Something went wrong', err);
                            };
                        })
                    })
                })
            } else {
                console.log(response);
                errorAlert("Error")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
});

function smallCardElem(el) {
    let catalougeItems = document.querySelector(".custom__prod__sec");
    if (el.applydiscount === true) {
        if (el.coverImage) {
            if (el.stockQuantity === 0 || el.stockQuantity === null) {
                catalougeItems.innerHTML +=
                    `
                    <div class="custom__products">
                        <div class="custom__prod__top">
                            <img src="${el.coverImage}" alt="catalouge__item__image">
                        </div>
                        <div class="custom__prod__bottom">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.currency}${el.price}</h3>
                                <h3 class="itemDiscPercent">Discount : ${bannerDiscount}%</h3>
                                <h3 class="stock rdstock">Out Of Stock</h3>
                        </div>
                        <div class="custom__grp">
                            <button name=${el._id} class="custom__btn addToCart" disabled>Add To Cart</button>
                            <button id="${el._id}" class="custom__btn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
            else {
                catalougeItems.innerHTML +=
                    `
                    <div class="custom__products">
                        <div class="custom__prod__top">
                            <img src="${el.coverImage}" alt="catalouge__item__image">
                        </div>
                        <div class="custom__prod__bottom">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.currency}${el.price}</h3>
                                <h3 class="itemDiscPercent">Discount : ${bannerDiscount}%</h3>
                                <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                        </div>
                        <div class="custom__grp">
                            <button name=${el._id} class="custom__btn addToCart">Add To Cart</button>
                            <button id="${el._id}" class="custom__btn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
        }
        else {
            if (el.stockQuantity === 0 || el.stockQuantity === null) {
                catalougeItems.innerHTML +=
                    `
                <div class="custom__products">
                    <div class="custom__prod__top">
                        <img src="/images/upload.png" alt="catalouge__item__image">
                    </div>
                    <div class="custom__prod__bottom">
                            <h3>Name : ${el.name}</h3>
                            <h3>Price : ${el.currency}${el.price}</h3>
                            <h3 class="itemDiscPercent">Discount : ${bannerDiscount}%</h3>
                            <h3 class="stock rdstock">Out Of Stock</h3>
                    </div>
                    <div class="custom__grp">
                        <button name=${el._id} class="custom__btn addToCart" disabled>Add To Cart</button>
                        <button id="${el._id}" class="custom__btn viewProduct viewProdCard">View</button>
                    </div>
                </div>
            `
            }
            else {
                catalougeItems.innerHTML +=
                    `
                    <div class="custom__products">
                        <div class="custom__prod__top">
                            <img src="/images/upload.png" alt="catalouge__item__image">
                        </div>
                        <div class="custom__prod__bottom">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.currency}${el.price}</h3>
                                <h3 class="itemDiscPercent">Discount : ${bannerDiscount}%</h3>
                                <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                        </div>
                        <div class="custom__grp">
                            <button name=${el._id} class="custom__btn addToCart">Add To Cart</button>
                            <button id="${el._id}" class="custom__btn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
        }
    } else {
        if (el.coverImage) {
            if (el.stockQuantity === 0 || el.stockQuantity === null) {
                catalougeItems.innerHTML +=
                    `
                <div class="custom__products">
                    <div class="custom__prod__top">
                        <img src="${el.coverImage}" alt="catalouge__item__image">
                    </div>
                    <div class="custom__prod__bottom">
                            <h3>Name : ${el.name}</h3>
                            <h3>Price : ${el.currency}${el.price}</h3>
                            <h3 class="stock rdstock">Out Of Stock</h3>
                    </div>
                    <div class="custom__grp">
                        <button name=${el._id} class="custom__btn addToCart" disabled>Add To Cart</button>
                        <button id="${el._id}" class="custom__btn viewProduct viewProdCard">View</button>
                    </div>
                </div>
            `
            } else {
                catalougeItems.innerHTML +=
                    `
                    <div class="custom__products">
                        <div class="custom__prod__top">
                            <img src="${el.coverImage}" alt="catalouge__item__image">
                        </div>
                        <div class="custom__prod__bottom">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.currency}${el.price}</h3>
                                <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                        </div>
                        <div class="custom__grp">
                            <button name=${el._id} class="custom__btn addToCart">Add To Cart</button>
                            <button id="${el._id}" class="custom__btn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
        }
        else {
            if (el.stockQuantity === 0 || el.stockQuantity === null) {
                catalougeItems.innerHTML +=
                    `
                <div class="custom__products">
                    <div class="custom__prod__top">
                        <img src="/images/upload.png" alt="catalouge__item__image">
                    </div>
                    <div class="custom__prod__bottom">
                            <h3>Name : ${el.name}</h3>
                            <h3>Price : ${el.currency}${el.price}</h3>
                            <h3 class="stock rdstock">Out Of Stock</h3>
                    </div>
                    <div class="custom__grp">
                        <button name=${el._id} class="custom__btn addToCart" disabled>Add To Cart</button>
                        <button id="${el._id}" class="custom__btn viewProduct viewProdCard">View</button>
                    </div>
                </div>
            `
            } else {
                catalougeItems.innerHTML +=
                    `
                    <div class="custom__products">
                        <div class="custom__prod__top">
                            <img src="/images/upload.png" alt="catalouge__item__image">
                        </div>
                        <div class="custom__prod__bottom">
                                <h3>Name : ${el.name}</h3>
                                <h3>Price : ${el.currency}${el.price}</h3>
                                <h3 class="stock">Stock Quantity: ${el.stockQuantity}</h3>
                        </div>
                        <div class="custom__grp">
                            <button name=${el._id} class="custom__btn addToCart">Add To Cart</button>
                            <button id="${el._id}" class="custom__btn viewProduct viewProdCard">View</button>
                        </div>
                    </div>
                `
            }
        }
    }

    let viewProd = document.querySelectorAll(".viewProdCard");

    let allprods = document.querySelectorAll(".custom__products");
    let itembackcol = document.querySelector(".itembackcol").innerText;
    let itemcol = document.querySelector(".itemfontcol").innerText;
    let itemwidth = document.querySelector(".itemwidth").innerText;

    let allbtn = document.querySelectorAll(".custom__btn");
    let btncol = document.querySelector(".buttoncol").innerText;
    let btnback = document.querySelector(".buttonbackcol").innerText;
    let btnrd = document.querySelector(".buttonradius").innerText;

    allprods.forEach(item => {
        item.style.backgroundColor = itembackcol;
        item.style.color = itemcol;
        item.style.width = itemwidth + "vw";
    })

    allbtn.forEach(item => {
        item.style.color = btncol;
        item.style.border = "1px solid" + " " + btncol;
        item.style.borderRadius = btnrd + "rem";

        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = btncol;
            item.style.color = btnback;
        })

        item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "transparent";
            item.style.color = btncol;
        })
    })

    viewProd.forEach(item => {
        item.addEventListener("click", async () => {

            openProdMid(item)

            getComments(el._id)
        })
    })
    let addTo = document.querySelectorAll(".addToCart");
    addTo.forEach(item => {
        item.addEventListener("click", () => {
            addPiece(item)
        })
    })
};