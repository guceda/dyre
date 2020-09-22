import React from 'react';
import CircularProgress from '@material-ui/core/LinearProgress';
import Backdrop from '@material-ui/core/Backdrop';

import { makeStyles } from '@material-ui/core';



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


const BackdropCmp = ({theme, open}) => {

  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={()=>{}}>
      <p style={{color:'white'}}>ijiuhiuhuihuihuihuihuihiuh</p>
    </Backdrop>
  );
}


export default BackdropCmp;