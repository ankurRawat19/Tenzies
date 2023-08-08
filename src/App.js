import logo from './logo.svg';
import './App.css';
import React from "react";
import Dice from "./components/Dice";
import {nanoid} from "nanoid"
import Confetti from "react-confetti";
import Rolls from "./components/Rolls";
function App() {
    const [dices,setDices] = React.useState(allNewDice);
    const [tenzies,setTenzies] = React.useState(false)
    const [roll,setRoll] = React.useState(0)
    React.useEffect(()=>{
        const allHeld = dices.every(die => die.isHeld)
        const firstValue = dices[0].value
        const allSameValues = dices.every(die => die.value === firstValue)
        if(allHeld && allSameValues){
            setTenzies(true)
            console.log("YOU WON")
        }
    },[dices])

    function generateDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    function allNewDice(){
        let dices = [];
        for(let i = 0 ; i < 10 ; i++){
            dices.push(generateDie())
        }
        return dices
    }

    function rollDice(){
        if(!tenzies){
            setDices(prevState => prevState.map((die) => {
                return die.isHeld ?
                    die : generateDie()
            }))
            setRoll(prevState => prevState + 1)
        }else{
            setTenzies(false)
            setDices(allNewDice)
            setRoll(0)
        }
    }

    function holdDice(id){
        setDices((prevState) => prevState.map((die) => {
            return die.id === id ?{...die,isHeld : !die.isHeld} : die
        }))
    }
    const diceElements = dices.map(dice => <Dice
        key = {dice.id}
        value = {dice.value}
        isHeld = {dice.isHeld}
        holdDice = {()=>{
            holdDice(dice.id)
        }}
    />)

    return (
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <Rolls value = {roll}/>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    );
}

export default App;
