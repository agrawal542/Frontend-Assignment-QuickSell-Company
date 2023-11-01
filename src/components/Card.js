import React from "react";
import "./styles.css";

function Card({ ticket, users }) 
{

  const user = users.find((u) => u.id === ticket.userId);
  const userName = user ? user.name : "Unknown User";

  return (
    <div className="kanban-card">
      <div className="box-1">
        <div className="id">{ticket.id}</div>
        <div className="user-name">
            {userName.substr(0,1)}
        </div>
      </div>  
      <div className="box-2 title"> 
          <div className="circle-2">
          </div>{ticket.title.length > 30 ? `${ticket.title.substr(0,26)}` : ticket.title}
          </div>
      <div className="box-3">
        <div className="line">...</div>
        <div className="box-inner">
          <div className="circle"></div>
          <div className="tag">{ticket.tag.join(", ")}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
