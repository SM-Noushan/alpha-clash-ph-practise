// get the element
function getElem(id) {
    return document.getElementById(id);
}
// hide the  element
function hideElem(elem) {
    elem.classList.add('hidden');
}
// show the element
function showElem(elem) {
    elem.classList.remove('hidden');
}
// generate random alphabet
function generateRandomAlphabet() {
    const alphabetString = 'abcdefghijklmnopqrstuvwxyz';
    const alphabets = alphabetString.split('');
    const randNum = Math.round(Math.random() * 25);
    return alphabets[randNum];
}
// set the alphabet
function setAlphabet(alpha) {
    const elem = getElem('current-alphabet');
    document.createElement
    elem.innerText = alpha;
}
// set the score
function setScores(id, value) {
    const elem = getElem(id);
    document.createElement
    elem.innerText = value;
}
// set the keyBackground
function setKeyBG(key, val) {
    const elem = getElem(`key-${key}`);
    if (val)
        elem.classList.add('bg-[#CC8606]');
    else
        elem.classList.add('bg-red-600');
}
// remove keyBackground
function removeKeyBG(key, val) {
    const elem = getElem(`key-${key}`);
    if (val)
        elem.classList.remove('bg-[#CC8606]');
    else
        elem.classList.remove('bg-red-600');
}
// waiting for keyPress event
function waitingKeypress() {
    return new Promise((resolve) => {
        document.addEventListener('keyup', getKey);
        function getKey(e) {
            document.removeEventListener('keyup', getKey);
            resolve(e.key.toLowerCase());
        }
    });
}
// trigger keyPress event
async function keyTrigger(score, life, alphabet) {
    let prevKey, pressedKey;
    do {
        const key = await waitingKeypress();
        if (prevKey) {
            removeKeyBG(prevKey, pressedKey);
        }
        if (key === alphabet) {
            pressedKey = true;
            setKeyBG(key, true);
            score += 1;
            setScores('current-score', score);
        }
        else if (life) {
            pressedKey = false
            setKeyBG(key, false);
            life -= 1;
            setScores('life-points', life);
        }
        prevKey = key;
        alphabet = generateRandomAlphabet();
        setAlphabet(alphabet);
    } while (life);

    const elem = getElem('game-layout');
    const nextElem = elem.nextElementSibling;
    hideElem(elem);
    removeKeyBG(prevKey, pressedKey);
    setScores('final-score', score);
    showElem(nextElem);
}
// continue the game
function game() {
    const alphabet = generateRandomAlphabet();
    setAlphabet(alphabet);
    keyTrigger(0, 3, alphabet);
}
// start the game
function play() {
    const elem = getElem('home');
    const nextElem = elem.nextElementSibling;
    hideElem(elem);
    showElem(nextElem);
    game();
}
function playAgain() {
    setScores('life-points', 3);
    setScores('current-score', 0);
    const elem = getElem('scorecard');
    const prevElem = elem.previousElementSibling;
    hideElem(elem);
    showElem(prevElem);
    game();
} 