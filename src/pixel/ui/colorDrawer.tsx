import React from "react";
import PixelGenerator from "../PixelGenerator";
import {Drawer} from '@material-ui/core';
import HslColorSelector from "./hslColorSelector";
import CreatePalette from "./createPalette";
import { ColorContex } from "../colorContex";

type PaletteProp = {
  generator : PixelGenerator;
  colorContex : ColorContex;
  classes : any;
}

class ColorDrawer extends React.Component<PaletteProp> {

  render() {
    return (
      <Drawer 
        className={this.props.classes.drawer}
        variant="permanent"
        classes={{
         paper: this.props.classes.drawerPaper,
        }}
      >
      <HslColorSelector generator={this.props.generator}/>
      <CreatePalette generator={this.props.generator}/> 
      </Drawer>
    );
  }
}

export default ColorDrawer; 