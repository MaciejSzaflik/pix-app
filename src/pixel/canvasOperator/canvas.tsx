import { EventEmitter } from "@billjs/event-emitter";
import React from "react";
import { EventType } from "../eventType";
import { Drawer } from "./drawer";

interface CanvasProps {
  width: number;
  height: number;
  eventEmitter: EventEmitter
}
class Canvas extends React.Component<CanvasProps> {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  canvasBounding: DOMRect | null;
  drawer!: Drawer;

  constructor(props: CanvasProps) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.ctx = null;
    this.canvasBounding = null;
  }
  getContext() {
    this.canvas = this.canvasRef.current;
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
    }
  }
  getCanvasBounding() {
    if (this.canvas) {
      this.canvasBounding = this.canvas.getBoundingClientRect();
    }
  }
  componentDidMount() {
    this.getContext();
    this.getCanvasBounding();

    if(this.canvas!==null && this.ctx!==null)
    {
      this.drawer = new Drawer(this.canvas, this.ctx);
      this.drawer.drawAll();

      this.props.eventEmitter.fire(EventType.drawerReady, {'drawer':this.drawer, 'canvas':this.canvas});
    }
  }
  componentDidUpdate() {
    this.getCanvasBounding();
  }
  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={this.canvasRef}
      ></canvas>
    );
  }
}

export default Canvas;