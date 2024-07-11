import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import students from "../../resources/cardinfo";
import Card from "./card";
import "./Main.css";

const Main = () => {
  return (
    <div className="cards-container">
      {students.map((student, index) => (
        <Card key={index} student={student} />
      ))}
      <div className="emojicontainer">
        <div className="emoji">
          <img src="/assets/panda.gif" alt="panda" />
        </div>
        <div id="text">Nothing to do ...</div>
      </div>
    </div>
  );
};

export default Main;
