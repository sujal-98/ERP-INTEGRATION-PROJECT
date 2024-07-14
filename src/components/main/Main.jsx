import React, { useState } from "react";
import { connect } from "react-redux";
import Card from "./card";
import "./Main.css";

const Main = ({ students }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 20;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = students.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(students.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <div className="cards-container">
      {currentCards.length > 0 ? (
        currentCards.map((student, index) => (
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

      {totalPages > 1 && (
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(1)}>{'<<'}</button>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(totalPages)}>{'>>'}</button>
          )}
        </div>
      )}

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

export default connect(mapStateToProps)(Main);
