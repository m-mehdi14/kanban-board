// KanbanColumn.js
import React from "react";
import TicketCard from "./TicketCard";
import "../styles/KanbanColumn.css";
import todoIcon from "../assets/To-do.svg";
import inProgressIcon from "../assets/in-progress.svg";
import doneIcon from "../assets/Done.svg";
import cancelledIcon from "../assets/Cancelled.svg";
import BackLogIcon from "../assets/Backlog.svg";
import HighPriorityIcon from "../assets/Img-High-Priority.svg";
import LowPriorityIcon from "../assets/Img-Low-Priority.svg";
import MediumPriorityIcon from "../assets/Img-Medium-Priority.svg";
import UrgentPriorityIcon from "../assets/SVG-Urgent-Priority-colour.svg";
import NoPriorityIcon from "../assets/No-priority.svg";
import addIcon from "../assets/add.svg"; // Add icon import
import menuIcon from "../assets/3 dot menu.svg"; // 3-dot menu icon import

// Updated statusIcons mapping to match exact column titles
const statusIcons = {
  "To-do": todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Backlog: BackLogIcon,
  Cancelled: cancelledIcon,
};

const priorityIcons = {
  "No Priority": NoPriorityIcon,
  Low: LowPriorityIcon,
  Medium: MediumPriorityIcon,
  High: HighPriorityIcon,
  Urgent: UrgentPriorityIcon,
};

const KanbanColumn = ({ title, tickets }) => {
  const users = [
    {
      id: "usr-1",
      name: "Anoop Sharma",
      picture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "usr-2",
      name: "Yogesh",
      picture: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "usr-3",
      name: "Shankar Kumar",
      picture: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "usr-4",
      name: "Ramesh",
      picture: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: "usr-5",
      name: "Suresh",
      picture: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  // Use title as a key to find the corresponding status and priority icons
  const statusIcon = statusIcons[title] || null;
  const priorityLevel = title.split(" ")[0];
  const priorityIcon = priorityIcons[priorityLevel];

  // Remove the number in parentheses for the title display
  const displayTitle = title.replace(/\(\d+\)/, "").trim();
  const ticketCount = tickets.length; // Get the number of tickets for the current column

  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <div className="kanban-column-icons">
          {/* Conditionally render both icons if they exist */}
          {priorityIcon && (
            <img
              src={priorityIcon}
              alt={`${priorityLevel} priority icon`}
              className="priority-icon"
            />
          )}
          {statusIcon && (
            <img
              src={statusIcon}
              alt={`${title} status icon`}
              className="status-icon"
            />
          )}
        </div>
        {/* Display the title with the ticket count */}
        <h2 className="kanban-column-title">
          {`${displayTitle} `}{" "}
          <span
            style={{
              fontWeight: "normal",
              fontSize: "14px",
              color: "#A4A6B3",
              marginLeft: "10px",
            }}
          >
            {ticketCount}
          </span>
        </h2>
        <div className="kanban-column-controls">
          <img src={addIcon} alt="Add icon" className="add-icon" />
          <img src={menuIcon} alt="Menu icon" className="menu-icon" />
        </div>
      </div>
      <div className="kanban-column-content">
        {tickets.map((ticket) => {
          const user = users.find((u) => u.id === ticket.userId) || {};
          return (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              user={user}
              priorityIcon={priorityIcon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KanbanColumn;
