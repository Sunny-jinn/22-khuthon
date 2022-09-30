import React from "react";
import { useDispatch } from "react-redux";
import { locationActions } from "../../store";

const Button = (props) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(locationActions.setLocation(props.location));
  };
  return (
    <div onClick={clickHandler} className={props.direction}>
      <img className="btnimg" width="100px" src={props.arrow} />
    </div>
  );
};

export default Button;
