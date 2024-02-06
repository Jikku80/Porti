(function () {
    let vid = document.querySelector(".landing__video");
    if (!vid){
        let landingnav =document.querySelector(".landing__navbar");
        let mininav = document.querySelectorAll(".mini__nav");
        landingnav.style.backgroundColor = "#2c2c2c";
        mininav.forEach(item => {
            item.style.backgroundColor = "#2c2c2c";
        })
    }

    let goto__port = document.querySelectorAll(".portlink");

    goto__port.forEach(item => {
        item.addEventListener("click", () => {
            let newid = btoa(item.id);
            location.assign(`/myportfolio/${newid}`)
        })
    })
    
    navbarActions()

    hamActions()

    window.addEventListener("resize", () => {
        let hamnavContent = document.querySelector(".first__nav__head");
        if (screen.width > 601){
            hamnavContent.style.display = "none"
        }
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