import React,{useState,useEffect} from "react";
import Die from "./components/Die.js"
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'
function App() {
  const [dicess,setDicess]=useState(allNewDice)
  const [tenzies,setTenzies]=useState(false)
  const [rolls,setRolls]=useState(1)
  const [best,setBest]=useState(()=>localStorage.getItem('rolls') || 0)
  useEffect(()=>{
    const allHeld=dicess.every(dice=>dice.isHeld)
    const allSameValue=dicess.every(dice=>dice.value===dicess[0].value)
    if(allHeld && allSameValue ){
      setTenzies(true)
      if(best===0 || best > rolls){
        setBest(rolls)
      }
    }
  },[dicess])
  function allNewDice(){
    const array = [];
    for (let i = 0; i <10;i++){
      array[i]={
        value:Math.floor(Math.random() * 6) + 1,
        isHeld:false,
        id:nanoid()
      };
    }
    return array;
  }
  function rollDicess(){
  setDicess(prevState=>prevState.map(dice=>dice.isHeld ? dice : {...dice,value:Math.floor(Math.random() * 6)+1}))
  setRolls(prevState=>prevState+1)
  }
  function holdDice(id){
    !tenzies && setDicess(prevState=>prevState.map(dice=> dice.id===id ? {...dice,isHeld:!dice.isHeld} : dice))
  }
  function newGame(){
    setTenzies(false)
    setDicess(allNewDice())
    setRolls(1)
  }
  const dicessElements=dicess.map(dice => <Die 
    key={dice.id} 
    value={dice.value} 
    isHeld={dice.isHeld}
    holdingFunction={()=>holdDice(dice.id)}
    />)
  useEffect(()=>{
    localStorage.setItem('rolls',best)
  },[best])
  return (
    <main>
      {tenzies && <Confetti
        width="320px"
        height="380px"
        gravity={0.01}
      />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <h2>Rolls: {rolls}</h2>
      <div className="tenzies-wrapper">
        {dicessElements}
      </div>
      <button onClick={tenzies ? newGame : rollDicess}>{tenzies ? 'New Game' :'Roll'}</button>
      {best!=0 && <h3>Your best: {best} rolls</h3>}
    </main>
  );
}
export default App;
//czas do localstorage