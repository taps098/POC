import React from "react";

function ProgressBar(props) {
  let className;
  if(props.value > 90) {
    className = 'red';
  } else if (props.value > 60 && props.value <= 90) {
    className = 'yellow';
  } else if (props.value > 30 && props.value <= 60){
    className = 'blue';
  } else if (props.value > 0 && props.value <= 30){
    className = 'green'
  }

  // console.log("VALUE", props.value)

  return (
    <div>
      <progress
        className={className}
        max="100"
        value={props.value}
        data-label={props.text}
      ></progress>
    </div>
  );
}

export default ProgressBar;