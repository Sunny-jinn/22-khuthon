import React, { useEffect, useRef, useState } from "react";
import wobbuffetsArray from "../../assets/img/freshman";
import Button from "../layout/Button";
import rightArrow from "../../assets/img/right-arrow.png";
import background from "../../assets/img/bio.png";
import Canvas from "../layout/Canvas";
import { MAP } from "../../store/map";
import Modal from "../layout/EntranceModal";
import EntranceModal from "../layout/EntranceModal";

const Bio = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [pressedKey, setPressedKey] = useState(null);
  const [rightBtn, setRightBtn] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const positionRef = useRef({ x: 1580, y: 400 });
  const [modal, setModal] = useState(false);

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
    if (positionRef.current.x > 1580 && !rightBtn) {
      setRightBtn(true);
    } else if (positionRef.current.x <= 1580 && rightBtn) {
      setRightBtn(false);
    }
    if (
      positionRef.current.x <= 484 &&
      positionRef.current.y <= 544 &&
      positionRef.current.y >= 424
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
      {rightBtn && (
        <Button direction="right" arrow={rightArrow} location="samguri" />
      )}
      {modal && (
        <EntranceModal
          setModal={setModal}
          building="생명과학대학"
          location="bio"
        />
      )}
    </div>
  );
};

export default Bio;
