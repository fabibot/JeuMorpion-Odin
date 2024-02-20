const startButton = document.querySelector('.startButton');
const hiddenElements = document.querySelectorAll('.hiddenFirst');
const restartButton = document.querySelector('#restart');

startButton.addEventListener('click', () =>{
    hiddenElements.forEach((element) => element.style.visibility = "visible");
    startButton.style.visibility = "hidden";
    startGame();
})

// restartButton.addEventListener('click', () => {
//     startGame();
// });

let allCaseList = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3' ];
let caseGameList = [];
const displayPawnTurn = document.querySelector('#pawnTurn');

const gameBoard = {
    case : "ABC",
    jeu : null
}

function Player(name, pawn){
    this.name = name;
    this.pawn = pawn;
}

function startGame(){
    let isPlayer1Turn = true;
    let totalRound = 5;
    let roundCount = 0;
    let nameToGreet1 = prompt("Player 1 name : ");
    let nameToGreet2 = prompt("Player 2 name : ");
    const h3 = document.querySelector('h3');
    h3.textContent = nameToGreet1 + " VS " + nameToGreet2;
    caseGameList = [];

    const player1 = new Player(nameToGreet1, "X");
    const player2 = new Player(nameToGreet2, "O");

    for (let i = 0; i < 9; i++){ 
        caseGameList[i] = Object.create(gameBoard);
        caseGameList[i].case = allCaseList[i];
    }
    
    while(roundCount < totalRound){
        if(isPlayer1Turn){
            turn(player1);
            if(checkForWinner(player1)){
                endOfTheGame(player1);
                break;
            };
            isPlayer1Turn = false;
        }
        else{
            turn(player2);
            if(checkForWinner(player2)){
                endOfTheGame(player2);
                break;
            };

            isPlayer1Turn = true;
        }
       roundCount++; 
    }
   if(roundCount == totalRound){ 
        endOfTheGame();
    }
}

function turn(player){
    displayPawnTurn.textContent = player.pawn;
    let playerMove;
    do {
        playerMove = prompt("Player " + player.name + " turn :");
    } while (checkCase(player, playerMove));
}

function checkCase(player, playerMove){
    for (let i = 0; i < caseGameList.length; i++){
        if(caseGameList[i].case == playerMove){
            if(caseGameList[i].jeu == null){
                caseGameList[i].jeu = player.pawn;
                return false;
            } else {
                console.log("case déjà occupé, rejouez une case valide");
                return true;
            }
        }
    }
}

function checkForWinner(player){
    let winner = false;
    const caseX = caseGameList.filter((caseGameList) => caseGameList.jeu == player.pawn);
    let combinaisonTotal = "";
    for(const items of caseX){
        combinaisonTotal = combinaisonTotal + items.case;
    }
    console.log(combinaisonTotal);
    let gridRef = ['A', 'B', 'C', '1', '2', '3'];
    let diagonaleCount = 0;
    for (const elements of gridRef){
        let found = combinaisonTotal.split(elements).length - 1;
        if (found == 1){
            diagonaleCount++;
        }
        if (found == 3 || diagonaleCount == 6){
            console.log("X a gagné! "+found);
            return winner = true;
        } 
    } 
    return winner;
}

function endOfTheGame(winner){
    if (!winner){
        console.log("Egality.")
    } else{
        console.log("The winner is " + winner.name);
    }
}