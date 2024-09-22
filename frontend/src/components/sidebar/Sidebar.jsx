import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useSelector, useDispatch } from 'react-redux';
import { setStudents, studentSort, enrollSort, achievementSort, attendanceSort, filterStudents, updStudents } from '../../actions/index';

const Sidebar = () => {
  const originalStudents = useSelector((state) => state.student.students);

  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedOption, setSelectedSort] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCGPA, setSelectedCGPA] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const dispatch = useDispatch();

  // Collect the filter data
  const filter = {
    batch: selectedBatch,
    branch: selectedBranch,
    cgpa: selectedCGPA,
    society: selectedSociety
  };

  useEffect(() => {
    dispatch(filterStudents(filter)); 
  }, [selectedBatch, selectedBranch, selectedCGPA, selectedSociety, dispatch]);

  const toggleSortMenu = () => {
    setSortMenuVisible(!sortMenuVisible);
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const handleSortClick = (option) => {
    setSelectedSort(option);
    if (option === "CGPA") {
      dispatch(studentSort());
    }
    else if (option === "ENROLLMENT") {
      dispatch(enrollSort());
    }
    else if (option === "Achievements") {
      dispatch(achievementSort());
    }
    else if (option === "Attendance") {
      dispatch(attendanceSort());
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 948) {
        const footer = document.getElementById("footer");
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          const footerHeightInView = footerRect.height - (footerRect.bottom - window.innerHeight);
          const sidebar = document.querySelector(".sidebar-container");
          const sidebarHeight = sidebar.offsetHeight;
          const offsetTop = window.pageYOffset || document.documentElement.scrollTop;

          if (footerRect.top <= window.innerHeight) {
            const topPosition = offsetTop + window.innerHeight - footerHeightInView - sidebarHeight;
            sidebar.classList.add('absolute');
            sidebar.classList.remove('fixed');
            sidebar.style.top = `${topPosition - 70}px`;
          } else {
            sidebar.classList.add('fixed');
            sidebar.classList.remove('absolute');
            sidebar.style.top = '13.2%';
          }
        }
      } else {
        const sidebar = document.querySelector(".sidebar-container");
        sidebar.classList.remove('fixed', 'absolute');
        sidebar.style.top = '';
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 943) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        window.addEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleReset = () => {
    setSelectedBatch("");
    setSelectedBranch("");
    setSelectedCGPA("");
    setSelectedSociety("");
    setSelectedSort("");
    dispatch(filterStudents({ batch: "", branch: "", cgpa: "", society: "" }));
    dispatch(updStudents(originalStudents))
  };

  return (
    <>
      {sidebarVisible ? (
        <div style={{ marginLeft: "45%", marginTop: "24rem" }} className={`cross hamburger-menu ${sidebarVisible ? "hide-hamburger" : ""}`} onClick={toggleSidebar}>
          <i className="fa fa-times"></i>
        </div>
      ) : (
        <div className={`ham hamburger-menu ${sidebarVisible ? "hide-hamburger" : ""}`} onClick={toggleSidebar}>
          <i className="fa fa-bars"></i>
        </div>
      )}
      <div className={`sidebar-container ${sidebarVisible ? "show-sidebar" : "hide-sidebar"}`}>
        <div className="sidebar">
          <button className="btn sort" type="button" onClick={toggleSortMenu}>
            Sort{" "}
            <i className={`fa-solid ${sortMenuVisible ? "fa-caret-up" : "fa-caret-down"} sort-icon`}></i>
          </button>
          <div className={`sort-menu ${sortMenuVisible ? "show" : ""}`}>
            <div className={`options ${selectedOption === "ENROLLMENT" ? "selected" : ""}`} onClick={() => handleSortClick("ENROLLMENT")}>
              <input
                type="radio"
                id="enrollment"
                name="sort_option"
                value="ENROLLMENT"
                checked={selectedOption === "ENROLLMENT"}
                onChange={() => setSelectedSort("ENROLLMENT")}
              />
              <label htmlFor="enrollment" className="sort-label">Enrollment No.</label>
              <br />
            </div>
            <div className={`options ${selectedOption === "CGPA" ? "selected" : ""}`} onClick={() => handleSortClick("CGPA")}>
              <input
                type="radio"
                id="cgpa"
                name="sort_option"
                value="CGPA"
                checked={selectedOption === "CGPA"}
                onChange={() => setSelectedSort("CGPA")}
              />
              <label htmlFor="cgpa" className="sort-label">CGPA</label>
              <br />
            </div>
            <div className={`options ${selectedOption === "Attendance" ? "selected" : ""}`} onClick={() => handleSortClick("Attendance")}>
              <input
                type="radio"
                id="attendance"
                name="sort_option"
                value="Attendance"
                checked={selectedOption === "Attendance"}
                onChange={() => setSelectedSort("Attendance")}
              />
              <label htmlFor="attendance" className="sort-label">Attendance</label>
            </div>
            <div className={`options ${selectedOption === "Achievements" ? "selected" : ""}`} onClick={() => handleSortClick("Achievements")}>
              <input
                type="radio"
                id="achievements"
                name="sort_option"
                value="Achievements"
                checked={selectedOption === "Achievements"}
                onChange={() => setSelectedSort("Achievements")}
              />
              <label htmlFor="achievements" className="sort-label">Achievements</label>
            </div>
          </div>
          <button className="btn filter" type="button" onClick={toggleFilterMenu}>
            Filter{" "}
            <i className={`fa-solid ${filterMenuVisible ? "fa-caret-up" : "fa-caret-down"} filter-icon`}></i>
          </button>
          <div className={`filter-menu ${filterMenuVisible ? "show" : ""}`}>
            <div className={`filter-option ${selectedBatch ? "filter-selected" : ""}`}>
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
            <div className={`filter-option ${selectedBranch ? "filter-selected" : ""}`}>
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
            <div className={`filter-option ${selectedCGPA ? "filter-selected" : ""}`}>
              <label htmlFor="cgpa">CGPA : </label>
              <select
                name="CGPA"
                id="cgpa"
                value={selectedCGPA}
                onChange={(e) => setSelectedCGPA(e.target.value)}
              >
                                <option value="">Select Option</option>
                                <option value="6.9">Below 7</option>
                <option value="7.0">7.0-7.5</option>
                <option value="7.5">7.5-8.0</option>
                <option value="8.0">8.0-8.5</option>
                <option value="8.5">8.5-9.0</option>
                <option value="9.0">Above 9.0</option>
              </select>
            </div>
            <div className={`filter-option ${selectedSociety ? "filter-selected" : ""}`}>
              <label htmlFor="society">Society : </label>
              <select
                name="Society"
                id="society"
                value={selectedSociety}
                onChange={(e) => setSelectedSociety(e.target.value)}
              >
                <option value="">Select Option</option>
                <option value="Techical">Tech </option>
                <option value="Non-Technical">Non-Tech </option>
               
              </select>
            </div>
           
          </div>
          
        </div>
        <button className="btn2 reset" onClick={handleReset}>
            Reset 
          </button>
      </div>
    </>
  );
};

export default Sidebar;
