import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MAIN } from "../../consts/routePaths";

const Main = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        onClick={() => {
          navigate(MAIN.GAME);
        }}
      >
        Start
      </Button>
    </Box>
  );
};

export default Main;
