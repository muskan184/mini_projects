let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-contianer   ");
let msg = document.querySelector("#msg")
let turn0 = true;
let count = 0;

const wingPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach(box => {
    box.addEventListener("click", () => {
        console.log("Box is Clicked");
        if (turn0) {
            box.innerHTML = "O";
            turn0 = false;
        }
        else {
            box.innerHTML = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    })
});
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const disableBoxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const showWinner = (winner) => {
    console.log(count);
    
    if (count == 9) {
        msg.innerText = `Game is Tie`;
    }
    else {
        msg.innerText = `Congratulations, The Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
}

function checkWinner() {
    for (let pattern of wingPatterns) {

        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val)
                showWinner(pos1val);
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);