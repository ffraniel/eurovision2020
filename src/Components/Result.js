import React, { useEffect } from "react";

const Result = ({
  round,
  stage,
  setStage,
  gameHistory,
  setGameHistory,
  currentScore,
  avgScore,
  setAverage,
  topScore,
  allScores,
  setAllScores,
  setTopScores
}) => {
  useEffect(() => {
    console.log("called it");
    // setAllScores(prevAllScores => [...allScores, currentScore]);
    // setAverage();
  }, [allScores, currentScore, setAverage, setAllScores]);

  return (
    <div className="p-6">
      <p className="block">Your score is {currentScore} / 5</p>
      <p>Your previous top scores is {topScore}</p>
      <p>Your average score is {avgScore}</p>
    </div>
  );
};

export default Result;
