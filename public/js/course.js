(function () {
    let hamnav = document.querySelector(".course__ham");
    let courseside = document.querySelector('.course__sidebar');
    let close = document.querySelector(".closeCourseHam");
    let cHead = document.querySelector(".course__head");

    if (screen.width < 601){
        hamnav.classList.remove("hidden");
    }

    window.addEventListener("resize", () => {
        if (screen.width < 601){
            hamnav.classList.remove("hidden");
        }else{
            hamnav.classList.add("hidden");
        }
    
    })

    hamnav.addEventListener('click', () => {
        courseside.style.display = "flex";
        hamnav.style.display = "none";
        cHead.classList.remove("hidden");
    })

    close.addEventListener('click', () => {
        courseside.style.display = "none";
        hamnav.style.display = "flex";
        cHead.classList.add("hidden");
    })
})();