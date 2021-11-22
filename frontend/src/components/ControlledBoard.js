import React from "react";
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

export default function ControlledBoard() {
  return <Board data={data} draggable/>;
}
