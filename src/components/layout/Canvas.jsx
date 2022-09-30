import React, { useState } from "react";
import ListModal from "./ListModal";
import { FiList } from "react-icons/fi";
const Canvas = (props) => {
  const [modal, setModal] = useState(false);

  const clickHandler = () => {
    setModal(true);
  };

  return (
    <>
      <canvas
        ref={props.canvasRef}
        width="1728"
        height="1000"
        style={{
          backgroundImage: `url(${props.background})`,
          backgroundSize: "contain",
          overflow: "hidden",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></canvas>
      <div className="list-btn" onClick={clickHandler}>
        <FiList />
      </div>
      {modal && <ListModal setModal={setModal} />}
    </>
  );
};

export default Canvas;
