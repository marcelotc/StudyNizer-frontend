import React from "react";

export const BreakInterval = (props) => {
  function decreaseCounter() {
    if (props.breakLength === 1) {
      return; // return nothing
    }
    props.decreaseBreak(); // if not 1 then keep running this function (keeps decreasing the value on clicking)
  }

  function increaseCounter() {
    if (props.breakLength === 60) {
      return; // return nothing
    }
    props.increaseBreak(); // if not 60 then keep running this function (keeps incrementing the value on clicking)
  }

  return (
    <section>
      <h4>Break Length</h4>
      <section>
        {/* Down Arrow Button Condition for Break Length */}
        {props.isPlay ? (
          <span>
            +
          </span>
        ) : (
          <span onClick={decreaseCounter}>
            -
          </span>
        )}

        <p>{props.breakLength}</p>

        {/* Up Arrow Button Condition for Break Length */}
        {props.isPlay ? (
          <span>
            -
          </span>
        ) : (
          <span onClick={increaseCounter}>
            +
          </span>
        )}
      </section>
    </section>
  );
}
