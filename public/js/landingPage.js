(function () {
    let serviceNav = document.querySelector(".navbar__services");
    let aboutNav = document.querySelector(".navbar__about");
    let reachNav = document.querySelector(".navbar__reach");
    let liService = document.querySelector(".service__nav__sec");
    let liAbout = document.querySelector(".about__nav__sec");
    let liReach = document.querySelector(".reach__nav__sec");
    let arrService = document.querySelector(".servicearrow");
    let arrAbout = document.querySelector('.aboutarrow');
    let arrReach = document.querySelector(".reacharrow");

    serviceNav.addEventListener("click", () => {
        liService.classList.toggle("hidden");
        liAbout.classList.add("hidden");
        liReach.classList.add("hidden");
        if (liService.classList.contains("hidden")){
            arrService.classList.add("fa-angle-down");
            arrService.classList.remove("fa-angle-up");
        }else{
            arrService.classList.remove("fa-angle-down");
            arrService.classList.add("fa-angle-up");
            arrAbout.classList.remove("fa-angle-up");
            arrAbout.classList.add("fa-angle-down");
            arrReach.classList.remove("fa-angle-up");
            arrReach.classList.add("fa-angle-down");
        }
    })

    aboutNav.addEventListener("click", () => {
        liAbout.classList.toggle("hidden");
        liService.classList.add("hidden");
        liReach.classList.add("hidden");
        if (liAbout.classList.contains("hidden")){
            arrAbout.classList.add("fa-angle-down");
            arrAbout.classList.remove("fa-angle-up");
        }else{
            arrAbout.classList.remove("fa-angle-down");
            arrAbout.classList.add("fa-angle-up");
            arrReach.classList.remove("fa-angle-up");
            arrReach.classList.add("fa-angle-down");
            arrService.classList.remove("fa-angle-up");
            arrService.classList.add("fa-angle-down");
        }
    })

    reachNav.addEventListener("click", () => {
        liReach.classList.toggle("hidden");
        liService.classList.add("hidden");
        liAbout.classList.add("hidden");
        if (liReach.classList.contains("hidden")){
            arrReach.classList.add("fa-angle-down");
            arrReach.classList.remove("fa-angle-up");
        }else{
            arrReach.classList.remove("fa-angle-down");
            arrReach.classList.add("fa-angle-up");
            arrService.classList.remove("fa-angle-up");
            arrService.classList.add("fa-angle-down");
            arrAbout.classList.add("fa-angle-down");
            arrAbout.classList.remove("fa-angle-up");
        }
    })

    let landingnavbar = document.querySelector(".landing__navbar");
    let mininav =  document.querySelectorAll(".mini__nav");
    window.addEventListener("scroll", () => {
        let bod = document.body.getBoundingClientRect();
        if (bod.y < -722){
            landingnavbar.style.backgroundColor = "#2c2c2c";
            mininav.forEach(item => {
                item.style.backgroundColor = "#2c2c2c";
            })
        }else{
            landingnavbar.style.backgroundColor = "transparent";
            mininav.forEach(item => {
                item.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            })
        }
    })

    let landPort = document.querySelector(".landtoport");
    let landInvi = document.querySelector(".landtoinvi");
    let landMenu = document.querySelector(".landtomenu");
    let landCatalog = document.querySelector(".landtocatalog");
    let landBrochure = document.querySelector(".landtobrochure");
    let portarrow = document.querySelector(".portarrow");
    let inviarrow = document.querySelector(".inviarrow");
    let menuarrow = document.querySelector(".menuarrow");
    let catalogarrow = document.querySelector(".catalogarrow");
    let broarrow = document.querySelector(".broarrow");
    let hoverimg = document.querySelector(".hoverimg");

    landPort.addEventListener("mouseover", () => {
        portarrow.classList.remove("hidden");
        inviarrow.classList.add("hidden");
        menuarrow.classList.add("hidden");
        catalogarrow.classList.add("hidden");
        broarrow.classList.add("hidden");
        hoverimg.src = "/images/layout6.png";
    })

    landInvi.addEventListener("mouseover", () => {
        portarrow.classList.add("hidden");
        inviarrow.classList.remove("hidden");
        menuarrow.classList.add("hidden");
        catalogarrow.classList.add("hidden");
        broarrow.classList.add("hidden");
        hoverimg.src = "/images/invi3.png";
    })

    landMenu.addEventListener("mouseover", () => {
        portarrow.classList.add("hidden");
        inviarrow.classList.add("hidden");
        menuarrow.classList.remove("hidden");
        catalogarrow.classList.add("hidden");
        broarrow.classList.add("hidden");
        hoverimg.src = "/images/menu2.png";
    })

    landCatalog.addEventListener("mouseover", () => {
        portarrow.classList.add("hidden");
        inviarrow.classList.add("hidden");
        menuarrow.classList.add("hidden");
        catalogarrow.classList.remove("hidden");
        broarrow.classList.add("hidden");
        hoverimg.src = "/images/catal1.png";
    })

    landBrochure.addEventListener("mouseover", () => {
        portarrow.classList.add("hidden");
        inviarrow.classList.add("hidden");
        menuarrow.classList.add("hidden");
        catalogarrow.classList.add("hidden");
        broarrow.classList.remove("hidden");
        hoverimg.src = "/images/bro1.png";
    })

    let overlayCont = document.querySelectorAll(".overlay__container");
    let sliderright = document.querySelector(".slider__right");
    let overlayContSec = document.querySelectorAll(".overlay__containerSec");
    let sliderleft = document.querySelector(".slider__left");

    sliderright.addEventListener("mouseover", () => {
        overlayCont.forEach(item => {
            item.style.animationPlayState = "paused";
        })
    })

    sliderright.addEventListener("mouseout", () => {
        overlayCont.forEach(item => {
            item.style.animationPlayState = "running";
        })
    })

    sliderleft.addEventListener("mouseover", () => {
        overlayContSec.forEach(item => {
            item.style.animationPlayState = "paused";
        })
    })

    sliderleft.addEventListener("mouseout", () => {
        overlayContSec.forEach(item => {
            item.style.animationPlayState = "running";
        })
    })
})();