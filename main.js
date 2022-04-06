// Import
import { imageBookUrl, imageFanArtsUrl } from "./images.js";
import { lyrics } from "./lyrics.js";
import { timestamp } from "./timestamp.js";

// Make lyrics paper
const book = document.querySelector('#book');
let mainPage = document.createElement("div")
mainPage.className = "paper";
mainPage.style = "z-index: 0;";
mainPage.innerHTML = `
    <div class="front">
        <div id="f1" class="front-content">
            <h1 style="font-size: 1.5em;">Mantra Hujan</h1>
            <h1 style="font-size: 1.5em; margin-bottom: 40px;">Kobo Kanaeru</h1>
            <img class="cover-img" src="${imageBookUrl}" alt="images">
        </div>
    </div>
    <div class="back">
        <div id="b1" class="back-content">
            <div class="content">
                <h1>${lyrics[0]}</h1>
            </div>
        </div>
    </div>
`
book.appendChild(mainPage)

for(let i=1; i<=lyrics.length-1; i++){
let page = document.createElement('div')
page.className = "paper";
page.style = `z-index: ${i*-1};`
page.innerHTML = `
    <div class="front">
        <div id="f${i}" class="front-content">
            <img class="cover-img" src="${imageFanArtsUrl[i]}" alt="images">
        </div>
    </div>
    <div class="back">
        <div id="b${i}" class="back-content">
            <h1>${lyrics[i]}</h1>
        </div>
    </div>
`
book.appendChild(page)
}

// References to DOM elements
const paper = document.querySelectorAll(".paper")

// Add audio
let mantraHujan = new Audio("./Mantra-Hujan.mp3")

// Event listeners
window.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        //Play audio
        mantraHujan.play()

        //Auto flip book
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        (async () => {
            for (let time of timestamp) {
                await sleep(time)
                goNext()
            }
        })()

        window.start = Date.now()
    }

    // if (e.key === "ArrowRight") {
    //     goNext()
    // }
    // if (e.key === "ArrowLeft") {
    //     goPrevious()
    // }
})


// Business Logic
let currentState = 1;
let numOfPapers = paper.length;
let maxState = numOfPapers + 1;


function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook(isFirstPage) {
    if (isFirstPage) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
}

function goNext() {
    if (currentState < maxState) {
        if (currentState === 1) {
            openBook();
        }

        paper[currentState - 1].classList.add("flipped");
        paper[currentState - 1].style.zIndex = currentState;

        if (currentState === numOfPapers) {
            closeBook(false);
        }

        currentState++;
    }
}

function goPrevious() {
    if (currentState > 1) {

        if (currentState === 2) {
            closeBook(true)
        }

        paper[currentState - 2].classList.remove("flipped")
        paper[currentState - 2].style.zIndex = maxState - currentState + 1;


        if (currentState === maxState) {
            openBook()
        }

        currentState--;
    }
}

// TODO: design text-lyrics, click book to play, polish synchronize timestamp
// TODO: (OPTIONAL) reset when song end