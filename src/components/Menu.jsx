import React from 'react';
import CircularProgress from '@material-ui/core/LinearProgress';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';

import { IconButton, Grid, makeStyles, Modal, Typography, withStyles, Switch } from '@material-ui/core';



const useStyles = makeStyles(() => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: '100vh',
  },
  Menu: {
    zIndex: 10,
    color: 'rgba(0,0,0,0.6)'
  }
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);



const Menu = ({ theme, open, title, stop, changeTheme }) => {

  const classes = useStyles();

  return (
    <Modal open={open} >
      <div style={{ height: '100%', padding: '10px 30px', border: '0px' }} className={classes.paper}>
        <h2 style={{ color: 'white', fontSize: 40 }}>{title}</h2>
        <PauseIcon style={{ fontSize: 150, color: 'white' }} />

        <IconButton onClick={stop} >
          <StopIcon style={{ fontSize: 60, color: 'white' }} />
        </IconButton>

        <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>dark</Grid>
          <Grid item>
            <AntSwitch checked={theme.id === 'light'} onChange={changeTheme} name="checkedC" />
          </Grid>
          <Grid item>light</Grid>
        </Grid>
      </Typography>


      </div>
    </Modal>
  );
}


export default Menu;