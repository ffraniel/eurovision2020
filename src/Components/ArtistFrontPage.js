import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

const Artist = ({ artist }) => {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleEsc = evt => {
      var isEscape = false;
      if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
      } else {
        isEscape = evt.keyCode === 27;
      }
      if (isEscape) {
        setVideoOpen(isVideoOpen => {
          if (isVideoOpen) {
            return false;
          }
        });
      }
    };
    document.onkeydown = handleEsc;

    return () => {
      document.onkeydown = null;
    };
  }, [videoOpen]);

  const toggleVideo = e => {
    e.preventDefault();
    console.log("toggle video function clicked");
    setVideoOpen(wasVideoOpen => !wasVideoOpen);
  };

  return (
    <div className="">
      <div className="relative p-2">
        <img
          className="rounded-lg overflow-hidden"
          src={artist.artistImg}
          alt={artist.artist}
        />
        <button
          className="bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded-full"
          onClick={toggleVideo}
        >
          Youtube
        </button>
        <img
          className="absolute w-16 right-0 bottom-0 p-4"
          src={artist.lilFlag}
          alt={`flag of ${artist.country}`}
        />
        <h3 className="absolute bottom-0 text-center bg-indigo-100 text-indigo-900 px-4 py-2 rounded-sm ml-4">
          {artist.country}
        </h3>
      </div>
      <h3 className="">{artist.artist}</h3>
      <h4 className="">{artist.songName}</h4>
      <div className="pt-2 pb-4 px-2 mx-6 text-left">
        <p>{artist.blurb}</p>
      </div>
      <VideoPlayer
        src={artist.video}
        videoOpen={videoOpen}
        artist={artist.artist}
        song={artist.songName}
        setVideoOpen={setVideoOpen}
      />
    </div>
  );
};

export default Artist;
