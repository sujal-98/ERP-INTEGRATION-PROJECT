import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedOption, setSelectedSort] = useState(""); // State for selected sort option
  const [selectedBatch, setSelectedBatch] = useState(""); // State for selected batch
  const [selectedBranch, setSelectedBranch] = useState(""); // State for selected branch
  const [selectedCGPA, setSelectedCGPA] = useState(""); // State for selected CGPA
  const [selectedSociety, setSelectedSociety] = useState(""); // State for selected society

  const toggleSortMenu = () => {
    setSortMenuVisible(!sortMenuVisible);
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const handleSortClick = (option) => {
    setSelectedSort(option);
  };

  return (
    <div>
      <div className="sidebar">
        <button
          className="btn btn-primary sort"
          type="button"
          onClick={toggleSortMenu}
        >
          Sort{" "}
          <i
            className={`fa-solid ${
              sortMenuVisible ? "fa-caret-up" : "fa-caret-down"
            } sort-icon`}
          ></i>
        </button>
        <div className={`sort-menu ${sortMenuVisible ? "show" : ""}`}>
          <div
            className={`options ${
              selectedOption === "ENROLLMENT" ? "selected" : ""
            }`}
            onClick={() => handleSortClick("ENROLLMENT")}
          >
            <input
              type="radio"
              id="enrollment"
              name="sort_option"
              value="ENROLLMENT"
              checked={selectedOption === "ENROLLMENT"}
              onChange={() => setSelectedSort("ENROLLMENT")}
            />
            <label htmlFor="enrollment" className="sort-label">
              Enrollment No.
            </label>
            <br />
          </div>
          <div
            className={`options ${selectedOption === "CGPA" ? "selected" : ""}`}
            onClick={() => handleSortClick("CGPA")}
          >
            <input
              type="radio"
              id="cgpa"
              name="sort_option"
              value="CGPA"
              checked={selectedOption === "CGPA"}
              onChange={() => setSelectedSort("CGPA")}
            />
            <label htmlFor="cgpa" className="sort-label">
              CGPA
            </label>
            <br />
          </div>
          <div
            className={`options ${
              selectedOption === "Attendance" ? "selected" : ""
            }`}
            onClick={() => handleSortClick("Attendance")}
          >
            <input
              type="radio"
              id="attendance"
              name="sort_option"
              value="Attendance"
              checked={selectedOption === "Attendance"}
              onChange={() => setSelectedSort("Attendance")}
            />
            <label htmlFor="attendance" className="sort-label">
              Attendance
            </label>
          </div>
          <div
            className={`options ${
              selectedOption === "Achievements" ? "selected" : ""
            }`}
            onClick={() => handleSortClick("Achievements")}
          >
            <input
              type="radio"
              id="achievements"
              name="sort_option"
              value="Achievements"
              checked={selectedOption === "Achievements"}
              onChange={() => setSelectedSort("Achievements")}
            />
            <label htmlFor="achievements" className="sort-label">
              Achievements
            </label>
          </div>
        </div>
        <button
          className="btn btn-primary filter"
          type="button"
          onClick={toggleFilterMenu}
        >
          Filter{" "}
          <i
            className={`fa-solid ${
              filterMenuVisible ? "fa-caret-up" : "fa-caret-down"
            } filter-icon`}
          ></i>
        </button>
        <div className={`filter-menu ${filterMenuVisible ? "show" : ""}`}>
          <div
            className={`filter-option ${
              selectedBatch ? "filter-selected" : ""
            }`}
          >
            <label htmlFor="batch">Batch : </label>
            <select
              name="Batch"
              id="batch"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="2021-25">2021-25</option>
              <option value="2022-26">2022-26</option>
              <option value="2023-27">2023-27</option>
              <option value="2024-28">2024-28</option>
            </select>
          </div>
          <div
            className={`filter-option ${
              selectedBranch ? "filter-selected" : ""
            }`}
          >
            <label htmlFor="branch">Branch : </label>
            <select
              name="Branch"
              id="branch"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AIDS">AIDS</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
          <div
            className={`filter-option ${selectedCGPA ? "filter-selected" : ""}`}
          >
            <label htmlFor="cgpa">CGPA : </label>
            <select
              name="CGPA"
              id="cgpa"
              value={selectedCGPA}
              onChange={(e) => setSelectedCGPA(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="above9">9+</option>
              <option value="8to9">8.0-9.0</option>
              <option value="7to8">7.0-8.0</option>
              <option value="below7">Below 7</option>
            </select>
          </div>
          <div
            className={`filter-option ${
              selectedSociety ? "filter-selected" : ""
            }`}
          >
            <label htmlFor="society">Society : </label>
            <select
              name="Society"
              id="society"
              value={selectedSociety}
              onChange={(e) => setSelectedSociety(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="Tech-society">Tech Society</option>
              <option value="Non-Tech-society">Non Tech</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
      </div>
      <button className="btn btn-primary apply-btn" type="button">
        Apply
      </button>
    </div>
  );
};

export default Sidebar;
