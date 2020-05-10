import React, { useState, useEffect } from "react";
import ArtistFrontPage from "../Components/ArtistFrontPage";
import musicData from "../data/lyricsJson.json";
import shuffle from "../Utility/shuffle";

const Artists = () => {
  const [data, setData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    let randomisedData = shuffle(musicData);
    setData(randomisedData);
  }, []);

  const artistBack = e => {
    e.preventDefault();
    if (currentPosition === 0) {
      setCurrentPosition(data.length - 1);
    } else {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const artistForward = e => {
    e.preventDefault();
    if (currentPosition === 40) {
      setCurrentPosition(0);
    } else {
      setCurrentPosition(currentPosition + 1);
    }
  };

  return (
    <div className="text-center container mx-auto max-w-lg shadow-lg mb-6 font-rubik font-normal">
      {data && (
        <div className="mb-2 relative">
          <div className="my-2 mx-4 z-10 relative">
            <button
              className="bg-gray-800 text-white mx-2 w-20 py-1 shadow-xl absolute left-0"
              onClick={artistBack}
            >
              Back
            </button>
            <button
              className="bg-gray-800 text-white mx-2 w-20 6 py-1 shadow-xl absolute right-0"
              onClick={artistForward}
            >
              Forward
            </button>
          </div>
          <ArtistFrontPage artist={data[currentPosition]} />
          <div className="my-2 pb-4">
            <button
              className="bg-gray-800 text-white mx-2 w-20 py-1"
              onClick={artistBack}
            >
              Back
            </button>
            <button
              className="bg-gray-800 text-white mx-2 w-20 6 py-1"
              onClick={artistForward}
            >
              Forward
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artists;
