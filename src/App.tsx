import { makeStyles } from '@material-ui/core';
import React from 'react';
import './App.css';
import ParentComponent from './pixel/ui/parentComponent';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {

  const classes = useStyles();
 
  return (
    <div className="App">
      <header className="App-header">
        <ParentComponent classes={classes}/>
      </header>
    </div>
  );
}

export default App;
