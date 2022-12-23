function createCataloge(val, val1, val2, val3, val4, val5, val6, val7) {
    return `
    <form class="comp__form">
        <div class="form__head">
            <h1>Create Invitation</h1>
            <img src="https://portiblobstorage.blob.core.windows.net/portithemeimage/cancel.png" alt="cancel_img" class="cancel__cataloge pointer" />
        </div>
        <div class="form__cont">
            <label class="form__label">Company Name:</label>
            <input id=${val} class="form__input" type="text" placeholder="Romeo Co" required/>
        </div>
        <div class="form__cont">
            <label class="form__label">Company Email:</label>
            <input id=${val1} class="form__input" type="text" placeholder="Juliet@comp.com" required/>
        </div>
        <div class="form__cont">
            <label class="form__label">Company Social Account Link (optional):</label>
            <input id=${val2} class="form__input" placeholder="www.acebook.com/comp" required />
        </div>
        <div class="form__cont">
            <label class="form__label">Company Address:</label>
            <input id=${val3} class="form__input" placeholder="Kings Palace" required />
        </div>
        <div class="form__cont">
            <label class="form__label">Company Address Link (optional):</label>
            <input id=${val4} class="form__input" placeholder="add you location link from gmap or anywhere" required />
        </div>
        <div class="form__cont">
            <label class="form__label">Company Contact Detail : </label>
            <input id=${val6} class="form__input" placeholder="999999998" required />
            </div>
            <div class="form__cont">
            <label class="form__label">Company Slogan: </label>
            <input id=${val5} class="form__input" placeholder="11:00 AM is not late" required />
        </div>

        <button id=${val7} class="redbtn">Create</button>
    </form>
`
}