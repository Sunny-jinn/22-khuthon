import React, { useEffect, useRef, useState } from "react";
import wobbuffetsArray from "../../assets/img/freshman";
import Button from "../layout/Button";

import downArrow from "../../assets/img/down-arrow.png";

import background from "../../assets/img/soft22.png";
import Canvas from "../layout/Canvas";
import { MAP } from "../../store/map";
import { useDispatch, useSelector } from "react-redux";
import { locationActions } from "../../store";
import Classmodal from "../layout/ClassModal";

const Softtwo = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef({ x: 812, y: 870 });
  const [pressedKey, setPressedKey] = useState(null);
  const [downBtn, setDownBtn] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [prof, setProf] = useState("");
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const prevLocation = useSelector((state) => state.location.prevLocation);
  const classes = useSelector((state) => state.class.class);
  const classList = classes.filter((list) => list.prof === prof);

  useEffect(() => {
    if (prevLocation === "softthree") {
      positionRef.current = { x: 818, y: 405 };
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
    if (positionRef.current.y > 870 && !downBtn) {
      setDownBtn(true);
    } else if (positionRef.current.y <= 870 && downBtn) {
      setDownBtn(false);
    }
    if (
      positionRef.current.x >= 628 &&
      positionRef.current.x <= 1009 &&
      positionRef.current.y <= 398
    ) {
      dispatch(locationActions.setLocation("softthree"));
    }
    if (positionRef.current.x <= 508 && positionRef.current.y <= 742) {
      setProf("조진성");
      setModal(true);
    } else if (positionRef.current.x >= 1140 && positionRef.current.y <= 734) {
      setProf("배성호");
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
      {downBtn && (
        <Button direction="down" arrow={downArrow} location="softone" />
      )}
      {modal && <Classmodal classList={classList} prof={prof} />}
    </div>
  );
};

export default Softtwo;
