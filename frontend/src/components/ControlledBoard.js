import React from "react";
import { useParams } from "react-router-dom";
import Board from "react-trello";

const data = {
  lanes: [
    {
      id: "lane1",
      title: "Planned Tasks",
      label: "2/2",
      style: { height: "400px" },
      cards: [
        {
          id: "Card1",
          title: "Write Blog",
          description: "Can AI make memes",
          label: "30 mins",
          draggable: true,
        },
        {
          id: "Card2",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          label: "5 mins",
          draggable: true,
        },
      ],
    },
    {
      id: "lane2",
      title: "Completed",
      label: "0/0",
      style: { height: "400px" },
      cards: [],
    },
  ],
};

function ControlledBoard(props) {
  const { projectId } = useParams();
  console.log(projectId)
  return <Board data={data} draggable editable canAddLanes {...props}/>;
}

export default ControlledBoard;
