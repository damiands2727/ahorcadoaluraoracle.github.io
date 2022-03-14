const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts= document.querySelectorAll(".figure-part");
const addword = document.getElementById ('addword');
const btnaniadir = document.getElementById ('botonaniadir');
const btnotrapalabra = document.getElementById ('otrapalabra');
const btnletra = document.getElementById ('btn-letter');
let boolrepetida= false;

var words = ['ORACLE', 'ALURA'];

console.log (words)

var selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'GANASTE, la palabra era ' + '"' +selectedWord+'"';
        popup.style.display= 'flex';
    }
}

// Update the wrong letters
function updateWrongLetterE1(){
    //Display wrong letters
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'PERDISTE, la palabra era '+ '"'+ selectedWord+'"';
        popup.style.display = 'flex';
    }
}

//Show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press

function functionletter () {

    if (boolrepetida === false) {
    window.addEventListener('keydown', e =>{
        if(e.keyCode >= 65 && e.keyCode <=90){
            var letter = e.key;
            letter = letter.toUpperCase ();
    
            if(selectedWord.includes(letter)){
                if(!correctLetters.includes(letter)){
                    correctLetters.push(letter);
    
                    displayWord();
                } else{
                    showNotification();
                }
            } else{
                if(!wrongLetters.includes(letter)){
                    wrongLetters.push(letter);
    
                    updateWrongLetterE1();
                } else{
                    showNotification();
                }
            }
        }
    });
    }
    boolrepetida = true;

}




//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();

function aniadirpalabra() {
    var addword2 = document.getElementById("addword").value;
    if (addword2 !== "") {
        words.push(addword2);
    }


}
function otrapalabra(){
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord()
}