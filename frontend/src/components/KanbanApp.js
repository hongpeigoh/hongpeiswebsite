import React, { useState } from "react";
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
          <ControlledBoard />
        </div>
      </div>
    </>
  );
}
