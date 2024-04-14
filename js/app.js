const slots = Array.from(document.getElementsByClassName("slot"));
const slotRows = Array.from(document.getElementsByClassName("slot-container"));
let currentSlotRow = 0
const numBtns = Array.from(document.getElementsByClassName("num-input"));
const submitBtn = document.getElementById("submit-btn");
const clearBtn = document.getElementById("clear-btn");
let currentSlotIdx = 0;
const counts = {};
let guess = [];
const answer = [];
let slotRow = Array.from(slotRows[currentSlotRow].children)

const testSlots = slotRows[0]
console.log(testSlots)

const moveToNextRow = new Event("moveToNextRow")

window.addEventListener("moveToNextRow", () => {
    // disconnectBtns()
    currentSlotRow += 1
    guess.length = [];
    // currentSlotIdx = 0;
    
    console.log(`Current Slot Idx: ${currentSlotIdx}`)
    console.log(`Current guess and length: ${guess}, ${guess.length}`)
    // connectBtns();
})

// Loops through number buttons and adds the event that
// handles ui changes on number button submit when
// guess length matches answer length
const connectBtns = () => {
    console.log(`Current Slot Row: ${currentSlotRow}`)
    console.log(slotRows[currentSlotRow])
    let sr = Array.from(slotRows[0].children)
    numBtns.forEach((element, idx, arr) => {
        element.addEventListener("click", () => {
            // console.log(slotRow[idx].nodeValue)
            if (guess.length !== answer.length) {
                guess.push(+element.textContent);
                slots[currentSlotIdx].textContent = element.textContent;
                currentSlotIdx += 1;
            }
            if (guess.length === answer.length) submitBtn.disabled = false;
        });
    });
}

const disconnectBtns = () => {
    numBtns.forEach((element, idx, arr) => {
        element.removeEventListener("click", () => {
            if (guess.length !== answer.length) {
                guess.push(+element.textContent);
                slotRow[currentSlotIdx].textContent = element.textContent;
                currentSlotIdx += 1;
            }
            if (guess.length === answer.length) submitBtn.disabled = false;
        });
    });
}




// Matches and colors slots in a guess
const matchSlots = (e) => {
    let currentCounts = structuredClone(counts);
    submitBtn.disabled = true;

    let sr = Array.from(slotRows[currentSlotRow].children)
    console.log(sr);
    // Performs matching and assigns the initial style
    sr.forEach((element, idx, arr) => {
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
    sr.forEach((element, idx) => {
        if (element.classList.contains("includes-color")) {
            if (currentCounts[guess[idx]] < 0) {
                element.classList.replace("includes-color", "wrong-color");
            }
        }
    });

    const isEqual = (element, idx) => {
        return element === answer[idx]
    }
    
    console.log(currentCounts);
    
    // do a complete match
    if (guess.every(isEqual)) {
        console.log("COMPLETE MATCH")
        return
    }
    
    
    window.dispatchEvent(moveToNextRow);
    console.log("DONT PRINT IF MATCH")
    // if not full match, if not at last row, move to the next row and add listeners
};

submitBtn.addEventListener("click", matchSlots);

const clearSlots = () => {
    let sr = Array.from(slotRows[currentSlotRow].children)
    sr.forEach((element, idx, arr) => {
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
connectBtns();
console.log(counts);

// set up first row listeners
