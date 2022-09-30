import React, { useEffect, useRef, useState } from "react";
import wobbuffetsArray from "../../assets/img/freshman";
import Button from "../layout/Button";
import upArrow from "../../assets/img/up-arrow.png";
import background from "../../assets/img/multi.png";
import Canvas from "../layout/Canvas";
import { MAP } from "../../store/map";
import Modal from "../layout/EntranceModal";
import EntranceModal from "../layout/EntranceModal";
import { useSelector } from "react-redux";

const Multi = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [pressedKey, setPressedKey] = useState(null);
  const [upBtn, setUpBtn] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [modal, setModal] = useState(false);
  const positionRef = useRef({ x: 1050, y: 20 });
  const prevLocation = useSelector((state) => state.location.prevLocation);

  useEffect(() => {
    if (prevLocation === "multiin") {
      positionRef.current = { x: 1340, y: 478 };
    }
  }, []);

  const move = ({ x, y }) => {
    const newX = positionRef.current.x + x;
    const newY = positionRef.current.y + y;
    if (newX < -30 || newX > canvasRef.current.width - MAP.IMG_WIDTH) return;
    if (newY < 0 || newY > canvasRef.current.height - MAP.IMG_HEIGHT) return;
    positionRef.current = { x: newX, y: newY };
    setCurrentFrame((frame) => (frame < MAP.CHAR_FRAME ? frame + 1 : 0));
  };

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const wobbuffetsImage = new Image();
    wobbuffetsImage.src = wobbuffetsArray[currentFrame];
    wobbuffetsImage.onload = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.drawImage(
        wobbuffetsImage,
        positionRef.current.x,
        positionRef.current.y
      );
    };

    handleKey();
    animationRef.current = requestAnimationFrame(render);
  };

  const handleKey = () => {
    switch (pressedKey) {
      case MAP.MOVE_LEFT:
        move({ x: -1 * MAP.SPEED, y: 0 });
        return;
      case MAP.MOVE_DOWN:
        move({ x: 0, y: -1 * MAP.SPEED });
        return;
      case MAP.MOVE_RIGHT:
        move({ x: MAP.SPEED, y: 0 });
        return;
      case MAP.MOVE_UP:
        move({ x: 0, y: MAP.SPEED });
        return;
      case null:
        return;
      default:
        move({ x: 0, y: 0 });
        return;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      setPressedKey(e.keyCode);
    });
    window.addEventListener("keyup", () => setPressedKey(null));
    animationRef.current = requestAnimationFrame(render);
    if (positionRef.current.y < 20 && !upBtn) {
      setUpBtn(true);
    } else if (positionRef.current.y >= 20 && upBtn) {
      setUpBtn(false);
    }
    if (
      positionRef.current.x >= 1376 &&
      positionRef.current.y >= 438 &&
      positionRef.current.y <= 518
    ) {
      setModal(true);
    } else {
      setModal(false);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  });

  return (
    <div>
      <Canvas canvasRef={canvasRef} background={background} />

      {upBtn && <Button direction="up" arrow={upArrow} location="samguri" />}
      {modal && (
        <EntranceModal
          setModal={setModal}
          building="멀티미디어교육관"
          location="multiin"
        />
      )}
    </div>
  );
};

export default Multi;
