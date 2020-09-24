import React, { useEffect, useState } from 'react';

import { makeStyles, Backdrop } from '@material-ui/core';




const useStyles = makeStyles(() => ({
  text: {
    color: 'white',
    fontSize: 100,
    display: 'block',
  },
  backdrop: {
    zIndex: 10,
  },
}));




const CountDown = ({ open, close }) => {

  const classes = useStyles();
  const [count, setCount] = useState(4);

  
  useEffect(() => {
    let timer;
    if (count === 0) {
      close();
      setCount(4)
      return () => clearInterval(timer);
    } else {
      timer = setInterval(() => setCount(count - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [count, close])

  return (
    <Backdrop className={classes.backdrop} style={{backgroundColor: 'rgba(0,0,0,0)'}} open={open} >
      <div className={classes.text}>{count > 0 ? count : ''}</div>
    </Backdrop>
  );
}


export default CountDown;