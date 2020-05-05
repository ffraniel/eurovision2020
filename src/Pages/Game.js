import React from 'react';
import averageScoreGenerator from '../Utility/averageScoreGenerator'; 

const Game = ({allScores, setAvgScore, avgScore, topScore, setAllScores, setTopScores }) => {

  const setAverage = (e) => {
    e.preventDefault();
    setAvgScore(allScores.length > 0 ? averageScoreGenerator(allScores) : 0);
  }

  return (
    <div className="border text-center">
      <h2>Game</h2>
      <button onClick={setAverage}>set Average</button>
      {avgScore &&
        <p>Avg score is {avgScore.toFixed(2)}</p>
      }
    </div>
  )
}

export default Game;