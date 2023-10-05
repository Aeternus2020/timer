import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Button } from '@mui/material';
import ButtonTimer from './components/button';
import Timer from './components/timer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { clearTimers, addTimer, setTimerRunning } from './redux/slices';

function App() {
  const timersArray = useSelector((state: RootState) => state.timer.timers);
  const isTimerRunning = useSelector((state: RootState) => state.timer.isTimerRunning);
  const dispatch = useDispatch();

  const [nextTimer, setNextTimer] = useState<number | null>(null);

  const handleAddTimer = (sec: number) => {
    if (isTimerRunning) {
      return;
    }
    dispatch(addTimer(sec));
    setNextTimer(null);
  };

  const handleTimerComplete = () => {
    const remainingTimers = timersArray.slice(1);
    if (remainingTimers.length > 0) {
      const nextTimer = remainingTimers[0]['N%'];
      startCountdown(nextTimer);
    } else {
      dispatch(setTimerRunning(false));
    }
  };

  const startCountdown = async (timer: number) => {
    await new Promise((resolve) => setTimeout(resolve, timer * 1000));
    handleTimerComplete();
  };

  useEffect(() => {
    if (!isTimerRunning && timersArray.length > 0) {
      const firstTimer = timersArray[0]['N%'];
      startCountdown(firstTimer);
    }
  }, [timersArray, isTimerRunning]);

  return (
    <div className="App">
      <Container className='buttons' maxWidth="sm">
        <ButtonTimer text="1 sec" onClick={() => handleAddTimer(1)} />
        <ButtonTimer text="2 sec" onClick={() => handleAddTimer(2)} />
        <ButtonTimer text="3 sec" onClick={() => handleAddTimer(3)} />
        <Button variant="contained" onClick={() => dispatch(clearTimers())}>
          Clear
        </Button>
      </Container>
      <Container>
        {timersArray.map((item, index) => (
          <Timer
            timer={item['N%']}
            key={`N%_${index}`}
            onComplete={handleTimerComplete}
          />
        ))}
      </Container>
      {nextTimer !== null && (
        <Container>
          <Timer
            timer={nextTimer}
            key={`N%_${Math.random()}`}
            onComplete={handleTimerComplete}
          />
        </Container>
      )}
    </div>
  );
}

export default App;
