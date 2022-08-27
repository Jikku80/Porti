function createInvi(val, val1, val2, val3, val4, val5, val6, val7) {
    return `
    <form class="comp__form">
        <div class="form__head">
            <h1>Create Invitation</h1>
            <img src="/images/cancel.png" alt="cancel_img" class="cancel__invite pointer" />
        </div>
        <div class="form__cont">
            <label>First Person Name:</label>
            <input id=${val} type="text" placeholder="Romeo" required/>
        </div>
        <div class="form__cont">
            <label>Second Person Name:</label>
            <p>If its a marriage use your loved ones name, else use organizer or any name</p>
            <input id=${val1} type="text" placeholder="Juliet" required/>
        </div>
        <div class="form__cont">
            <label>Your Story :) :</label>
            <textarea id=${val2} rows="4" cols="30" placeholder="We met at a bar down the alley..." required></textarea>
        </div>
        <div class="form__cont">
            <label>Venue :</label>
            <input id=${val3} placeholder="Kings Palace" required />
        </div>
        <div class="form__cont">
            <label>Date :</label>
            <input id=${val4} placeholder="2nd November 2022" required />
        </div>
        <div class="form__cont">
            <label>Time onwards: </label>
            <input id=${val5} placeholder="11:00 AM onwards" required />
        </div>
        <div class="form__cont">
            <label>Phone Number: </label>
            <input id=${val6} placeholder="999999998" required />
        </div>

        <button id=${val7} class="redbtn">Create</button>
    </form>
`
}