import React from "react";
import { connect } from "react-redux";
import Card from "./card";
import "./Main.css";

const Main = ({ students }) => {
  return (
    <div className="cards-container">
      {students.length > 0 ? (
        students.map((student, index) => (
          <Card key={index} data={student} />
        ))
      ) : (
        <div className="emojicontainer">
          <div className="emoji">
            <img src="/assets/panda.gif" alt="panda" />
          </div>
          <div id="text">Nothing to do ...</div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students, 
  };
};

export default connect(mapStateToProps)(Main);
