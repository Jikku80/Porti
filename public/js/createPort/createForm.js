function createPortiForm(val, val0, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, probValue, solveValue, failValue, motiValue, msgValue) {
    return `
        <form class="comp__form">
            <div class="form__head">
                <h1>${val}</h1>
                <img src="/images/cancel.png" alt="cancel_img" class=${val0} />
            </div>
            <div class="form__cont">
                <label>Portfolio Name:</label>
                <input id=${val1} type="text" placeholder="TechMafia" required/>
            </div>
            <div class="form__cont">
                <label>About Your Portfolio</label>
                <textarea id=${val2} class="about__portfolio" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>
            </div>
            <div class="form__cont">
                <label>What You Do:</label>
                <textarea id=${val3} rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>
            </div>
            <div class="form__cont">
                <label>Why You Do it:</label>
                <textarea id=${val4} rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
            </div>
            <div class="form__cont">
                <label>Your Failure, How Did You tackle your failure</label>
                <textarea type="text" id=${failValue} rows="4" cols="50" placeholder="i failed i get up dividing my problem findinf the solution...." required></textarea>
            </div>
            <div class="form__cont">
                <label>How Do you motivate yourself?</label>
                <textarea type="text" id=${motiValue} rows="4" cols="50" placeholder="When ever i go out of track...." required></textarea>
            </div>
            <div class="form__cont">
                <label>Your Message To People</label>
                <textarea type="text" id=${msgValue} rows="4" cols="50" placeholder="My Message to everyone..." required></textarea>
            </div>
            <label>Contact Details:</label>
            <div class="form__cont">
                <label>Phone Number:</label>
                <input id=${val5} type="number" placeholder="9999888899" required/>
            </div>
            <div class="form__cont">
                <label>Show Number:</label>
                <input id=${val6} class="checkbox" type="checkbox" />
            </div>
            <div class="form__cont">
                <label>Email Address:</label>
                <input id=${val7} type="email" placeholder="techmafia@gmail.com" required/>
            </div>
            <div class="form__cont">
                <label>Your Social Profile Link</label>
                <input id=${val8} type="text" placeholder="https://www.facebook.com/instagram.com/linkedin.com" />
            </div>
            <div class="form__cont">
                <label>Address</label>
                <input id=${val9} type="text" placeholder="your location" required />
            </div>
            <div class="form__cont">
                <label>Previous Accomplishments</label>
                <textarea id=${val10}  rows="4" cols="50" placeholder="TechMafia has done..." required></textarea>
            </div>
            <div class="form__cont">
                <label>Prior Problem You Faced</label>
                <textarea type="text" id=${probValue} rows="4" cols="50" placeholder="The biggest problem i faced while i worked or was learning...." required></textarea>
            </div>
            <div class="form__cont">
                <label>How you solved your problem?</label>
                <textarea type="text" id=${solveValue} rows="4" cols="50" placeholder="I just dont give up easy..." required></textarea>
            </div>
            <button id=${val11} class="redbtn">Create</button>
        </form>
    `
}
