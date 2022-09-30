import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { classActions } from "../../store";

const ListModal = (props) => {
  const clickHandler = () => {
    props.setModal(false);
  };

  const deleteClickHandler = (name) => {
    dispatch(classActions.deleteMyList(name));
  };

  const myList = useSelector((state) => state.class.myList);
  const dispatch = useDispatch();

  return (
    <div className="classmodal">
      <h1 className="classmodal__title">수강신청 목록</h1>
      {myList.length === 0 ? (
        <div className="wrapper">
          <h3 className="classmodal__mid noList">수강신청 내역이 없습니다!</h3>
        </div>
      ) : (
        <div>
          <div className="wrapper">
            <h3 className="classmodal__mid subject">과목명</h3>
            <h3 className="classmodal__mid people">교수님</h3>
            <h3 className="classmodal__mid apply">신청취소</h3>
          </div>
          {myList.map((list) => (
            <div className="wrapper">
              <h4 className="classmodal_small subject">{list[0].name}</h4>
              <h4 className="classmodal_small people">{list[0].prof}</h4>
              <div className="btn">
                <button
                  className="apply-btn apply"
                  onClick={() => deleteClickHandler(list[0].name)}
                >
                  신청취소
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mylist-btn">
        <button onClick={clickHandler}>X 닫기</button>
      </div>
    </div>
  );
};

export default ListModal;
