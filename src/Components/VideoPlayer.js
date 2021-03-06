import React, { lazy, Suspense } from "react";
const Iframe = lazy(() => import("./Iframe"));

const VideoPlayer = ({ artist, song, src, videoOpen, setVideoOpen }) => (
  <Suspense fallback={"<h1>LOADING!!!!!</h1>"}>
    <div
      className={
        videoOpen
          ? `pointer-events-auto fixed w-full h-full top-0 left-0 flex items-center justify-center`
          : `opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center`
      }
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <button
        onClick={setVideoOpen}
        className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm"
      >
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </button>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="">{artist}</p>
            <p className="">{song}</p>

            {videoOpen && <Iframe src={src} />}

            <div className="modal-close cursor-pointer" onClick={setVideoOpen}>
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Suspense>
);

export default VideoPlayer;
