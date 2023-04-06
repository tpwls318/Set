import React, { memo, useState } from "react";
import { Button, Card as MuiCard, CardContent } from "@mui/material";
import { colors, paths, SHAPES, FILLS, COLORS } from "./config";
import { isMobileSize } from "../../../utils/isMobileSize";

export interface ICard extends ShapeProps {
  id: number;
  number: 1 | 2 | 3;
}

interface CardProps extends ICard {
  selected?: boolean;
  setSelected: (id: number) => void;
  hint?: boolean;
}

interface ShapeProps {
  shape: typeof SHAPES[keyof typeof SHAPES];
  fill: typeof FILLS[keyof typeof FILLS];
  color: typeof COLORS[keyof typeof COLORS];
}

const Shape = memo((props: ShapeProps) => {
  const { shape, fill, color } = props;
  var attr = paths[shape];
  if (fill == "striped") {
    attr.fill = "url(#striped-" + color + ")";
  } else if (fill == "open") {
    attr.fill = "none";
  } else if (fill == "solid") {
    attr.fill = colors[color];
  }
  // console.log("shape props: ", props);
  return (
    <svg viewBox="-2 -2 54 104" style={{ width: isMobileSize() ? "30%" : "30px" }}>
      <path strokeWidth={2} stroke={colors[color]} {...attr} />
    </svg>
  );
});

export const Card = memo((props: CardProps) => {
  const { id, number, selected, setSelected, hint, ...shapeProps } = props;
  return (
    <MuiCard
      style={{
        display: "flex",
        aspectRatio: 7 / 5,
        justifyContent: "center",
        borderRadius: "10px",
        backgroundColor: hint ? "powderblue" : "white",
        gap: "4px",
        cursor: "pointer",
        border: selected ? "2px blue solid" : "none",
      }}
      onClick={() => {
        setSelected(id);
      }}
    >
      <CardContent style={{ display: "flex", padding: "8px", justifyContent: "center" }}>
        {Array.from({ length: number }).map((v, i) => (
          <Shape key={i} {...shapeProps} />
        ))}
      </CardContent>
    </MuiCard>
  );
});
