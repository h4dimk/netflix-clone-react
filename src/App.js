import "./App.css";
import React from "react";
import { orginals, action, horror } from "./urls";
import NavBar from "./Components/NavBar/NavBar";
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";

function App() {
  return (
    <div>
      <NavBar />
      <Banner />
      <RowPost url={orginals} title="Netflix Originals" />
      <RowPost url={action} title="Action" isSmall />
      <RowPost url={horror} title="Horror" isSmall />
    </div>
  );
}

export default App;
