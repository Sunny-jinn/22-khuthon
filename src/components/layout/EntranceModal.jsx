import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { locationActions } from "../../store";

const EntranceModal = (props) => {
  const dispatch = useDispatch();
  const [access, setAccess] = useState(false);

  useEffect(() => {
    if (
      props.building === "전자정보대학" ||
      props.building === "멀티미디어교육관"
    ) {
      setAccess(true);
    }
  }, []);

  const yesClickHandler = () => {
    dispatch(locationActions.setLocation(props.location));
  };

  const clickHandler = () => {
    props.setModal(false);
  };

  return (
    <div className="modal">
      <h1 className="modal__title">{props.building}</h1>
      {access ? (
        <>
          <h4 className="modal__mid">들어가시겠습니까?</h4>
          <div className="modal__actions">
            <button
              className="modal__action"
              type="button"
              onClick={yesClickHandler}
            >
              예
            </button>
            <button
              className="modal__action modal__action—negative"
              type="button"
              onClick={clickHandler}
            >
              아니요
            </button>
          </div>
        </>
      ) : (
        <h4 className="modal__mid">들어갈 수 없습니다</h4>
      )}
    </div>
  );
};
export default EntranceModal;
