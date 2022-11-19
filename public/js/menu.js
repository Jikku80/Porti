let menu = document.getElementById("menu");

menu.innerHTML = `
    <form>
        <div class="form__whole">
            <div class="form__sec">
                <div class="form__sub">
                    <label>Heading</label>
                    <input class="head" type="text" />
                </div>
                <label>Name</label>
                <input class="nameval" type="text" />
                <label>price</label>
                <input class="prcval" type="number" />
            </div>
            <button class="addFields">Add Fields</button>
        </div>
        <br>
        <button class="newSec">Add Section</button>
        <button id="saveF">Save</button>
    </form>
`

let formSec = document.querySelector(".form__sec");
let formWh = document.querySelector(".form__whole");
let newSec = document.querySelector(".newSec")

let count = 0
newSec.addEventListener("click", (e) => {
    e.preventDefault()
    formWh.innerHTML += `
            <div class="form__sec">
                <div class="form__sub">
                    <label>Heading</label>
                    <input class="head" type="text" />
                </div>
                <label>Name</label>
                <input class="nameval" type="text" />
                <label>price</label>
                <input class="prcval" type="number" />
            </div>
            <button class="addFields">Add Fields</button>
        `
})

let addFields = document.querySelectorAll(".addFields");
for (items of addFields) {
    items.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e)

        formSec.innerHTML += `
                <label>Name</label>
                <input class="nameval" type="text" />
                <label>price</label>
                <input class="prcval" type="number" />
            `
    })
}



let saveF = document.getElementById("saveF");

function getnamVal() {
    let namval = document.querySelectorAll(".nameval");
    return [].map.call(namval, el => el.value);
}

const getprcVal = () => {
    let prc = document.querySelectorAll(".prcval");
    return [].map.call(prc, el => el.value);
}

let head = document.querySelectorAll(".head");
let formSub = document.querySelector(".form__sub")
saveF.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(getnamVal());
    console.log(getprcVal());

    for (items of head) {
        item = items.value;
        if (item === "") {
            items.style.backgroundColor = "red";
            formSub.innerHTML += `<p>The Field Cannot be empty</p>`
        }
    }
})






