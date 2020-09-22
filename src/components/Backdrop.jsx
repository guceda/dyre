import React from 'react';

import { makeStyles, Backdrop, IconButton } from '@material-ui/core';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';



const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: '100vh',
  },
  backdrop: {
    zIndex: 10,
    color: 'rgba(0,0,0,0.6)'
  }
}));




const BackdropCmp = ({ open, start}) => {

  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={() => { }}>
      <div style={{ color: 'white', fontSize: 40, display:'block' }}>Press space bar to start reading</div>
        <IconButton onClick={start} >
          <SpaceBarIcon style={{ fontSize: 100, color: 'white' }} />
        </IconButton>

    </Backdrop>
  );
}


export default BackdropCmp;