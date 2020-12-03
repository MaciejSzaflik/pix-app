import { Shape } from "./shape";

export class Drawer
{
  shapes: Map<string, Shape[]>;

  public ctx: CanvasRenderingContext2D | null;
  public canvas: HTMLCanvasElement | null

  public offsetX: number = 0;
  public offsetY: number = 0;

  public scaleX: number = 1;
  public scaleY: number = 1;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D)
  {
    this.shapes = new Map<string, Shape[]>();
    this.ctx = ctx;
    this.canvas = canvas;
  }

  addToDraw(type: string, shape: Shape)
  {
    if(this.shapes.has(type))
      this.shapes.get(type)?.push(shape);
    else
      this.shapes.set(type, [shape]);
  }

  setArrayToDraw(type: string, shapes: Shape[])
  {
    this.shapes.set(type, shapes);
  }

  clear() : void
  {
    if(this.canvas!==null && this.ctx!==null)
    {
      this.ctx.scale(1, 1);
      this.ctx.translate(0, 0);
      
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
  }

  drawAll() : void
  {
    if(this.ctx == null)
      return;

    this.clear();
    this.shapes.forEach((value) =>{
      value.sort((a,b) => b.zIndex - a.zIndex);
    });
 
    this.shapes.forEach((value) =>{
      value.forEach(element => {
        if(this.ctx!=null)
          element.draw(this.ctx);
      });
    });

    this.ctx.scale(this.scaleX, this.scaleY);
    this.ctx.translate(this.offsetX, this.offsetY);
  }
}