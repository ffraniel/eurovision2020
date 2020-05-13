import React from "react";

const Intro = ({ setStage, stage }) => {
  const handleNext = e => {
    e.preventDefault();
    setStage(stage + 1);
  };

  return (
    <div className="p-6">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded"
        onClick={handleNext}
      >
        Play
      </button>
    </div>
  );
};

export default Intro;
