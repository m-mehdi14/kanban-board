// TicketCard.js
import React from "react";
import "../styles/TicketCard.css";
import menuIcon from "../assets/3 dot menu.svg"; // Import the three-dot icon

const TicketCard = ({ ticket, user }) => {
  return (
    <div className="ticket-card">
      <div className="user-info">
        <img src={user.picture} alt={user.name} className="user-picture" />
        <div className="user-status" />
      </div>
      <div className="ticket-content">
        <p className="ticket-id">{ticket.id}</p>
        <div className="ticket-title-container">
          <input
            type="checkbox"
            className="ticket-checkbox"
            aria-label="Select ticket"
          />
          <h3 className="ticket-title">{ticket.title}</h3>
        </div>
        <div className="ticket-tag">
          <img src={menuIcon} alt="Menu icon" className="menu-icon" />
          <span className="tag">{ticket.tag.join(", ")}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
