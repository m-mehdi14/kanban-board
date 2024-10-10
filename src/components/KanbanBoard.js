// KanbanBoard.js
import React, { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import Header from "./Header";
import { fetchData } from "../services/board-data";
import "../styles/KanbanBoard.css";
import HighPriorityIcon from "../assets/Img-High-Priority.svg";
import LowPriorityIcon from "../assets/Img-Low-Priority.svg";
import MediumPriorityIcon from "../assets/Img-Medium-Priority.svg";
import UrgentPriorityIcon from "../assets/SVG-Urgent-Priority-colour.svg";
import NoPriorityIcon from "../assets/No-priority.svg";
import TodoIcon from "../assets/To-do.svg";
import InProgressIcon from "../assets/in-progress.svg";
import DoneIcon from "../assets/Done.svg";
import CancelledIcon from "../assets/Cancelled.svg";

const userMapping = {
  "usr-1": "Anoop Sharma",
  "usr-2": "Yogesh",
  "usr-3": "Shankar Kumar",
  "usr-4": "Ramesh",
  "usr-5": "Suresh",
};

const priorityMapping = {
  0: "No Priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

const priorityIconMapping = {
  0: NoPriorityIcon,
  1: LowPriorityIcon,
  2: MediumPriorityIcon,
  3: HighPriorityIcon,
  4: UrgentPriorityIcon,
};

const statusMapping = {
  Todo: "To-do",
  "In Progress": "In Progress",
  Done: "Done",
  Cancelled: "Cancelled",
};

const statusIconMapping = {
  Todo: TodoIcon,
  "In Progress": InProgressIcon,
  Done: DoneIcon,
  Cancelled: CancelledIcon,
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status"); // Default grouping
  const [sorting, setSorting] = useState("priority"); // Default sorting

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setTickets(data.tickets);
    };
    getData();
  }, []);

  const groupTickets = () => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const groupKey =
        grouping === "user"
          ? ticket.userId
          : grouping === "priority"
          ? ticket.priority
          : ticket.status;
      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(ticket);
    });
    return grouped;
  };

  const sortTickets = (grouped) => {
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (sorting === "priority") return b.priority - a.priority;
        if (sorting === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    });
    return grouped;
  };

  const groupedTickets = sortTickets(groupTickets());

  const getColumnTitle = (groupKey) => {
    if (grouping === "user") {
      return userMapping[groupKey] || groupKey;
    }
    if (grouping === "priority") {
      return `${priorityMapping[groupKey] || "Unknown"} (${groupKey})`;
    }
    if (grouping === "status") {
      return statusMapping[groupKey] || groupKey;
    }
    return groupKey; // Default case
  };

  const getColumnIcon = (groupKey) => {
    if (grouping === "priority") {
      return priorityIconMapping[groupKey] || NoPriorityIcon;
    }
    if (grouping === "status") {
      return statusIconMapping[groupKey] || null;
    }
    return null; // Default case
  };

  return (
    <div className="kanban-board">
      <Header
        grouping={grouping}
        setGrouping={setGrouping}
        sorting={sorting}
        setSorting={setSorting}
      />
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map((groupKey) => (
          <KanbanColumn
            key={groupKey}
            title={getColumnTitle(groupKey)}
            icon={getColumnIcon(groupKey)}
            tickets={groupedTickets[groupKey]}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
