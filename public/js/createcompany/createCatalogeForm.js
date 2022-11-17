function createCataloge(val, val1, val2, val3, val4, val5, val6, val7) {
    return `
    <form class="comp__form">
        <div class="form__head">
            <h1>Create Invitation</h1>
            <img src="/images/cancel.png" alt="cancel_img" class="cancel__cataloge pointer" />
        </div>
        <div class="form__cont">
            <label>Company Name:</label>
            <input id=${val} type="text" placeholder="Romeo Co" required/>
        </div>
        <div class="form__cont">
            <label>Company Email:</label>
            <input id=${val1} type="text" placeholder="Juliet@comp.com" required/>
        </div>
        <div class="form__cont">
            <label>Company Social Account Link (optional):</label>
            <input id=${val2} placeholder="www.acebook.com/comp" required />
        </div>
        <div class="form__cont">
            <label>Company Address:</label>
            <input id=${val3} placeholder="Kings Palace" required />
        </div>
        <div class="form__cont">
            <label>Company Address Link (optional):</label>
            <input id=${val4} placeholder="add you location link from gmap or anywhere" required />
        </div>
        <div class="form__cont">
            <label>Company Contact Detail : </label>
            <input id=${val6} placeholder="999999998" required />
            </div>
            <div class="form__cont">
            <label>Company Slogan: </label>
            <input id=${val5} placeholder="11:00 AM is not late" required />
        </div>

        <button id=${val7} class="redbtn">Create</button>
    </form>
`
}