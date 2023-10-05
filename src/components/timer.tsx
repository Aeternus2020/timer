import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeFirstTimerFromQueue, addTimerEndTime } from '../redux/slices';

function Timer(props: { timer: number; onComplete: () => void }) {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(props.timer);
    const [lastTimerDate, setLastTimerDate] = useState<Date | string | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    useEffect(() => {
        if (seconds > 0) {
          const timerId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);
      
          const now = new Date();
          now.setSeconds(now.getSeconds() + seconds);
          setEndTime(now);
          return () => {
            clearInterval(timerId);
          };
        } else {
          props.onComplete();
        }
      }, [seconds, props]);

    useEffect(() => {
        if (lastTimerDate === null) {
          setLastTimerDate(new Date());
        } else {
          setLastTimerDate((prevDate) => {
            if (prevDate !== new Date()) {
              return new Date().toLocaleString();
            }
            return prevDate;
          });
        }
      }, [props.timer]); 

      useEffect(() => {
        if (seconds <= 0) {
          props.onComplete();
          dispatch(removeFirstTimerFromQueue());
          const endTime = new Date();
          const addTime = lastTimerDate ? new Date(lastTimerDate) : new Date();
          const differenceInMilliseconds = endTime.getTime() - addTime.getTime();
          const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
          const endTimeString = endTime.toLocaleTimeString();
          const addTimeString = addTime.toLocaleTimeString();
          const logInfo = `
            Button N%${props.timer}: ${endTimeString} - ${addTimeString} 
            (${differenceInSeconds} sec)
          `
          dispatch(addTimerEndTime(logInfo));
        }
      }, [seconds]);      
      
      return (
        <Container className='timer' maxWidth="sm">
          Timer N%{props.timer}
          {endTime && (
            <span> {endTime.toLocaleTimeString()} - </span>
          )}
          {lastTimerDate && new Date(lastTimerDate).toLocaleTimeString()}  
          <span> ( {seconds} sec )</span>
        </Container>
      );
    }
  
export default Timer;
