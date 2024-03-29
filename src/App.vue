<template>
  <div>
    <h1>Tic Tac Toe</h1>
    <div class="centered">
        <button id="start" class="startButton" @click="startGame" v-if="!isGameStarted">Start</button>
    </div>
    <router-view/>
    <GameBoard v-if="isGameStarted"/>
  </div>
  
</template>


<script>
import GameBoard from './components/GameBoard.vue'

export default {
  name: "App",
  components: { GameBoard },
  data() {
    return {
      isGameStarted : false,
    }
    
  },
  methods: {
    manageGame(){
      this.isGameStarted = true;
    },
    startGame() {
      this.manageGame();
    },
    changePawn() {
      console.log("click")
    }
  }
    
  
}
</script>

<style>
html{
    background-color: #568989;
    font-size: 62,5%;
    --main-color : #568989;
    --dark-color : rgb(57, 63, 107);
    --soft-dark-color : rgba(57, 63, 107, 0.2);
}

h1, h2, h3, .startButton, .textEnd{
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
}

h1{
    font-size: 7rem;
    text-align: center;
    text-decoration: underline dotted var(--dark-color);
    margin: 40px 40px 0px 40px;
}

h2, .pawn, .textEnd{
    font-size: 100px;
    margin: 5px 5px;
    color: var(--dark-color);
}
.textEnd{
    font-weight: 700;
    font-size: 85px;
}
#pawnTurn{
    font-size: 2.3rem;
}

h3{
    font-size: 1.4rem;
    margin: 0px 20px;
}

.centered{
    display: flex;
    justify-content: center;    
}
button, input{
    border: solid 2px white;
    border-radius: 20px ;
    background-color: var(--main-color);
    padding: 5px 15px;
    font-size: 20px;
    color: white;
    margin-top: 10px ;
}

button:hover{
    background-color: var(--dark-color);
}

#divBoardGame{
    display: flex;
    justify-content: center;
    align-items: end;
    padding: 40px;   
}

.boardGameSides{
    width: 200px;
}

.boardGame{
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 130px);
    grid-template-rows: repeat(3, 130px);
}

.case{
    border: solid 3px white;
    display: flex;
    justify-content: center; 
}

input{
    width: 135px;
    border-color: #ffffff63;
}
</style>
