function createPortiForm(val, val0, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, probValue, solveValue, failValue, motiValue, msgValue) {
    return `
        <div class="form__head">
            <h1>${val}</h1>
            <img src="/images/cancel.png" alt="cancel_img" class=${val0} />
        </div>
        <form class="comp__form__main">
            <div class="com__form">
                <div class="port__name__cont portForm">
                    <div class="form__first__cont">
                        <label>Portfolio Name:</label>                    
                        <div class="port__info">
                            <p>Enter Your Real Name, Do not use made up or nickname</p>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <input id=${val1} name=${val1} type="text" placeholder="TechMafia" required/>
                        <div class="btnGroup">
                            <button id="portNameNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__about__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>About You</label>
                        <div class="port__info">
                            <p>If you dont know what to write ans these questions</p>
                            <ul>
                                <li>
                                    Who are you?
                                </li> 
                                <li>
                                    Where you from? 
                                </li>
                                <li> 
                                    Your Story? 
                                </li>
                                <li> 
                                    Your Eduction Detail? 
                                </li>
                                <li>
                                    Where you study? 
                                </li>
                                <li> 
                                    Your Hobbies? 
                                </li>
                                <li> 
                                    Your future goals? 
                                </li>
                                <li> 
                                    What you do in your free time? 
                                </li>
                                <li> 
                                    How you utilize your time
                                </li>
                            <ul/>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea id=${val2} class="about__portfolio" name=${val2} rows="6" cols="50" placeholder="TechMafia is a ...." required></textarea>
                        <div class="btnGroup">
                            <button id="portAboutPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portAboutNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__what__cont hidden portForm">
                    <div class="form__first__cont">    
                        <label>What You Do:</label>
                        <div class="port__info">
                            <p>If you dont know what to write ans these questions</p>
                            <ul>
                                <li>
                                    Describe what you do professionally? 
                                </li>
                                <li>
                                    Let them know you really know the thing you do and your good at it
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea id=${val3} name=${val3} rows="6" cols="50" placeholder="what techmafia do is...." required></textarea>
                        <div class="btnGroup">
                            <button id="portWhatPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portWhatNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__why__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Why You Do it:</label>
                        <div class="port__info">
                            <p>If you dont know what to write ans these questions</p>
                            <ul>
                                <li>
                                    Describe Why you do what you do?
                                </li>
                                <li>
                                    You love doing it?
                                </li>
                                <li>
                                    You love the money it brings in?
                                </li>
                                <li>
                                    You feel you were born to do it?
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea id=${val4} name=${val4} rows="6" cols="50" placeholder="Why TechMafia do it ...." required></textarea>
                        <div class="btnGroup">
                            <button id="portWhyPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portWhyNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__fail__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Your Failure, How Did You tackle your failure</label>
                        <div class="port__info">
                            <p>If you dont know what to write ans these questions</p>
                            <ul>
                                <li>
                                    Describe about a time when you failed to do what you wanted to do
                                </li>
                                <li>
                                    Professional failure or personal / sharable meaningful failure
                                </li>
                                <li>
                                    Then describe how you tackled that failure
                                </li>
                                <li>
                                    One to two experience of failure would be fine
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea type="text" id=${failValue} name=${failValue} rows="6" cols="50" placeholder="i failed i get up dividing my problem findinf the solution...." required></textarea>
                        <div class="btnGroup">
                            <button id="portFailPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portFailNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__moti__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>How Do you motivate yourself?</label>
                        <div class="port__info">
                            <p>If you dont know what to write ans these questions</p>
                            <ul>
                                <li>
                                    How you motivate yourself everyday to keep doing what you do?
                                </li>
                                <li>
                                    You dont need to motivate yourself to do what you do? Think hard*
                                </li>                                    
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea type="text" id=${motiValue} name=${motiValue} rows="6" cols="50" placeholder="When ever i go out of track...." required></textarea>
                        <div class="btnGroup">
                            <button id="portMotiPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portMotiNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__msg__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Your Message To People</label>
                        <div class="port__info">
                            <p>If you dont know what to write ans these questions</p>
                            <ul>
                                <li>
                                    Do you have anything to share?
                                </li>
                                <li>
                                    Like a opinion that you take seriously 
                                </li>
                                <li>
                                    if possible would love it if other start following it to?
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea type="text" id=${msgValue} name=${msgValue} rows="6" cols="50" placeholder="My Message to everyone..." required></textarea>
                        <div class="btnGroup">
                            <button id="portMsgPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portMsgNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__phn__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Phone Number:</label>
                        <div class="port__info">
                            <p>Please provide your phone number with requirements below</p>
                            <ul>
                                <li>
                                    Your phone number where you are most reachable?
                                </li>
                                <li>
                                    You cannot use number which is being used in other portfolio
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <input id=${val5} name=${val5} type="number" placeholder="9999888899" required/>
                        <div class="btnGroup">
                            <button id="portPhnPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portPhnNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__show__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Show Number:</label>
                        <div class="port__info">
                            <p>Your Nnumber is a sensitive matter so we allow you to make it visible or not.</p>
                            <ul>
                                <li>
                                    Turn it on if you want your phone number to be visible
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <input id=${val6} name=${val6} class="checkbox" type="checkbox" />
                        <div class="btnGroup">
                            <button id="portShowPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portShowNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__email__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Email Address:</label>
                        <div class="port__info">
                            <p>Provide your email address with requirements below</p>
                            <ul>
                                <li>
                                    Your Valid Email Address
                                </li>
                                <li>
                                    Please use the one which has your real name and your picture?
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <input id=${val7} name=${val7} type="email" placeholder="techmafia@gmail.com" required/>
                        <div class="btnGroup">
                            <button id="portEmailPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portEmailNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__social__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Your Social Profile Link</label>
                        <div class="port__info">
                            <p>Linking social account to make it easy to reach you.</p>
                            <ul>
                                <li>
                                    Connect your socialmedia account, FB/Insta/Linkedin 
                                </li>
                                <li>
                                    jst copy your social account profile URL Link and paste it
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <input id=${val8} name=${val8} type="text" placeholder="https://www.facebook.com/instagram.com/linkedin.com" />
                        <div class="btnGroup">
                            <button id="portSocialPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portSocialNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__address__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Address</label>
                        <div class="port__info">
                            <p>Enter your location</p>
                            <ul>
                                <li>
                                    Your current address, where you are presently living
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <input id=${val9} name=${val9} type="text" placeholder="your location" required />
                        <div class="btnGroup">
                            <button id="portAddressPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portAddressNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__accomp__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Previous Accomplishments</label>
                        <div class="port__info">
                            <h3>If you dont know what to write ans these questions</h3>
                            <ul>
                                <li>
                                    Describe about your prior work expreience
                                </li>
                                <li>
                                    If no previous experience, share your personal work detail
                                </li>
                                <li>
                                    Anything thats presentable and work related
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea id=${val10} name=${val10} rows="6" cols="50" placeholder="TechMafia has done..." required></textarea>
                        <div class="btnGroup">
                            <button id="portAccompPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portAccompNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__prob__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>Prior Problem You Faced</label>
                        <div class="port__info">
                            <h3>If you dont know what to write ans these questions</h3>
                            <ul>
                                <li>
                                    Describe about the problem you faced while working
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea type="text" id=${probValue} name=${probValue} rows="6" cols="50" placeholder="The biggest problem i faced while i worked or was learning...." required></textarea>
                        <div class="btnGroup">
                            <button id="portProbPrev" type="button" class="port__form__btn">Previous</button>
                            <button id="portProbNext" type="button" class="port__form__btn">Next</button>
                        </div>
                    </div>
                </div>
                <div class="port__soln__cont hidden portForm">
                    <div class="form__first__cont">
                        <label>How you solved your problem?</label>
                        <div class="port__info">
                            <p>If you dont know what to write ans these questions</p>
                            <ul>
                                <li>
                                    How did you solve the problem you mentioned befores
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="form__sec__cont">
                        <textarea type="text" id=${solveValue} name=${solveValue} rows="6" cols="50" placeholder="I just dont give up easy..." required></textarea>
                        <div class="btnGroup">
                            <button id="portSolnPrevious" type="button" class="port__form__btn">Previous</button>
                        </div>
                    </div>
                    <button id=${val11} type="button" class="port__form__btn portSubmit hidden">Create</button>
                </div>
            </div>
        </form>
    `
};




