let count = 0;
let countFlips = document.getElementById('countFlips');
const board = document.getElementById('board');
let toggleFlag = [];
const sampleImg = [
    './img/0.jpg',
    './img/10.jpg',
    './img/20.jpg',
    './img/30.jpg',
    './img/40.jpg',
    './img/50.jpg',
    './img/60.jpg',
    './img/70.jpg',
    './img/80.jpg',
];
let toggleBgImg = [...sampleImg, ...sampleImg];
toggleBgImg = shuffle(toggleBgImg);     //add background image to each item
console.log(toggleBgImg);

function shuffle(arr) {
    const length = arr.length;

    for(let i=0; i<length; i++) {
        //random an index from range(0 -> 11)
        const swapIndex = Math.floor(Math.random() * length);

        // Swap value using destructuring assignment
        [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
    }

    return arr;
    
}


for(let i=0; i<18; i++) {
    toggleFlag.push(false);
    const div = document.createElement('div');  //create <div></div>
    div.className = 'board__item';              //add class name <div class="board__item"></div>

    div.addEventListener('click', () => {
        count += 1;
        countFlips.innerHTML = `Flips: ${count}`

        const imgLink = toggleBgImg[i];
        if(toggleFlag[i] === false) {           //face-up cards
            div.style.backgroundImage = `url(${imgLink})`;
            div.classList.add('toggle');
        }
        else {      //face-down cards
            div.style.background = 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)';
            div.classList.remove('toggle');
        }

        // div.classList.toggle("toggle");
        toggleFlag[i] = !toggleFlag[i];
    })

    board.appendChild(div);
}

