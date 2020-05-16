import React, { useState, useEffect } from "react";
import ArtistFrontPage from "../Components/ArtistFrontPage";
import Loading from "../Components/Loading";
import Images from "../Components/Images";
import musicData from "../data/lyricsJson.json";
import shuffle from "../Utility/shuffle";

const Artists = () => {
  const [data, setData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isShowingAll, setIsShowingAll] = useState(false);

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

  //when you click one set ishowingall to false and set location on the one selected

  return (
    <div>
      <div className="mx-auto max-w-4xl">
        <button
          disabled={!isShowingAll}
          className={`${isShowingAll ? "bg-green-700" : "bg-green-400"}`}
          onClick={() => {
            setIsShowingAll(isShowingAll => !isShowingAll);
          }}
        >
          Show One
        </button>
        <button
          disabled={isShowingAll}
          className={`${isShowingAll ? "bg-green-400" : "bg-green-700"}`}
          onClick={() => {
            setIsShowingAll(isShowingAll => !isShowingAll);
          }}
        >
          Show All
        </button>
      </div>

      {isShowingAll && !data && <Loading />}
      {isShowingAll && musicData && (
        <div className="text-center m-2 mx-auto max-w-4xl font-rubik font-normal border">
          <h3>Artists</h3>
          <div className="grid grid-cols-6">
            {musicData.map((entry, arrayI) => (
              <button
                onClick={e => {
                  e.preventDefault();
                  // get place in data and set current position to that
                  let country = entry.country;
                  var arrayPosition;
                  data.forEach((dataEntry, i) => {
                    if (dataEntry.country === country) {
                      arrayPosition = i;
                    }
                  });
                  setCurrentPosition(arrayPosition);
                  setIsShowingAll(false);
                }}
              >
                <div
                  className={`${
                    arrayI === currentPosition ? "bg-green-200" : ""
                  } hover:bg-red-300`}
                >
                  <div>
                    <div className="inline-block mx-auto mx-w-md">
                      <Images
                        classNames={"object-cover h-24 w-32"}
                        src={entry.artistImg}
                        alt={entry.artist}
                      />
                    </div>
                    <Images src={entry.lilFlag} alt={entry.country} />
                    <h4>{entry.country}</h4>
                  </div>
                  <div>
                    <h3>{entry.artist}</h3>
                    <h1>{entry.songName}</h1>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {!isShowingAll && (
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
      )}
    </div>
  );
};

export default Artists;
