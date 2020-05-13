import React from "react";

const Answer = ({
  round,
  setRound,
  gameSongs,
  stage,
  setStage,
  gameHistory,
  currentScore
}) => {
  const handleNext = e => {
    setRound(round + 1);
    setStage(stage + 1);
  };

  const points = gameHistory.reduce((acc, curr) => {
    return curr.points + acc;
  }, 0);

  return (
    <div className="p-6">
      {gameSongs[round].country === gameHistory[round].userAnswer && (
        <>
          <h1 className="">Yes!</h1>
          <h1 className="">It was {gameSongs[round].country}</h1>
        </>
      )}
      {gameSongs[round].country !== gameHistory[round].userAnswer && (
        <>
          <h1 className="">Incorrect!</h1>
          <h2>You said {gameHistory[round].userAnswer}</h2>
          <h1 className="">
            The correct answer was {gameSongs[round].country}
          </h1>
        </>
      )}
      <img
        className="inline-block mx-auto mx-w-md"
        src={gameSongs[round].artistImg}
        alt={gameSongs[round].artist}
      />
      <h3>
        The Song was {gameSongs[round].songName} by {gameSongs[round].artist}
      </h3>
      {points === 0 && (
        <p>Still on zero points, back to Eurovision school for you...</p>
      )}
      {points === 1 && (
        <p>Okay, you're on 1 point, things are looking up for you!</p>
      )}
      {points === 2 && <p>2 points, not quite half marks, but nearly!</p>}
      {points === 3 && (
        <p>
          We're all impressed by your showing off, not at all embarassed for
          you, honest!
        </p>
      )}
      {points === 4 && (
        <p>
          Okay, you've either been really lucky with the questions or you know
          your Eurovision/European languages
        </p>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Answer;
