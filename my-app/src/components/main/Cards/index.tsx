import React from "react";
import { Box } from "@mui/material";
import { Card, ICard } from "./card";

interface CardsProps {
  cards: ICard[];
  selectedCards: number[];
  setSelected: (id: number) => void;
  hint: number[];
}

const Cards = (props: CardsProps) => {
  const { cards, selectedCards, setSelected, hint } = props;
  // console.log("cards: ", cards);
  return (
    <Box
      style={{
        display: "grid",
        gridTemplateColumns: window.innerWidth < 600 ? "1fr 1fr 1fr" : "repeat(3, 130px)",
        backgroundColor: "olivedrab",
        padding: "16px",
        borderRadius: "16px",
        gap: "8px",
      }}
    >
      {cards.map((card: ICard, i: number) => (
        <Card
          key={card.id}
          setSelected={setSelected}
          selected={selectedCards.includes(card.id)}
          hint={hint.includes(i)}
          {...card}
        />
      ))}
    </Box>
  );
};

export default Cards;
