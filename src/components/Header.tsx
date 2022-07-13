import { Button } from "@mui/material";
import { useState } from "react";

type HeaderPropsType = {
  onClickAction: () => void;
};

export default function Header({ onClickAction }: HeaderPropsType) {
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleClick = () => {
    setBtnDisabled(true);
    onClickAction();
  };

  return (
    <div className="w-full h-8 bg-slate-400 p-3 flex justify-center">
      <Button
        color="primary"
        variant="contained"
        size="large"
        disabled={btnDisabled}
        onClick={handleClick}
      >
        Load Data
      </Button>
    </div>
  );
}
