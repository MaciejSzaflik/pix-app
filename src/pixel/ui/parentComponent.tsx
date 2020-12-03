import React from "react";
import {Drawer} from '@material-ui/core';
import PixelGenerator from "../PixelGenerator";
import Canvas from "../canvasOperator/canvas";
import { CanvasBridge } from "../canvasOperator/brige";
import { EventType } from "../eventType";
import { Event } from '@billjs/event-emitter';
import ScaleButtons from "../canvasOperator/ui/scaleButtons";
import CreatePalette from "./createPalette";
import ColorDrawer from "./colorDrawer";

type ParentState = {
  generator : PixelGenerator;
  scaleButton : JSX.Element;
  paletteButton : JSX.Element;
  number : number;
} 

type ParentPrompts = {
  classes : any;
}

class ParentComponent extends React.Component<ParentPrompts, ParentState>{
  canvasBridge!: CanvasBridge;
  canvasRef!: React.RefObject<Canvas>;

  constructor(props : ParentPrompts)
  {
    super(props);
    this.createContexAndButtons();
  }

  createContexAndButtons()
  {
    let number = 1;
    if(this.state!=null)
    {
      number = this.state.number;
    }

    let gen = new PixelGenerator();
    gen.on(EventType.drawerReady, (evt) => this.onCanvasCreated(evt));

    this.canvasRef = React.createRef();
    this.canvasBridge = new CanvasBridge(gen);

    let scaleButton = (
      <div>
        <ScaleButtons bridge={this.canvasBridge}/> 
      </div>
    )
    this.setState({
      generator : gen,
      number : number,
      scaleButton : scaleButton,
    });
  }

  onCanvasCreated(evt: Event) {
    this.canvasBridge.drawer = evt.data.drawer;
    this.canvasBridge.createGrid();
  }

  handleTextFieldChange(value:string) {
    this.setState({
        number: +value
    });
  }

  render() {
    if(this.state == null || this.state.scaleButton==null)
    {
      this.createContexAndButtons();
      return null;
    }
    
    return (
      <div>
        <ColorDrawer generator={this.state.generator} classes={this.props.classes}/> 
        <Canvas width={449} height={449} eventEmitter={this.state.generator} ref={this.canvasRef}/>
        {this.state.scaleButton}
        {this.state.paletteButton}
      </div>
    );
  }
}

export default ParentComponent; 