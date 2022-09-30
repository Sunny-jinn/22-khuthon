import React, { useEffect, useRef, useState } from "react";
import wobbuffetsArray from "../../assets/img/freshman";
import Button from "../layout/Button";
import leftArrow from "../../assets/img/left-arrow.png";
import background from "../../assets/img/multiin.jpg";
import Canvas from "../layout/Canvas";
import { MAP } from "../../store/map";
import Classmodal from "../layout/ClassModal";
import { useSelector } from "react-redux";

const Multiin = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [pressedKey, setPressedKey] = useState(null);
  const [leftBtn, setLeftBtn] = useState(false);
  const [prof, setProf] = useState("");

  const [currentFrame, setCurrentFrame] = useState(0);
  const [modal, setModal] = useState(false);
  const positionRef = useRef({ x: 50, y: 600 });
  const classes = useSelector((state) => state.class.class);
  const classList = classes.filter((list) => list.prof === prof);

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
    if (positionRef.current.x < 50 && !leftBtn) {
      setLeftBtn(true);
    } else if (positionRef.current.x >= 50 && leftBtn) {
      setLeftBtn(false);
    }
    if (
      positionRef.current.x >= 954 &&
      positionRef.current.y <= 720 &&
      positionRef.current.y >= 616 &&
      positionRef.current.x <= 1154
    ) {
      setProf("김영진");
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
      {leftBtn && (
        <Button direction="left" arrow={leftArrow} location="multi" />
      )}
      {modal && <Classmodal classList={classList} prof={prof} />}
    </div>
  );
};

export default Multiin;
