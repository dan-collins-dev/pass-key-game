// testing different branches
// first attempt push to main (didn't want)

const slots = Array.from(document.getElementsByClassName("slot"));
const numBtns = Array.from(document.getElementsByClassName("num-input"));
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
let currentSlotIdx = 0;
const counts = {};

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

submitBtn.disabled = true;


const matchSlots = (e) => {
    let currentCounts = structuredClone(counts);
    submitBtn.disabled = true;
    let matchMap = new Map();

    slots.forEach((element, idx, arr) => {
        console.log(`Anser Index Value: ${answer[idx]}`)
        if (answer[idx] === +guess[idx]) {
            matchMap.set(idx, {slot: element, correct: true, correctPosition: true});
        } else if (answer.includes(+guess[idx]) && answer[idx] !== +guess[idx]) {
            matchMap.set(idx, {slot: element, correct: true, correctPosition: false});
        } else {
            matchMap.set(idx, {slot: element, correct: false, correctPosition: false});
        }
    });
    console.log(matchMap)
};

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
