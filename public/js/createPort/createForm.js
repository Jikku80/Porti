function createPortiForm(val, val0, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, probValue, solveValue, failValue, motiValue, msgValue) {
    return `
        <form class="comp__form">
            <div class="form__head">
                <h1>${val}</h1>
                <img src="/images/cancel.png" alt="cancel_img" class=${val0} />
            </div>
            <div class="form__cont port__name__cont portForm1">
                <label>Portfolio Name:</label>
                <input id=${val1} type="text" placeholder="TechMafia" required/>

                <div class="port__info">
                    <h3>Please Enter Your Name</h3>
                </div>

                <div class="btnGroup">
                    <button id="portNameNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__about__cont hidden portForm2">
                <label>About Your Portfolio</label>
                <textarea id=${val2} class="about__portfolio" rows="4" cols="50" placeholder="TechMafia is a ...." required></textarea>

                <div class="port__info">
                    <h3>If you dont know what to write ans these questions</h3>
                    <p>Who are you? Where you from? Your Eduction Detail? Where you study? Your Hobbies? What you do in your free time? How you utilize your time</p>
                </div>

                <div class="btnGroup">
                    <button id="portAboutPrev" class="redbtn">Previous</button>
                    <button id="portAboutNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__what__cont hidden portForm3">
                <label>What You Do:</label>
                <textarea id=${val3} rows="4" cols="50" placeholder="what techmafia do is...." required></textarea>

                <div class="port__info">
                    <h3>If you dont know what to write ans these questions</h3>
                    <P>Describe what you do? the detail of your work which you know the best, you gotta let them know you aint joking about the shit you know</P>
                </div>

                <div class="btnGroup">
                    <button id="portWhatPrev" class="redbtn">Previous</button>
                    <button id="portWhatNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__why__cont hidden portForm4">
                <label>Why You Do it:</label>
                <textarea id=${val4} rows="4" cols="50" placeholder="Why TechMafia do it ...." required></textarea>

                <div class="btnGroup">
                    <button id="portWhyPrev" class="redbtn">Previous</button>
                    <button id="portWhyNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__fail__cont hidden portForm5">
                <label>Your Failure, How Did You tackle your failure</label>
                <textarea type="text" id=${failValue} rows="4" cols="50" placeholder="i failed i get up dividing my problem findinf the solution...." required></textarea>

                <div class="btnGroup">
                    <button id="portFailPrev" class="redbtn">Previous</button>
                    <button id="portFailNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__moti__cont hidden portForm6">
                <label>How Do you motivate yourself?</label>
                <textarea type="text" id=${motiValue} rows="4" cols="50" placeholder="When ever i go out of track...." required></textarea>

                <div class="btnGroup">
                    <button id="portMotiPrev" class="redbtn">Previous</button>
                    <button id="portMotiNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__msg__cont hidden portForm7">
                <label>Your Message To People</label>
                <textarea type="text" id=${msgValue} rows="4" cols="50" placeholder="My Message to everyone..." required></textarea>

                <div class="btnGroup">
                    <button id="portMsgPrev" class="redbtn">Previous</button>
                    <button id="portMsgNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__phn__cont hidden portForm8">
                <label>Phone Number:</label>
                <input id=${val5} type="number" placeholder="9999888899" required/>

                <div class="btnGroup">
                    <button id="portPhnPrev" class="redbtn">Previous</button>
                    <button id="portPhnNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__show__cont hidden portForm9">
                <label>Show Number:</label>
                <input id=${val6} class="checkbox" type="checkbox" />

                <div class="btnGroup">
                    <button id="portShowPrev" class="redbtn">Previous</button>
                    <button id="portShowNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__email__cont hidden portForm10">
                <label>Email Address:</label>
                <input id=${val7} type="email" placeholder="techmafia@gmail.com" required/>

                <div class="btnGroup">
                    <button id="portEmailPrev" class="redbtn">Previous</button>
                    <button id="portEmailNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__social__cont hidden portForm11">
                <label>Your Social Profile Link</label>
                <input id=${val8} type="text" placeholder="https://www.facebook.com/instagram.com/linkedin.com" />

                <div class="btnGroup">
                    <button id="portSocialPrev" class="redbtn">Previous</button>
                    <button id="portSocialNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__address__cont hidden portForm12">
                <label>Address</label>
                <input id=${val9} type="text" placeholder="your location" required />

                <div class="btnGroup">
                    <button id="portAddressPrev" class="redbtn">Previous</button>
                    <button id="portAddressNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__accomp__cont hidden portForm13">
                <label>Previous Accomplishments</label>
                <textarea id=${val10}  rows="4" cols="50" placeholder="TechMafia has done..." required></textarea>

                <div class="btnGroup">
                    <button id="portAccompPrev" class="redbtn">Previous</button>
                    <button id="portAccompNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__prob__cont hidden portForm14">
                <label>Prior Problem You Faced</label>
                <textarea type="text" id=${probValue} rows="4" cols="50" placeholder="The biggest problem i faced while i worked or was learning...." required></textarea>

                <div class="btnGroup">
                    <button id="portProbPrev" class="redbtn">Previous</button>
                    <button id="portProbNext" class="redbtn">Next</button>
                </div>
            </div>
            <div class="form__cont port__soln__cont hidden portForm15">
                <label>How you solved your problem?</label>
                <textarea type="text" id=${solveValue} rows="4" cols="50" placeholder="I just dont give up easy..." required></textarea>

                <div class="btnGroup">
                    <button id="portSolnPrevious" class="redbtn">Previous</button>
                </div>
            </div>
            <button id=${val11} class="redbtn portSubmit hidden">Create</button>
        </form>
    `
}


