import React, {useState, useEffect} from 'react';
import ArtistFrontPage from '../Components/ArtistFrontPage';
import musicData from '../data/lyricsJson.json';
import randomise from '../Utility/randomise';

const Artists = () => {
  
  const [data, setData] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(()=>{
    let randomisedData = randomise(musicData);
    console.log("warning: we just re-randomised - expect duplicates");
    setData(randomisedData);
  }, [data]);

  const artistBack = (e) => {
    e.preventDefault();
    if (currentPosition === 0) {
      setCurrentPosition(data.length - 1);  
    } else {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const artistForward = (e) => {
    e.preventDefault();
    if (currentPosition === 40) {
      setCurrentPosition(0);  
    } else {
      setCurrentPosition(currentPosition + 1);
    }
  };

  return (
    <div className="border text-center">
      <h2>Artists</h2>
      {data && 
        <div>
          <ArtistFrontPage artist={data[currentPosition]} />
          <p>{currentPosition}</p>
          <button className="bg-gray-800 text-white mx-2 px-6 py-1" onClick={artistBack} >Back</button>
          <button className="bg-gray-800 text-white mx-2 px-6 py-1" onClick={artistForward} >Forward</button>
        </div>
      }
    </div>
  )
}

export default Artists;