// Import
import { imageBookUrl, imageFanArtsUrl, credits } from "./images.js";
import { lyrics } from "./lyrics.js";
import { timestamp } from "./timestamp.js";

// Modal Infomation for user
var modalWrap = null;
const showModal = (title, description, yesBtnLabel, callback) => {
    if (modalWrap !== null) {
        modalWrap.remove();
    }

    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
      <div class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-light">
              <h5 class="modal-title">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${description}</p>
            </div>
            <div class="modal-footer bg-light">
              <button id="button" type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">${yesBtnLabel}</button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalWrap.querySelector('.modal-success-btn').onclick = callback;

    document.body.append(modalWrap);

    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}
//Show modal information
showModal(
    "INGFO",
    "Silahkan klik pada buku di tengah layar atau klik tombol Play untuk mulai memutar lagu dan lirik, Tunggu... dan selamat menikmati<br>Ehe~<br><br>Background credits: @Andrillya92<br>Front-Page book photo credit: @aru_shina",
    "Play",
    playSong
)

// Make lyrics paper
const book = document.querySelector('#book');
let mainPage = document.createElement("div")
mainPage.className = "paper";
mainPage.style = "z-index: 0;";
mainPage.innerHTML = `
    <div class="front">
        <div id="f1" class="front-content">
            <div class="judul custom-font-style">Mantra Hujan</div>
            <div class="judul custom-font-style">Kobo Kanaeru</div>
            <img class="cover-img" src="${imageBookUrl}" alt="images">
        </div>
    </div>
    <div class="back">
        <div id="b1" class="back-content">
            <div class="content">
                <h1 class="lyrics custom-font-style">${lyrics[0]}</h1>
            </div>
        </div>
    </div>
`
book.appendChild(mainPage)

for (let i = 0; i < lyrics.length - 1; i++) {
    let page = document.createElement('div')
    page.className = "paper";
    page.style = `z-index: ${(i + 1) * -1};`
    page.innerHTML = `
    <div class="front">
        <div id="f${i + 2}" class="front-content">
            <img class="cover-img" src="${imageFanArtsUrl[i]}" alt="images">
            <div class="author">@${credits[i]} </div>
        </div>
    </div>
    <div class="back">
        <div id="b${i + 2}" class="back-content">
            <h1 class="lyrics custom-font-style">${lyrics[i + 1]}</h1>
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
// (Desktop)
window.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        playSong();
    }

})
// Mobile Play
let coverPage = document.getElementById("f1");
coverPage.addEventListener("click", playSong);
coverPage.style = "cursor: pointer;"

function playSong() {
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
}

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
    } else {
        //Reset buku
        closeBook(true)
        currentState = 1;
        [...paper].forEach((val, idx) => {
            val.classList.remove("flipped")

            if (idx === 0) {
                val.style.zIndex = idx;
            } else {
                val.style.zIndex = idx * -1;
            }
        })
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
