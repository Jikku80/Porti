layout3 = document.querySelector("#layout3")
portBod = document.querySelector(".port__bod");

let formLayoutThree = document.createElement("div");
formLayoutThree.classList.add('formLayout3')
formLayoutThree.innerHTML = `
<form class="comp__form">
    <div class="form__head">
        <h1>ST Layout</h1>
        <img src="/images/cancel.png" alt="cancel_img" class="closecreate" />
    </div>
    <div class="form__cont">
        <label>Portfolio Name:</label>
        <input id="uthirdname" type="text" placeholder="TechMafia" required/>
    </div>
    <div class="form__cont">
        <label>About Your Portfolio</label>
        <textarea id="uthirdabout" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
    </div>
    <div class="form__cont">
        <label>What You Do:</label>
        <textarea id="uthirdwhat" rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
    </div>
    <div class="form__cont">
        <label>Why You Do it:</label>
        <textarea id="uthirdwhy" rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
    </div>
    <label>Contact Details:</label>
    <div class="form__cont">
        <label>Phn Number:</label>
        <input id="uthirdno" type="number" placeholder="9999888899" required/>
    </div>
    <div class="form__cont">
        <label>Show Number:</label>
        <input id="uthirdCheck" type="checkbox" />
    </div>
    <div class="form__cont">
        <label>Email Address:</label>
        <input id="uthirdemail" type="email" placeholder="techmafia@gmail.com" required/>
    </div>
    <div class="form__cont">
        <label>Your Social Media Profile Link</label>
        <input id="uthirdFb" type="text" placeholder="https://www.facebook.com/instagram.com/" required />
    </div>
    <div class="form__cont">
        <label>Accomplishments</label>
        <textarea id="uthirdwork"  rows="4" cols="50" placeholder="Your big or small any accomplishment relevent to your portfolio...." required></textarea>
    </div>
    <label>Add Your Certificates/Accomplisments Image, All image field must have image --Required--</label>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="uthirdimg1" name="img1" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="uthird1Img" placeholder="My first" required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="uthirdimg2" name="img2" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="uthird2Img" placeholder="My second" required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="uthirdimg3" name="img3" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="uthird3Img" placeholder="My third" required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="uthirdimg4" name="img4" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="uthird4Img" placeholder="My fourth" required />
    </div>
    <div class="form__cont small__form">
        <label>Add Image</label>
        <input type="file" id="uthirdimg5" name="img5" accept="image/*" required />
        <label>Heading</label>
        <input type="text" id="uthird5Img" placeholder="My fifth" required />
    </div>
    <button id="thirdformbtn" class="redbtn">Create</button>
</form>
    `
document.body.appendChild(formLayoutThree);
let layoutThree = document.querySelector(".formLayout3")
layoutThree.classList.add("hidden");

layout3.addEventListener("click", () => {
    infoAlert("Please Remember Your Phone number, required to access your creations!", "All the fields are Required")
    portBod.classList.add("hidden");
    layoutThree.classList.remove("hidden");
    let yourname = document.querySelector("#uthirdname");
    let aboutyou = document.getElementById("uthirdabout");
    let what = document.getElementById("uthirdwhat");
    let why = document.getElementById("uthirdwhy");
    let yourno = document.getElementById("uthirdno");
    let showNo = document.getElementById("uthirdCheck");
    let youremail = document.getElementById("uthirdemail");
    let fb = document.getElementById("uthirdFb");
    let yourwork = document.getElementById("uthirdwork");
    let img1 = document.getElementById("uthirdimg1");
    let hd1 = document.getElementById("uthird1Img");
    let img2 = document.getElementById("uthirdimg2");
    let hd2 = document.getElementById("uthird2Img");
    let img3 = document.getElementById("uthirdimg3");
    let hd3 = document.getElementById("uthird3Img");
    let img4 = document.getElementById("uthirdimg4");
    let hd4 = document.getElementById("uthird4Img");
    let img5 = document.getElementById("uthirdimg5");
    let hd5 = document.getElementById("uthird5Img");
    let submit = document.getElementById("thirdformbtn");
    let theme = "481743d632b80d39bc2771d19be3ca3005b3f8af";

    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
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
            await fetch((endpoint), {
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
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
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

let closeCreate = document.querySelector(".closecreate")
closeCreate.addEventListener("click", () => {
    layoutThree.classList.add("hidden");
    portBod.classList.remove("hidden");
})