import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./styles.css"; 
import Navbar from "./Navbar";

function KanbanBoard() {
  const [data, setData] = useState({
    tickets: [],
    users: [],
  });

  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const priority = ["No priority", "Low", "Medium", "High", "Urgent"];

  const groupData = (groupingType) => {
    const groupedData = data.tickets.reduce((grouped, ticket) => {
      let key;

      if (groupingType === "status") {
        key = ticket.status;
      } else if (groupingType === "user") {
        const user = data.users.find((u) => u.id === ticket.userId);
        key = user ? user.name : "Unknown User";
      } else if (groupingType === "priority") {
        let index = Number(ticket.priority);
        key = priority[index];
      } else {
        key = "Unknown";
      }

      grouped[key] = grouped[key] || [];
      grouped[key].push(ticket);

      return grouped;
    }, {});

    return groupedData;
  };

  const orderData = (groupedData) => {
    for (const group in groupedData) {
      if (ordering === "priority") {
        groupedData[group].sort((a, b) => b.priority - a.priority);
      } else if (ordering === "title") {
        groupedData[group].sort((a, b) => a.title.localeCompare(b.title));
      }
    }
    return groupedData;
  };

  const groupedData = groupData(grouping);
  const orderedData = orderData(groupedData);

  return (
    <div className="container">
      <Navbar
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
      ></Navbar>

      <div className="kanban-board">
        {Object.entries(orderedData).map(([group, groupData]) => (
          <div key={group} className="kanban-group">
            <div className="heading">
              <div className="left">
                <div></div>
                <div>{group}</div>
                <div>{groupData.length}</div>
              </div>
              <div className="right">
                <div>+</div>
                <div>...</div>
              </div>
            </div>
            <div className="kanban-group-cards">
              {groupData.map((ticket) => (
                <Card key={ticket.id} ticket={ticket} users={data.users} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
