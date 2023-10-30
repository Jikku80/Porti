let uppos = document.querySelector(".uppos");
let upfontsize = document.querySelector(".upfontsize");
let upfontfam = document.querySelector(".upfontfam");
let upvisibility = document.querySelector(".upvisibility");
let uphamnav = document.querySelector(".uphamnav");
let upheight = document.querySelector(".upheight");
let upwidth = document.querySelector(".upwidth");
let upcontentpos = document.querySelector(".upcontentpos");
let upbackcol = document.querySelector(".upbackcol");
let upcol = document.querySelector(".upcol");
let updateCustomTheme = document.querySelector(".updatecustomtheme");
let customid = document.querySelector(".customthemeid").innerText;

let upcovpos = document.querySelector(".upcovpos");
let upcovfilter = document.querySelector(".upcovfilter");
let upcovfilterper = document.querySelector(".upcovfilterper");
let upcovstyle = document.querySelector(".upcovstyle");
let upcovvisibility = document.querySelector(".upcovvisibility");
let upcovheight = document.querySelector(".upcovheight");
let upcovwidth = document.querySelector(".upcovwidth");
let upcovimg = document.querySelector(".upcovimg");

let upbodbackcol = document.querySelector(".upbodbackcol");
let upbodcol = document.querySelector(".upbodcol");
let upbodfontfam = document.querySelector(".upbodfontfam");
let upbodalign = document.querySelector(".upbodalign");
let upbodfontsize = document.querySelector(".upbodfontsize");
let upbodwidth = document.querySelector(".upbodwidth");
let upbodpos = document.querySelector(".upbodpos");
let upsearchvisibility = document.querySelector(".upsearchvisibility");
let upsearchpos = document.querySelector(".upsearchpos");
let upsearchwidth = document.querySelector(".upsearchwidth");
let upsearchcol = document.querySelector(".upsearchcol");

let upitembackcol = document.querySelector(".upitembackcol");
let upitemfontcol = document.querySelector(".upitemfontcol");
let upflexitem = document.querySelector(".upflexitem");
let upalignitem = document.querySelector(".upalignitem");
let upitemfontsize = document.querySelector(".upitemfontsize");
let upitemwidth = document.querySelector(".upitemwidth");
let upitempos = document.querySelector(".upitempos");
let upbuttonbackcol = document.querySelector(".upbuttonbackcol");
let upbuttoncol = document.querySelector(".upbuttoncol");
let upbuttonradius = document.querySelector(".upbuttonradius");
let upitemmargin = document.querySelector(".upitemmargin");

let uporderbackcol = document.querySelector(".uporderbackcol");
let uporderfontcol = document.querySelector(".uporderfontcol");
let upflexorder = document.querySelector(".upflexorder");
let upalignorder = document.querySelector(".upalignorder");
let uporderfontsize = document.querySelector(".uporderfontsize");
let uporderwidth = document.querySelector(".uporderwidth");
let uporderpos = document.querySelector(".uporderpos");
let upordermargin = document.querySelector(".upordermargin");
// let upbuttonradius = document.querySelector(".upbuttonradius");
// let upbuttonbackcol = document.querySelector(".upbuttonbackcol");
// let upbuttoncol = document.querySelector(".upbuttoncol");

let upfooterbackcol = document.querySelector(".upfooterbackcol");
let upfooterfontcol = document.querySelector(".upfooterfontcol");
let upflexfooter = document.querySelector(".upflexfooter");
let upalignfooter = document.querySelector(".upalignfooter");
let upfooterfontsize = document.querySelector(".upfooterfontsize");
let upfooterwidth = document.querySelector(".upfooterwidth");
let upfooterpos = document.querySelector(".upfooterpos");
let upfooterpadding = document.querySelector(".upfooterpadding");
let upfooterradius = document.querySelector(".upfooterradius");

updateCustomTheme.addEventListener("click", async function () {
    try {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        const endpoint = `/api/v1/customTheme/updateCustomTheme/${customid}`
        await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                navpos: uppos.innerText,
                navfontsize: upfontsize.innerText,
                navfontfam: upfontfam.innerText,
                navvisibility: upvisibility.innerText,
                hamnav: uphamnav.innerText,
                navheight: upheight.innerText,
                navwidth: upwidth.innerText,
                navcontentpos: upcontentpos.innerText,
                navbackcol: upbackcol.innerText,
                navcol: upcol.innerText,
                covpos: upcovpos.innerText,
                covfilter: upcovfilter.innerText,
                covfilterper: upcovfilterper.innerText,
                covstyle: upcovstyle.innerText,
                covvisibility: upcovvisibility.innerText,
                covheight: upcovheight.innerText,
                covwidth: upcovwidth.innerText,
                covimg: upcovimg.innerText,
                bodbackcol: upbodbackcol.innerText,
                bodcol: upbodcol.innerText,
                bodfontfam: upbodfontfam.innerText,
                bodalign: upbodalign.innerText,
                bodfontsize: upbodfontsize.innerText,
                bodwidth: upbodwidth.innerText,
                bodpos: upbodpos.innerText,
                searchvisibility: upsearchvisibility.innerText,
                searchpos: upsearchpos.innerText,
                searchwidth: upsearchwidth.innerText,
                searchcol: upsearchcol.innerText,
                itembackcol: upitembackcol.innerText,
                itemfontcol: upitemfontcol.innerText,
                flexitem: upflexitem.innerText,
                alignitem: upalignitem.innerText,
                itemfontsize: upitemfontsize.innerText,
                itemwidth: upitemwidth.innerText,
                itempos: upitempos.innerText,
                buttonbackcol: upbuttonbackcol.innerText,
                buttoncol: upbuttoncol.innerText,
                buttonradius: upbuttonradius.innerText,
                itemmargin: upitemmargin.innerText,
                orderbackcol: uporderbackcol.innerText,
                orderfontcol: uporderfontcol.innerText,
                flexorder: upflexorder.innerText,
                alignorder: upalignorder.innerText,
                orderfontsize: uporderfontsize.innerText,
                orderwidth: uporderwidth.innerText,
                orderpos: uporderpos.innerText,
                ordermargin: upordermargin.innerText,
                // buttonbackcol: upbuttonbackcol.innerText,
                // buttoncol: upbuttoncol.innerText,
                // buttonradius: upbuttonradius.innerText,
                footerbackcol: upfooterbackcol.innerText,
                footerfontcol: upfooterfontcol.innerText,
                flexfooter: upflexfooter.innerText,
                alignfooter: upalignfooter.innerText,
                footerfontsize: upfooterfontsize.innerText,
                footerwidth: upfooterwidth.innerText,
                footerpos: upfooterpos.innerText,
                footerpadding: upfooterpadding.innerText,
                footerradius: upfooterradius.innerText
            })
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 200) {
                successAlert("Theme has been Updated Successfully :)");
            } else {
                console.log(response);
                errorAlert("Invalid input, Duplication Input error!!!")
            }
        })
    }
    catch (err) {
        console.log(err);
        errorAlert('Sorry! Something went wrong', err);
    };
});

let navbartweaksec = document.querySelector(".navbar__tweak__sec");
let covertweaksec = document.querySelector(".cover__tweak__sec");
let bodtweaksec = document.querySelector(".bod__tweak__sec");
let itemtweaksec = document.querySelector(".item__tweak__sec");
let ordertweaksec = document.querySelector(".order__tweak__sec");
let footertweaksec = document.querySelector(".footer__tweak__sec");
let opennavtweak = document.querySelector(".opennavtweak");
let opencovertweak = document.querySelector(".opencovertweak")
let openbodtweak = document.querySelector(".openbodtweak");
let openitemtweak = document.querySelector(".openitemtweak");
let openordertweak = document.querySelector(".openordertweak");
let openfootertweak = document.querySelector(".openfoottweak");


//********************* */
currentsec = window.sessionStorage.getItem("section");

if (currentsec == null) {
    window.sessionStorage.setItem("section", "customnavsec");
}
else if (currentsec == "customnavsec") {
    navbartweaksec.classList.remove("hidden");
    covertweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    location.href = "#displayernavsec";
}
else if (currentsec == "customcovsec") {
    navbartweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    covertweaksec.classList.remove("hidden");
    location.href = "#displayercovsec";
}
else if (currentsec == "custombodsec") {
    navbartweaksec.classList.add("hidden");
    covertweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    bodtweaksec.classList.remove("hidden");
    location.href = "#displayerbodsec";
}
else if (currentsec == "customitemsec"){
    navbartweaksec.classList.add("hidden");
    covertweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    itemtweaksec.classList.remove("hidden");
    location.href = "#displayeritemsec";
}
else if (currentsec == "customordersec"){
    navbartweaksec.classList.add("hidden");
    covertweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    ordertweaksec.classList.remove("hidden");
    location.href = "#displayerordersec";
}
else if (currentsec == "customfootersec"){
    navbartweaksec.classList.add("hidden");
    covertweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.remove("hidden");
    location.href = "#cuscont";
}
else {
    console.log("");
}
//********************** */
opennavtweak.addEventListener("click", () => {
    window.sessionStorage.setItem("section", "customnavsec");
    navbartweaksec.classList.remove("hidden");
    covertweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    location.href = "#displayernavsec";
})

opencovertweak.addEventListener("click", () => {
    window.sessionStorage.setItem("section", "customcovsec");
    navbartweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    covertweaksec.classList.remove("hidden");
    location.href = "#displayercovsec";
});

openbodtweak.addEventListener("click", () => {
    window.sessionStorage.setItem("section", "custombodsec");
    navbartweaksec.classList.add("hidden");
    covertweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    bodtweaksec.classList.remove("hidden");
    location.href = "#displayerbodsec";
});

openitemtweak.addEventListener("click", () => {
    window.sessionStorage.setItem("section", "customitemsec");
    navbartweaksec.classList.add("hidden");
    covertweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    itemtweaksec.classList.remove("hidden");
    location.href = "#displayeritemsec";
});

openordertweak.addEventListener("click", () => {
    window.sessionStorage.setItem("section", "customordersec");
    navbartweaksec.classList.add("hidden");
    covertweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    footertweaksec.classList.add("hidden");
    ordertweaksec.classList.remove("hidden");
    location.href = "#displayerordersec";
});

openfootertweak.addEventListener("click", () => {
    window.sessionStorage.setItem("section", "customfootersec");
    navbartweaksec.classList.add("hidden");
    covertweaksec.classList.add("hidden");
    bodtweaksec.classList.add("hidden");
    itemtweaksec.classList.add("hidden");
    ordertweaksec.classList.add("hidden");
    footertweaksec.classList.remove("hidden");
    location.href = "#cuscont";
});

(function() {
    let footerbackcol = document.querySelector("#footerbackcol");
    let footercol = document.querySelector("#footercol");
    let footerflex = document.querySelector("#footerflex");
    let footeralign = document.querySelector("#footeralign");
    let footerfontsize = document.querySelector("#footerfontsize");
    let footerwidth = document.querySelector("#footerwidth");
    let posfooterleft = document.querySelector(".posfooterleft");
    let posfooterright = document.querySelector(".posfooterright");
    let posfootercenter = document.querySelector(".posfootercenter");
    let footerradius = document.querySelector("#footerradius");

    let footerpadding = document.querySelector("#footerpadding");
    let footersec = document.querySelector(".custom__foot");
    let displayfooter = document.querySelector(".displayer__footer__sec");

    let footerbackcolval = document.querySelector(".footerbackcolval");
    let footerfontcolval = document.querySelector(".footerfontcolval");
    let flexfooterval = document.querySelector(".flexfooterval");
    let alignfooterval = document.querySelector(".alignfooterval");
    let footerfontsizeval = document.querySelector(".footerfontsizeval");
    let footerwidthval = document.querySelector(".footerwidthval");
    let footerposval = document.querySelector(".footerposval");
    let footerpaddingval = document.querySelector(".footerpaddingval");
    let footerradiusval = document.querySelector(".footerradiusval");

    footersec.style.borderRadius = `${footerradiusval.innerText}rem`;

    footerradius.addEventListener("change", () => {
        footersec.style.borderRadius = `${footerradius.value}rem`;
        upfooterradius.innerText = footerradius.value;
    });

    footerpadding.addEventListener("change", () => {
        yourorder.forEach(item => {
            item.style.padding = `${footerpadding.value}px`;
            upfooterpadding.innerText = footerpadding.value;
        })
    })

    if(footerposval.innerText == "left"){
        displayfooter.style.display = "flex";
        displayfooter.style.justifyContent = "left";
    }
    else if (footerposval.innerText == "center"){
        displayfooter.style.display = "flex";
        displayfooter.style.justifyContent = "center";
    }
    else if (footerposval.innerText == "right"){
        displayfooter.style.display = "flex";
        displayfooter.style.justifyContent = "right";
    }
    else{
        console.log("");
    }

    posfooterleft.addEventListener("click", () => {
        upfooterpos.innerText = "left";
        displayfooter.style.display = "flex";
        displayfooter.style.justifyContent = "left";
    })
    
    posfooterright.addEventListener("click", () => {
        upfooterpos.innerText = "right";
        displayfooter.style.display = "flex";
        displayfooter.style.justifyContent = "right";
    })

    posfootercenter.addEventListener("click", () => {
        upfooterpos.innerText = "center";
        displayfooter.style.display = "flex";
        displayfooter.style.justifyContent = "center";
    })

    if (footerwidthval.innerText !== ""){
        let newwidth = footerwidthval.innerText * 1;
        footersec.style.width = newwidth + "vw";
    }

    footerwidth.addEventListener("change", () =>  {
        footersec.style.width = `${footerwidth.value}vw`;
        upfooterwidth.innerText = footerwidth.value;
    })

    if (footerfontsizeval.innerText !== ""){
        let newitemfontsize = footerfontsizeval.innerText * 1
        footersec.style.fontSize = newitemfontsize+`px`
    }

    footerfontsize.addEventListener("change", () => {
        footersec.style.fontSize = `${footerfontsize.value}px`
        upfooterfontsize.innerText = footerfontsize.value;
    })

    footersec.style.backgroundColor = footerbackcolval.innerText;

    footerbackcol.addEventListener("change", () =>  {
        footersec.style.backgroundColor = footerbackcol.value;
        upfooterbackcol.innerText = footerbackcol.value;
    })

    if (footerfontcolval.innerText !== ""){
        footersec.style.color = footerfontcolval.innerText;
    }

    footercol.addEventListener("change", () =>  {
        footersec.style.color = footercol.value;
        upfooterfontcol.innerText = footercol.value;
    })

    if (flexfooterval.innerText == "column"){
        footersec.style.flexDirection = "column"
        if (alignfooterval.innerText == "reverse"){
            footersec.style.flexDirection = "column-reverse"
        }
    }
    else{
        footersec.style.flexDirection = "row"
        if (alignfooterval.innerText == "reverse"){
            footersec.style.flexDirection = "row-reverse"
        }
    }

    footerflex.addEventListener("change", () =>  {
        if (footerflex.value == "column"){
            upflexfooter.innerText = "column";
            footersec.style.flexDirection = "column"
            if (footeralign.value == "reverse"){
                footersec.style.flexDirection = "column-reverse"
            }
        }
        else{
            upflexfooter.innerText = "row";
            footersec.style.flexDirection = "row"
            if (footeralign.value == "reverse"){
                footersec.style.flexDirection = "row-reverse"
            }
        }
    })

    if (alignfooterval.innerText == "reverse"){
        if (flexfooterval.innerText == "column"){
            footersec.style.flexDirection = "column-reverse"
        }
        else{
            footersec.style.flexDirection = "row-reverse"
        }
    }
    else{
        if (flexfooterval.innerText == "column"){
            footersec.style.flexDirection = "column"
        }
        else{
            footersec.style.flexDirection = "row"
        }
    }

    footeralign.addEventListener("change", () =>  {
        if (footeralign.value == "reverse"){
            upalignfooter.innerText = "reverse";
            if (footerflex.value == "column"){
                footersec.style.flexDirection = "column-reverse"
            }
            else{
                footersec.style.flexDirection = "row-reverse"
            }
        }
        else{
            upalignfooter.innerText = "normal";
            if (footerflex.value == "column"){
                footersec.style.flexDirection = "column"
            }
            else{
                footersec.style.flexDirection = "row"
            }
        }
    })

    let newmargin = footerpaddingval.innerText * 1;
    footersec.style.margin = newmargin + "px";

})();

(function() {
    let orderbackcol = document.querySelector("#orderbackcol");
    let ordercol = document.querySelector("#ordercol");
    let orderflex = document.querySelector("#orderflex");
    let orderalign = document.querySelector("#orderalign");
    let orderfontsize = document.querySelector("#orderfontsize");
    let orderwidth = document.querySelector("#orderwidth");
    let posorderleft = document.querySelector(".posorderleft");
    let posorderright = document.querySelector(".posorderright");
    let posordercenter = document.querySelector(".posordercenter");
    // let buttonbackcol = document.querySelector("#buttonbackcol");
    // let buttonradius = document.querySelector("#buttonradius");
    // let buttoncol = document.querySelector("#buttoncol");
    let ordermargin = document.querySelector("#ordermargin");
    let ordersec = document.querySelector(".custom__ord__sec");
    let yourorder = document.querySelectorAll(".allorders");

    let orderbackcolval = document.querySelector(".orderbackcolval");
    let orderfontcolval = document.querySelector(".orderfontcolval");
    let flexorderval = document.querySelector(".flexorderval");
    let alignorderval = document.querySelector(".alignorderval");
    let orderfontsizeval = document.querySelector(".orderfontsizeval");
    let orderwidthval = document.querySelector(".orderwidthval");
    let orderposval = document.querySelector(".orderposval");
    let ordermarginval = document.querySelector(".ordermarginval");
    // let buttonbackcolval = document.querySelector(".buttonbackcolval");
    // let buttoncolval = document.querySelector(".buttoncolval");
    // let buttonradiusval = document.querySelector(".buttonradiusval");



    ordermargin.addEventListener("change", () => {
        yourorder.forEach(item => {
            item.style.margin = `${ordermargin.value}px`;
            upordermargin.innerText = ordermargin.value;
        })
    })

    if(orderposval.innerText == "left"){
        ordersec.style.justifyContent = "left";
        yourorder.forEach(item => {
            item.style.margin = "10px";
        })
        if (flexorderval.value == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "flex-start"
        }
    }
    else if (orderposval.innerText == "center"){
        ordersec.style.justifyContent = "center";
        yourorder.forEach(item => {
            item.style.margin = "10px";
        })
        if (flexorderval.innerText == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "center"
        }
    }
    else if (orderposval.innerText == "right"){
        ordersec.style.justifyContent = "right";
        yourorder.forEach(item => {
            item.style.margin = "10px";
        })
        if (flexorderval.innerText == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "flex-end"
        }
    }
    else{
        console.log("");
    }

    posorderleft.addEventListener("click", () => {
        uporderpos.innerText = "left";
        ordersec.style.justifyContent = "left";
        yourorder.forEach(item => {
            item.style.margin = "10px";
        })
        if (orderflex.value == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "flex-start"
        }
    })
    
    posorderright.addEventListener("click", () => {
        uporderpos.innerText = "right";
        ordersec.style.justifyContent = "right";
        yourorder.forEach(item => {
            item.style.margin = "10px";
        })
        if (orderflex.value == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "flex-end"
        }
    })

    posordercenter.addEventListener("click", () => {
        uporderpos.innerText = "center";
        ordersec.style.justifyContent = "center";
        yourorder.forEach(item => {
            item.style.margin = "10px";
        })
        if (orderflex.value == "column"){
            ordersec.style.marginLeft = "auto";
            ordersec.style.marginRight = "0";
            ordersec.style.alignItems = "center"
        }
    })

    yourorder.forEach(item => {
        if (orderwidthval.innerText !== ""){
            let newwidth = orderwidthval.innerText * 1;
            item.style.width = newwidth + "vw";
        }
    })

    orderwidth.addEventListener("change", () =>  {
        yourorder.forEach(item => {
            item.style.width = `${orderwidth.value}vw`;
            uporderwidth.innerText = orderwidth.value;
        })
    })

    if  (orderfontsizeval.innerText !== ""){
        let newitemfontsize = orderfontsizeval.innerText * 1
        ordersec.style.fontSize = newitemfontsize+`px`
    }


    orderfontsize.addEventListener("change", () => {
        ordersec.style.fontSize = `${orderfontsize.value}px`
        uporderfontsize.innerText = orderfontsize.value;
    })

    yourorder.forEach(item => {
        item.style.backgroundColor = orderbackcolval.innerText;
    })

    orderbackcol.addEventListener("change", () =>  {
        yourorder.forEach(item => {
            item.style.backgroundColor = orderbackcol.value;
            uporderbackcol.innerText = orderbackcol.value;
        })
    })

    yourorder.forEach(item => {
        item.style.color = orderfontcolval.innerText;
    })

    ordercol.addEventListener("change", () =>  {
        yourorder.forEach(item => {
            item.style.color = ordercol.value;
            uporderfontcol.innerText = ordercol.value;
        })
    })

    if (flexorderval.innerText == "column"){
        ordersec.style.flexDirection = "column"
        if (alignorderval.innerText == "reverse"){
            ordersec.style.flexDirection = "column-reverse"
        }
    }
    else{
        ordersec.style.flexDirection = "row"
        if (alignorderval.innerText == "reverse"){
            ordersec.style.flexDirection = "row-reverse"
        }
    }

    orderflex.addEventListener("change", () =>  {
        if (orderflex.value == "column"){
            upflexorder.innerText = "column";
            ordersec.style.flexDirection = "column"
            if (orderalign.value == "reverse"){
                ordersec.style.flexDirection = "column-reverse"
            }
        }
        else{
            upflexorder.innerText = "row";
            ordersec.style.flexDirection = "row"
            if (orderalign.value == "reverse"){
                ordersec.style.flexDirection = "row-reverse"
            }
        }
    })

    if (alignorderval.innerText == "reverse"){
        if (flexorderval.innerText == "column"){
            ordersec.style.flexDirection = "column-reverse"
        }
        else{
            ordersec.style.flexDirection = "row-reverse"
        }
    }
    else{
        if (flexorderval.innerText == "column"){
            ordersec.style.flexDirection = "column"
        }
        else{
            ordersec.style.flexDirection = "row"
        }
    }

    orderalign.addEventListener("change", () =>  {
        if (orderalign.value == "reverse"){
            upalignorder.innerText = "reverse";
            if (orderflex.value == "column"){
                ordersec.style.flexDirection = "column-reverse"
            }
            else{
                ordersec.style.flexDirection = "row-reverse"
            }
        }
        else{
            upalignorder.innerText = "normal";
            if (orderflex.value == "column"){
                ordersec.style.flexDirection = "column"
            }
            else{
                ordersec.style.flexDirection = "row"
            }
        }
    })

    yourorder.forEach(item => {
        let newmargin = ordermarginval.innerText * 1;
        item.style.margin = newmargin + "px";
    })

})();

(function() {
    let itembackcol = document.querySelector("#itembackcol");
    let itemcol = document.querySelector("#itemcol");
    let itemflex = document.querySelector("#itemflex");
    let itemalign = document.querySelector("#itemalign");
    let itemfontsize = document.querySelector("#itemfontsize");
    let itemwidth = document.querySelector("#itemwidth");
    let positemleft = document.querySelector(".positemleft");
    let positemright = document.querySelector(".positemright");
    let positemcenter = document.querySelector(".positemcenter");
    let buttonbackcol = document.querySelector("#buttonbackcol");
    let buttonradius = document.querySelector("#buttonradius");
    let buttoncol = document.querySelector("#buttoncol");
    let itemmargin = document.querySelector("#itemmargin");
    let allbtn = document.querySelectorAll(".custom__btn");
    let yourprod = document.querySelectorAll(".custom__bod__prod");
    let prodsec = document.querySelector(".custom__prod");

    let itembackcolval = document.querySelector(".itembackcolval");
    let itemfontcolval = document.querySelector(".itemfontcolval");
    let flexitemval = document.querySelector(".flexitemval");
    let alignitemval = document.querySelector(".alignitemval");
    let itemfontsizeval = document.querySelector(".itemfontsizeval");
    let itemwidthval = document.querySelector(".itemwidthval");
    let itemposval = document.querySelector(".itemposval");
    let buttonbackcolval = document.querySelector(".buttonbackcolval");
    let buttoncolval = document.querySelector(".buttoncolval");
    let buttonradiusval = document.querySelector(".buttonradiusval");
    let itemmarginval = document.querySelector(".itemmarginval");

    allbtn.forEach(item => {
        item.style.backgroundColor = buttonbackcolval.innerText;
    })

    buttonbackcol.addEventListener("change", () => {
        allbtn.forEach(item => {
            item.style.backgroundColor = buttonbackcol.value;
            upbuttonbackcol.innerText = buttonbackcol.value;
        })
    })

    allbtn.forEach(item => {
        item.style.color = buttoncolval.innerText;
        item.style.borderColor = buttoncolval.innerText;
    })

    buttoncol.addEventListener("change", () => {
        allbtn.forEach(item => {
            item.style.color = buttoncol.value;
            item.style.borderColor = buttoncol.value;
            upbuttoncol.innerText = buttoncol.value;
        })
    })

    allbtn.forEach(item => {
        item.style.borderRadius = `${buttonradiusval.innerText}rem`;
    })

    buttonradius.addEventListener("change", () => {
        allbtn.forEach(item => {
            item.style.borderRadius = `${buttonradius.value}rem`;
            upbuttonradius.innerText = buttonradius.value;
        })
    });

    itemmargin.addEventListener("change", () => {
        yourprod.forEach(item => {
            item.style.margin = `${itemmargin.value}px`;
            upitemmargin.innerText = itemmargin.value;
        })
    })

    if(itemposval.innerText == "left"){
        prodsec.style.justifyContent = "left";
        yourprod.forEach(item => {
            item.style.margin = "10px";
        })
        if (flexitemval.value == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "flex-start"
        }
    }
    else if (itemposval.innerText == "center"){
        prodsec.style.justifyContent = "center";
        yourprod.forEach(item => {
            item.style.margin = "10px";
        })
        if (flexitemval.innerText == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "center"
        }
    }
    else if (itemposval.innerText == "right"){
        prodsec.style.justifyContent = "right";
        yourprod.forEach(item => {
            item.style.margin = "10px";
        })
        if (flexitemval.innerText == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "flex-end"
        }
    }
    else{
        console.log("");
    }

    positemleft.addEventListener("click", () => {
        upitempos.innerText = "left";
        prodsec.style.justifyContent = "left";
        yourprod.forEach(item => {
            item.style.margin = "10px";
        })
        if (itemflex.value == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "flex-start"
        }
    })
    
    positemright.addEventListener("click", () => {
        upitempos.innerText = "right";
        prodsec.style.justifyContent = "right";
        yourprod.forEach(item => {
            item.style.margin = "10px";
        })
        if (itemflex.value == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "flex-end"
        }
    })

    positemcenter.addEventListener("click", () => {
        upitempos.innerText = "center";
        prodsec.style.justifyContent = "center";
        yourprod.forEach(item => {
            item.style.margin = "10px";
        })
        if (itemflex.value == "column"){
            prodsec.style.marginLeft = "auto";
            prodsec.style.marginRight = "0";
            prodsec.style.alignItems = "center"
        }
    })

    if (itemwidthval.innerText !== ""){
        yourprod.forEach(item => {
            let newwidth = itemwidthval.innerText * 1;
            item.style.width = newwidth + "%";
        })
    }

    itemwidth.addEventListener("change", () =>  {
        yourprod.forEach(item => {
            item.style.width = `${itemwidth.value}%`;
            upitemwidth.innerText = itemwidth.value;
        })
    })

    if (itemfontsizeval.innerText !== ""){
        let newitemfontsize = itemfontsizeval.innerText * 1
        prodsec.style.fontSize = newitemfontsize+`px`
    }
    itemfontsize.addEventListener("change", () => {
        prodsec.style.fontSize = `${itemfontsize.value}px`
        upitemfontsize.innerText = itemfontsize.value;
    })

    yourprod.forEach(item => {
        item.style.backgroundColor = itembackcolval.innerText;
    })

    itembackcol.addEventListener("change", () =>  {
        yourprod.forEach(item => {
            item.style.backgroundColor = itembackcol.value;
            upitembackcol.innerText = itembackcol.value;
        })
    })

    yourprod.forEach(item => {
        item.style.color = itemfontcolval.innerText;
    })

    itemcol.addEventListener("change", () =>  {
        yourprod.forEach(item => {
            item.style.color = itemcol.value;
            upitemfontcol.innerText = itemcol.value;
        })
    })

    if (flexitemval.innerText == "column"){
        prodsec.style.flexDirection = "column"
        if (alignitemval.innerText == "reverse"){
            prodsec.style.flexDirection = "column-reverse"
        }
    }
    else{
        prodsec.style.flexDirection = "row"
        if (alignitemval.innerText == "reverse"){
            prodsec.style.flexDirection = "row-reverse"
        }
    }

    itemflex.addEventListener("change", () =>  {
        if (itemflex.value == "column"){
            upflexitem.innerText = "column";
            prodsec.style.flexDirection = "column"
            if (itemalign.value == "reverse"){
                prodsec.style.flexDirection = "column-reverse"
            }
        }
        else{
            upflexitem.innerText = "row";
            prodsec.style.flexDirection = "row"
            if (itemalign.value == "reverse"){
                prodsec.style.flexDirection = "row-reverse"
            }
        }
    })

    if (alignitemval.innerText == "reverse"){
        if (flexitemval.innerText == "column"){
            prodsec.style.flexDirection = "column-reverse"
        }
        else{
            prodsec.style.flexDirection = "row-reverse"
        }
    }
    else{
        if (flexitemval.innerText == "column"){
            prodsec.style.flexDirection = "column"
        }
        else{
            prodsec.style.flexDirection = "row"
        }
    }

    itemalign.addEventListener("change", () =>  {
        if (itemalign.value == "reverse"){
            upalignitem.innerText = "reverse";
            if (itemflex.value == "column"){
                prodsec.style.flexDirection = "column-reverse"
            }
            else{
                prodsec.style.flexDirection = "row-reverse"
            }
        }
        else{
            upalignitem.innerText = "normal";
            if (itemflex.value == "column"){
                prodsec.style.flexDirection = "column"
            }
            else{
                prodsec.style.flexDirection = "row"
            }
        }
    })

    if (itemmarginval.innerText !== ""){
        yourprod.forEach(item => {
            let newmargin = itemmarginval.innerText * 1;
            item.style.margin = newmargin + "px";
        })
    }
})();

(function () {
    let bodbackcol = document.querySelector("#bodbackcol");
    let bodcol = document.querySelector("#bodcol");
    let bodfontfam = document.querySelector("#bodfontfam");
    let bodalignsec = document.querySelector("#bodalignsec");
    let bodfontsize = document.querySelector("#bodfontsize");
    let bodwidth = document.querySelector("#bodwidth");
    let posbodleft = document.querySelector(".posbodleft");
    let posbodcenter = document.querySelector(".posbodcenter");
    let posbodright = document.querySelector(".posbodright");
    let cusdisplayer = document.querySelector(".custom__displayer");
    let mainboddisplay = document.querySelector(".main__display__bod");
    let boddisplay = document.querySelector("#displayerbodsec");
    let wholesec = document.querySelector(".custom__whole__bod");
    let searchsec = document.querySelector(".search__sec");
    let searchbar = document.querySelector("#searchbar");
    let removesearch = document.querySelector(".removesearch");
    let showsearch = document.querySelector(".showsearch");
    let searchpos = document.querySelector("#searchpos");
    let searchwidth = document.querySelector("#searchwidth");
    let searchcol = document.querySelector("#searchcol");
    let abnoti = document.querySelector(".abnoti");
    let bodhead = document.querySelectorAll(".bodhead");

    let bodbackcolval = document.querySelector(".bodbackcolval");
    let bodcolval = document.querySelector(".bodcolval");
    let bodfontfamval = document.querySelector(".bodfontfamval");
    let bodalignval = document.querySelector(".bodalignval");
    let bodfontsizeval = document.querySelector(".bodfontsizeval");
    let bodwidthval = document.querySelector(".bodwidthval");
    let bodposval = document.querySelector(".bodposval");
    let searchvisibilityval = document.querySelector(".searchvisibilityval");
    let searchposval = document.querySelector(".searchposval");
    let searchwidthval = document.querySelector(".searchwidthval");
    let searchcolval = document.querySelector(".searchcolval");

    if (searchvisibilityval.innerText == "false"){
        searchsec.classList.add("hidden");
        removesearch.classList.add("hidden");
        showsearch.classList.remove("hidden");
    }else{
        showsearch.classList.add("hidden");
        removesearch.classList.remove("hidden");
        searchsec.classList.remove("hidden");
    }

    removesearch.addEventListener("click", () => {
        searchsec.classList.add("hidden");
        removesearch.classList.add("hidden");
        showsearch.classList.remove("hidden");
        upsearchvisibility.innerText = "false";
    })

    showsearch.addEventListener("click", () => {
        showsearch.classList.add("hidden");
        removesearch.classList.remove("hidden");
        searchsec.classList.remove("hidden");
        upsearchvisibility.innerText = "true";
    })

    if (searchwidthval !== ""){
        searchbar.style.width = `${searchwidthval.innerText}%`
    }


    searchwidth.addEventListener("change", () => {
        searchbar.style.width = `${searchwidth.value}%`
        upsearchwidth.innerText = `${searchwidth.value}%`
    })

    searchbar.style.color = searchcolval.innerText;
    searchbar.style.borderBottomColor = searchcolval.innerText;

    searchcol.addEventListener("change", () => {
        searchbar.style.color = searchcol.value;
        searchbar.style.borderBottomColor = searchcol.value
        upsearchcol.innerText = searchcol.value
    })

    if (searchposval.innerText == "absolute"){
        let covvisibilityval = document.querySelector(".covvisibilityval").innerText;
            abnoti.classList.remove("hidden");
            if (covvisibilityval == "true") {
                searchbar.classList.add("hidden");
                abnoti.innerText = "Searchbar will appear on top of coverimage";
            }
            if (upcovvisibility.innerText == "false") {
                abnoti.innerText = "Turn on Cover Image Visibility to use this feature"
                searchbar.classList.add("hidden");
            }
    }else {
        searchbar.classList.remove("hidden")
        abnoti.classList.add("hidden");
    }

    searchpos.addEventListener("change", () => {
        if (searchpos.value == "absolute") {
            let covvisibilityval = document.querySelector(".covvisibilityval").innerText;
            abnoti.classList.remove("hidden");
            upsearchpos.innerText = "absolute"
            if (covvisibilityval == "true") {
                searchbar.classList.add("hidden");
                abnoti.innerText = "Searchbar will appear on top of coverimage";
            }
            if (upcovvisibility.innerText == "false") {
                abnoti.innerText = "Turn on Cover Image Visibility to use this feature"
                searchbar.classList.add("hidden");
            }
        } else {
            searchbar.classList.remove("hidden")
            abnoti.classList.add("hidden");
            upsearchpos.innerText = "relative"
        }
    })

    cusdisplayer.style.backgroundColor = bodbackcolval.innerText;

    bodbackcol.addEventListener("change", () => {
        cusdisplayer.style.backgroundColor = bodbackcol.value;
        upbodbackcol.innerText = bodbackcol.value;
    })

    bodhead.forEach(item => {
        item.style.color = bodcolval.innerText;
    })

    bodcol.addEventListener("change", () => {
        bodhead.forEach(item => {
            item.style.color = bodcol.value;
        })
        upbodcol.innerText = bodcol.value;
    })

    cusdisplayer.style.fontFamily = bodfontfamval.innerText;
    searchbar.style.fontFamily = bodfontfamval.innerText;

    bodfontfam.addEventListener("change", () => {
        cusdisplayer.style.fontFamily = bodfontfam.value;
        searchbar.style.fontFamily = bodfontfamval.innerText;
        upbodfontfam.innerText = bodfontfam.value;
    })

    if (bodalignval.innerText == "reverse") {
        wholesec.style.display = "flex";
        wholesec.style.flexDirection = "column-reverse"
    } else {
        wholesec.style.display = "flex";
        wholesec.style.flexDirection = "column"
    }

    bodalignsec.addEventListener("change", () => {
        if (bodalignsec.value == "normal") {
            wholesec.style.display = "flex";
            wholesec.style.flexDirection = "column"
            upbodalign.innerText = "normal"
        } else {
            wholesec.style.display = "flex";
            wholesec.style.flexDirection = "column-reverse"
            upbodalign.innerText = "reverse"
        }
    })

    if (bodfontsizeval.innerText !== ""){
        bodhead.forEach(item => {
            item.style.fontSize = `${bodfontsizeval.innerText}px`;
        })
    }

    bodfontsize.addEventListener("change", () => {
        bodhead.forEach(item => {
            item.style.fontSize = `${bodfontsize.value}px`;
        })
        upbodfontsize.innerText = bodfontsize.value;
    })

    boddisplay.style.width = `${bodwidthval.innerText}%`;

    bodwidth.addEventListener("change", () => {
        boddisplay.style.width = `${bodwidth.value}%`;
        upbodwidth.innerText = `${bodwidth.value}`
    })

    if (bodposval.innerText == "left"){
        mainboddisplay.style.display = "flex";
        mainboddisplay.style.justifyContent = "left";
    }
    else if (bodposval.innerText == "center"){
        mainboddisplay.style.display = "flex";
        mainboddisplay.style.justifyContent = "center"
    }
    else if (bodposval.innerText == "right"){
        mainboddisplay.style.display = "flex";
        mainboddisplay.style.justifyContent = "right"
    }
    else{
        console.log("**********")
    }

    posbodleft.addEventListener("click", () => {
        mainboddisplay.style.display = "flex";
        mainboddisplay.style.justifyContent = "left";
        upbodpos.innerText = "left";
    })

    posbodcenter.addEventListener("click", () => {
        mainboddisplay.style.display = "flex";
        mainboddisplay.style.justifyContent = "center"
        upbodpos.innerText = "center";
    })

    posbodright.addEventListener("click", () => {
        mainboddisplay.style.display = "flex";
        mainboddisplay.style.justifyContent = "right"
        upbodpos.innerText = "right";
    })
})();

(function () {
    let covposright = document.querySelector(".poscovright");
    let covposleft = document.querySelector(".poscovleft");
    let covposcenter = document.querySelector('.poscovcenter');
    let covpostop = document.querySelector(".poscovtop");
    let covposbottom = document.querySelector(".poscovbottom");
    let backpicsec = document.querySelector(".custom__back__img");
    let covpic = document.querySelector('.custom__cov');
    let covheight = document.querySelector("#coverheight");
    let covwidth = document.querySelector("#coverwidth");
    let covfilter = document.querySelector("#covfilter");
    let covstyle = document.querySelector("#covstyle");
    let removecovpic = document.querySelector(".removecoverpic");
    let showcovpic = document.querySelector(".showcoverpic");
    let doodlecov = document.querySelector(".doodlecov");
    let redbluecov = document.querySelector(".redbluecov");
    let magcov = document.querySelector(".magcov");
    let neoncov = document.querySelector(".neoncov");
    let covfilterper = document.querySelector('#coverfilterper');
    let covfilterpx = document.querySelector('#coverfilterpx');
    let filterhead = document.querySelector(".filter__header");
    let covposval = document.querySelector(".covposval").innerText;
    let covfilterval = document.querySelector(".covfilterval").innerText;
    let covfilterperval = document.querySelector(".covfilterperval").innerText;
    let covstyleval = document.querySelector(".covstyleval").innerText;
    let covvisibilityval = document.querySelector(".covvisibilityval").innerText;
    let covheightval = document.querySelector(".covheightval").innerText;
    let covwidthval = document.querySelector(".covwidthval").innerText;
    let covpicval = document.querySelector(".covimgval").innerText;

    //*************************** */
    if (covposval == "right") {
        backpicsec.style.justifyContent = "right";
        backpicsec.style.alignItems = "";
    }
    else if (covposval == "left") {
        backpicsec.style.justifyContent = "left";
        backpicsec.style.alignItems = "";
    }
    else if (covposval == "center") {
        backpicsec.style.justifyContent = "center";
        backpicsec.style.alignItems = "";
    }
    else if (covposval == "top") {
        backpicsec.style.justifyContent = "";
        backpicsec.style.alignItems = "flex-start";
    }
    else if (covposval == "bottom") {
        backpicsec.style.justifyContent = "";
        backpicsec.style.alignItems = "flex-end";
    } else {
        console.log("")
    }

    if (covstyleval == "none") {
        covpic.style.clipPath = "none"
    }
    else if (covstyleval == "triangle") {
        covpic.style.clipPath = `polygon(50% 0%, 0% 100%, 100% 100%)`
        covpic.style.webkitClipPath = " polygon(50% 0%, 0% 100%, 100% 100%)"
    }
    else if (covstyleval == "parallel") {
        covpic.style.clipPath = `polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)`
        covpic.style.webkitClipPath = "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)"
    }
    else if (covstyleval == "star") {
        covpic.style.clipPath = `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`
        covpic.style.webkitClipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
    }
    else if (covstyleval == "circle") {
        covpic.style.clipPath = `circle(50% at 50% 50%)`
        covpic.style.webkitClipPath = "circle(50% at 50% 50%)"
    }
    else if (covstyleval == "crack") {
        covpic.style.clipPath = `polygon(20% 0%, 58% 68%, 100% 20%, 66% 71%, 80% 100%, 43% 63%, 0% 80%, 41% 55%)`
        covpic.style.webkitClipPath = "polygon(20% 0%, 58% 68%, 100% 20%, 66% 71%, 80% 100%, 43% 63%, 0% 80%, 41% 55%)"
    }
    else if (covstyleval == "rhombus") {
        covpic.style.clipPath = `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`
        covpic.style.webkitClipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
    }
    else {
        console.log("");
    }

    if (covfilterperval > 10) {
        if (covfilterval == "grayscale") {
            covpic.style.filter = `grayscale(${covfilterperval}%)`
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Grayscale %"
        }
        else if (covfilterval == "opacity") {
            covpic.style.filter = `opacity(${covfilterperval}%)`
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Opacity %"
        }
        else if (covfilterval == "saturate") {
            covpic.style.filter = `saturate(${covfilterperval}%)`
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Saturation %"
        }
        else if (covfilterval == "invert") {
            covpic.style.filter = `invert(${covfilterperval}%)`
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Invert %"
        }
        else if (covfilterval == "contrast") {
            covpic.style.filter = `contrast(${covfilterperval}%)`
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Contrast %"
        }
        else {
            console.log("");
        }
    }
    else {
        covpic.style.filter = `blur(${covfilterperval}px)`
        covfilterpx.classList.remove("hidden");
        covfilterper.classList.add("hidden");
        filterhead.classList.remove("hidden");
        filterhead.innerText = "Blur px"
    }

    if (covfilterval == "none") {
        covpic.style.filter = "none"
        covfilterper.classList.add("hidden");
        covfilterpx.classList.add("hidden");
        filterhead.classList.add("hidden");
    }

    if (covvisibilityval == "false") {
        backpicsec.classList.add("hidden");
        removecovpic.classList.add("hidden");
        showcovpic.classList.remove("hidden");
    } else {
        backpicsec.classList.remove("hidden");
        removecovpic.classList.remove("hidden");
        showcovpic.classList.add("hidden");
    }

    if (covheightval !== "") {
        covpic.style.height = `${covheightval}%`
    }

    if (covwidthval !== "") {
        covpic.style.width = `${covwidthval}%`
    }

    if (covpicval == "doodle") {
        covpic.src = "/images/doodle.jpg"
    }
    else if (covpicval == "redblue") {
        covpic.src = "/images/redblue.jpg"
    }
    else if (covpicval == "mag") {
        covpic.src = "/images/mag.jpg"
    }
    else if (covpicval == "neon") {
        covpic.src = "/images/neon.jpg"
    }
    else {
        if (covpicval !== "" || covpicval.length !== 0){
            covpic.src = covpicval
        }
    }

    //************************ */

    doodlecov.addEventListener("click", () => {
        covpic.src = "/images/doodle.jpg"
        upcovimg.innerText = "doodle"
    })

    redbluecov.addEventListener("click", () => {
        covpic.src = "/images/redblue.jpg"
        upcovimg.innerText = "redblue"
    })

    magcov.addEventListener("click", () => {
        covpic.src = "/images/mag.jpg"
        upcovimg.innerText = "mag"
    })

    neoncov.addEventListener("click", () => {
        covpic.src = "/images/neon.jpg"
        upcovimg.innerText = "neon"
    })

    removecovpic.addEventListener("click", () => {
        backpicsec.classList.add("hidden");
        removecovpic.classList.add("hidden");
        showcovpic.classList.remove("hidden");
        upcovvisibility.innerText = "false"
    })

    showcovpic.addEventListener("click", () => {
        backpicsec.classList.remove("hidden");
        removecovpic.classList.remove("hidden");
        showcovpic.classList.add("hidden");
        upcovvisibility.innerText = "true"
    })

    covstyle.addEventListener("change", () => {
        if (covstyle.value == "none") {
            covpic.style.clipPath = "none"
            upcovstyle.innerText = "none"
        }
        else if (covstyle.value == "triangle") {
            covpic.style.clipPath = `polygon(50% 0%, 0% 100%, 100% 100%)`
            covpic.style.webkitClipPath = " polygon(50% 0%, 0% 100%, 100% 100%)"
            upcovstyle.innerText = "triangle"
        }
        else if (covstyle.value == "parallel") {
            covpic.style.clipPath = `polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)`
            covpic.style.webkitClipPath = "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)"
            upcovstyle.innerText = "parallel"
        }
        else if (covstyle.value == "star") {
            covpic.style.clipPath = `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`
            covpic.style.webkitClipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
            upcovstyle.innerText = "star"
        }
        else if (covstyle.value == "circle") {
            covpic.style.clipPath = `circle(50% at 50% 50%)`
            covpic.style.webkitClipPath = "circle(50% at 50% 50%)"
            upcovstyle.innerText = "circle"
        }
        else if (covstyle.value == "crack") {
            covpic.style.clipPath = `polygon(20% 0%, 58% 68%, 100% 20%, 66% 71%, 80% 100%, 43% 63%, 0% 80%, 41% 55%)`
            covpic.style.webkitClipPath = "polygon(20% 0%, 58% 68%, 100% 20%, 66% 71%, 80% 100%, 43% 63%, 0% 80%, 41% 55%)"
            upcovstyle.innerText = "crack"
        }
        else if (covstyle.value == "rhombus") {
            covpic.style.clipPath = `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`
            covpic.style.webkitClipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
            upcovstyle.innerText = "rhombus"
        }
        else {
            console.log("");
        }
    })

    covfilter.addEventListener("change", () => {
        if (covfilter.value == "none") {
            covpic.style.filter = "none"
            covfilterper.classList.add("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.add("hidden");
            upcovfilter.innerText = "none"
        }
        else if (covfilter.value == "grayscale") {
            covpic.style.filter = `grayscale(100%)`
            upcovfilterper.innerText = "100"
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Graydcale %"
            upcovfilter.innerText = "grayscale"
        }
        else if (covfilter.value == "blur") {
            covpic.style.filter = `blur(5px)`
            upcovfilterper.innerText = "5"
            covfilterpx.classList.remove("hidden");
            covfilterper.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Blur px"
            upcovfilter.innerText = "blur"
        }
        else if (covfilter.value == "opacity") {
            covpic.style.filter = `opacity(40%)`
            upcovfilterper.innerText = "40"
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Opacity %"
            upcovfilter.innerText = "opacity"
        }
        else if (covfilter.value == "saturate") {
            covpic.style.filter = `saturate(50%)`
            upcovfilterper.innerText = "50"
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Saturation %"
            upcovfilter.innerText = "saturate"
        }
        else if (covfilter.value == "invert") {
            covpic.style.filter = `invert(100%)`
            upcovfilterper.innerText = "100"
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Invert %"
            upcovfilter.innerText = "invert"
        }
        else if (covfilter.value == "contrast") {
            covpic.style.filter = `contrast(50%)`
            upcovfilterper.innerText = "50"
            covfilterper.classList.remove("hidden");
            covfilterpx.classList.add("hidden");
            filterhead.classList.remove("hidden");
            filterhead.innerText = "Contrast %"
            upcovfilter.innerText = "contrast"
        }
        else {
            console.log("");
        }
    })

    covfilterper.addEventListener("change", () => {
        if (covfilter.value == "grayscale") {
            covpic.style.filter = `grayscale(${covfilterper.value}%)`
            upcovfilterper.innerText = covfilterper.value;

        }
        else if (covfilter.value == "opacity") {
            covpic.style.filter = `opacity(${covfilterper.value}%)`
            upcovfilterper.innerText = covfilterper.value;
        }
        else if (covfilter.value == "saturate") {
            covpic.style.filter = `saturate(${covfilterper.value}%)`
            upcovfilterper.innerText = covfilterper.value;
        }
        else if (covfilter.value == "invert") {
            covpic.style.filter = `invert(${covfilterper.value}%)`
            upcovfilterper.innerText = covfilterper.value;
        }
        else if (covfilter.value == "contrast") {
            covpic.style.filter = `contrast(${covfilterper.value}%)`
            upcovfilterper.innerText = covfilterper.value;
        }
        else {
            console.log("");
        }
    })

    covfilterpx.addEventListener("change", () => {
        covpic.style.filter = `blur(${covfilterpx.value}px)`
        upcovfilterper.innerText = covfilterpx.value;
    })

    covposright.addEventListener("click", () => {
        backpicsec.style.justifyContent = "right";
        backpicsec.style.alignItems = "";
        upcovpos.innerText = "right"
    })

    covposleft.addEventListener("click", () => {
        backpicsec.style.justifyContent = "left";
        backpicsec.style.alignItems = "";
        upcovpos.innerText = "left"
    })

    covposcenter.addEventListener("click", () => {
        backpicsec.style.justifyContent = "center";
        backpicsec.style.alignItems = "";
        upcovpos.innerText = "center"
    })

    covpostop.addEventListener("click", () => {
        backpicsec.style.justifyContent = "";
        backpicsec.style.alignItems = "flex-start";
        upcovpos.innerText = "top"
    })

    covposbottom.addEventListener("click", () => {
        backpicsec.style.justifyContent = "";
        backpicsec.style.alignItems = "flex-end";
        upcovpos.innerText = "bottom"
    })

    covheight.addEventListener("change", () => {
        covpic.style.height = `${covheight.value}%`
        upcovheight.innerText = covheight.value;
    })

    covwidth.addEventListener("change", () => {
        covpic.style.width = `${covwidth.value}%`
        upcovwidth.innerText = covwidth.value;
    })

})();

(function () {
    let navheight = document.querySelector("#cusnavheight");
    let navwidth = document.querySelector("#cusnavwidth");
    let navbar = document.querySelector(".custom__nav__inside");
    let navpos = document.querySelectorAll(".inptpos");
    let navsec = document.querySelector(".custom__nav");
    let backcol = document.querySelector("#cusnavbackcol");
    let fontcol = document.querySelector("#cusnavcol");
    let anc = document.querySelectorAll('.cusanc');
    let rightnav = document.querySelector(".posnavbarright");
    let leftnav = document.querySelector(".posnavbarleft");
    let topnav = document.querySelector(".posnavbartop");
    let bottomnav = document.querySelector(".posnavbarbottom");
    let vertheight = document.querySelector("#cusnavheightvert");
    let vertwidth = document.querySelector("#cusnavwidthvert");
    let innavleft = document.querySelector("#navleft");
    let innavright = document.querySelector("#navright");
    let verttop = document.querySelector("#verttop");
    let vertbottom = document.querySelector("#vertbottom");
    let vertcent = document.querySelector("#navcentervert");
    let innavcent = document.querySelector("#navcenter");
    let leflab = document.querySelector(".leftlabel");
    let rightlab = document.querySelector(".rightlabel");
    let toplab = document.querySelector(".toplabel");
    let bottomlab = document.querySelector(".bottomlabel");
    let contsec = document.querySelector("#cuscont");
    let removenav = document.querySelector(".removenavbar")
    let shownav = document.querySelector(".shownavbar")
    let fontsize = document.querySelector("#cusfontsize");
    let fontfam = document.querySelector("#cusfontfam");
    let hamnavsec = document.querySelector(".hamnav__sec");
    let hamnav = document.querySelector("#hamnav");
    let hamicon = document.querySelector(".custom__ham");
    let haminside = document.querySelector(".custom__ham__inside");
    let closeham = document.querySelector(".close__ham");


    let posval = document.querySelector(".navposval").innerText;
    let fontsizeval = document.querySelector(".navfontsizeval").innerText;
    let fontfamval = document.querySelector(".navfontfamval").innerText;
    let visibilityval = document.querySelector(".navvisibilityval").innerText
    let hamnavval = document.querySelector(".hamnavval").innerText;
    let heightval = document.querySelector(".navheightval").innerText;
    let widthval = document.querySelector(".navwidthval").innerText;
    let contentval = document.querySelector(".navcontentposval").innerText;
    let backcolval = document.querySelector(".navbackcolval").innerText;
    let colval = document.querySelector(".navcolval").innerText;

    // ****************************
    navbar.style.fontSize = `${fontsizeval}px`;
    navbar.style.fontFamily = fontfamval;
    navbar.style.backgroundColor = backcolval;
    navbar.style.color = colval;
    anc.forEach(item => {
        item.style.color = colval;
    })

    if (visibilityval == "none") {
        navsec.classList.add("hidden");
        hamnavsec.classList.remove("hidden");
        if (hamnav.checked == true) {
            hamicon.classList.remove("hidden");
        } else {
            hamicon.classList.add("hidden");
        }
        removenav.classList.add("hidden");
        shownav.classList.remove("hidden");
    }

    if (navsec.classList.contains("hidden")) {
        hamicon.style.display = hamnavval;
    }

    if (contentval == "CenterVert") {
        navsec.style.alignItems = "center"
        navsec.style.top = "";
    }
    else {
        navsec.style.justifyContent = contentval;
    }

    if (posval === "right") {
        navsec.style.position = "absolute"
        navsec.style.right = "14%"
        navsec.style.left = ""
        navsec.style.top = "6%"
        navsec.style.alignItems = "center"
        navsec.style.justifyContent = "right"
        navsec.style.height = "48vh"
        navsec.style.width = "9%"
        navbar.style.flexDirection = "column"
        navbar.style.height = "100%";
        navheight.classList.add("hidden");
        navwidth.classList.add("hidden");
        vertheight.classList.remove("hidden");
        vertwidth.classList.remove("hidden");
        innavleft.classList.add("hidden");
        innavright.classList.add("hidden");
        innavcent.classList.add("hidden");
        vertcent.classList.remove("hidden");
        verttop.classList.remove("hidden");
        vertbottom.classList.remove("hidden");
        leflab.classList.add("hidden");
        rightlab.classList.add("hidden");
        toplab.classList.remove("hidden");
        bottomlab.classList.remove("hidden");
        if (contentval == "Topper") {
            navsec.style.top = "6%"
            navsec.style.alignItems = "";
        }
        else if (contentval == "Buttom") {
            navsec.style.top = "6%"
            navsec.style.alignItems = "flex-end";
        }
        else {
            console.log("")
        }
    }
    else if (posval === "left") {
        navsec.style.position = "absolute"
        navsec.style.left = "14%"
        navsec.style.right = ""
        navsec.style.top = "6%"
        navsec.style.width = "9%"
        navsec.style.alignItems = "center"
        navsec.style.justifyContent = "left"
        navsec.style.height = "48vh"
        navbar.style.flexDirection = "column"
        navbar.style.height = "100%"
        navheight.classList.add("hidden");
        navwidth.classList.add("hidden");
        vertheight.classList.remove("hidden");
        vertwidth.classList.remove("hidden");
        innavleft.classList.add("hidden");
        innavright.classList.add("hidden");
        innavcent.classList.add("hidden");
        vertcent.classList.remove("hidden");
        verttop.classList.remove("hidden");
        vertbottom.classList.remove("hidden");
        leflab.classList.add("hidden");
        rightlab.classList.add("hidden");
        toplab.classList.remove("hidden");
        bottomlab.classList.remove("hidden");
        if (contentval == "Topper") {
            navsec.style.top = "6%"
            navsec.style.alignItems = "";
        }
        else if (contentval == "Buttom") {
            navsec.style.top = "6%"
            navsec.style.alignItems = "flex-end";
        }
        else {
            console.log("")
        }
    }
    else if (posval === "top") {
        navsec.style.position = ""
        navsec.style.right = ""
        navsec.style.left = ""
        navsec.style.top = ""
        navsec.style.bottom = ""
        navsec.style.width = ""
        navsec.style.height = ""
        navbar.style.flexDirection = ""
        navsec.style.justifyContent = ""
        navsec.style.alignItems = ""
        navheight.classList.remove("hidden");
        navwidth.classList.remove("hidden");
        vertheight.classList.add("hidden");
        vertwidth.classList.add("hidden");
        innavleft.classList.remove("hidden");
        innavright.classList.remove("hidden");
        innavcent.classList.remove("hidden");
        vertcent.classList.add("hidden");
        verttop.classList.add("hidden");
        vertbottom.classList.add("hidden");
        leflab.classList.remove("hidden");
        rightlab.classList.remove("hidden");
        toplab.classList.add("hidden");
        bottomlab.classList.add("hidden");
    }
    else if (posval === 'bottom') {
        contsec.style.paddingBottom = "4em"
        navsec.style.position = "absolute"
        navsec.style.bottom = "46%"
        navsec.style.top = "48%"
        navsec.style.width = "71.9%"
        navsec.style.right = ""
        navsec.style.left = ""
        navsec.style.height = ""
        navbar.style.flexDirection = ""
        if (!heightval) {
            navbar.style.height = ""
        }
        if (!widthval) {
            navbar.style.width = ""
        }
        navsec.style.justifyContent = ""
        navsec.style.alignItems = "flex-end"
        navheight.classList.remove("hidden");
        navwidth.classList.remove("hidden");
        vertheight.classList.add("hidden");
        vertwidth.classList.add("hidden");
        innavleft.classList.remove("hidden");
        innavright.classList.remove("hidden");
        innavcent.classList.remove("hidden");
        vertcent.classList.add("hidden");
        verttop.classList.add("hidden");
        vertbottom.classList.add("hidden");
        leflab.classList.remove("hidden");
        rightlab.classList.remove("hidden");
        toplab.classList.add("hidden");
        bottomlab.classList.add("hidden");
    }
    else {
        console.log("default")
    }

    if (heightval !== "") {
        navbar.style.height = heightval;
    }

    if (widthval !== "") {
        navbar.style.width = widthval;
    }


    // *****************

    fontsize.addEventListener("mouseup", () => {
        let font = fontsize.value
        navbar.style.fontSize = `${font}px`
        upfontsize.innerText = font;
    })

    fontfam.addEventListener("change", () => {
        let font = fontfam.value
        navbar.style.fontFamily = font
        upfontfam.innerText = fontfam.value;
    })

    navheight.addEventListener("mouseup", () => {
        let height = navheight.value
        navbar.style.height = `${height}em`
        upheight.innerText = `${height}em`
    })

    navwidth.addEventListener("mouseup", () => {
        let width = navwidth.value
        navbar.style.width = `${width}%`
        upwidth.innerText = `${width}%`
    })

    vertheight.addEventListener("mouseup", () => {
        let height = vertheight.value
        navbar.style.height = `${height}%`
        upheight.innerText = `${height}%`
    })

    vertwidth.addEventListener("mouseup", () => {
        let width = vertwidth.value
        navbar.style.width = `${width}em`
        upwidth.innerText = `${width}em`
    })

    navpos.forEach(item => {
        item.addEventListener("click", () => {
            if (item.value == "Topper") {
                navsec.style.top = "6%"
                navsec.style.alignItems = "";
                upcontentpos.innerText = item.value
            }
            else if (item.value == "Buttom") {
                navsec.style.top = "6%"
                navsec.style.alignItems = "flex-end";
                upcontentpos.innerText = item.value
            }
            else if (item.value == "CenterVert") {
                navsec.style.alignItems = "center"
                navsec.style.top = "";
                upcontentpos.innerText = item.value
            }
            else {
                navsec.style.justifyContent = item.value;
                upcontentpos.innerText = item.value
            }
        })
    })

    backcol.addEventListener("change", () => {
        navbar.style.backgroundColor = backcol.value;
        upbackcol.innerText = backcol.value;
    })

    fontcol.addEventListener("change", () => {
        navbar.style.color = fontcol.value;
        upcol.innerText = fontcol.value;
        anc.forEach(item => {
            item.style.color = fontcol.value;
        })
    })

    anc.forEach(item => {
        item.addEventListener("click", () => {
            if (navsec.classList.contains("hidden")) {
                hamicon.classList.remove("hidden");
                haminside.classList.add("hidden");
            }
        })
    })

    rightnav.addEventListener("click", () => {
        navsec.style.position = "absolute"
        navsec.style.right = "14%"
        navsec.style.left = ""
        navsec.style.top = "6%"
        navsec.style.alignItems = "center"
        navsec.style.justifyContent = "right"
        navsec.style.height = "48vh"
        navsec.style.width = "9%"
        navbar.style.flexDirection = "column"
        navbar.style.height = "100%";
        navheight.classList.add("hidden");
        navwidth.classList.add("hidden");
        vertheight.classList.remove("hidden");
        vertwidth.classList.remove("hidden");
        innavleft.classList.add("hidden");
        innavright.classList.add("hidden");
        innavcent.classList.add("hidden");
        vertcent.classList.remove("hidden");
        verttop.classList.remove("hidden");
        vertbottom.classList.remove("hidden");
        leflab.classList.add("hidden");
        rightlab.classList.add("hidden");
        toplab.classList.remove("hidden");
        bottomlab.classList.remove("hidden");
        uppos.innerText = "right";
    })

    leftnav.addEventListener("click", () => {
        navsec.style.position = "absolute"
        navsec.style.left = "14%"
        navsec.style.right = ""
        navsec.style.top = "6%"
        navsec.style.width = "9%"
        navsec.style.alignItems = "center"
        navsec.style.justifyContent = "left"
        navsec.style.height = "48vh"
        navbar.style.flexDirection = "column"
        navbar.style.height = "100%"
        navheight.classList.add("hidden");
        navwidth.classList.add("hidden");
        vertheight.classList.remove("hidden");
        vertwidth.classList.remove("hidden");
        innavleft.classList.add("hidden");
        innavright.classList.add("hidden");
        innavcent.classList.add("hidden");
        vertcent.classList.remove("hidden");
        verttop.classList.remove("hidden");
        vertbottom.classList.remove("hidden");
        leflab.classList.add("hidden");
        rightlab.classList.add("hidden");
        toplab.classList.remove("hidden");
        bottomlab.classList.remove("hidden");
        uppos.innerText = "left";
    })

    topnav.addEventListener("click", () => {
        navsec.style.position = ""
        navsec.style.right = ""
        navsec.style.left = ""
        navsec.style.top = ""
        navsec.style.bottom = ""
        navsec.style.width = ""
        navsec.style.height = ""
        navbar.style.flexDirection = ""
        navbar.style.height = ""
        navbar.style.width = ""
        navsec.style.justifyContent = ""
        navsec.style.alignItems = ""
        navheight.classList.remove("hidden");
        navwidth.classList.remove("hidden");
        vertheight.classList.add("hidden");
        vertwidth.classList.add("hidden");
        innavleft.classList.remove("hidden");
        innavright.classList.remove("hidden");
        innavcent.classList.remove("hidden");
        vertcent.classList.add("hidden");
        verttop.classList.add("hidden");
        vertbottom.classList.add("hidden");
        leflab.classList.remove("hidden");
        rightlab.classList.remove("hidden");
        toplab.classList.add("hidden");
        bottomlab.classList.add("hidden");
        uppos.innerText = "top";
        upheight.innerText = "4em";
        upwidth.innerText = "100%";
    })

    bottomnav.addEventListener("click", () => {
        contsec.style.paddingBottom = "4em"
        navsec.style.position = "absolute"
        navsec.style.bottom = "46%"
        navsec.style.top = "48%"
        navsec.style.width = "71.9%"
        navsec.style.right = ""
        navsec.style.left = ""
        navsec.style.height = ""
        navbar.style.flexDirection = ""
        navbar.style.height = ""
        navbar.style.width = ""
        navsec.style.justifyContent = ""
        navsec.style.alignItems = "flex-end"
        navheight.classList.remove("hidden");
        navwidth.classList.remove("hidden");
        vertheight.classList.add("hidden");
        vertwidth.classList.add("hidden");
        innavleft.classList.remove("hidden");
        innavright.classList.remove("hidden");
        innavcent.classList.remove("hidden");
        vertcent.classList.add("hidden");
        verttop.classList.add("hidden");
        vertbottom.classList.add("hidden");
        leflab.classList.remove("hidden");
        rightlab.classList.remove("hidden");
        toplab.classList.add("hidden");
        bottomlab.classList.add("hidden");
        uppos.innerText = "bottom";
        upheight.innerText = "4em";
        upwidth.innerText = "100%";
    })

    removenav.addEventListener("click", () => {
        navsec.classList.add("hidden");
        hamnavsec.classList.remove("hidden");
        if (hamnav.checked == true) {
            hamicon.classList.remove("hidden");
        } else {
            hamicon.classList.add("hidden");
        }
        removenav.classList.add("hidden");
        shownav.classList.remove("hidden");
        upvisibility.innerText = "none";
    })

    shownav.addEventListener("click", () => {
        navsec.classList.remove("hidden");
        hamnavsec.classList.add("hidden");
        hamicon.classList.add("hidden");
        haminside.classList.add("hidden");
        shownav.classList.add("hidden");
        removenav.classList.remove("hidden");
        upvisibility.innerText = "";
    })

    hamnav.addEventListener("click", () => {
        if (hamnav.checked == true) {
            hamicon.classList.remove("hidden");
            uphamnav.innerText = "true"
        } else {
            hamicon.classList.add("hidden");
        }
    });
    hamicon.addEventListener("click", () => {
        hamicon.classList.add("hidden");
        haminside.classList.remove("hidden");
    })

    closeham.addEventListener("click", () => {
        hamicon.classList.remove("hidden");
        haminside.classList.add("hidden");
    })

}());

(function(){
    let maxWidth = 601;
    let loader = document.querySelector(".loader");
    let warn = document.createElement("h6");
    let text = document.createTextNode("Please Rotate Your Device To Enter Landscape Mode. Turn On AutoRotate In Your Device First!")
    window.addEventListener("load", ()=> {
        if (window.innerWidth <= maxWidth){
            loader.classList.remove("hidden");
            loader.style.width = "100vw";
            loader.style.display = "flex";
            loader.style.textAlign = "center";
            loader.style.flexDirection = "column";
            warn.appendChild(text);
            loader.appendChild(warn);
        }
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth <= maxWidth){
            loader.classList.remove("hidden");
            loader.style.width = "100vw";
            loader.style.display = "flex";
            loader.style.textAlign = "center";
            loader.style.flexDirection = "column";
            warn.appendChild(text);
            loader.appendChild(warn);
        }
        else{
            loader.classList.add("hidden");
        }
    })
})();

(function(){
    let delbtn = document.querySelector(".deletecustom");
    let catalogeid = document.querySelector(".catalud");

    delbtn.addEventListener("click", async () => {
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        try {
            const endpoint = `/api/v1/catalouge/${catalogeid.innerText}/updateCompanyLayout`
            await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    theme: "51eac6b471a284d3341d8c0c63d0f1a286262a18"
                })
            }).then((response) => {
                if (response.status === 200) {
                    console.log("success");
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Duplication Input error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };

        const endpoint = `/api/v1/customTheme/deleteCustomTheme/${customid}`
        try {
            await fetch((endpoint), {
                method: 'DELETE',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 200) {
                    successAlert("Your Custom Layout has been deletec :(");
                    window.setTimeout(() => {
                        location.assign(`/layouts/porti`);
                    }, 400);
                } else {
                    console.log(response)
                    errorAlert("Layout Deletion error!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    });

})();

(function(){
    let resetbtn = document.querySelector(".resetcustomtheme");
    resetbtn.addEventListener("click", async function () {
        const endpoint = `/api/v1/customTheme/deleteCustomTheme/${customid}`
        try {
            await fetch((endpoint), {
                method: 'DELETE',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                })
            }).then((response) => {
                if (response.status === 200) {
                    
                } else {
                    console.log(response)
                    errorAlert("Layout Deletion error!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };

        try {
            let load = document.querySelector('.loader');
            load.classList.remove("hidden")
            const endpoint = `/api/v1/customTheme/`
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({

                })
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Layout has been Reseted!")
                    window.setTimeout(() => {
                        location.reload();
                    }, 400);
                } else {
                    console.log(response);
                    errorAlert("Invalid input, Duplication Input error!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
    });
})();
