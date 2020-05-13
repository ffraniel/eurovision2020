import React from "react";
import lyricsJson from "../data/lyricsJson.json";
import snippetGenerator from "../Utility/snippetGenerator";
import alternativeChoiceGenerator from "../Utility/alternateChoiceGenerator";
import shuffle from "../Utility/shuffle";

const Question = ({
  round,
  gameSongs,
  stage,
  setStage,
  setGameHistory,
  gameHistory,
  currentScore,
  setCurrentScore
}) => {
  const snippetText = snippetGenerator(gameSongs[round].lyrics);

  const optionsArray = alternativeChoiceGenerator(
    lyricsJson,
    gameSongs[round].country
  );

  optionsArray.push(gameSongs[round]);
  const choices = shuffle(optionsArray);

  const speak = (lyrics, startOver = true) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = lyrics;
    msg.pitch = 1.3;
    msg.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
    if (startOver) {
      setTimeout(() => {}, 100);
    }
  };

  if (window.speechSynthesis === undefined) {
    window.speechSynthesis = false;
  }

  const stopSpeaking = () => {
    speechSynthesis.cancel();
  };

  const handleAnswer = answer => {
    setStage(stage + 1);
    let updatedHistory = [...gameHistory];
    updatedHistory.push({
      round,
      choices,
      correctAnswer: gameSongs[round],
      userAnswer: answer,
      points: gameSongs[round].country === answer ? 1 : 0
    });
    let roundPoints = gameSongs[round].country === answer ? 1 : 0;
    setCurrentScore(currentScore + roundPoints);
    setGameHistory(updatedHistory);
  };

  return (
    <div className="p-6">
      <h3 className="block">Name the country from the words!</h3>
      {speechSynthesis && (
        <section className="m-2 bg-yellow-200 p-4">
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 m-2 rounded"
            onClick={() => {
              speak(snippetText);
            }}
          >
            Speak It!
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 m-2 rounded"
            onClick={() => {
              stopSpeaking();
            }}
          >
            Stop
          </button>
        </section>
      )}
      {snippetText && (
        <p className="my-2 mx-auto max-w-lg">...{snippetText}...</p>
      )}
      {choices &&
        choices.map(option => {
          return (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
              key={option.country}
              onClick={e => {
                e.preventDefault();
                handleAnswer(option.country);
              }}
            >
              {option.country}
            </button>
          );
        })}
    </div>
  );
};

export default Question;
