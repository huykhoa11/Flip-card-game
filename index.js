let numberOfFlips = 0;  //count numbers of flips
let numberOfFlipsElement = document.getElementById('countFlips');
const board = document.getElementById('board');
let headerTextElement = document.getElementById('headerText');

let timeElement = document.getElementById('countTime');
let countSeconds = 0;
let countMinutes = 0;
const timerInterVal = setInterval(()=>{
    if(countSeconds < 60) {
        countSeconds += 1;
    }
    else {
        countSeconds = 0;
        countMinutes += 1;
    }
    timeElement.innerHTML = `Time: ${countMinutes}:${countSeconds}`;
},1000)

let isMatched = new Array (18).fill(false);
let isWin = 0;

// const sampleImg = [
//     'img/0.jpg',
//     'img/10.jpg',
//     'img/20.jpg',
//     'img/30.jpg',
//     'img/40.jpg',
//     'img/50.jpg',
//     'img/60.jpg',
//     'img/70.jpg',
//     'img/80.jpg',
// ];

const sampleImages = [
    'backgroundImage0','backgroundImage10', 'backgroundImage20', 'backgroundImage30', 'backgroundImage40', 
    'backgroundImage50', 'backgroundImage60', 'backgroundImage70', 'backgroundImage80'
];
let cardsBackgroundImages = [...sampleImages, ...sampleImages];
cardsBackgroundImages = shuffle(cardsBackgroundImages);     //shuffle and add background image to each item
console.log(cardsBackgroundImages);

function shuffle(arr) {
    const length = arr.length;

    for(let i=0; i<length; i++) {
        //random an index from range(0 -> 17)
        const swapIndex = Math.floor(Math.random() * length);

        // Swap value using destructuring assignment
        [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
    }

    return arr;
}

let cardCompare1 = '';
let indexOfCardCompare1 = 0;
let cardCompare2 = '';
let indexOfCardCompare2 = 0;

let phase = 0;  //Trong 1 turn thì chỉ có thể lật 2 lá. Muốn lật tiếp thì phải đợi 2 lá này úp xuống.
                //VD: lần lật đầu tiên thì phase = 1, lần thứ 2 thì phase = 2. Nếu ko match thì reset phase = 0.


for(let cardsIndex = 0; cardsIndex < 18; cardsIndex++) {

    const cardElement = document.createElement('div');  //create <div></div>
    cardElement.className = 'board__item';              //add class name <div class="board__item"></div>

    cardElement.addEventListener('click', () => {

        const imgLink = cardsBackgroundImages[cardsIndex];
        
        if(phase < 2) {

            //Only can click when cards are unmatched
            if(isMatched[cardsIndex] === false) {
                phase += 1;

                numberOfFlips  += 1;
                numberOfFlipsElement.innerHTML = `Flips: ${numberOfFlips}`
                
                cardElement.classList.remove('board__item--background');
                cardElement.classList.add('toggle');
            }

            if(phase === 1){
                cardCompare1 = `${imgLink}`;
                cardElement.classList.add(`${cardCompare1}`)
                
                indexOfCardCompare1 = cardsIndex;
            }
            else if(phase === 2){
                cardCompare2 = `${imgLink}`;
                cardElement.classList.add(`${cardCompare2}`)

                indexOfCardCompare2 = cardsIndex;
                                
                checkMatchingPair(cardCompare1, cardCompare2);
            }
        }

    })
    board.appendChild(cardElement);


    function checkMatchingPair(cardCompare1, cardCompare2) {

        if(cardCompare1 === cardCompare2) {
            console.log('MATCHING');
            isMatched[indexOfCardCompare1] = true;
            isMatched[indexOfCardCompare2] = true;

            const matchingPair = document.querySelectorAll(`.${cardCompare1}`);
            setTimeout(() => {
                for(let i=0; i<2; i++) {
                    matchingPair[i].classList.remove(`${cardCompare1}`);
                    matchingPair[i].style.background = "#eee";
                    // matchingPair[i].classList.remove('toggle');
                }
                phase = 0;
            },700)

            isWin += 1;
            console.log(isWin);
            if(isWin === 9) {
                headerTextElement.innerHTML = 'You are Win'
                clearInterval(timerInterVal);
            }
        }


        else {
            const matchingCard1 = document.querySelector(`.${cardCompare1}`);
            const matchingCard2 = document.querySelector(`.${cardCompare2}`);
            setTimeout(()=> {
                matchingCard1.classList.remove(`${cardCompare1}`);
                matchingCard1.classList.add('board__item--background')
                matchingCard1.classList.remove('toggle');

                matchingCard2.classList.remove(`${cardCompare2}`);
                matchingCard2.classList.add('board__item--background')
                matchingCard2.classList.remove('toggle');

                phase = 0;
            }, 1100) 
        }
    }
}



