const slots = Array.from(document.getElementsByClassName("slot"));
const numBtns = Array.from(document.getElementsByClassName("num-input"));
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
let currentSlotIdx = 0;
const counts = {};
const onMatch = new Event("app:onMatch");

let guess = [];
const answer = [];

numBtns.forEach((element, idx, arr) => {
    element.addEventListener("click", () => {
        if (guess.length === answer.length) {
            element.dispatchEvent(onMatch);
            submitBtn.disabled = false;
        } else {
            guess.push(+element.textContent);
            slots[currentSlotIdx].textContent = element.textContent;
            currentSlotIdx += 1;
        }

        if (guess.length === answer.length) {
            element.dispatchEvent(onMatch);
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
const matchSlots = () => {
    let currentCounts = structuredClone(counts);
    // currentCounts = counts;
    submitBtn.disabled = true;
    slots.forEach((element, idx, arr) => {
        if (answer[idx] === +guess[idx]) {
            element.classList.add("correct-color");
            currentCounts[answer[idx]] -= 1;
            console.log(currentCounts);
        } else {
            // if (answer.includes(+guess[idx] && currentCounts[answer[idx]] > 0)) {
            //     element.classList.add("includes-color");
            // } else {
            //     element.classList.add("wrong-color");
            // }

            if (answer.includes(+guess[idx])) {
                if (currentCounts[answer[idx]] > 0) {
                    element.classList.add("includes-color");
                    // currentCounts[answer[idx]] -= 1;
                } else {
                    element.classList.add("wrong-color");
                }
            } else {
                element.classList.add("wrong-color");
            }
        }
    });
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
    console.log(answer);
};

const createCountList = () => {
    answer.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
    });
};

generateKey();
createCountList();
console.log(counts);
