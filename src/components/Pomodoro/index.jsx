import React, { useState } from "react";
import { BreakInterval } from "./components/BreakInterval";
import { SessionInterval } from "./components/SessionInterval";
import { Timer } from "./components/Timer";

export const Pomodoro = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timerMinute, setTimerMinute] = useState(25);
    const [isPlay, setIsPlay] = useState(false);

    const onIncreaseBreakLength = () => {
        setBreakLength(prevState => prevState.breakLength + 1);
    }

    const onDecreaseBreakLength = () => {
        setBreakLength(prevState => prevState.breakLength - 1);

    }

    const onIncreaseSessionLength = () => {
        setSessionLength(prevState => prevState.sessionLength + 1);
        setTimerMinute(prevState => prevState.timerMinute + 1);
    }

    const onDecreaseSessionLength = () => {
        setSessionLength(prevState => prevState.sessionLength - 1);
        setTimerMinute(prevState => prevState.timerMinute - 1);
    }

    // working on main timer (session clock) and then we will pass this
    // function to the Timer Component
    const onUpdateTimerMinute = () => {
        setTimerMinute(prevState => prevState.timerMinute - 1);
    }

    // working on isSession property from Timer Component, then
    // we will pass this function to the Timer Component.
    const onToggleInterval = (isSession) => {
        if (isSession) {
            setTimerMinute(sessionLength);
        } else {
            setTimerMinute(breakLength);
        }
    }

    // reset everthing
    const onResetTimer = () => {
        setTimerMinute(25);
        setSessionLength(25);
        setBreakLength(5);
    }

    // handle up, down buttons of session and break length
    const onPlayStopTimer = (isPlay) => {
        setIsPlay(isPlay);
    }

    return (
      <main>
        <h2>25 + 5 Clock</h2>

        <section>
          <BreakInterval
            breakLength={breakLength}
            increaseBreak={onIncreaseBreakLength}
            decreaseBreak={onDecreaseBreakLength}
            isPlay={isPlay}
          />
          <SessionInterval
            sessionLength={sessionLength}
            increaseSession={onIncreaseSessionLength}
            decreaseSession={onDecreaseSessionLength}
            isPlay={isPlay}
          />
        </section>
        <Timer
          timerMinute={timerMinute}
          breakLength={breakLength}
          updateTimerMinute={onUpdateTimerMinute}
          toggleInterval={onToggleInterval}
          resetTimer={onResetTimer}
          playStopTimer={onPlayStopTimer}
          isPlay={isPlay}
        />
      </main>
    );
  }
