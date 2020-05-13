import React, { useState, useEffect } from "react";
import averageScoreGenerator from "../Utility/averageScoreGenerator";
import randomListGenerator from "../Utility/randomListGenerator";
import lyricsJson from "../data/lyricsJson.json";
import Intro from "../Components/Intro";
import Question from "../Components/Question";
import Answer from "../Components/Answer";
import Result from "../Components/Result";

const Game = ({
  allScores,
  setAvgScore,
  avgScore,
  topScore,
  setAllScores,
  setTopScores
}) => {
  const [round, setRound] = useState(0);
  const [stage, setStage] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameSongs, setGameSongs] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    setGameSongs(randomListGenerator(lyricsJson, 5));
  }, []);

  const setAverage = () => {
    setAvgScore(allScores.length > 0 ? averageScoreGenerator(allScores) : 0);
  };

  const reset = e => {
    e.preventDefault();
    setStage(0);
    setRound(0);
    setCurrentScore(0);
    setGameSongs(randomListGenerator(lyricsJson, 5));
    setGameHistory([]);
  };

  const isEven = stage => {
    if (stage % 2 === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="border text-center">
      {round < 5 && (
        <>
          <p>ROUND {round + 1}</p>
          <p>Current Points: {currentScore}</p>
        </>
      )}
      {stage === 0 && <Intro stage={stage} setStage={setStage} />}
      {!isEven(stage) && stage !== 11 && (
        <Question
          round={round}
          gameSongs={gameSongs}
          stage={stage}
          setStage={setStage}
          gameHistory={gameHistory}
          setGameHistory={setGameHistory}
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
        />
      )}
      {isEven(stage) && stage !== 0 && stage !== 11 && (
        <Answer
          round={round}
          setRound={setRound}
          gameSongs={gameSongs}
          stage={stage}
          setStage={setStage}
          gameHistory={gameHistory}
          setGameHistory={setGameHistory}
          currentScore={currentScore}
        />
      )}
      {stage === 11 && (
        <Result
          round={round}
          setRound={setRound}
          stage={stage}
          setStage={setStage}
          gameHistory={gameHistory}
          setGameHistory={setGameHistory}
          currentScore={currentScore}
          setAverage={setAverage}
          avgScore={avgScore}
          topScore={topScore}
          allScores={allScores}
          setAllScores={setAllScores}
          setTopScores={setTopScores}
        />
      )}
      {stage > 0 && (
        <button
          className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={reset}
        >
          {round === 5 && <>Play Again</>}
          {round !== 5 && <>Reset</>}
        </button>
      )}
    </div>
  );
};

export default Game;
