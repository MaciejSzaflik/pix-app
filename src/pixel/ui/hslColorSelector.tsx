import React from "react";
import {Box, TextField} from '@material-ui/core';
import { hsl } from "../canvasOperator/hsl";
import { EventEmitter } from "@billjs/event-emitter";
import { EventType } from "../eventType";

type SelectorState =
{
  color : hsl;
}

type SelectorProps =
{
  generator : EventEmitter
  colorContex:
}

class HslColorSelector extends React.Component<SelectorProps, SelectorState> {
  
  h : number;
  s : number;
  l : number

  constructor(props: SelectorProps)
  {
    super(props);
    this.state ={
      color: new hsl(0.5,0.5,0.5)
    }
    this.h = this.s = this.l = 0.5;
  }

  onHChanged(value:string)
  {
    this.h = Number.parseFloat(value);
    let newColor = new hsl(this.h,this.s,this.l); 
    this.setState({
      color: newColor
    });

    this.props.generator.fire(EventType.StartingColorChanged, newColor)
  }
  onSChanged(value:any)
  {
    this.s = Number.parseFloat(value);
    this.setState({
      color: new hsl(this.h,this.s,this.l)
    });   
  }
  onLChanged(value:any)
  {
    this.l = Number.parseFloat(value);
    this.setState({
      color: new hsl(this.h,this.s,this.l)
    });
  }

  render() {
    if(this.state==null)
      return null;

    return (
      <div>
        <TextField
          id="outlined-number"
          label="H"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          defaultValue={this.state.color.h}
          onChange={e => this.onHChanged(e.target.value)}
        />
        <TextField
          id="outlined-number"
          label="S"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          defaultValue={this.state.color.s}
          onChange={e => this.onSChanged(e.target.value)}
        />
        <TextField
          id="outlined-number"
          label="L"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          defaultValue={this.state.color.l}
          onChange={e => this.onLChanged(e.target.value)}
        />
        <Box style={{ backgroundColor: this.state.color.hslToHTMLCode(), height: '90px'}}>
        </Box>
      </div>

    );
  }
}

export default HslColorSelector; 