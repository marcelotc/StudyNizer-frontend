import React from "react";

export const SessionInterval = (props) => {
  function decreaseSession() {
    if (props.sessionLength === 1) {
      return; // return nothing
    }
    props.decreaseSession();
  }

  function increaseSession() {
    if (props.sessionLength === 60) {
      return; // return nothing
    }
    props.increaseSession();
  }

  return (
    <section>
      <h4>Session Length</h4>
      <section>
        {/* Down Arrow Button Condition for Session Length */}
        {props.isPlay ? (
          <span>
            +
          </span>
        ) : (
          <span onClick={decreaseSession}>
            -
          </span>
        )}

        <p>{props.sessionLength}</p>

        {/* Up Arrow Button Condition for Session Length */}

        {props.isPlay ? (
          <span>
            -
          </span>
        ) : (
          <span onClick={increaseSession}>
            +
          </span>
        )}
      </section>
    </section>
  );
}
