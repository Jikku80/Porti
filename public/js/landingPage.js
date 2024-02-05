(function () {
    
    navbarActions()

    hamActions()

    navbarColorChanger();

    window.addEventListener("resize", () => {
        let hamnavContent = document.querySelector(".first__nav__head");
        
        navbarColorChanger();

        
        if (screen.width > 982){
            hamnavContent.style.display = "none"
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

    let openHamModel = document.querySelector(".landing__ham");
    let closeModel = document.querySelector(".close__ham");
    let model = document.querySelector(".first__nav__head");
    openHamModel.addEventListener("click", () => {
        model.style.display = "flex"
    })

    closeModel.addEventListener("click", () => {
        model.style.display = "none"
    })
})();

function navbarColorChanger(){
    let landingnavbar = document.querySelector(".landing__navbar");
    let mininav =  document.querySelectorAll(".mini__nav");
    let windowScreenSize = screen.width;
    
    if (windowScreenSize < 601){
        window.addEventListener("scroll", () => {
            let bod = document.body.getBoundingClientRect();
            if (bod.y < -408){
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
    }
    else if ((windowScreenSize > 601) && (windowScreenSize < 982)){
        window.addEventListener("scroll", () => {
            let bod = document.body.getBoundingClientRect();
            if (bod.y < -518){
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
    }
    else if(screen.height < 601){
        window.addEventListener("scroll", () => {
            let bod = document.body.getBoundingClientRect();
            if (bod.y < -515){
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
    }
    else{
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
    }
}

function navbarActions(){
    let serviceNav, aboutNav, reachNav, liService, liAbout, liReach, arrService, arrAbout, arrReach;
    serviceNav = document.querySelector(".navbar__services");
    aboutNav = document.querySelector(".navbar__about");
    reachNav = document.querySelector(".navbar__reach");
    liService = document.querySelector(".service__nav__sec");
    liAbout = document.querySelector(".about__nav__sec");
    liReach = document.querySelector(".reach__nav__sec");
    arrService = document.querySelector(".servicearrow");
    arrAbout = document.querySelector(".aboutarrow");
    arrReach = document.querySelector(".reacharrow");

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
}

function hamActions(){
    let serviceNav, aboutNav, reachNav, liService, liAbout, liReach, arrService, arrAbout, arrReach;

    serviceNav = document.querySelector(".ham__services");
    aboutNav = document.querySelector(".ham__about");
    reachNav = document.querySelector(".ham__reach");
    liService = document.querySelector(".service__ham__sec");
    liAbout = document.querySelector(".about__ham__sec");
    liReach = document.querySelector(".reach__ham__sec");
    arrService = document.querySelector(".servicehamarrow");
    arrAbout = document.querySelector(".abouthamarrow");
    arrReach = document.querySelector(".reachhamarrow");

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
}