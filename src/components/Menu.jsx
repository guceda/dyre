import React from 'react';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';

import { IconButton, Grid, makeStyles, Modal, Typography, withStyles, Switch, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: '100vh',
  },
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  title: {
    color: 'white',
    fontSize: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  pause: {
    fontSize: 150,
    color: 'white',
  },
  pauseContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: '0px 30px',
  },
  stopContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  stop: {
    fontSize: 60,
    color: 'white'
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

  // return (
  //   <Modal open={open} >
  //     <div style={{ height: '100%', padding: '10px 30px', border: '0px' }}>
  //       <h2 style={{ color: 'white', fontSize: 40 }}>{title}</h2>
  //       <PauseIcon style={{ fontSize: 150, color: 'white' }} />

  //       <IconButton onClick={stop} >
  //         <StopIcon style={{ fontSize: 60, color: 'white' }} />
  //       </IconButton>

  //       <Typography component="div">
  //       <Grid component="label" container alignItems="center" spacing={1}>
  //         <Grid item>dark</Grid>
  //         <Grid item>
  //           <AntSwitch checked={theme.id === 'light'} onChange={changeTheme} name="checkedC" />
  //         </Grid>
  //         <Grid item>light</Grid>
  //       </Grid>
  //     </Typography>


  //     </div>
  //   </Modal>
  // );

  return (
    <Modal open={open}>
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <h2 className={classes.title}>{title}</h2>
          </Grid>
          <Grid item xs={12} className={classes.pauseContainer}>
            <PauseIcon className={classes.pause} />
          </Grid>
          <Grid item xs={12} className={classes.options}>
            <Grid item xs={2}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={2} className={classes.stopContainer}>
              <IconButton onClick={stop}>
                <StopIcon className={classes.stop} />
              </IconButton>
            </Grid>
          </Grid>

        </Grid>
      </div>
    </Modal>
  );
}


export default Menu;