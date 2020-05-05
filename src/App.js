import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Home from './Pages/Home';
const Rank = lazy(() => import('./Pages/Rank'));
const Artists = lazy(() => import('./Pages/Artists'));
const Game = lazy(() => import('./Pages/Game'));

function App() {

  const storage = window.localStorage;
  const [userID, setUserID] = useState(null);
  const [points, setPoints] = useState(null);
  const [avgScore, setAvgScore] = useState([]);
  const [topScore, setTopScore] = useState(null);

  useEffect(() => {
    if (storage.getItem('ID')) {
      // get the user state storedv - LS suffix for local storage
      const IDLS = storage.getItem('ID');
      const pointsLS = {
        12: JSON.parse(storage.getItem('points12')),
        10: JSON.parse(storage.getItem('points10')),
        8: JSON.parse(storage.getItem('points8')),
        6: JSON.parse(storage.getItem('points6')),
        4: JSON.parse(storage.getItem('points4')),
        2: JSON.parse(storage.getItem('points2'))
      }
      const topScoreLS = JSON.parse(storage.getItem('topScore'));
      const avgScoreLS = JSON.parse(storage.getItem('avgScore'));
      
      setUserID(IDLS);
      setPoints(pointsLS);
      setTopScore(topScoreLS);
      setAvgScore(avgScoreLS);

    } else {
      // create uuid, set to user, give user state all votes and access
      setUserID(uuidv4());
      setPoints({
        twelve: null,
        ten: null,
        eight: null,
        six: null,
        four: null,
        two: null
      });
      setTopScore([]);
      setAvgScore(null);
    }
  }, [storage]);

  useEffect(() => {
    if (userID) {
      let { 
        twelve,
        ten, 
        eight,
        six,
        four,
        two
      } = points;
      // points
      storage.setItem('points12', JSON.stringify(twelve));
      storage.setItem('points10', JSON.stringify(ten));
      storage.setItem('points8', JSON.stringify(eight));
      storage.setItem('points6', JSON.stringify(six));
      storage.setItem('points4', JSON.stringify(four));
      storage.setItem('points2', JSON.stringify(two));
      // topScore
      storage.setItem('topScore', JSON.stringify(topScore));
      // AvgScore
      storage.setItem('avgScore', JSON.stringify(avgScore));
    }
  });

  return (
    <Suspense fallback={'<h1>LOADING!!!!!</h1>'}>
      <Router className="">
        <header className="text-center mt-6 mb-6" >
          <NavLink className="bg-green-900 rounded-xl text-white py-1 px-4 m-2" to="/">Home</NavLink>
          <NavLink className="bg-green-900 rounded-xl text-white py-1 px-4 m-2" to="/artists">Artists</NavLink>
          <NavLink className="bg-green-900 rounded-xl text-white py-1 px-4 m-2" to="/rank">Rank</NavLink>
          <NavLink className="bg-green-900 rounded-xl text-white py-1 px-4 m-2" to="/game">Game</NavLink>
        </header>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/artists">
            <Artists />
          </Route>
          <Route path="/rank">
            <Rank />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
export default App;