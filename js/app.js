const slots = Array.from(document.getElementsByClassName("slot"));
const numBtns = Array.from(document.getElementsByClassName("num-input"));
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
let currentSlotIdx = 0;
const counts = {};
const onMatch = new CustomEvent("app:onMatch");
const renderSlots = new CustomEvent("app:renderSlots", {detail: {counts}});

let guess = [];
const answer = [];

numBtns.forEach((element, idx, arr) => {
    element.addEventListener("click", () => {
        if (guess.length === answer.length) {
            // element.dispatchEvent(onMatch);
            submitBtn.disabled = false;
        } else {
            guess.push(+element.textContent);
            slots[currentSlotIdx].textContent = element.textContent;
            currentSlotIdx += 1;
        }

        if (guess.length === answer.length) {
            // element.dispatchEvent(onMatch);
            submitBtn.disabled = false;
        }
    });
});

// document.addEventListener("app:onMatch", () => {
//     if (guess.length === answer.length) {
//         submitBtn.disabled = false;
//     } else {
//         submitBtn.disabled = true;
//     }
// });

submitBtn.disabled = true;

// Contains the logic for matching guess against answer
// as well removing invalid
const matchSlots = (e) => {
    let currentCounts = structuredClone(counts);
    submitBtn.disabled = true;
    let matchObj = new Map();
    // let colorMatches = [];

    slots.forEach((element, idx, arr) => {
        console.log(`Anser Index Value: ${answer[idx]}`)
        if (answer[idx] === +guess[idx]) {
            currentCounts[]
            matchObj.set(idx, {slot: element, correct: true, correctPosition: true, guess: +guess[idx], answer: answer[idx], numCounts: 0});
        } else if (answer.includes(+guess[idx]) && answer[idx] !== +guess[idx]) {
            matchObj.set(idx, {slot: element, correct: true, correctPosition: false, guess: +guess[idx], answer: answer[idx], numCounts: 0});
        } else {
            matchObj.set(idx, {slot: element, correct: false, correctPosition: false, guess: +guess[idx], answer: answer[idx], numCounts: 0});
        }
    });
    console.log(matchObj)

    // style corrects
    matchObj.forEach((element) => {
        console.log(element);
    })

    let incorrectMap = new Map()
    // Style slots
    matchObj.forEach((element, idx, arr) => {
        // console.log(`Value of Answer IDX: ${answer[idx]}`)
        console.log(`Element num counts: ${element.numCounts}`)

        if (element.correct === false) {
            element.slot.classList.add("wrong-color")
        }

        if (element.correct === true && element.correctPosition === false) {
            element.numCounts += 1;
            if (element.numCounts > counts[idx]) {
                element.slot.classList.add("wrong-color")
            }
            else {

                element.slot.classList.add("includes-color");
            }
        }

        if (element.correct === true && element.correctPosition === true) {
            element.numCounts += 1
            
             element.slot.classList.add("correct-color")
            // if () {
            //     element.slot.classList.add("correct-color")

            // }
            // else {
            //     element.slot.classList.add("includes-color")
            // }
            // element.numCounts -= 1
        
        }
        else if (element.correct == true && element.correctPosition === false) {
            element.numCounts += 1;
            if (element.numCounts <= currentCounts[answer[idx]]) {
                element.slot.classList.add("includes-color")
            } else {
                element.slot.classList.add("wrong-color")
            }
        }

        else {
            element.slot.classList.add("wrong-color")
        }
    });
    // console.log(incorrectMap)
};

const updateStyles = (arr) => {
    console.log(arr)
}


submitBtn.addEventListener("click", matchSlots);

const clearSlots = () => {
    slots.forEach((element, idx, arr) => {
        guess.length = 0;
        currentSlotIdx = 0;
        element.textContent = "";
        element.classList.remove("correct-color");
        element.classList.remove("wrong-color");
        element.classList.remove("includes-color");
        submitBtn.disabled = true;
    });
};

clearBtn.addEventListener("click", clearSlots);

const generateKey = () => {
    for (let i = 0; i < 4; i++) {
        answer[i] = Math.floor(Math.random() * 4);
    }
    console.log(`Answer: ${answer}`);
};

const createCountList = () => {
    answer.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
    });
};

generateKey();
createCountList();
console.log(counts);
