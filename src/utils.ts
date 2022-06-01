// Imports types
import e from "express";
import { State } from "./hooks/useCanvas";

export function tick(ctx: CanvasRenderingContext2D, state: State) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.fillRect(
    state.videoPos.x,
    state.videoPos.y,
    state.videoWidth,
    state.videoHeight
  );
  ctx.restore();

  state.pieces.forEach((piece) => piece.draw(ctx, state));
}

export interface PointProps {
  x: number;
  y: number;
}

export class Point implements PointProps {
  constructor(public x: number, public y: number) {}

  distance(p2: PointProps) {
    return Math.sqrt(Math.pow(p2.x - this.x, 2) + Math.pow(p2.y - this.y, 2));
  }
}

export class Piece {
  public width: number;
  public height: number;
  public pos: Point;
  private initPos: Point;
  public isInitPos = true;

  // Puzzle corners
  public top = 0;
  public left = 0;
  public bottom = 0;
  public right = 0;

  constructor(public rowIndex: number, public colIndex: number, state: State) {
    this.width = state.videoWidth / state.colsNum;
    this.height = state.videoHeight / state.rowsNum;

    this.pos = new Point(
      state.videoPos.x + this.colIndex * this.width,
      state.videoPos.y + this.rowIndex * this.height
    );

    this.initPos = this.pos;
  }

  update(state: State) {
    this.width = state.videoWidth / state.colsNum;
    this.height = state.videoHeight / state.rowsNum;

    this.initPos = new Point(
      state.videoPos.x + this.colIndex * this.width,
      state.videoPos.y + this.rowIndex * this.height
    );
  }

  draw(ctx: CanvasRenderingContext2D, state: State) {
    ctx.beginPath();

    // ctx.rect(this.pos.x, this.pos.y, this.width, this.height);

    const minRatio = Math.min(this.width, this.height);
    const neck = 0.1 * minRatio;
    const cornerWidth = 0.2 * minRatio;
    const cornerHeight = 0.2 * minRatio;

    // From top left
    ctx.moveTo(this.pos.x, this.pos.y);

    // to top right
    if (this.top) {
      ctx.lineTo(
        this.pos.x + this.width * Math.abs(this.top) - neck,
        this.pos.y
      );

      ctx.bezierCurveTo(
        this.pos.x + this.width * Math.abs(this.top) - neck,
        this.pos.y - cornerHeight * Math.sign(this.top) * 0.2,

        this.pos.x + this.width * Math.abs(this.top) - cornerWidth,
        this.pos.y - cornerHeight * Math.sign(this.top),

        this.pos.x + this.width * Math.abs(this.top),
        this.pos.y - cornerHeight * Math.sign(this.top)
      );

      ctx.bezierCurveTo(
        this.pos.x + this.width * Math.abs(this.top) + cornerWidth,
        this.pos.y - cornerHeight * Math.sign(this.top),

        this.pos.x + this.width * Math.abs(this.top) + neck,
        this.pos.y - cornerHeight * Math.sign(this.top) * 0.2,

        this.pos.x + this.width * Math.abs(this.top) + neck,
        this.pos.y
      );

      ctx.lineTo(
        this.pos.x + this.width * Math.abs(this.top) + neck,
        this.pos.y
      );
    }
    ctx.lineTo(this.pos.x + this.width, this.pos.y);

    // to bottom right
    if (this.right) {
      ctx.lineTo(
        this.pos.x + this.width,
        this.pos.y + this.height * Math.abs(this.right) - neck
      );

      ctx.bezierCurveTo(
        this.pos.x + this.width - cornerWidth * Math.sign(this.right) * 0.2,
        this.pos.y + this.height * Math.abs(this.right) - neck,

        this.pos.x + this.width - cornerWidth * Math.sign(this.right),
        this.pos.y + this.height * Math.abs(this.right) - cornerHeight,

        this.pos.x + this.width - cornerWidth * Math.sign(this.right),
        this.pos.y + this.height * Math.abs(this.right)
      );

      ctx.bezierCurveTo(
        this.pos.x + this.width - cornerWidth * Math.sign(this.right),
        this.pos.y + this.height * Math.abs(this.right) + cornerWidth,

        this.pos.x + this.width - cornerWidth * Math.sign(this.right) * 0.2,
        this.pos.y + this.height * Math.abs(this.right) + neck,

        this.pos.x + this.width,
        this.pos.y + this.height * Math.abs(this.right) + neck
      );

      ctx.lineTo(
        this.pos.x + this.width,
        this.pos.y + this.height * Math.abs(this.right) + neck
      );
    }
    ctx.lineTo(this.pos.x + this.width, this.pos.y + this.height);

    // to bottom left
    if (this.bottom) {
      ctx.lineTo(
        this.pos.x + this.width * Math.abs(this.bottom) + neck,
        this.pos.y + this.height
      );

      ctx.bezierCurveTo(
        this.pos.x + this.width * Math.abs(this.bottom) + neck,
        this.pos.y + this.height + cornerHeight * Math.sign(this.bottom) * 0.2,

        this.pos.x + this.width * Math.abs(this.bottom) + cornerWidth,
        this.pos.y + this.height + cornerHeight * Math.sign(this.bottom),

        this.pos.x + this.width * Math.abs(this.bottom),
        this.pos.y + this.height + cornerHeight * Math.sign(this.bottom)
      );

      ctx.bezierCurveTo(
        this.pos.x + this.width * Math.abs(this.bottom) - cornerWidth,
        this.pos.y + this.height + cornerHeight * Math.sign(this.bottom),

        this.pos.x + this.width * Math.abs(this.bottom) - neck,
        this.pos.y + this.height + cornerHeight * Math.sign(this.bottom) * 0.2,

        this.pos.x + this.width * Math.abs(this.bottom) - neck,
        this.pos.y + this.height
      );

      ctx.lineTo(
        this.pos.x + this.width * Math.abs(this.bottom) - neck,
        this.pos.y + this.height
      );
    }
    ctx.lineTo(this.pos.x, this.pos.y + this.height);

    // to top left
    if (this.left) {
      ctx.lineTo(
        this.pos.x,
        this.pos.y + this.height * Math.abs(this.left) + neck
      );

      ctx.bezierCurveTo(
        this.pos.x + cornerWidth * Math.sign(this.left) * 0.2,
        this.pos.y + this.height * Math.abs(this.left) + neck,

        this.pos.x + cornerWidth * Math.sign(this.left),
        this.pos.y + this.height * Math.abs(this.left) + cornerWidth,

        this.pos.x + cornerWidth * Math.sign(this.left),
        this.pos.y + this.height * Math.abs(this.left)
      );

      ctx.bezierCurveTo(
        this.pos.x + cornerWidth * Math.sign(this.left),
        this.pos.y + this.height * Math.abs(this.left) - cornerWidth,

        this.pos.x + cornerWidth * Math.sign(this.left) * 0.2,
        this.pos.y + this.height * Math.abs(this.left) - neck,

        this.pos.x,
        this.pos.y + this.height * Math.abs(this.left) - neck
      );

      ctx.lineTo(
        this.pos.x,
        this.pos.y + this.height * Math.abs(this.left) - neck
      );
    }
    ctx.lineTo(this.pos.x, this.pos.y);

    ctx.save();
    ctx.clip();

    const scaledCornerHeight = Math.min(
      state.videoStream.videoWidth / state.colsNum,
      ((state.videoStream.videoHeight / state.rowsNum) * cornerHeight) /
        minRatio
    );

    ctx.drawImage(
      state.videoStream,
      this.colIndex * (state.videoStream.videoWidth / state.colsNum) -
        scaledCornerHeight,
      this.rowIndex * (state.videoStream.videoHeight / state.rowsNum) -
        scaledCornerHeight,
      state.videoStream.videoWidth / state.colsNum + scaledCornerHeight * 2,
      state.videoStream.videoHeight / state.rowsNum + scaledCornerHeight * 2,
      this.pos.x - cornerWidth,
      this.pos.y - cornerHeight,
      this.width + cornerWidth * 2,
      this.height + cornerWidth * 2
    );

    ctx.restore();
    ctx.stroke();
  }

  isClose() {
    if (this.pos.distance(this.initPos) < this.width / 3) {
      return true;
    }

    return false;
  }

  snap() {
    this.pos = this.initPos;
    this.isInitPos = true;
  }
}

export class FXSound {
  private currents: HTMLAudioElement[] = [];
  private maxCurrents = 3;
  private counter = 0;

  constructor(source: string, vol: number, maxCurrents = 3) {
    this.maxCurrents = maxCurrents;

    for (let i = 0; i < this.maxCurrents; i++) {
      let sound = new Audio(source);
      sound.volume = vol;

      this.currents.push(sound);
    }
  }

  play() {
    this.currents[this.counter % this.maxCurrents].play();
    this.counter++;
  }

  pause() {
    this.currents[this.counter % this.maxCurrents].pause();
  }
}

export const getSelectedPiece = ({ x, y }: PointProps, pieces: Piece[]) => {
  for (let i = pieces.length - 1; i >= 0; i--) {
    const piece = pieces[i];
    if (
      x > piece.pos.x &&
      x < piece.pos.x + piece.width &&
      y > piece.pos.y &&
      y < piece.pos.y + piece.height
    ) {
      return piece;
    }
  }

  return null;
};
