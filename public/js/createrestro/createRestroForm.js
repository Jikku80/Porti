function createRestro(val, val1, val2, val3, val4) {
    return `
    <form class="comp__form">
        <div class="form__head">
            <h1>Create Your Restaurante</h1>
            <img src="/images/cancel.png" alt="cancel_img" class="cancel__restro pointer" />
        </div>
        <div class="form__cont">
            <label class="form__label">Name:</label>
            <input id=${val} class="form__input" type="text" placeholder="Romeo Restro" required/>
        </div>
        <div class="form__cont">
            <label class="form__label">Address:</label>
            <input id=${val1} class="form__input" type="text" placeholder="Julietilante madagascar" required/>
        </div>
        <div class="form__cont">
            <label class="form__label">Slogan :</label>
            <input id=${val2} class="form__input" placeholder="You eat we serve" required />
        </div>
        <div class="form__cont">
            <label class="form__label">Phone Number: </label>
            <input id=${val3} class="form__input" placeholder="999999998" required />
        </div>
        <div class="form__btn">
        <button id=${val4} class="redbtn">Create</button>
        </div>
    </form>
`
}