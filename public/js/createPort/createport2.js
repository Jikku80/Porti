layout2 = document.querySelector("#layout2")
portBod = document.querySelector(".port__bod");

let formLayoutTwo = document.createElement("div");
formLayoutTwo.classList.add('formLayout2')
formLayoutTwo.innerHTML = `
<form class="comp__form">
    <div class="form__head">
        <h1>BG Layout</h1>
        <img src="/images/cancel.png" alt="cancel_img" class="cancelcreate" />
    </div>
    <div class="form__cont">
        <label>Portfolio Name:</label>
        <input id="yrname" type="text" placeholder="TechMafia" required/>
    </div>
    <div class="form__cont">
        <label>About Your Portfolio</label>
        <textarea id="yrabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
    </div>
    <div class="form__cont">
        <label>What You Do:</label>
        <textarea id="yrwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Why You Do it:</label>
        <textarea id="yrwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
    </div>
    <label>Contact Details:</label>
    <div class="form__cont">
        <label>Phn Number:</label>
        <input id="yrno" type="number" placeholder="9999888899" required/>
    </div>
    <div class="form__cont">
        <label>Show Number:</label>
        <input id="yrCheck" type="checkbox" />
    </div>
    <div class="form__cont">
        <label>Email Address:</label>
        <input id="yremail" type="email" placeholder="techmafia@gmail.com" required/>
    </div>
    <div class="form__cont">
        <label>Your Facebook Profile Link</label>
        <input id="yrFb" type="text" placeholder="www.facebook.com/techmafia...." />
    </div>
    <div class="form__cont">
        <label>Previous work Details</label>
        <textarea id="yrwork"  rows="4" cols="50" placeholder="TechMafia has done..." required></textarea>
    </div>
    <div class="form__cont small__form">
        <label>Cover Image</label>
        <input type="file" id="yrimg1" name="img1" accept="image/*" />
        <label>Heading</label>
        <input type="text" id="frstImg" placeholder="Cover Image" />
    </div>
    <label>Add Your Previous work Image / GIF</label>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="yrimg2" name="img2" accept="image/*" />
        <label>Heading</label>
        <input type="text" id="secndImg" placeholder="My second work" />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="yrimg3" name="img3" accept="image/*" />
        <label>Heading</label>
        <input type="text" id="thrdImg" placeholder="My third work" />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="yrimg4" name="img4" accept="image/*" />
        <label>Heading</label>
        <input type="text" id="fourImg" placeholder="My fourth work" />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="yrimg5" name="img5" accept="image/*" />
        <label>Heading</label>
        <input type="text" id="fiftImg" placeholder="My fifth work" />
    </div>
    <button id="formbtn" class="redbtn">Create</button>
</form>
    `
document.body.appendChild(formLayoutTwo);
let layoutTwo = document.querySelector(".formLayout2")
layoutTwo.classList.add("hidden");

layout2.addEventListener("click", () => {
    infoAlert("Please Remember Your Phone number, required to access your creations!", "All the fields are Required")
    portBod.classList.add("hidden");
    layoutTwo.classList.remove("hidden");
    let yourname = document.querySelector("#yrname");
    let aboutyou = document.getElementById("yrabout");
    let what = document.getElementById("yrwhat");
    let why = document.getElementById("yrwhy");
    let yourno = document.getElementById("yrno");
    let showNo = document.getElementById("yrCheck");
    let youremail = document.getElementById("yremail");
    let fb = document.getElementById("yrFb");
    let yourwork = document.getElementById("yrwork");
    let img1 = document.getElementById("yrimg1");
    let hd1 = document.getElementById("frstImg");
    let img2 = document.getElementById("yrimg2");
    let hd2 = document.getElementById("secndImg");
    let img3 = document.getElementById("yrimg3");
    let hd3 = document.getElementById("thrdImg");
    let img4 = document.getElementById("yrimg4");
    let hd4 = document.getElementById("fourImg");
    let img5 = document.getElementById("yrimg5");
    let hd5 = document.getElementById("fiftImg");
    let submit = document.getElementById("formbtn");
    let theme = "589c22335a381f122d129225f5c0ba3056ed5811";

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let num = btoa(yourno.value);
        const formData = new FormData();
        formData.append("name", yourname.value);
        formData.append("about", aboutyou.value);
        formData.append("what", what.value);
        formData.append("why", why.value);
        formData.append("phn_no", yourno.value);
        formData.append("showNo", showNo.checked);
        formData.append("email", youremail.value);
        formData.append("fb", fb.value);
        formData.append("previous", yourwork.value);
        formData.append("theme", theme);
        formData.append("firstImgHead", hd1.value);
        formData.append("secondImgHead", hd2.value);
        formData.append("thirdImgHead", hd3.value);
        formData.append("fourthImgHead", hd4.value);
        formData.append("fifthImgHead", hd5.value);
        formData.append("imageCover", img1.files[0]);
        formData.append("imageSecond", img2.files[0]);
        formData.append("imageThird", img3.files[0]);
        formData.append("imageFourth", img4.files[0]);
        formData.append("imageFifth", img5.files[0]);
        const endpoint = '/api/v1/portfolio'
        fetch((endpoint), {
            body: formData,
            method: 'POST'
        }).then((response) => {
            load.classList.add("hidden");
            if (response.status === 201) {
                successAlert("Your Portfolio has been created :)");
                window.setTimeout(() => {
                    location.assign(`/myportfolio/${num}?${theme}`);
                }, 400);
            } else {
                console.log(response);
                errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
            }
        })
            .catch((err) => {
                console.log(err);
                errorAlert('Sorry! Something went wrong', err);
            });
        yourname.value = "",
            youremail.value = "",
            fb.value = "",
            yourno.value = "",
            aboutyou.value = "",
            what.value = "",
            why.value = "",
            yourwork.value = "",
            hd1.value = "",
            hd2.value = "",
            hd3.value = "",
            hd4.value = "",
            hd5.value = "",
            img1.value = "",
            img2.value = "",
            img3.value = "",
            img4.value = "",
            img5.value = ""
    })
})

let canclCreate = document.querySelector(".cancelcreate")
canclCreate.addEventListener("click", () => {
    layoutTwo.classList.add("hidden");
    portBod.classList.remove("hidden");
})