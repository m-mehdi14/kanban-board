// Header.js
import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import displayLogo from "../assets/Display.svg";

const Header = ({ grouping, sorting, setGrouping, setSorting }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <button className="display-button" onClick={toggleMenu}>
          <img src={displayLogo} alt="Display" className="display-icon" />
          Display
        </button>
        {menuOpen && (
          <div
            className={`display-menu ${menuOpen ? "show" : ""}`}
            ref={menuRef}
          >
            <div className="menu-section-row">
              <label>Grouping</label>
              <select
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="menu-section-row">
              <label>Ordering</label>
              <select
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
