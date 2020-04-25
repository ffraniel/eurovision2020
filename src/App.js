import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Home from './Pages/Home';
const Rank = lazy(() => import('./Pages/Rank'));
const Artists = lazy(() => import('./Pages/Artists'));
const Game = lazy(() => import('./Pages/Game'));

function App() {

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