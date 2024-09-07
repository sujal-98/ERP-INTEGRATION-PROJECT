import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import "./Main.css";

const Main = () => {
  const students = useSelector((state) => state.students);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 20;

  useEffect(() => {
    const totalPages = Math.ceil(students.length / cardsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [students, currentPage, cardsPerPage]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = students.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(students.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const pageRange = 2; // Number of pages to show before and after the current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - pageRange && i <= currentPage + pageRange)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - pageRange - 1 && i > 1) ||
        (i === currentPage + pageRange + 1 && i < totalPages)
      ) {
        pageNumbers.push(<span key={i}>...</span>);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="cards-container" style={{ minHeight: "80vh" }}>
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
          {renderPageNumbers()}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(totalPages)}>{'>>'}</button>
          )}
        </div>
      )}
    </>
  );
};

export default Main;
