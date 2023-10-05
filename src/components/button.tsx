import React from 'react';
import { Button } from '@mui/material';

interface ButtonTimerProps {
  text: string;
  onClick: () => void; 
}

function ButtonTimer({ text, onClick }: ButtonTimerProps) {
  return (
    <Button variant="contained" onClick={onClick}>
      {text}
    </Button>
  );
}

export default ButtonTimer;
