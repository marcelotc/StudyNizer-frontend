import React, { useState } from "react";

export const Timer = (props) =>{
    const [isSession, setIsSession] = useState(true);
    const [timerSecond, setTimerSecond] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    const [sound, setSound] = useState("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");


  // Play function: will run the session clock (will decrement the value)
 const playTimer = () => {
    let intervalId = setInterval(decreaseTimer, 1000); // will run decreaseTimer function in every 1000 milliseconds (1 second)
    props.playStopTimer(true);

    setIntervalId(intervalId);
  }

  // working with play function
  const decreaseTimer = () => {
    switch (timerSecond) {
      case 0:
        if (props.timerMinute === 0) {
          if (isSession) {
            setIsSession(true);

            props.toggleInterval(isSession);
          } else {
            setIsSession(true);

            props.toggleInterval(isSession);
          }
        } else {
          props.updateTimerMinute();
          setTimerSecond(59);
        }
        break;

      default:
        setTimerSecond(prevState => prevState.timerSecond - 1)
        break;
    }
  }

  // stop session clock
  const stopTimer = () => {
    clearInterval(intervalId);
    props.playStopTimer(false);
  }

  // reset digits after 25 minutes (will reset to two zeros)
  // and also the first part back to 25 (function from App Component)
  const resetTimer = () => {
    stopTimer();
    props.resetTimer();
    props.playStopTimer(false);
    setTimerSecond(0);
    setIsSession(true);
  }

  //
  const playAudio = (data) => {
    let audio = new Audio(data);
    audio.play();
  }

    const colorCondition = (
      <span>{props.timerMinute}</span>
    );

    // Alarm conditions
    if (timerSecond === 1) {
      if (props.timerMinute === 0) {
        playAudio(sound);
      }
    }

    return (
      <section>
        <audio>
          <source src={sound} />
        </audio>
        <section>
          <h4>{isSession ? "Session" : "Break"}</h4>
          <span>
            {props.timerMinute === 0
              ? colorCondition
              : props.timerMinute}
          </span>

          {/* clock colon */}
          <span>
            {props.timerMinute === 0 ? (
              <span>:</span>
            ) : (
              ":"
            )}
          </span>

          <span>
            {timerSecond === 0 ? (
              props.timerMinute === 0 ? (
                <span>0{timerSecond}</span>
              ) : (
                "00"
              )
            ) : timerSecond < 10 ? (
              props.timerMinute === 0 ? (
                <span>0{timerSecond}</span>
              ) : (
                "0" + timerSecond
              )
            ) : (
              <span>
                {props.timerMinute === 0 ? (
                  <span>{timerSecond}</span>
                ) : (
                  timerSecond
                )}
              </span>
            )}
          </span>
        </section>
        <section>
          {/* Play and Stop button conditions */}
          {props.isPlay ? (
            <span onClick={stopTimer}>
              stop
            </span>
          ) : (
            <span onClick={playTimer}>
              start
            </span>
          )}

          <span onClick={resetTimer}>
            reset
          </span>
        </section>
      </section>
    );
  }
