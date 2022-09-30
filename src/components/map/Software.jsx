import React, { useEffect, useRef, useState } from "react";
import wobbuffetsArray from "../../assets/img/freshman";
import Button from "../layout/Button";
import rightArrow from "../../assets/img/right-arrow.png";
import downArrow from "../../assets/img/down-arrow.png";
import background from "../../assets/img/jadae.png";
import Canvas from "../layout/Canvas";
import { MAP } from "../../store/map";
import { useSelector } from "react-redux";
import EntranceModal from "../layout/EntranceModal";

const Software = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [pressedKey, setPressedKey] = useState(null);
  const [rightBtn, setRightBtn] = useState(false);
  const [downBtn, setDownBtn] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const positionRef = useRef({ x: 1000, y: 700 });
  const prevLocation = useSelector((state) => state.location.prevLocation);

  useEffect(() => {
    if (prevLocation === "library") {
      positionRef.current = { x: 1609, y: 680 };
    } else if (prevLocation === "samguri") {
      positionRef.current = { x: 1050, y: 850 };
    } else if (prevLocation === "softone") {
      positionRef.current = { x: 510, y: 452 };
    }
  }, []);

  const move = ({ x, y }) => {
    const newX = positionRef.current.x + x;
    const newY = positionRef.current.y + y;
    if (newX < -30 || newX > canvasRef.current.width - MAP.IMG_WIDTH) return;
    if (newY < 0 || newY > canvasRef.current.height - MAP.IMG_HEIGHT) return;
    if (newY < 586 && newX < 425) return;
    if (newY < 586 && newX < 721 && newX > 605) return;
    if (newY < 512 && newX < 1351 && newX > 721) return;
    if (newY < 284 && newX > 1351) return;
    if (newY < 396 && newX < 603 && newX > 425) return;
    if (newY > 395 && newY < 465 && newX < 464) return;
    if (newY > 395 && newY < 465 && newX > 561 && newX < 600) return;
    if (newY > 626 && newX < 294) return;
    if (newY > 656 && newX < 422) return;
    if (newY > 656 && newX < 422) return;
    if (newY > 698 && newX < 524) return;
    if (newY > 746 && newX < 640) return;
    if (newY > 816 && newX < 860) return;

    positionRef.current = { x: newX, y: newY };
    console.log("x:", positionRef.current.x, "y :", positionRef.current.y);

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
    if (positionRef.current.x > 1610 && !rightBtn) {
      setRightBtn(true);
    } else if (positionRef.current.x <= 1610 && rightBtn) {
      setRightBtn(false);
    }
    if (positionRef.current.y > 870 && !downBtn) {
      setDownBtn(true);
    } else if (positionRef.current.y <= 870 && downBtn) {
      setDownBtn(false);
    }
    if (
      positionRef.current.x >= 468 &&
      positionRef.current.x <= 556 &&
      positionRef.current.y <= 410
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
        <Button direction="right" arrow={rightArrow} location="library" />
      )}
      {downBtn && (
        <Button direction="down" arrow={downArrow} location="samguri" />
      )}

      {modal && (
        <EntranceModal
          setModal={setModal}
          building="전자정보대학"
          location="softone"
        />
      )}
    </div>
  );
};

export default Software;
