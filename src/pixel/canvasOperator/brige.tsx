import { Rect } from './shape';
import { Shape } from './shape';
import { Drawer } from './drawer';
import { EventEmitter } from '@billjs/event-emitter';
import { EventType } from '../eventType';

export class CanvasBridge
{
  public drawer!: Drawer;
  public emitter: EventEmitter;

  scaleX: number = 100;
  scaleY: number = 10;

  gridColor: string = '#637183';

  constructor(generator: EventEmitter)
  {
    this.emitter = generator;

    this.emitter.on(EventType.createPalette,(d) => {
      this.paletteToDrawer(d);
    });
  }

  createGrid()
  {
    if(this.drawer==null || this.drawer.canvas == null)
      return;
    let array = new Array<Shape>();
    let cW = this.drawer.canvas.width;
    let cH = this.drawer.canvas.height;

    for(let i: number = 0; i<= cW;i+=32)
    {
      let x: number = i;
      let w: number = 1;
      let h: number = cH;
      let y: number = 0;
      let rect: Rect = new Rect(x,y,w,h, this.gridColor, 1);
      array.push(rect);
    }
    for(let i: number = 0; i<= cW;i+=32)
    {
      let x: number = 0;
      let w: number = cW;
      let h: number = 1;
      let y: number = i;
      let rect: Rect = new Rect(x,y,w,h, this.gridColor, 1);
      array.push(rect);
    }

    this.drawer.setArrayToDraw('grid',array);
    this.drawer.drawAll();

  }

  paletteToDrawer(data: any) {
    let array = new Array<Shape>();
    console.log(data);
    let colors = data.data as Array<string>;

    for(let i: number = 0; i< colors.length;i++)
    {
      let x: number = i*32;
      let w: number = 32;
      let h: number = 32;
      let y: number = 0;
      let rect: Rect = new Rect(x,y,w,h, colors[i], 1);
      array.push(rect);
    }

    this.drawer.setArrayToDraw('palette',array);
    this.drawer.drawAll();
  }

  trackToDrawer() {
    /*let array = new Array<Shape>();

    for(let i: number = 0; i< this.track.trackNotes.length;i++)
    {
      let note: TrackNote = this.track.trackNotes[i];
      let id: number = this.noteAtlas.noteAtlas[note.name].id;
      let x: number = (note.start + note.duration)*this.scaleX + 5*i;
      let w: number =  note.duration*this.scaleX;
      let h: number = this.scaleY;
      let y: number = id*this.scaleY;
      let rect: Rect = new Rect(x,y,w,h, this.noteColor, 1);
      array.push(rect);
    }
    this.drawer.setArrayToDraw('track',array);
    this.drawer.drawAll();*/
  }

}