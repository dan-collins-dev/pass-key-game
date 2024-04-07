const slots = Array.from(document.getElementsByClassName("slot"));
const numBtns = Array.from(document.getElementsByClassName("num-input"));
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
let currentSlotIdx = 0;

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
    submitBtn.disabled = true;
    slots.forEach((element, idx, arr) => {
        if (answer[idx] === +guess[idx]) {
            element.classList.add("correct-color");
        } else {
            element.classList.add("wrong-color");
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

generateKey();