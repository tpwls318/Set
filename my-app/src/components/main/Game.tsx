import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Card, ICard } from "./Cards/card";
import { colors, paths, SHAPES, FILLS, COLORS } from "./Cards/config";
import { shuffle, drawCards, isSet, hasSet } from "./Cards/utils";
import Cards from "./Cards";
import { ReactionText } from "./ReactionText";

const Game = () => {
  const [cardDeck, setCardDeck] = useState<ICard[]>([]);
  const [openedCards, setOpenedCards] = useState<ICard[]>([]);
  const [setCount, setSetCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [availableCards, setAvailableCards] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  useEffect(() => {
    if (completed) {
      setCardDeck([]);
      setOpenedCards([]);
      setSetCount(0);
      setWrongCount(0);
      setAvailableCards([]);
      setShowHint(false);
    } else {
      let cards: ICard[] = [];
      [1, 2, 3].forEach((number: any) => {
        Object.values(SHAPES).forEach((shape) => {
          Object.values(FILLS).forEach((fill) => {
            Object.values(COLORS).forEach((color) => {
              cards.push({
                id: cards.length + 1,
                number,
                shape,
                fill,
                color,
              });
            });
          });
        });
      });
      console.log("cards: ", [...cards]);
      setCardDeck(cards);
      const initCards = drawCards(shuffle(cards), 9);
      console.log("initCards: ", initCards);
      setOpenedCards(initCards);
    }
  }, [completed]);

  console.log("openedCards: ", openedCards);

  const setSelected = useCallback(
    (id: number, auto?: boolean) => {
      if (selectedCards.includes(id)) {
        setSelectedCards(selectedCards.filter((v) => v !== id));
      } else {
        const newSelectedCards = auto
          ? availableCards.map((i) => openedCards[i].id)
          : [...selectedCards, id];
        console.log("newSelectedCards: ", newSelectedCards);
        // console.log("isSet: ", isSet(newSelectedCards));
        if (newSelectedCards.length === 3) {
          // Check and remove;
          if (isSet(openedCards.filter((card) => newSelectedCards.includes(card.id)))) {
            console.log("is set!!");
            setSetCount((prev) => prev + 1);
            setOpenedCards(openedCards.filter((card) => !newSelectedCards.includes(card.id)));
          } else {
            setWrongCount((prev) => prev + 1);
          }
          setSelectedCards([]);
        } else {
          setSelectedCards(newSelectedCards);
        }
      }
    },
    [openedCards, selectedCards, availableCards]
  );

  useEffect(() => {
    if (openedCards.length > 0 && cardDeck.length === 0) {
      console.log("completed!!");
      setCompleted(true);
      return;
    }
    setShowHint(false);
    const availableCards = hasSet(openedCards);
    console.log("availableCards: ", availableCards);
    if (availableCards && cardDeck.length > 0) {
      setAvailableCards(availableCards);
    }
    if (cardDeck.length && openedCards.length && (openedCards.length < 9 || !hasSet(openedCards))) {
      setOpenedCards([...openedCards, ...drawCards(cardDeck, 3)]);
    }
    console.log("cardDeck: ", cardDeck.length);
  }, [openedCards, cardDeck]);

  return (
    <Box
      style={{
        position: "absolute",
        height: "100%",
        margin: "-8px 0 0 -8px",
        backgroundColor: "khaki",
        padding: "16px",
      }}
    >
      <svg width="0" height="0">
        <pattern id="striped-red" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style={{ stroke: "#e74c3c", strokeWidth: 1 }} />
        </pattern>
        <pattern id="striped-green" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style={{ stroke: "#27ae60", strokeWidth: 1 }} />
        </pattern>
        <pattern id="striped-purple" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style={{ stroke: "#8e44ad", strokeWidth: 1 }} />
        </pattern>
      </svg>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {completed ? (
          <>
            <Typography variant="h3">Congratulations!!</Typography>
            <Button
              variant="contained"
              onClick={() => {
                setCompleted(false);
              }}
              style={{
                width: "fit-content",
              }}
            >
              Restart
            </Button>
          </>
        ) : (
          <>
            <Cards
              cards={openedCards}
              selectedCards={selectedCards}
              setSelected={setSelected}
              hint={showHint && availableCards ? availableCards : []}
            />
            <Typography style={{ width: "fit-content", marginLeft: "auto" }}>
              {cardDeck.length} cards left
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setShowHint(true);
                if (availableCards) {
                  setSelected(100, true);
                }
              }}
              style={{
                width: "fit-content",
              }}
            >
              Hint
            </Button>
            <ReactionText setCount={setCount} wrongCount={wrongCount} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Game;
