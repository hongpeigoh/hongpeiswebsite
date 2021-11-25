import React, { useEffect, useState } from "react";
import MetisMenu from "react-metismenu";

import Navbar from "./Navbar";

import ControlledBoard from "./ControlledBoard";

const content = [
  {
    icon: "icon-class-name",
    label: "Label of Item",
    to: "#a-link",
  },
  {
    icon: "icon-class-name",
    label: "Second Item",
    content: [
      {
        icon: "icon-class-name",
        label: "Sub Menu of Second Item",
        to: "#another-link",
      },
    ],
  },
];

export default function KanbanApp() {
  const userId = "619fb551d5d6f71d0d6e3bd8";
  const [projects, setProjects] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/api/kanban/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        console.log(data);
      });
  }, [reload]);

  const handleReload = () => {
    setReload(reload + 1);
  };

  const addCard = (card, laneId) => {
    console.log("add card");
    handleReload();
  };

  const editCard = (laneId, card) => {
    console.log("edit card");
    handleReload();
  };

  const deleteCard = (cardId, laneId) => {
    console.log("delete card");
    handleReload();
  };

  const addLane = (lane) => {
    console.log("add lane");
    handleReload();
  };

  const editLane = (laneId, lane) => {
    console.log("edit lane");
    handleReload();
  };

  const deleteLane = (laneId) => {
    console.log("delete lane");
    handleReload();
  };

  const passiveUpdate = (newData) => {
    console.log("update");
  }

  return (
    <>
      <header class="pages">
        <Navbar />
      </header>
      <div class="main">
        <div class="project-menu">
          <MetisMenu content={content} activeLinkFromLocation />
        </div>
        <div class="project-board">
          <ControlledBoard
            onCardAdd={addCard}
            onCardUpdate={editCard}
            onCardDelete={deleteCard}
            onLaneAdd={addLane}
            onLaneUpdate={editLane}
            onLaneDelete={deleteLane}
            onDataChange={passiveUpdate}
          />
        </div>
      </div>
    </>
  );
}
