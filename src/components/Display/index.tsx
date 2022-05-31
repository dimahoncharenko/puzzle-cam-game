import React, { useState } from "react";

// Imports components
import { Select } from "../Select/index";
import { Score } from "../Score";

// Imports styled components
import { SelectWrapper } from "../../styled/Select";

// Imports hooks
import { useCanvas } from "../../hooks/useCanvas";
import { useTimer } from "../../hooks/useTimer";

// Imports util functions
import {
  tick,
  getSelectedPiece,
  Point,
  PointProps,
  FXSound,
} from "../../utils";

const putSound = new FXSound("./sounds/put.wav", 0.5, 3);
const winSound = new FXSound("./sounds/done.wav", 0.5, 3);

export const Display = () => {
  const [offset, setOffset] = useState<PointProps>({ x: 0, y: 0 });

  const {
    canvasRef,
    state,
    setState,
    generatePieces,
    handleResize,
    randomizePieces,
    isCompleteGame,
  } = useCanvas(tick);

  const { time, timerOn, startTimer, stopTimer, resetTimer, formatTime } =
    useTimer();

  const handleDragStart = ({ x, y }: PointProps) => {
    const selectedPiece = getSelectedPiece({ x, y }, state.pieces);

    if (selectedPiece) {
      setOffset(new Point(x - selectedPiece.pos.x, y - selectedPiece.pos.y));

      const selectedIndex = state.pieces.indexOf(selectedPiece);
      const newOrderedPieces = state.pieces;

      if (selectedIndex > -1) {
        newOrderedPieces.splice(selectedIndex, 1);
        newOrderedPieces.push(selectedPiece);
      }

      setState((prevState) => ({
        ...prevState,
        selectedPiece,
        pieces: newOrderedPieces,
      }));
    }
  };

  const handleDragMove = ({ x, y }: PointProps) => {
    if (state.selectedPiece) {
      const newPos = new Point(x - offset.x, y - offset.y);
      state.selectedPiece.pos = newPos;
      state.selectedPiece.isInitPos = false;
      setState((prevState) => ({ ...prevState }));
    }
  };

  const resetGame = () => {
    resetTimer();
    startTimer();
    handleResize();
    setState((state) => ({ ...state, isComplete: false }));
    randomizePieces();
  };

  const handleDragEnd = () => {
    if (state.selectedPiece) {
      if (state.selectedPiece.isClose()) {
        state.selectedPiece.snap();
        putSound.play();
        if (isCompleteGame() === true && timerOn) {
          stopTimer();
          winSound.play();
          setState((prevState) => ({ ...prevState, isComplete: true }));
        }
      }

      setState((prevState) => ({ ...prevState, selectedPiece: null }));
    }
  };

  const startGame = (difficulty: string) => {
    setState((prevState) => ({ ...prevState, difficulty }));
    switch (difficulty) {
      case "Easy":
        generatePieces(3, 3);
        resetGame();
        break;
      case "Medium":
        generatePieces(5, 5);
        resetGame();
        break;
      case "Hard":
        generatePieces(8, 8);
        resetGame();
        break;
      case "Extreme":
        generatePieces(13, 13);
        resetGame();
        break;
      default:
        return;
    }
  };

  return (
    <>
      <SelectWrapper>
        <Select
          displayValue={formatTime(time)}
          initDifficulty={state.difficulty}
          start={startGame}
        />
      </SelectWrapper>

      <Score
        isOpened={state.isComplete ? true : false}
        difficulty={state.difficulty}
        time={formatTime(time)}
        closeFunctionality={() =>
          setState((prevState) => ({ ...prevState, isComplete: undefined }))
        }
      />

      <canvas
        ref={canvasRef}
        onMouseDown={({ pageX, pageY }) =>
          handleDragStart({ x: pageX, y: pageY })
        }
        onMouseMove={({ pageX, pageY }) =>
          handleDragMove({ x: pageX, y: pageY })
        }
        onMouseUp={() => handleDragEnd()}
        onTouchStart={({ touches }) =>
          handleDragStart({ x: touches[0].clientX, y: touches[0].clientY })
        }
        onTouchMove={({ touches }) =>
          handleDragMove({ x: touches[0].clientX, y: touches[0].clientY })
        }
        onTouchEnd={() => handleDragEnd()}
      />
    </>
  );
};
