import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classActions } from "../../store";

const Classmodal = (props) => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class.class);

  const clickHandler = (name) => {
    dispatch(classActions.deletePeople(name));
    const tempClass = classes.filter((list) => list.name === name);
    dispatch(classActions.addMyList(tempClass));
  };

  return (
    <div className="classmodal">
      <h1 className="classmodal__title">{props.prof} 교수님</h1>
      <div className="wrapper">
        <h3 className="classmodal__mid subject">과목명</h3>
        <h3 className="classmodal__mid people">잔여인원</h3>
        <h3 className="classmodal__mid apply">신청</h3>
      </div>
      {props.classList.map((list) => (
        <div className="wrapper">
          <h4 className="classmodal_small subject">{list.name}</h4>
          <h4 className="classmodal_small people">
            {list.people}/{list.full}
          </h4>
          <div className="btn">
            <button
              className="apply-btn apply"
              onClick={() => clickHandler(list.name)}
            >
              신청하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Classmodal;
