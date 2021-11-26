import React, { useEffect, useState } from "react";
import MetisMenu from "react-metismenu";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";

import ControlledBoard from "./ControlledBoard";

import "react-metismenu/dist/react-metismenu-standart.min.css";

export default function KanbanApp(props) {
  const userId = "619fb551d5d6f71d0d6e3bd8";
  const { projectId = null } = props;
  const [projects, setProjects] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/api/kanban/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.projects);
        setProjects(processProjects(data.projects));
      });
  }, [reload]);

  const processProjects = (data) => {
    const output = [];
    const map = new Map();
    for (let project of data) {
      const item = {
        icon: "fa fa-align-justify",
        label: project.title,
        to: `/kanban/${project._id}`,
      };
      if (map.has(project.label)) {
        const arr = map.get(project.label);
        arr.push(item);
        map.set(project.label, arr);
      } else {
        map.set(project.label, [item]);
      }
    }
    map.forEach((value, key, map) => {
      output.push({
        icon: "fa fa-project-diagram",
        label: key,
        content: value,
      });
    });
    console.log(output);
    return output;
  };

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
  };

  return (
    <>
      <header class="pages">
        <Navbar />
      </header>
      <div class="main">
        <div class="project-menu">
          <MetisMenu content={projects} activeLinkFromLocation />
        </div>
        <div class="project-board">
          <Routes>
          <Route
            path="/:projectId"
            element={
              <ControlledBoard
                id={projectId}
                onCardAdd={addCard}
                onCardUpdate={editCard}
                onCardDelete={deleteCard}
                onLaneAdd={addLane}
                onLaneUpdate={editLane}
                onLaneDelete={deleteLane}
                onDataChange={passiveUpdate}
              />
            }
          />
          <Route
            path="/"
            element={
              <ControlledBoard
                onCardAdd={addCard}
                onCardUpdate={editCard}
                onCardDelete={deleteCard}
                onLaneAdd={addLane}
                onLaneUpdate={editLane}
                onLaneDelete={deleteLane}
                onDataChange={passiveUpdate}
              />
            }
          />
          </Routes>
        </div>
      </div>
    </>
  );
}
