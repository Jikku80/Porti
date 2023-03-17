(function () {
    let sharesec = document.querySelector(".sharesec");
    let shareqr = document.querySelector(".shareqrsec");
    let additemsec = document.querySelector(".additemsection");
    let youritemsec = document.querySelector(".your__item__sec");
    let updatesec = document.querySelector(".updatesection");
    let coversec = document.querySelector(".coversec");
    let bannersec = document.querySelector(".addbannersec");
    let termsandcond = document.querySelector(".termsandpolicies");
    let termhead = document.querySelector(".upterm");
    let delsec = document.querySelector(".delete__sec");

    let sharebtn = document.querySelector(".sharevporti");
    let addbtn = document.querySelector(".gotoaddsec");
    let upbtn = document.querySelector(".gotoupdate");
    let banbtn = document.querySelector(".gotobanner");
    let termbtn = document.querySelector(".gototerm");
    let delbtn = document.querySelector(".gotodel");

    let sec = window.sessionStorage.getItem('section');

    if (sec === "additemstomenu") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.remove("hidden");
        youritemsec.classList.remove("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec === "sharesec") {
        sharesec.classList.remove("hidden");
        shareqr.classList.remove("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec === "updatedatasec") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.remove("hidden");
        coversec.classList.remove("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec === "createbannersec") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.remove("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec === "termandcondsec") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.remove("hidden");
        termhead.classList.remove("hidden");
        delsec.classList.add("hidden");
    }
    else if (sec == "deletesec") {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.remove("hidden");
    }
    else {
        window.sessionStorage.setItem("section", "");
    }


    sharebtn.addEventListener("click", () => {
        sharesec.classList.remove("hidden");
        shareqr.classList.remove("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.add("hidden");
        window.sessionStorage.setItem("section", "sharesec");
    });

    addbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.remove("hidden");
        youritemsec.classList.remove("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.add("hidden");
        window.sessionStorage.setItem("section", "additemstomenu");
    });

    upbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.remove("hidden");
        coversec.classList.remove("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.add("hidden");
        window.sessionStorage.setItem("section", "updatedatasec");
    });

    banbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.remove("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.add("hidden");
        window.sessionStorage.setItem("section", "createbannersec");
    });

    termbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.remove("hidden");
        termhead.classList.remove("hidden");
        delsec.classList.add("hidden");
        window.sessionStorage.setItem("section", "termandcondsec");
    });

    delbtn.addEventListener("click", () => {
        sharesec.classList.add("hidden");
        shareqr.classList.add("hidden");
        additemsec.classList.add("hidden");
        youritemsec.classList.add("hidden");
        updatesec.classList.add("hidden");
        coversec.classList.add("hidden");
        bannersec.classList.add("hidden");
        termsandcond.classList.add("hidden");
        termhead.classList.add("hidden");
        delsec.classList.remove("hidden");
        window.sessionStorage.setItem("section", "deletesec");
    });
})();