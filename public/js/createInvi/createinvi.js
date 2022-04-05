create_port = document.querySelector(".create_port")
portBod = document.querySelector(".port__section");
inviBod = document.querySelector(".invi__section");
invi1 = document.querySelector("#invi1");

let inviOneForm = document.createElement("div");
inviOneForm.classList.add("createInvi");
inviOneForm.innerHTML = `
    <form class="comp__form">
        <div class="form__head">
            <h1>MRG Layout</h1>
            <img src="/images/cancel.png" alt="cancel_img" class="cancel__invite" />
        </div>
        <div class="form__cont">
            <label>First Person Name:</label>
            <input id="fname" type="text" placeholder="Romeo" required/>
        </div>
        <div class="form__cont">
            <label>Second Person Name:</label>
            <input id="sname" type="text" placeholder="Juliet" required/>
        </div>
        <div class="form__cont">
            <label>Your Story :) :</label>
            <textarea id="aboutinvi" rows="4" cols="50" placeholder="We met at a bar down the alley..." required></textarea>
        </div>
        <div class="form__cont">
            <label>Venue :</label>
            <input id="whatinvi" placeholder="Kings Palace" required />
        </div>
        <div class="form__cont">
            <label>Date :</label>
            <input id="whyinvi" placeholder="2nd November 2022" required />
        </div>
        <div class="form__cont">
            <label>Time onwards: </label>
            <input id="inviwork" placeholder="11:00 AM onwards" required />
        </div>
        <div class="form__cont">
            <label>Phone Number: </label>
            <input id="invino" placeholder="999999998" required />
        </div>
        <div class="form__cont small__form">
            <label>Cover Image</label>
            <input type="file" id="inviimg1" name="img1" accept="image/*" required />
        </div>
        <label>Add Your Lovey Dovey Images, All image field must have image --Required--</label>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="inviimg2" name="img2" accept="image/*" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="inviimg3" name="img3" accept="image/*" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="inviimg4" name="img4" accept="image/*" required />
        </div>
        <div class="form__cont small__form">
            <label>Add Image</label>
            <input type="file" id="inviimg5" name="img5" accept="image/*" required />
        </div>
        <button id="invi__form__btn" class="redbtn">Create</button>
    </form>
`

document.body.appendChild(inviOneForm);
let mkForm = document.querySelector('.createInvi');
mkForm.classList.add("hidden");

invi1.addEventListener("click", () => {
    infoAlert("Please Remember Your Phone number, required to access your creations!", "All the fields are Required")
    portBod.classList.add("hidden");
    inviBod.classList.add("hidden");
    mkForm.classList.remove("hidden");
    let yourname = document.querySelector("#fname");
    let secname = document.getElementById("sname")
    let aboutyou = document.getElementById("aboutinvi");
    let what = document.getElementById("whatinvi");
    let why = document.getElementById("whyinvi");
    let yourwork = document.getElementById("inviwork");
    let yourno = document.getElementById("invino")
    let img1 = document.getElementById("inviimg1");
    let img2 = document.getElementById("inviimg2");
    let img3 = document.getElementById("inviimg3");
    let img4 = document.getElementById("inviimg4");
    let img5 = document.getElementById("inviimg5");
    let submit = document.getElementById("invi__form__btn");
    let theme = "4dc50fc3bc007be011b5445f3f79298b9eeb51b7";

    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        let load = document.querySelector('.loader');
        load.classList.remove("hidden")
        let num = btoa(yourno.value);
        const formData = new FormData();
        formData.append("fname", yourname.value);
        formData.append("sname", secname.value);
        formData.append("about", aboutyou.value);
        formData.append("address", what.value);
        formData.append("pdate", why.value);
        formData.append("ptime", yourwork.value);
        formData.append("phn_no", yourno.value);
        formData.append("theme", theme);
        formData.append("imgCover", img1.files[0]);
        formData.append("imgSecond", img2.files[0]);
        formData.append("imgThird", img3.files[0]);
        formData.append("imgFourth", img4.files[0]);
        formData.append("imgFifth", img5.files[0]);
        const endpoint = '/api/v1/invite'
        try {
            await fetch((endpoint), {
                body: formData,
                method: 'POST'
            }).then((response) => {
                load.classList.add("hidden");
                if (response.status === 201) {
                    successAlert("Your Portfolio has been created :)");
                    window.setTimeout(() => {
                        location.assign(`/myinvi/${num}?${theme}`);
                    }, 400);
                } else {
                    console.log(response)
                    errorAlert("Invalid input, Duplication Input error or user already have a portfolio!!!")
                }
            })
        }
        catch (err) {
            console.log(err);
            errorAlert('Sorry! Something went wrong', err);
        };
        yourname.value = "",
            secname.value = "",
            aboutyou.value = "",
            what.value = "",
            why.value = "",
            yourwork.value = "",
            yourno.value = "",
            img1.value = "",
            img2.value = "",
            img3.value = "",
            img4.value = "",
            img5.value = ""
    })

})

let cancelInvite = document.querySelector(".cancel__invite");
cancelInvite.addEventListener("click", () => {
    mkForm.classList.add("hidden");
    portBod.classList.remove("hidden");
    inviBod.classList.remove("hidden");
})
