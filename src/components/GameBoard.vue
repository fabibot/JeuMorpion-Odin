<template>
     <h3 id="pawnTurn" > {{ pawn }} </h3>
    <div id="divBoardGame">
        <div class="boardGameSides">
            <div v-if="nameIsValid" id="playerNames">
                <h3  >{{ namePlayer1 }}</h3>
                <h3> vs </h3>
                <h3>{{ namePlayer2 }}</h3>
            </div>
            
            <div v-else>
                 <input type="text" placeholder="Player 1" v-model="namePlayer1"> 
                 <h3>vs</h3> 
                 <input type="text" placeholder="Player 2" v-model="namePlayer2">
            </div>
            <button @click="changeNames" >Change names</button>

        </div>
        <div class="boardGame"> 
            <div v-for="element in allCase" :key="element.index" class="case" @click="handleRound(element)">
                <h2 :id='element.index' class="pawn">{{ element.playerPawn }}</h2>
            </div>
        </div>
        <div class="boardGameSides"></div>
    </div>
    <div class="centered">
        <button id="restart" @click="restartGame" >restart</button>
    </div>
    <EndMessage v-if="gameIsEnd" :winner="winner"/>
</template>

<script> 
import EndMessage from '/home/fabi/repos/jeu-morpion-vue/src/components/EndMessage.vue'
export default {
    name: 'GameBoard',
    props: [ ],
    components: { EndMessage },
    data() {
        return {
            namePlayer1 : "Player 1",
            namePlayer2: "Player 2",
            isPlayer1Turn : true,
            pawn : "X",
            roundCount : 0,
            maxRound: 9,
            allCase : [
                {index: 'A1', playerPawn : '', isOccuped : false },
                {index: 'A2', playerPawn : '', isOccuped : false},
                {index: 'A3', playerPawn : '', isOccuped : false},
                {index: 'B1', playerPawn : '', isOccuped : false},
                {index: 'B2', playerPawn : '', isOccuped : false},
                {index: 'B3', playerPawn : '', isOccuped : false},
                {index: 'C1', playerPawn : '', isOccuped : false},
                {index: 'C2', playerPawn : '', isOccuped : false},
                {index: 'C3', playerPawn : '', isOccuped : false}
            ],
            gameIsEnd : false,
            winner : null, 
            nameIsValid : true
        }
    },
    methods: {
        handleRound(element) {
            if(!element.isOccuped) {
                element.playerPawn = this.pawn;
                element.isOccuped = true;
                this.roundCount++;
               
             
                if(this.roundCount > 3 ){
                    if(this.checkForWinner(this.pawn)) {
                        this.endOfTheGame(this.pawn);
                    }
                }if(this.roundCount == this.maxRound) {
                    this.endOfTheGame();
                }
                 if(this.isPlayer1Turn){
                    this.pawn = "O";
                } else {
                    this.pawn = "X";
                }
                this.isPlayer1Turn = !this.isPlayer1Turn;
            }
           
        },
        checkForWinner(player){
            let winner = false;
            const caseOccupedByPlayer = this.allCase.filter((element) => element.playerPawn == player);
            let combinaisonTotal = "";
            for(const element of caseOccupedByPlayer){
                combinaisonTotal = combinaisonTotal + element.index;
            }
            console.log(combinaisonTotal);
            let gridRef = ['A', 'B', 'C', '1', '2', '3'];
            let diagonal1 = ['A1', 'B2', 'C3'];
            let diagonal2 = ['A3', 'B2', 'C1'];
            for (const elements of gridRef){
                let found = combinaisonTotal.split(elements).length - 1;
                const isInArray = (currentValue) => combinaisonTotal.includes(currentValue);
                if (found == 3 || diagonal1.every(isInArray) || diagonal2.every(isInArray)){
                    console.log("wow!")
                    return winner = true;
                } 
            }       
            return winner;
        },
        endOfTheGame(playerWhoWin) {
            console.log("the winner is : " + playerWhoWin)
            if(playerWhoWin){
                for(let element of this.allCase){
                element.isOccuped = true;
                }
                if(playerWhoWin == "X"){
                    this.winner = this.namePlayer1;
                } else {
                    this.winner = this.namePlayer2;
                }
            } else {
                this.winner = "Nobody";
            }      
            this.gameIsEnd = true;  
        }, 
        restartGame(){
            this.isPlayer1Turn = true;
            this.pawn = "X";
            this.roundCount = 0;
            this.allCase = [
                {index: 'A1', playerPawn : '', isOccuped : false },
                {index: 'A2', playerPawn : '', isOccuped : false},
                {index: 'A3', playerPawn : '', isOccuped : false},
                {index: 'B1', playerPawn : '', isOccuped : false},
                {index: 'B2', playerPawn : '', isOccuped : false},
                {index: 'B3', playerPawn : '', isOccuped : false},
                {index: 'C1', playerPawn : '', isOccuped : false},
                {index: 'C2', playerPawn : '', isOccuped : false},
                {index: 'C3', playerPawn : '', isOccuped : false}
            ];
            this.gameIsEnd = false;
            this.winner = null  
        },
        changeNames() {
            this.nameIsValid = !this.nameIsValid;
            

        }
    }
}
</script>

<style>

</style>