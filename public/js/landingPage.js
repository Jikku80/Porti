(function () {

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