import React from "react";
import {Button} from '@material-ui/core';
import PixelGenerator from "../PixelGenerator";
import { hsl } from "../canvasOperator/hsl";
import { EventType } from "../eventType";

type PaletteProp = {
  generator : PixelGenerator;
}

class CreatePalette extends React.Component<PaletteProp> {
  size : any = {fontSize:'7px', margin:'5px', maxWidth: '60px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'};

  createPalette() {
    let color = new hsl(0.5,0.5,0.5);
    let diffH = 12/255; 
    let diffS = 8/255; 
    let diffL = 10/255; 
    let numberOfColors = 7;

    let colorArray = new Array<string>();

    colorArray.push(color.hslToHTMLCode());
    for(let i = 0; i < numberOfColors; i++)
    {
      color.h-=diffH;
      color.s-=diffS;
      color.l-=diffL;

      colorArray.push(color.hslToHTMLCode());
    }

    this.props.generator.fire(
      EventType.createPalette,
      colorArray
    )
  }

  render() {
    return (
        <Button 
          style={this.size} 
          variant='contained' 
          color="primary" 
          onClick={()=>{this.createPalette()}}
        >
          Create Palette
        </Button>
    );
  }
}

export default CreatePalette; 