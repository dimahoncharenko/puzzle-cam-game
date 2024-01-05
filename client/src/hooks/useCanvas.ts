import { useEffect, useRef, useState } from "react";

// Imports util functions
import { Piece, Point } from "../utils";

// Declares types
export type State = {
  width: number;
  height: number;
  videoWidth: number;
  videoHeight: number;
  videoPos: Point;
  videoStream: HTMLVideoElement;
  colsNum: number;
  rowsNum: number;
  pieces: Piece[];
  selectedPiece: Piece | null;
  isComplete: boolean | undefined;
  difficulty: string;
};

export const useCanvas = (
  tick: (ctx: CanvasRenderingContext2D, state: State) => void
) => {
  const [state, setState] = useState<State>({
    width: 0,
    height: 0,
    videoHeight: 460,
    videoWidth: 640,
    videoPos: new Point(0, 0),
    videoStream: document.createElement("video"),
    colsNum: 3,
    rowsNum: 3,
    pieces: [],
    selectedPiece: null,
    isComplete: false,
    difficulty: "Medium",
  });

  const frameID = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleResize = () => {
    let resizer = 0.7 * Math.min(innerWidth / 640, innerHeight / 460);

    const videoWidth = resizer * 640;
    const videoHeight = resizer * 460;

    const videoPos = new Point(
      innerWidth / 2 - videoWidth / 2,
      innerHeight / 2 - videoHeight / 2
    );

    setState((prevState) => {
      return {
        ...prevState,
        width: innerWidth,
        height: innerHeight,
        pieces: prevState.pieces.map((piece) => {
          piece.update(prevState);
          return piece;
        }),
        videoWidth,
        videoHeight,
        videoPos,
      };
    });
  };

  const generatePieces = (rowsNum: number, colsNum: number) => {
    let pieces: Piece[] = [];

    let count = 0;
    for (let row = 0; row < rowsNum; row++) {
      for (let col = 0; col < colsNum; col++) {
        const piece = new Piece(row, col, state);
        const sgn = Math.random() - 0.5 < 0 ? -1 : 1;
        // Generate right and bottom puzzle corners
        if (row === rowsNum - 1) {
          piece.bottom = 0;
        } else {
          piece.bottom = sgn * (Math.random() * 0.4 + 0.3);
        }

        if (col !== colsNum - 1) {
          piece.right = sgn * (Math.random() * 0.4 + 0.3);
        }

        // Generate top and bottom left corners
        if (col !== 0) {
          piece.left = -pieces[count - 1].right;
        }

        if (row !== 0) {
          piece.top = -pieces[count - colsNum].bottom;
        }
        count++;
        pieces.push(piece);
      }
    }

    setState((prevState) => ({ ...prevState, pieces, colsNum, rowsNum }));
  };

  const randomizePieces = () => {
    setState((prevState) => {
      return {
        ...prevState,
        pieces: prevState.pieces.map((piece) => {
          piece.isInitPos = false;
          piece.pos = new Point(
            Math.random() * (prevState.width - piece.width),
            Math.random() * (prevState.height - piece.height)
          );

          return piece;
        }),
      };
    });
  };

  const isCompleteGame = () => {
    for (const piece of state.pieces) {
      if (!piece.isInitPos) {
        return false;
      }
    }

    return true;
  };

  const animationLoop = (ctx: CanvasRenderingContext2D, state: State) => {
    tick(ctx, state);
    frameID.current = requestAnimationFrame(
      animationLoop.bind(null, ctx, state)
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        state.videoStream.srcObject = videoStream;
        state.videoStream.play();

        handleResize();
      } catch (err) {
        console.error("Something went wrong: ", err);
      }
    })();

    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    canvas.width = state.width;
    canvas.height = state.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    frameID.current = requestAnimationFrame(
      animationLoop.bind(null, ctx, state)
    );

    return () => {
      cancelAnimationFrame(frameID.current);
    };
  }, [animationLoop]);

  return {
    canvasRef,
    state,
    setState,
    generatePieces,
    handleResize,
    randomizePieces,
    isCompleteGame,
  };
};
