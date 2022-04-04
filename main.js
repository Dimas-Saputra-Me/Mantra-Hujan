// References to DOM elements
const book = document.querySelector('#book');

const paper1 = document.querySelector('#p1')
const paper2 = document.querySelector('#p2')
const paper3 = document.querySelector('#p3')
const paper4 = document.querySelector('#p4')

const mantraHujan = new Audio('./Mantra-Hujan.mp3')

// Event listeners
window.addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft") { goPrevious() }
    if(e.key === "ArrowRight") { goNext() }
    
    if(e.key === "ArrowUp") { mantraHujan.play() }
})

// Business Logic
let currentState = 1;
let numOfPapers = 4;
let maxState = numOfPapers + 1;


function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook(isFirstPage) {
    if(isFirstPage) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
}

function goNext() {
    if(currentState < maxState) { 
        switch(currentState) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 4:
                closeBook(false);
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;
                break;
            default: 
                throw new Error("unkown state");    
        }

        currentState++;
    }
}

function goPrevious() {
    if(currentState > 1) {
        switch(currentState) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 4;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 3;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 2;
                break;
            case 5: 
                openBook()
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 1;
                break;
        }

        currentState--;
    }
}

// TODO: lirik, auto flip, image fanart, sinkronkan timestamp