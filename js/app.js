const slots = Array.from(document.getElementsByClassName("slot"));
const slotRows = Array.from(document.getElementsByClassName("slot-container"));
const numBtns = Array.from(document.getElementsByClassName("num-input"));
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
let currentSlotIdx = 0;
const counts = {};
console.log(slotRows[0]);
console.log(slotRows.length);
let guess = [];
const answer = [];

// Loops through number buttons and adds the event that
// handles ui changes on number button submit when
// guess length matches answer length
numBtns.forEach((element, idx, arr) => {
    element.addEventListener("click", () => {
        if (guess.length !== answer.length) {
            guess.push(+element.textContent);
            slots[currentSlotIdx].textContent = element.textContent;
            currentSlotIdx += 1;
        }
        if (guess.length === answer.length) submitBtn.disabled = false;
    });
});


// Matches and colors slots in a guess
const matchSlots = (e) => {
    let currentCounts = structuredClone(counts);
    submitBtn.disabled = true;

    // Performs matching and assigns the initial style
    slots.forEach((element, idx, arr) => {
        if (!answer.includes(guess[idx])) {
            element.classList.add("wrong-color");
        } else {
            if (answer[idx] === guess[idx]) {
                element.classList.add("correct-color");
            } else {
                element.classList.add("includes-color");
            }
            currentCounts[guess[idx]] -= 1;
        }
    });

    // Repaints included items if the number exceeds the number
    // of occurences of the number
    slots.forEach((element, idx, arr) => {
        if (element.classList.contains("includes-color")) {
            if (currentCounts[guess[idx]] < 0) {
                element.classList.replace("includes-color", "wrong-color");
            }
        }
    });

    console.log(currentCounts);
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

submitBtn.disabled = true;
generateKey();
createCountList();
console.log(counts);
