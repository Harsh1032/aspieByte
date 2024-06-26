import React, { useEffect, useState } from 'react'; 
import SingleCard from './SingleCard';
import {Link} from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";

const Game2 = () => {

    const cardImages = [
        {"src": '/img/helmet-1.png', matched: false},
        {"src": '/img/potion-1.png', matched: false},
        {"src": '/img/ring-1.png', matched: false},
        {"src": '/img/scroll-1.png', matched: false},
        {"src": '/img/shield-1.png', matched: false},
        {"src": '/img/sword-1.png', matched: false},
    ]
    
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    //shuffle cards
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffleCards)
        setTurns(0);
    }

    //handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
        console.log(card);
    }

    //compare two selected cards
    useEffect(() => {
        
        if(choiceOne && choiceTwo){
            setDisabled(true)
            if(choiceOne.src === choiceTwo.src){
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === choiceOne.src){
                            return {...card, matched: true}
                        }else{
                            return card
                        }
                    })
                })
                resetTurn();
            }else{
                setTimeout(() => resetTurn(), 1000)
            }
        }

    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    //start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, [])

  return (
    <div className='h-screen bg-[#1b1523] w-full'>
    <Link to ='/content/3003'><div className=' w-[50px] ml-auto pr-5 pt-5 bg-[#1b1523] h-[3%]'>
      <LuLogOut size = {40} style ={{color: '#ffffff'}}/>
    </div></Link>
    <div className='h-[95%] w-full bg-[#1b1523] text-[#fff] flex justify-center m-auto'>
        <div className='pt-[40px]'>
            <h1 className='font-bold text-4xl pl-[175px]'>Magic Match</h1>
            <p className='mt-3 pl-[250px] mb-2'>Turns: {turns}</p>
            <div className='mt-[10px] grid grid-cols-4 gap-4'>
                {cards.map(card => (
                  <SingleCard 
                    key = {card.id} 
                    card = {card} 
                    handleChoice = {handleChoice}
                    flipped = {card === choiceOne || card === choiceTwo || card.matched}
                    disabled = {disabled}
                  />
                ))}
            </div>
            <div className='flex justify-between'>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={shuffleCards}>Reset Game</button>
                <Link to='/game1'><button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={shuffleCards}>Change Game</button></Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Game2