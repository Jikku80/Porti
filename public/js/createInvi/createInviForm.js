function createInvi(val, val1, val2, val3, val4, val5, val6, val7) {
    return `
    <form class="comp__form">
        <div class="form__head">
            <h1>Create Invitation</h1>
            <img src="/images/cancel.png" alt="cancel_img" class="cancel__invite pointer crossbtn" />
        </div>
        <div class="to_centre">
            <button id="skipandcreateinvi" class="whitebtn wite">Skip Form & Create</button>
        </div>
        <div class="form__cont">
            <label class="form__label">Person or Party Name:</label>
            <input id=${val} class="form__input" type="text" placeholder="Romeo || Birthday Party" required/>
        </div>
        <p>If its a marriage use your loved ones name, else use party type</p>
        <div class="form__cont">
            <label class="form__label">Person Name:</label>
            <input id=${val1} class="form__input" type="text" placeholder="Juliet" required/>
        </div>
        <p>If its a marriage use your loved ones name, else use organizer or any name</p>
        <div class="form__cont">
            <label class="form__label">Your Story :) :</label>
            <textarea id=${val2} class="form__input" rows="4" cols="30" placeholder="We met at a bar down the alley..." required></textarea>
        </div>
        <div class="form__cont">
            <label class="form__label">Venue :</label>
            <input id=${val3} class="form__input" placeholder="Kings Palace" required />
        </div>
        <div class="form__cont">
            <label class="form__label">Date :</label>
            <input id=${val4} class="form__input" placeholder="2nd November 2022" required />
        </div>
        <div class="form__cont">
            <label class="form__label">Time onwards: </label>
            <input id=${val5} class="form__input" placeholder="11:00 AM onwards" required />
        </div>
        <div class="form__cont">
            <label class="form__label">Phone Number: </label>
            <input id=${val6} class="form__input" placeholder="999999998" required />
        </div>
        <p class="uniqueinviid hidden"></p>
        <div class="form__btn">
            <button id=${val7} class="redbtn">Create</button>
        </div>
    </form>
`
}