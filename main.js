const letters="abcdefghijklmnopqrstuvwxyz";
// get array from the letters 
let lettersArray=Array.from(letters);

// select letters container 
let lettersContainer=document.querySelector(".letters");

// Generate the letters 
lettersArray.forEach(letter =>{
    // create the span 
    let span =document.createElement("span");
    // create letter node 
    let theLetter=document.createTextNode(letter);
    // append the letter to span 
    span.appendChild(theLetter);
    // add class to the span 
    span.className='letter-box';
    // append the span to the letter container 
    lettersContainer.appendChild(span);
});

// object of words 
const words={
    programming:["php","javascript","go","scala","fortran","r","musql","python"],
    movies:["prestige","inception","parsite","interstellar","whiplash","mememto","coco","up"],
    people:["Albert Enstein","Hitchock","Alexander","Cleopatra","Mahatma Ghandi"],
    contries:["Syria","Palestine","Yemen","Egypt","Qatar","Bahrain"],
}

// Get random property
let allKeys=Object.keys(words);
// random number depend on keys length 
let ramdomPropNumber=Math.floor(Math.random() * allKeys.length);
// category 
let randomPropName=allKeys[ramdomPropNumber];
// category words 
let randomPropVlaue=words[randomPropName];
// random number depend on words 
let randomValueNumber=Math.floor(Math.random() * randomPropVlaue.length);
// the choosen word 
let randomValueValue=randomPropVlaue[randomValueNumber];

// set category info 
document.querySelector(".game-info span").innerHTML=randomPropName;


// select the letter-gues contaniner 
let letterGuesContainer=document.querySelector('.letters-guess');
// convert chosen word to array
let letterAndSpace=Array.from(randomValueValue);

letterAndSpace.forEach(letter => {
    // create span depend on word
let emptySpan =document.createElement('span');

// if the letters with space
if(letter === ' '){
    emptySpan.className='with-space';
}
// append span to the letter gues container
letterGuesContainer.appendChild(emptySpan);
});

// get the all span 
let guessSpan=document.querySelectorAll(".letters-guess span");
// set the wrong attemps 
let wrongAttempts=0;
// select the draw element 
let theDraw=document.querySelector(".hangman-draw");





//handle clicking on letters
document.addEventListener("click", (e)=>{

    // set the chose stutas 
    let theStatus= false;

    if(e.target.className==='letter-box'){ 
    e.target.classList.add("clicked");

    // get clicked letter 
    let theClickedLetter=e.target.innerHTML.toLowerCase();

    // the chosen word 
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    
    // looping on the chosen word 
    theChosenWord.forEach((wordLetter,wordindex)=>{

        // if the clicked letter equal to one of the chosen word letter 
        if(theClickedLetter === wordLetter){

            // set the stutas to correct ?
            theStatus=true;

            guessSpan.forEach((span,spanIndex)=>{
                if(wordindex === spanIndex){
                    span.innerHTML=theClickedLetter;
                }

            });
        }
});
    if(theStatus !== true){
        wrongAttempts++;
        theDraw.classList.add(`wrong-${wrongAttempts}`);
        document.getElementById('fail').play();
        if(wrongAttempts===8){
            lettersContainer.classList.add('finished');
            endGame();
        }
        
    }else
    document.getElementById('success').play();

}
});

function endGame(){
    let div=document.createElement('div');
    let divText=document.createTextNode(`Game over, the word is ${randomValueValue} `);
    div.appendChild(divText);
    div.className='popup';
    document.body.appendChild(div);
}