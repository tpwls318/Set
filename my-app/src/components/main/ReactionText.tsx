import React, { memo, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { isMobileSize } from "../../utils/isMobileSize";

interface ReactionTextProps {
  text?: string;
  setCount: number;
  wrongCount: number;
}

const config = {
  SET_COUNT: "Set!",
  WRONG_COUNT: "Try again~",
};

export const ReactionText = memo((props: ReactionTextProps) => {
  const { setCount, wrongCount } = props;
  const [text, setText] = useState<string>("");
  const [isScaleStart, setIsScaleStart] = useState(false);
  const [isVanishStart, setIsVanishStart] = useState(false);
  const animate = () => {
    setIsScaleStart(true);
    setIsVanishStart(false);
    setTimeout(() => {
      setIsScaleStart(false);
      setIsVanishStart(true);
    }, 1000);
  };
  useEffect(() => {
    if (setCount) {
      setText(config.SET_COUNT);
      animate();
    }
  }, [setCount]);
  useEffect(() => {
    if (wrongCount) {
      setText(config.WRONG_COUNT);
      animate();
    }
  }, [wrongCount]);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        willChange: "transform opacity",
        transform: isScaleStart ? "scale(1.2)" : "scale(1)",
        opacity: isVanishStart ? 0 : 1,
        transition: "transform 0.3s, opacity 0.5s",
      }}
    >
      <Typography variant="h2">{text}</Typography>
    </Box>
  );
});
