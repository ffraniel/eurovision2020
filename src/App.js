import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Home from "./Pages/Home";
import SiteLinks from "./Components/SiteLinks";
import Loading from "./Components/Loading";
const Vote = lazy(() => import("./Pages/Vote"));
const Artists = lazy(() => import("./Pages/Artists"));
const Game = lazy(() => import("./Pages/Game"));

function App() {
  const storage = window.localStorage;
  const [userID, setUserID] = useState(null);
  const [points, setPoints] = useState(null);
  const [avgScore, setAvgScore] = useState([]);
  const [topScore, setTopScore] = useState(null);
  const [allScores, setAllScores] = useState(null);

  useEffect(() => {
    if (storage.getItem("ID")) {
      // get the user state storedv - LS suffix for local storage
      const IDLS = storage.getItem("ID");
      const pointsLS = {
        12: JSON.parse(storage.getItem("points12")),
        10: JSON.parse(storage.getItem("points10")),
        8: JSON.parse(storage.getItem("points8")),
        6: JSON.parse(storage.getItem("points6")),
        4: JSON.parse(storage.getItem("points4")),
        2: JSON.parse(storage.getItem("points2"))
      };
      const topScoreLS = JSON.parse(storage.getItem("topScore"));
      const avgScoreLS = JSON.parse(storage.getItem("avgScore"));
      const allScoresLS = JSON.parse(storage.getItem("allScores"));

      setUserID(IDLS);
      setPoints(pointsLS);
      setTopScore(topScoreLS);
      setAvgScore(avgScoreLS);
      setAllScores(allScoresLS);
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
      setAllScores([]);
      setAvgScore(null);
    }
  }, [storage]);

  useEffect(() => {
    if (userID) {
      let { twelve, ten, eight, six, four, two } = points;
      // points
      storage.setItem("points12", JSON.stringify(twelve));
      storage.setItem("points10", JSON.stringify(ten));
      storage.setItem("points8", JSON.stringify(eight));
      storage.setItem("points6", JSON.stringify(six));
      storage.setItem("points4", JSON.stringify(four));
      storage.setItem("points2", JSON.stringify(two));
      // topScore
      storage.setItem("topScore", JSON.stringify(topScore));
      // avgScore
      storage.setItem("avgScore", JSON.stringify(avgScore));
      // allScores
      storage.setItem("allScores", JSON.stringify([]));
    }
  });

  return (
    <Suspense fallback={<Loading />}>
      <Router className="">
        <header className="text-center mt-6 mb-6">
          <SiteLinks toAddress={"/"} description={"Home"} />
          <SiteLinks toAddress={"/artists"} description={"Artists"} />
          <SiteLinks toAddress={"/vote"} description={"Vote"} />
          <SiteLinks toAddress={"/game"} description={"Game"} />
        </header>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/artists">
            <Artists />
          </Route>
          <Route path="/vote">
            <Vote avgScore={avgScore} topScore={topScore} />
          </Route>
          <Route path="/game">
            <Game
              avgScore={avgScore}
              setAvgScore={setAvgScore}
              topScore={topScore}
              setTopScore={setTopScore}
              allScores={allScores}
              setAllScores={setAllScores}
            />
          </Route>
          <Route noMatch>
            <h1>404 sorry can't find that, try refreshing your page</h1>
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
export default App;
