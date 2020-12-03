import React from "react";
import {Button} from '@material-ui/core';
import { CanvasBridge } from "../brige";

type ScaleBtnProp = {
  bridge : CanvasBridge;
}

class ScaleButtons extends React.Component<ScaleBtnProp> {
  size : any = {fontSize:'7px', margin:'5px', maxWidth: '15px', maxHeight: '15px', minWidth: '15px', minHeight: '15px'};

  moveXPlus() {
    if(this.props.bridge !== null)
      this.props.bridge.drawer.offsetX += 2;
  }

  moveXMinus() {
    if(this.props.bridge !== null)
      this.props.bridge.drawer.offsetX = Math.max(0, this.props.bridge.drawer.offsetX - 2);
  }

  moveYPlus() {
    if(this.props.bridge !== null)
      this.props.bridge.drawer.offsetY += 2;
  }

  moveYMinus() {
    if(this.props.bridge !== null)
      this.props.bridge.drawer.offsetY = Math.max(0, this.props.bridge.drawer.offsetY - 2);
  }
  
  scaleUp() {
    if(this.props.bridge !== null)
    {
      let scale: number = Math.max(0.1,this.props.bridge.drawer.scaleX+0.1);
      this.props.bridge.drawer.scaleX = scale;  
      this.props.bridge.drawer.scaleY = scale;
    }
  }

  scaleDown() {
    if(this.props.bridge !== null)
    {
      let scale: number = Math.min(10,this.props.bridge.drawer.scaleX-0.1);
      this.props.bridge.drawer.scaleX = scale;  
      this.props.bridge.drawer.scaleY = scale;
    }  
  }

  render() {
    return (
      <div>
        <Button style={this.size} variant='contained' color="primary" onClick={()=>{this.moveXPlus()}}>
        🡆
        </Button>

        <Button style={this.size} variant='contained' color="primary" onClick={()=>{this.moveXMinus()}}>
        🡄
        </Button>

        <Button style={this.size} variant='contained' color="primary" onClick={()=>{this.moveYPlus()}}>
        🡅
        </Button>

        <Button style={this.size} variant='contained' color="primary" onClick={()=>{this.moveYMinus()}}>
        🡇
        </Button>

        <Button style={this.size} variant='contained' color="primary" onClick={()=>{this.scaleUp()}}>
        ➕
        </Button>

        <Button style={this.size} variant='contained' color="primary" onClick={()=>{this.scaleDown()}}>
        ➖
        </Button>
      </div>
    );
  }
}

export default ScaleButtons; 