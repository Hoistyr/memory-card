import React, {useState, useEffect} from 'react';
import adolin from '../images/adolin.png';
import dalinar from '../images/dalinar.png';
import hoid from '../images/hoid.png';
import jasnah from '../images/jasnah.png';
import kaladin from '../images/kaladin.png';
import navani from '../images/navani.png';
import rock from '../images/rock.png';
import shallan from '../images/shallan.png';
import szeth from '../images/szeth.png';
import taravangian from '../images/taravangian.png';
import teft from '../images/teft.png';
import zahel from '../images/zahel.png';

const Cards = () => {
  console.log('at top');
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [characterNamesArray, setCharacterNamesArray] = useState([
    'Adolin', 'Dalinar', 'Hoid', 'Jasnah', 'Kaladin', 'Navani', 'Rock', 'Shallan', 'Szeth', 'Taravangian', 'Teft', 'Zahel'
  ]);

  const [clickedObject, setClickedArray] = useState({
    Adolin: false, Dalinar: false, Hoid: false, Jasnah: false, Kaladin: false, Navani: false, Rock: false, Shallan: false, Szeth: false, Taravangian: false, Teft: false, Zahel: false,
  })

  const imageSourcesArray = [
    {adolin}, {dalinar}, {hoid}, {jasnah}, {kaladin}, {navani}, {rock}, {shallan}, {szeth}, {taravangian}, {teft}, {zahel}
  ];

  const handleCardClick = (event) => {
    const namesCopy = [...characterNamesArray];
    shuffleNamesArray(namesCopy);
    
    let clickedName = '';
    if (event.target.className !== 'cardDiv') {
      clickedName = event.target.parentNode.attributes.characterid.value;
    }

    const clickedCopy = {...clickedObject};
    console.log('clickedCopy: ', clickedObject);

    // If a character has already been clicked before
    if (clickedCopy[clickedName] === true) {
      setScore(0);
      
      for (const character in clickedCopy) {
        clickedCopy[character] = false;
      }
      console.log('shouldBeFalse: ', clickedCopy);
      // If a character hasn't been clicked before
    } else {
      setScore(prevScore => {
        const currentScore = prevScore + 1;
        return currentScore;
      });
      if (score >= bestScore) {
        console.log('bestScore setter: ', score);
        setBestScore(prevScore => {
          const currentScore = prevScore + 1;
          return currentScore;
        });
      }
      clickedCopy[clickedName] = true;
    }

    setClickedArray(clickedCopy);
    console.log('clickedCopy: ', clickedCopy);
  }

  const shuffleNamesArray = (copy) => {
    for (let i = copy.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setCharacterNamesArray(copy);
  }

  const cardsArray = characterNamesArray.map((name) => {
    const lowName = name.toLowerCase();

    // Returns the src of the image for the right character
    let imgSrc = '';
    imageSourcesArray.forEach((imgObject) => {
      if (lowName in imgObject) {
        imgSrc = imgObject[lowName];
      };
    });
    
    const cardDiv =
      <div 
      className="cardDiv" 
      key={lowName}
      characterid={name}
      onClick = {handleCardClick.bind(this)}
      > 
        <img 
          src = {imgSrc}
          className = "cardImage"
          alt = {`Fan drawing of ${name} from Brandon Sanderson's The Stormlight Archive`}
        />
        <p className="nameText">{name}</p>
      </div>;
    
    const cardObject = {
      name: name,
      div: cardDiv,
      clicked: false
    };

    return cardObject;
  });

  const cardsDivArray = cardsArray.map((object) => {
    return object.div;
  });

  let scoreDiv = 
  <div className="scoreDiv">
    <p className="bestScore">Best Score: {bestScore}</p>
    <p className="currentScore">Current Score: {score}</p>
  </div>;
  if (score === 12) {
    scoreDiv = 
    <div className="scoreDiv">
      <p className="winningText">You won, you got all 12!</p>
  </div>;
  }

  console.log('clickedArray: ', clickedObject);
  console.log('bottom cardsArray: ', cardsArray);
  return (
    <div className="game">
      {scoreDiv}
      <div className="cards">
      {cardsDivArray}
      </div>
    </div>
  );
};

export default Cards;