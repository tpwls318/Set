import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import Game from "./components/main/Game";
import { MAIN } from "./consts/routePaths";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={MAIN.ROOT} element={<Main />}></Route>
          <Route path={MAIN.GAME} element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
