import React from "react";

const Label = (props) =>{

  const style = {
    background: props.color || 'rgba(112, 113, 132)',
    padding: '5px 25px',
    borderRadius: '25px',
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: '500',
  }

  return (
    <label style={style}>{props.text}</label>
  )
}
export default Label;